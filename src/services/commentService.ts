import { Axios } from "../config/Axios";

export const commentService = {
	getAllComments: (postId: number) => {
		return Axios.get(`/posts/${postId}/comments`);
	},

	addComment: (postId: number) => {
		return Axios.post(`/posts/${postId}/comments`);
	},

	deleteComment: (postId: number, commentId: number) => {
		return Axios.delete(`/posts/${postId}/comments/${commentId}`);
	},

	getReactionsComment: (postId: number, commentId: number) => {
		return Axios.get(`/posts/${postId}/comments/${commentId}/reactions`);
	},

	reactToComment: (postId: number, commentId: number) => {
		return Axios.post(`/posts/${postId}/comments/${commentId}/reactions`);
	},
};
