import { Axios } from "../config/Axios";
import type { 
    ISignupRequest, 
    ISigninRequest, 
    IAuthResponse 
} from "../types/utility";

export const authService = {
    // Регистрация
    signup: async (data: ISignupRequest) => {
        return Axios.post<IAuthResponse>("/auth/signup", data);
    },

    // Вход
    signin: async (data: ISigninRequest) => {
        return Axios.post<IAuthResponse>("/auth/signin", data);
    },

    // Выход
    signout: () => {
        localStorage.removeItem("token");
        window.location.href = "/signin";
    },

    // Проверка токена
    verifyToken: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            throw new Error("No token found");
        }
        return Axios.get("/auth/verify");
    },

    // Сохранить токен
    setToken: (token: string) => {
        localStorage.setItem("token", token);
    },

    // Получить токен
    getToken: () => {
        return localStorage.getItem("token");
    },

    // Удалить токен
    removeToken: () => {
        localStorage.removeItem("token");
    },
};
