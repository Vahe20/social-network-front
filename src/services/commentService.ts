import { Axios } from "../config/Axios";
import type { IPostComments } from "../types/utility";

interface getCommentsResponse {
	comments: IPostComments[];
}

export const commentService = {
	getAllComments: async (postId: number) => {
		return Axios.get<getCommentsResponse>(`/posts/${postId}/comments`);
	},

	addComment: async (postId: number, text: string) => {
		return Axios.post(`/posts/${postId}/comments`, { text });
	},

	deleteComment: async (postId: number, commentId: number) => {
		return Axios.delete(`/posts/${postId}/comments/${commentId}`);
	},

	getReactionsComment: async (postId: number, commentId: number) => {
		return Axios.get(`/posts/${postId}/comments/${commentId}/reactions`);
	},

	reactToComment: async (postId: number, commentId: number) => {
		return Axios.post(`/posts/${postId}/comments/${commentId}/reactions`);
	},
};
