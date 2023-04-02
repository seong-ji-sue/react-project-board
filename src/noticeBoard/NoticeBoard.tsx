import React, {useCallback, useState} from 'react';
import './NoticeBoard.css'
import {Post} from "../type/Post";
import Pagination from "./Pagination";
import PostList from "./PostList";
import {useHistory} from "react-router";
import {Page} from "../type/page";

/**
 * 게시판 전체
 * @constructor
 */

interface NoticeBoardProps {
	postList: Post[],
}

const _postPerPage: number = 5;//1페이지에 게시물 몇개?

export default function NoticeBoard({postList}:NoticeBoardProps) {
	const history  = useHistory();
	const [currentPage, setCurrentPage] = useState<number>(1);

	//게시글의 첫번째 index와 마지막 index를 구하고 현재 페이지에 맞는 게시글 5개
	const indexOfLastPostNum = _postPerPage * currentPage;
	const indexOfFirstPostNum = indexOfLastPostNum - _postPerPage;
	const currentPosts: Post[] = postList.slice(indexOfFirstPostNum, indexOfLastPostNum);

	//버튼 클릭시 페이지 번호를 담기 위함
	const paginate = useCallback((pageNumber:number):void => {setCurrentPage(pageNumber)},[])
	//페이지 이동
	const pageMove = useCallback((page:Page, postId?:number) => {
		const pageUrl = page ===Page.list ? '/' : `/${page}/${postId}`;
		history.push(pageUrl)
	},[])

	return (
		<div className={'bulletin-board'}>
			<h1>Wiki Board</h1>
			<p>총 게시물 갯수 : {postList.length}</p>
			<button className={'write-post'} onClick={()=>{pageMove(Page.create)}}>글 작성</button>
			<PostList posts={currentPosts} pageMove={pageMove} />
			<Pagination
				paginate={paginate}
				totalPosts={postList.length}
				postPerPage={_postPerPage}
				currentPage={currentPage}
			/>
		</div>
	);
}



