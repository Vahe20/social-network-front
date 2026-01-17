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
    uploadAvatar: async (file: File) => {
        const formData = new FormData();
        formData.append("profile-pic", file);

        return Axios.patch<IAvatarResponse>("/account/avatar", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    },

    deleteAvatar: async () => {
        return Axios.delete("/account/avatar");
    },

    updatePassword: async (data: IUpdatePasswordRequest) => {
        return Axios.patch("/account/password", data);
    },

    updatePrivacy: async (data: IUpdatePrivacyRequest) => {
        return Axios.patch<UpdateAccountResponse>("/account/privacy", data);
    },

    updateBio: async (data: IUpdateBioRequest) => {
        return Axios.patch<UpdateAccountResponse>("/account/bio", data);
    }
};
