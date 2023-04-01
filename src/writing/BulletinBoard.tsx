import React, {useEffect, useState} from 'react';
import './BulletinBoard.css';
// import {useParams} from "react-router";
import {Post} from "../type/Post";
import {useHistory, useParams} from "react-router";


interface BulletinBoardProps {
	postList: Post[],
	addPostList:(post:Post) => void
	editPostList:(editPost:Post)=>void
}


function BulletinBoard({postList,addPostList,editPostList}:BulletinBoardProps) {

	const [selectedPost, setSelectedPost] = useState<Post| null>(null)
	const param:any = useParams();
	const history = useHistory()

	useEffect(() => {
		if(param.postId !=='write'){
			const findPost = postList.find((post) => {
				return post.id === Number(param.postId);
			})
			setSelectedPost(findPost as Post)
		}
	},[])

	const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setSelectedPost({...selectedPost,[e.target.name]:e.target.value} as Post)

	}

	const handleAdd = (e:React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const newPost = {id:postList.length+1, title, body}
		addPostList(newPost)
		history.push('/')
	}

	const handleEdit = (editPost:Post) => {
		editPostList(editPost);
	}

	// const replaceLink = () => {
	// 	const example = 'qui est esse'
	// 	const regex = new RegExp(`\\b${example}\\b`, 'gi');
	// 	const newText = selectedPost?.body.replace(regex, `<a href="#">${example}</a>`);
	// 	console.log(newText)
	// }

	return (
		<div className="write-bulletin">
			<h1>Write Bulletin Board</h1>
			<form onSubmit={handleAdd}>
				<input
					type="text"
					name={'title'}
					placeholder="Enter title"
					value={selectedPost?.title}
					onChange={handleChange}
				/>
				<textarea
					name={'body'}
					placeholder="Enter body"
					value={selectedPost?.body}
					onChange={handleChange}
				/>
				{param.postId==='write'?
					(<button type="submit">완료</button>):
					(<button onClick={() => {handleEdit(selectedPost as Post)}}>수정</button>)
				}
			</form>
		</div>
	);
}

export default BulletinBoard