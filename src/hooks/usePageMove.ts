import {Page} from "../type/page";
import {useHistory} from "react-router";

const pageUrl = (page:Page, postId?:number) =>{
	switch (page) {
		case Page.create:
			return `/${page}/${postId}`;
		case Page.detail:
			return `/${page}/${postId}`;
		case Page.update:
			return `/${page}/${postId}`;
		case Page.list:
			return '/';
	}
}

export function usePageNavigation() {
	const history = useHistory()
	const navigateTo = (page:Page,postId?:number) => {
		history.push(pageUrl(page, postId))
	};
	return {navigateTo}
}