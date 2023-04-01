import React, {useEffect, useState} from 'react';
import './BulletinBoard.css';
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
// import {useParams} from "react-router";
import {Post} from "../type/Post";
import {Bulletin} from "../type/bulletin";


interface BulletinBoardProps {
	postList: Post[],
	clickPostId:number,
	addPostList:(bulletin:Bulletin) => void
}


function BulletinBoard({postList, clickPostId,addPostList}:BulletinBoardProps) {
	const [bulletin, setBulletin] = useState<Bulletin| null>(null)
	const [showEdit, setShowEdit] = useState(false);


	// 랜더링이 자주 일어남
	// const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
	// 	const name = e.target.name
	// 	const value = e.target.value
	// 	setBulletin({...bulletin, [name]:value })
	// }

	const handleSubmit = (e:React.ChangeEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const title = formData.get('title') as string
		const body = formData.get('body') as string
		const newBulletin = {id:postList.length+1, title, body}
		setBulletin(newBulletin)
		addPostList(newBulletin)
	}



	return (
		<div className="write-bulletin">
			<h1>Write Bulletin</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					name={'title'}
					placeholder="Enter title"
				/>
				<textarea
					name={'body'}
					placeholder="Enter body"
				/>
				<button type="submit">완료</button>
				{showEdit && (<button>수정</button>)}
				{showEdit && (<button>삭제</button>)}
			</form>
		</div>
	);
}

export default BulletinBoard