import React, {useReducer, useContext, createContext, Dispatch} from 'react';
import {create} from "domain";
import {Post} from "../type/post";

type State = Post[]

type Action =
	| {type: 'ADD_POST', post: Post}
	| {type: 'UPDATE_POST', post: Post}

const initialPosts: Post[]=[]

type PostDispatch = Dispatch<Action>

const PostStateContext = createContext<State | null>(null);
const PostDispatchContext = createContext<PostDispatch | null>(null);


function reducer(state:State, action:Action):State {
	switch (action.type) {
		case 'ADD_POST':
			return [...state, action.post]
		case 'UPDATE_POST':
			return state.map((post) =>
				post.id === action.post.id ? action.post : post
			)
		default:
			throw new Error('Unhandled action')
	}
}
//post 데이터 요청 부분 어디다가 할지 생각
//state, dispatch로 코드 수정

export function PostProvider({children}:{children:React.ReactNode}) {
	const [state, dispatch] = useReducer(reducer, initialPosts);
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