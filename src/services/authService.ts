import { Axios } from "../config/Axios";
import type {
	ISignupRequest,
	ISigninRequest,
	IAuthResponse,
} from "../types/utility";

export const authService = {
	signup: async (data: ISignupRequest) => {
		return Axios.post<IAuthResponse>("/auth/signup", data);
	},

	signin: async (data: ISigninRequest) => {
		return Axios.post<IAuthResponse>("/auth/signin", data);
	},

	refresh: () => {
		
	},

	logout: () => {},
};
