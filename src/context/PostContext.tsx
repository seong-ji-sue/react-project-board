import React, {useReducer, useContext, createContext, Dispatch, useEffect} from 'react';
import {Post} from "../type/post";

interface State {
	loading: boolean,
	data: any | null,
	error: any | null,
}

type Action =
	|{ type: 'FETCH_INIT' }
	| { type: 'FETCH_SUCCESS', payload: Post[] }
	| { type: 'FETCH_FAILURE', payload: any }
	| {type: 'ADD_POST', payload: Post}
	| {type: 'UPDATE_POST', payload: Post}

type PostDispatch = Dispatch<Action>

const PostStateContext = createContext<State | null>(null);
const PostDispatchContext = createContext<PostDispatch | null>(null);

function reducer(state:State, action:Action):State {
	switch (action.type) {
		case "FETCH_INIT":
			return {...state, loading: true}
		case 'FETCH_SUCCESS' :
			return {...state, loading:false, data: action.payload, error:null}
		case "FETCH_FAILURE":
			return {...state, loading:false, data: null, error:action.payload}
		case 'ADD_POST':
			return {...state, loading:false, data: state.data.concat(action.payload), error:null}
		case 'UPDATE_POST':
			const updateData = state.data.map((post:any) =>//userId가 포함됨
				post.id === action.payload.id ? action.payload : post)
			return {...state, loading:false, data: updateData, error:null}
		default:
			throw new Error('Unhandled action')
	}
}

export function PostProvider({children}:{children:React.ReactNode}) {
	const [state, dispatch] = useReducer(reducer, {
		loading: false,
		data: null,
		error: null,
	});

	useEffect(() =>{
		dispatch({type: 'FETCH_INIT'})
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => res.json())
			.then((data) => {dispatch({ type: 'FETCH_SUCCESS', payload: data });})
			.catch((error) =>{dispatch({ type: 'FETCH_FAILURE', payload: error });})
	},[])

	if(state.loading || !state.data) {
		return <div>Loading....</div>
	}

	if(state.error) {
		return <div>Error: {state.error.message}</div>
	}

	return (
		<PostStateContext.Provider value={state}>
			<PostDispatchContext.Provider value={dispatch}>
				{children}
			</PostDispatchContext.Provider>
		</PostStateContext.Provider>
	)
}

export function usePostState() {
	const state = useContext(PostStateContext);
	if (!state) throw new Error('Cannot find PostStateContext');
	return state;
}

export function usePostDispatch() {
	const dispatch = useContext(PostDispatchContext);
	if (!dispatch) throw new Error('Cannot find PostDispatchContext');
	return dispatch;
}