import { Axios } from "../config/Axios";

interface LikeResponse {
	message: string;
	isLiked: boolean;
}

export const likeService = {
	toggleLike: (postId: number) => {
		return Axios.post<LikeResponse>(`/posts/${postId}/likes`);
	},
};
