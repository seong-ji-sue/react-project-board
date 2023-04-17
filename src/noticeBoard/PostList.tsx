import React from 'react';
import {Post} from "../type/post";
import {Page} from "../type/page";
import {usePageNavigation} from "../hooks/usePageMove";


/**
 * 게시글 목록 만들기
 * @param posts 게시글 데이터
 * @constructor
 */
interface PostListProps {
	posts: Post[],
}

export default function PostList({posts}: PostListProps) {
	const {navigateTo} = usePageNavigation();

	return (
		<div className="post-list">
			{posts.map((post) => {
				return(
					<div className="post" key={'post'+post.id}>
						<h2 onClick={() => {navigateTo(Page.detail, post.id)}}>{post.title}</h2>
					</div>
				)
			})}
		</div>
	)
}