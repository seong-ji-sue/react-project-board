import {Page} from "../type/page";

export const pageUrl = (page:Page, postId?:number) =>{
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