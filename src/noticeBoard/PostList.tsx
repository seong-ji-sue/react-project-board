import React from 'react';
import {Post} from "../type/Post";
import {useHistory} from "react-router";
// import {useHistory} from "react-router";



/**
 * 게시글 목록 만들기
 * @param posts 게시글 데이터
 * @constructor
 */
interface PostListProps {
	posts: Post[]
}

export default function PostList({posts}: PostListProps) {
	const history  = useHistory();

	const pageMoveBulletin = (postId:number):void => {
		history.push(`/post/${postId}`)
		console.log('asd')
	}

	return (
		<div className="post-list">
			{posts.map((post) => {
				return(
					<div className="post" key={'post'+post.id}>
						<h2 onClick={() => {pageMoveBulletin(post.id)}}>{post.title}</h2>
					</div>
				)
			})}
		</div>
	)
}