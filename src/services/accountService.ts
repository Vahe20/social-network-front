import { Axios } from "../config/Axios";
import type { 
    IAccount,
    IAvatarResponse,
    IUpdatePasswordRequest,
    IUpdatePrivacyRequest,
    IUpdateBioRequest
} from "../types/utility";

interface UpdateAccountResponse {
    user: IAccount;
}

export const accountService = {
    // Получить данные текущего пользователя
    getCurrentUser: async () => {
        return Axios.get<{ user: IAccount }>("/account");
    },

    // Загрузить аватар
    uploadAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("profile-pic", file);

        return Axios.patch<IAvatarResponse>("/account/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    // Удалить аватар
    deleteAvatar: async () => {
        return Axios.delete("/account/avatar");
    },

    // Обновить пароль
    updatePassword: async (data: IUpdatePasswordRequest) => {
        return Axios.patch("/account/password", data);
    },

    // Обновить приватность аккаунта
    updatePrivacy: async (data: IUpdatePrivacyRequest) => {
        return Axios.patch<UpdateAccountResponse>("/account/privacy", data);
    },

    // Обновить био
    updateBio: async (data: IUpdateBioRequest) => {
        return Axios.patch<UpdateAccountResponse>("/account/bio", data);
    },

    // Обновить профиль (имя, фамилия, username)
    updateProfile: async (data: {
        firstName?: string;
        lastName?: string;
        username?: string;
    }) => {
        return Axios.patch<UpdateAccountResponse>("/account/profile", data);
    },

    // Удалить аккаунт
    deleteAccount: async () => {
        return Axios.delete("/account");
    },
};
