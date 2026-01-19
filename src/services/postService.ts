import { Axios } from "../config/Axios";
import type { ICreatePostRequest, IPost, IPostInfo } from "../types/utility";

interface CreatePostResponse {
	post: IPost;
}

interface GetPostsResponse {
	posts: IPost[];
}

interface GetPostResponse {
	postInfo: IPostInfo;
}

export const postService = {
	createPost: async (data: ICreatePostRequest) => {
		const formData = new FormData();
		formData.append("title", data.title);
		formData.append("description", data.description);
		if (data.image) {
			formData.append("image", data.image);
		}

		return Axios.post<CreatePostResponse>("/posts", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		});
	},

	getPosts: async () => {
		return Axios.get<GetPostsResponse>("/posts");
	},

	getPostById: async (postId: number) => {
		return Axios.get<GetPostResponse>(`/posts/${postId}`);
	},

	deletePost: async (postId: number) => {
		return Axios.delete(`/posts/${postId}`);
	},
};
