import React, { useEffect, useRef, useState} from 'react';
import './BulletinBoard.css';
import {Post} from "../type/post";
import {useParams} from "react-router";
import {Page} from "../type/page";
import Title from "../title/Title";
import {usePostDispatch, usePostState} from "../context/PostContext";
import {usePageNavigation} from "../hooks/usePageMove";

function BulletinBoard() {
	const [selectedPost, setSelectedPost] = useState<Post| null>(null)
	const showEdit = useRef<boolean>(false);
	const state = usePostState();
	const postList = state.data
	const dispatch = usePostDispatch();
	const param:any = useParams();
	const {navigateTo} = usePageNavigation();

	useEffect(() => {
		if(param.page === Page.detail){
			const findPost = postList.find((post:any ) => {//userID 가 포함됨
				return post.id === Number(param.postId);
			})
			setSelectedPost(findPost as Post)
		} else if(param.page === Page.create) {
			showEdit.current = true;
		}
	},[])

	const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSelectedPost({...selectedPost,[e.target.name]:e.target.value} as Post)
	}

	const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const newPost = {id:Number(postList.length+1), title, body}
		dispatch({type:'ADD_POST', payload: newPost})
		showEdit.current = false;
		navigateTo(Page.detail, newPost.id)
	}

	const handleEdit = () => {
		dispatch({type:'UPDATE_POST', payload: selectedPost as Post});
		showEdit.current = false;
		navigateTo(Page.detail, param.postId)
	}

	const handleUpdate = () => {
		showEdit.current = true;
		navigateTo(Page.update,param.postId);
	}

	const handleDelete = () => {
		dispatch({type:'DELETE_POST', payload: selectedPost as Post});
		navigateTo(Page.list);
	}

	return (
		<div className="write-bulletin">
			<Title page={param.page} />
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name={'title'}
					placeholder="Enter title"
					value={selectedPost?.title}
					onChange={handleChange}
					readOnly={!showEdit}
				/>
				<textarea
					name={'body'}
					placeholder="Enter body"
					value={selectedPost?.body}
					onChange={handleChange}
					readOnly={!showEdit}
				/>
				{param.page === Page.detail && (<button onClick={()=>{handleDelete()}}>삭제</button>)}{/*list 이동, 데이터 삭제*/}
				{param.page === Page.create && (<button type="submit">완료</button>)}{/*detail 이동, pageList 데이터 추가*/}
				{param.page === Page.detail && (<button onClick={()=>{handleUpdate()}}>수정하기</button>)}{/*update 이동 */}
				{param.page === Page.update && (<button onClick={() => {handleEdit()}}>수정완료</button>)}{/*detail 이동, pageList 데이터 수정*/}
				{param.page === Page.detail && (<button onClick={() => {navigateTo(Page.list)}}>리스트로 이동</button>)}
			</form>
		</div>
	);
}

export default BulletinBoard