import React from 'react';
import {Post} from "../type/Post";

interface PostListProps {
	posts: Post[]
}

/**
 * 게시글 목록 만들기
 * @param posts 게시글 데이터
 * @constructor
 */

export default function PostList({posts}: PostListProps) {
	return (
		<div className="post-list">
			{posts.map((post) => {
				return(
					<div className="post" key={'post'+post.id}>
						<h2>{post.title}</h2>
						<p>{post.content}</p>
					</div>
				)
			})}
		</div>
	)
}