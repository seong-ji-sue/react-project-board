import React, {useCallback, useEffect, useState} from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Post} from "./type/post";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import BulletinBoard from "./writing/BulletinBoard";
import {PostProvider} from "./context/PostContext";

function App() {
	const [postList, setPostList] = useState<Post[]>([]) //게시글 데이터
	//데이터 불러오는거 여기서 하는거 맞는지 체크
	useEffect(() =>{
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => res.json())
			.then((data) => setPostList(data))
	},[])

	const addPostList = (post:Post) => {
		setPostList([...postList,post])
	}

	const editPostList = (editPost:Post) => {
		setPostList(
			postList.map((post) =>
				post.id === editPost.id ? editPost : post
			)
		)
	}

	return (
		<PostProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path={'/'} render={()=><NoticeBoard postList={postList} />}/>
					<Route path={'/:page/:postId'} render={()=><BulletinBoard
						postList={postList}
						addPostList={addPostList}
						editPostList={editPostList}
					/>} />
				</Switch>
			</BrowserRouter>
		</PostProvider>
  );
}

export default App;
