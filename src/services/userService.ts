import { Axios } from "../config/Axios";
import type { IUserSafe, IFollowers, IAccount } from "../types/utility";

interface SearchUsersResponse {
	users: IUserSafe[];
}

interface GetUserResponse {
	user: IAccount;
}

interface FollowRequestsResponse {
	requests: IFollowers[];
}

export const userService = {
	searchUsers: async (query: string) => {
		return Axios.get<SearchUsersResponse>(`/account/search/${query}`);
	},

	getUserById: async (userId: number) => {
		return Axios.get<GetUserResponse>(`/users/${userId}`);
	},

	getUserByUsername: async (username: string) => {
		return Axios.get<GetUserResponse>(`/account/${username}`);
	},

	followUser: async (userId: number) => {
		return Axios.post(`/follow/${userId}`);
	},

	unfollowUser: async (userId: number) => {
		return Axios.post(`/follow/${userId}`);
	},

	getFollowRequests: async () => {
		return Axios.get<FollowRequestsResponse>("/follow/requests");
	},

	acceptFollowRequest: async (requestId: number) => {
		return Axios.patch(`/follow/requests/accept/${requestId}`);
	},

	rejectFollowRequest: async (requestId: number) => {
		return Axios.patch(`/follow/requests/decline/${requestId}`);
	},
};
