import React, {useEffect, useState} from 'react';
import './NoticeBoard.css'

interface Post {
	id:number,
	title:string
	content:string,
}

const _postPerPage: number = 5;//1페이지에 게시물 몇개?

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

interface PostListProps {
	posts: Post[]
}

function PostList({posts}: PostListProps) {
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


interface PaginationProps {
	paginate:(pageNumber:number) => void
	totalPosts:number
	postPerPage:number
	currentPage:number
}


function Pagination({paginate,totalPosts,postPerPage,currentPage}:PaginationProps){
	const totalPages = Math.ceil(totalPosts/postPerPage)//페이지 갯수
	const [pageGroup, setPageGroup] = useState(1);//표시할 페이지 그룹

	//전체 페이지 얕은 복사
	const pages = Array.from({length: totalPages}, (_, i) => i+1);

	const startPage = (pageGroup - 1) * 5; //페이지 앞
	const endPage = startPage + 4; //페이지 끝
	const visiblePages = pages.slice(startPage, endPage + 1);//보여지는 페이지

	const handlePageClick = (page:number):void => {
		if(page<=0 || page>totalPages) {
			return;
		}
		paginate(page)
		const newPageGroup = Math.ceil(page/5);
		setPageGroup(newPageGroup);
	}


	return(
		<div className="pagination">
			{pageGroup ===1 ||
				(<button
				onClick={() => handlePageClick((pageGroup-1)*5)}>{'<'}</button>)}
			{visiblePages.map((page) => {
				return(
					<button style={currentPage===page?{backgroundColor:'#2222'}:{}} key={page} onClick={()=>paginate(page)}>{page}</button>
				)
			})}
			{pageGroup === Math.ceil(totalPages/5) || (<button
				onClick={() => handlePageClick(pageGroup*5+1)}>{'>'}</button>)}

		</div>
	)
}