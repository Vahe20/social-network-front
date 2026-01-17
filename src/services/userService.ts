import { Axios } from "../config/Axios";
import type { 
    IUserSafe, 
    IFollowers,
    IFollowing 
} from "../types/utility";

interface SearchUsersResponse {
    users: IUserSafe[];
}

interface GetUserResponse {
    user: IUserSafe;
}

interface FollowersResponse {
    followers: IFollowers[];
}

interface FollowingsResponse {
    followings: IFollowing[];
}

interface FollowRequestsResponse {
    requests: IFollowers[];
}

export const userService = {
    // Поиск пользователей
    searchUsers: async (query: string) => {
        return Axios.get<SearchUsersResponse>(`/users/search?q=${encodeURIComponent(query)}`);
    },

    // Получить пользователя по ID
    getUserById: async (userId: number) => {
        return Axios.get<GetUserResponse>(`/users/${userId}`);
    },

    // Получить пользователя по username
    getUserByUsername: async (username: string) => {
        return Axios.get<GetUserResponse>(`/users/username/${username}`);
    },

    // Подписаться на пользователя
    followUser: async (userId: number) => {
        return Axios.post(`/users/${userId}/follow`);
    },

    // Отписаться от пользователя
    unfollowUser: async (userId: number) => {
        return Axios.delete(`/users/${userId}/follow`);
    },

    // Получить подписчиков
    getFollowers: async (userId?: number) => {
        const url = userId ? `/users/${userId}/followers` : "/users/followers";
        return Axios.get<FollowersResponse>(url);
    },

    // Получить подписки
    getFollowings: async (userId?: number) => {
        const url = userId ? `/users/${userId}/followings` : "/users/followings";
        return Axios.get<FollowingsResponse>(url);
    },

    // Получить запросы на подписку
    getFollowRequests: async () => {
        return Axios.get<FollowRequestsResponse>("/users/follow-requests");
    },

    // Принять запрос на подписку
    acceptFollowRequest: async (requestId: number) => {
        return Axios.post(`/users/follow-requests/${requestId}/accept`);
    },

    // Отклонить запрос на подписку
    rejectFollowRequest: async (requestId: number) => {
        return Axios.delete(`/users/follow-requests/${requestId}`);
    },

    // Удалить подписчика
    removeFollower: async (followerId: number) => {
        return Axios.delete(`/users/followers/${followerId}`);
    },
};
