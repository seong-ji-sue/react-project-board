import React, {useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Post} from "./type/Post";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import BulletinBoard from "./writing/BulletinBoard";



function App() {
	const [postList, setPostList] = useState<Post[]>([]) //게시글 데이터

	useEffect(() =>{
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => res.json())
			.then((data) => setPostList(data))
	},[])

	const addPostList = (post:Post) => {setPostList([...postList,post])}

return (
		<BrowserRouter>
			<Switch>
				<Route exact path={'/'} render={()=><NoticeBoard postList={postList} />}/>
				<Route path={'/post/:postId'} render={()=><BulletinBoard postList={postList} addPostList={addPostList} />} />
			</Switch>
		</BrowserRouter>
  );
}

export default App;
