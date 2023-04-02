import React, {useCallback, useEffect, useState} from 'react';
import './BulletinBoard.css';
import {Post} from "../type/Post";
import {useHistory, useParams} from "react-router";
import {Page} from "../type/page";
import {pageUrl} from "../util/pageUrl";


interface BulletinBoardProps {
	postList: Post[],
	addPostList:(post:Post) => void
	editPostList:(editPost:Post)=>void
}


function BulletinBoard({postList,addPostList,editPostList}:BulletinBoardProps) {

	const [selectedPost, setSelectedPost] = useState<Post| null>(null)
	const [showEdit, setShowEdit] = useState<boolean>(false)
	const param:any = useParams();
	const history = useHistory();

	useEffect(() => {
		if(param.page === Page.detail){
			console.log('detail')
			console.log(param.postId)
			const findPost = postList.find((post) => {
				return post.id === Number(param.postId);
			})
			setSelectedPost(findPost as Post)
		} else if(param.page === Page.create) {
			setShowEdit(true)
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
		addPostList(newPost)
		setShowEdit(false)
		pageMove(Page.detail, newPost.id)
	}

	const handleEdit = (editPost:Post) => {
		editPostList(editPost);
		setShowEdit(false)
		pageMove(Page.detail, param.postId)
	}

	const pageMove = useCallback((page:Page, postId?:number) => {
		history.push(pageUrl(page, postId))
	},[])

	//링크 삽입구간
	// const replaceLink = () => {
	// 	const example = 'qui est esse'
	// 	const regex = new RegExp(`\\b${example}\\b`, 'gi');
	// 	const newText = selectedPost?.body.replace(regex, `<a href={}>${example}</a>`);
	// 	console.log(newText)
	// }

	return (
		<div className="write-bulletin">
			<h1>Write Bulletin Board</h1>
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
				{param.page === Page.create && (<button type="submit">완료</button>)}{/*detail 이동, pageList 데이터 추가*/}
				{param.page === Page.detail && (<button onClick={()=>{pageMove(Page.update,param.postId); setShowEdit(true);}}>수정하기</button>)}{/*update 이동 */}
				{param.page === Page.update && (<button onClick={() => {handleEdit(selectedPost as Post)}}>수정완료</button>)}{/*detail 이동, pageList 데이터 수정*/}
				{param.page === Page.detail && (<button onClick={() => {pageMove(Page.list)}}>리스트로 이동</button>)}
			</form>
		</div>
	);
}

export default BulletinBoard