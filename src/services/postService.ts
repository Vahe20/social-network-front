import { Axios } from "../config/Axios";
import type { 
    ICreatePostRequest, 
    IPost,
    IComment 
} from "../types/utility";

interface CreatePostResponse {
    post: IPost;
}

interface GetPostsResponse {
    posts: IPost[];
}

interface GetPostResponse {
    post: IPost;
}

interface CreateCommentRequest {
    text: string;
}

interface CreateCommentResponse {
    comment: IComment;
}

interface GetCommentsResponse {
    comments: IComment[];
}

export const postService = {
    // Создать новый пост
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

    // Получить все посты
    getPosts: async () => {
        return Axios.get<GetPostsResponse>("/posts");
    },

    // Получить пост по ID
    getPostById: async (postId: number) => {
        return Axios.get<GetPostResponse>(`/posts/${postId}`);
    },

    // Обновить пост
    updatePost: async (postId: number, data: Partial<ICreatePostRequest>) => {
        const formData = new FormData();
        if (data.title) formData.append("title", data.title);
        if (data.description) formData.append("description", data.description);
        if (data.image) formData.append("image", data.image);

        return Axios.patch<CreatePostResponse>(`/posts/${postId}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // Удалить пост
    deletePost: async (postId: number) => {
        return Axios.delete(`/posts/${postId}`);
    },

    // Лайкнуть/дизлайкнуть пост
    toggleLike: async (postId: number) => {
        return Axios.post(`/posts/${postId}/like`);
    },

    // Получить комментарии к посту
    getComments: async (postId: number) => {
        return Axios.get<GetCommentsResponse>(`/posts/${postId}/comments`);
    },

    // Создать комментарий
    createComment: async (postId: number, data: CreateCommentRequest) => {
        return Axios.post<CreateCommentResponse>(`/posts/${postId}/comments`, data);
    },

    // Удалить комментарий
    deleteComment: async (postId: number, commentId: number) => {
        return Axios.delete(`/posts/${postId}/comments/${commentId}`);
    },
};
