import React from 'react';
import {Post} from "../type/post";
import {Page} from "../type/page";


/**
 * 게시글 목록 만들기
 * @param posts 게시글 데이터
 * @constructor
 */
interface PostListProps {
	posts: Post[],
	pageMove:(page:Page,postId:number)=>void
}

export default function PostList({posts,pageMove}: PostListProps) {

	return (
		<div className="post-list">
			{posts.map((post) => {
				return(
					<div className="post" key={'post'+post.id}>
						<h2 onClick={() => {pageMove(Page.detail, post.id)}}>{post.title}</h2>
					</div>
				)
			})}
		</div>
	)
}