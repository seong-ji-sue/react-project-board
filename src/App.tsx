import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, RouterProps, Switch} from "react-router-dom";
import {Post} from "./type/Post";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import BulletinBoard from "./writing/BulletinBoard";
import {Bulletin} from "./type/bulletin";

interface NoticeBoardProps {
	postList: Post[]
}


function App() {
	const [postList, setPostList] = useState<Post[]>([]) //게시글 데이터
	const [clickPostId, setClickPostId] = useState<number>(0);

	useEffect(() =>{
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => res.json())
			.then((data) => setPostList(data))
	},[])

	const changePostId = (postId:number) => {setClickPostId(postId)}
	const addPostList = (bulletin:Bulletin) => {setPostList([...postList,bulletin])}

return (
		<div>
			<NoticeBoard postList={postList} changePostId={changePostId} />
			<BulletinBoard postList={postList} clickPostId={clickPostId} addPostList={addPostList} />
		</div>
			//component 타입 오류
		// <BrowserRouter>
		// 	<Switch>
		// 		<Route path={'/'} component={componentProps}/>
		// 		<Route path={'/post/:postId'} component={()=><BulletinBoard postList={postList}/>} />
		// 	</Switch>
		//
		// </BrowserRouter>
  );
}

export default App;
