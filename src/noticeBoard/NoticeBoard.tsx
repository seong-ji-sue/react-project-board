import React, {useEffect, useState} from 'react';
import './NoticeBoard.css'
import {Post} from "../type/Post";
import PostList from "./PostList";
import Pagination from "./Pagination";


const _postPerPage: number = 5;//1페이지에 게시물 몇개?

/**
 * 게시판 전체
 * @constructor
 */
export default function NoticeBoard() {
	const [postList, setPostList] = useState<Post[]>([]) //게시글 데이터
	const [currentPage, setCurrentPage] = useState<number>(1);

	//게시글의 첫번째 index와 마지막 index를 구하고 현재 페이지에 맞는 게시글 5개
	const indexOfLastPostNum = _postPerPage * currentPage;
	const indexOfFirstPostNum = indexOfLastPostNum - _postPerPage;
	const currentPosts: Post[] = postList.slice(indexOfFirstPostNum, indexOfLastPostNum);

	useEffect(() =>{
		fetch('https://jsonplaceholder.typicode.com/posts/')
			.then((res) => res.json())
			.then((data) => setPostList(data))
	},[])

	//버튼 클릭시 페이지 번호를 담기 위함
	const paginate = (pageNumber:number):void => {setCurrentPage(pageNumber)}

	return (
		<div className={'bulletin-board'}>
			<h1>Wiki Board</h1>
			<p>총 게시물 갯수 : {postList.length}</p>
			<PostList posts={currentPosts}/>
			<Pagination
				paginate={paginate}
				totalPosts={postList.length}
				postPerPage={_postPerPage}
				currentPage={currentPage}
			/>
		</div>
	);
}



