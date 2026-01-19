import { Axios } from "../config/Axios";

interface LikeResponse {
	message: string;
	isLiked: boolean;
}

export const likeService = {
	toggleLike: async (postId: number) => {
		return Axios.post<LikeResponse>(`/posts/${postId}/likes`);
	},
};
