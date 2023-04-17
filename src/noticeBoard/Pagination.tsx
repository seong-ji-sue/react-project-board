import React, {useRef} from 'react';


interface PaginationProps {
	paginate:(pageNumber:number) => void
	totalPosts:number
	postPerPage:number
	currentPage:number
}

/**
 * 페이지 네이션 만들기
 * @param paginate 클릭한 페이지 바꾸는 함수
 * @param totalPosts 총 게시글 수
 * @param postPerPage 5(표시해야될 페이지 수)
 * @param currentPage 현재 페이지
 * @constructor
 */

export default function Pagination({paginate,totalPosts,postPerPage,currentPage}:PaginationProps){
	const totalPages = Math.ceil(totalPosts/postPerPage)
	const pageGroup = useRef<number>(1)

	const pages = Array.from({length: totalPages}, (_, i) => i+1);

	const startPage = (pageGroup.current - 1) * 5;
	const endPage = startPage + 4;
	const visiblePages = pages.slice(startPage, endPage + 1);
	console.log('Pagination')

	const handlePageClick = (page:number):void => {
		if(page<=0 || page>totalPages) {
			return;
		}
		const newPageGroup = Math.ceil(page/5);
		paginate(page)
		pageGroup.current = newPageGroup
	}

	const prevButton = () => {
		if(pageGroup.current ===1){
			return null;
		}
		const prevPage = (pageGroup.current -1) * 5;
		return (
			<button onClick={() => handlePageClick(prevPage)}>
				{'<'}
			</button>
		)
	}

	const nextButton = () => {
		if(pageGroup.current === Math.ceil(totalPages/5)) {
			return null;
		}
		const nextPage = pageGroup.current * 5 + 1;
		return (
			<button onClick={() => handlePageClick(nextPage)}>
				{'>'}
			</button>
		)

	}

	const pagesNumber = () => {
		return visiblePages.map((page) => {
			const buttonColorRender = currentPage===page ? {backgroundColor:'#2222'} : {};
			return(
				<button
					style={buttonColorRender} key={page}
					onClick={()=>paginate(page)}>
					{page}
				</button>
			)
		})
	}

	return(
		<div className="pagination">
			{prevButton()}
			{pagesNumber()}
			{nextButton()}
		</div>
	)
}