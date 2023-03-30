import React, {useState} from 'react';


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
	const totalPages = Math.ceil(totalPosts/postPerPage)//페이지 갯수
	const [pageGroup, setPageGroup] = useState(1);//표시할 페이지 그룹

	//전체 페이지 얕은 복사
	const pages = Array.from({length: totalPages}, (_, i) => i+1);

	const startPage = (pageGroup - 1) * 5; //페이지 앞
	const endPage = startPage + 4; //페이지 끝
	const visiblePages = pages.slice(startPage, endPage + 1);//보여지는 페이지

	//버튼을 클릭할 때 보여지는 페이지 그룹과 선택되어지는 페이지 랜더링
	const handlePageClick = (page:number):void => {
		if(page<=0 || page>totalPages) {
			return;
		}
		paginate(page)
		const newPageGroup = Math.ceil(page/5);
		setPageGroup(newPageGroup);
	}

	//이전 버튼 레이아웃 이전 페이지 계산
	const prevButton = () => {
		if(pageGroup ===1){
			return null;
		}
		const prevPage = (pageGroup -1) * 5;
		return (
			<button onClick={() => handlePageClick(prevPage)}>
				{'<'}
			</button>
		)
	}

	//다음페이지 계산
	const nextButton = () => {
		if(pageGroup === Math.ceil(totalPages/5)) {
			return null;
		}
		const nextPage = pageGroup * 5 + 1;
		return (
			<button onClick={() => handlePageClick(nextPage)}>
				{'>'}
			</button>
		)

	}

	//보여지는 페이지 그룹
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