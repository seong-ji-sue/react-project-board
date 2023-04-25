import {Page} from "../type/page";
import {useHistory} from "react-router";

const pageUrl = (page:Page, postId?:number) =>{
	switch (page) {
		case Page.list:
			return '/';
		default:
			return `/${page}/${postId}`;
	}
}

export function usePageNavigation() {
	const history = useHistory()
	const navigateTo = (page:Page,postId?:number) => {
		history.push(pageUrl(page, postId))
	};
	return {navigateTo}
}