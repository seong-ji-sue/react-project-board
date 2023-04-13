import React, {useCallback, useState} from 'react';
import './NoticeBoard.css'
import {Post} from "../type/post";
import Pagination from "./Pagination";
import PostList from "./PostList";
import {Page} from "../type/page";
import {usePostState} from "../context/PostContext";
import {usePageNavigation} from "../hooks/usePageMove";
import Title from "../title/Title";

/**
 * 게시판 전체
 * @constructor
 */

const _postPerPage: number = 5;

export default function NoticeBoard() {
	const state = usePostState();
	const postList = state.data
	const {navigateTo} = usePageNavigation();
	const [currentPage, setCurrentPage] = useState<number>(1);

	const indexOfLastPostNum = _postPerPage * currentPage;
	const indexOfFirstPostNum = indexOfLastPostNum - _postPerPage;
	const currentPosts: Post[] = postList.slice(indexOfFirstPostNum, indexOfLastPostNum);

	const paginate = useCallback((pageNumber:number):void => {setCurrentPage(pageNumber)},[])

	return (
		<div className={'bulletin-board'}>
			<Title page={Page.list} />
			<p>총 게시물 갯수 : {postList.length}</p>
			<button className={'write-post'} onClick={()=>{navigateTo(Page.create)}}>글 작성</button>
			<PostList posts={currentPosts} />
			<Pagination
				paginate={paginate}
				totalPosts={postList.length}
				postPerPage={_postPerPage}
				currentPage={currentPage}
			/>
		</div>
	);
}



