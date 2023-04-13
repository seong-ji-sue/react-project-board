import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import NoticeBoard from "./noticeBoard/NoticeBoard";
import BulletinBoard from "./writing/BulletinBoard";
import {PostProvider} from "./context/PostContext";

function App() {

	return (
		<PostProvider>
			<BrowserRouter>
				<Switch>
					<Route exact path={'/'} render={()=><NoticeBoard />}/>
					<Route path={'/:page/:postId'} render={()=><BulletinBoard />} />
				</Switch>
			</BrowserRouter>
		</PostProvider>
  );
}

export default App;
