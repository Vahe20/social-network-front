import { useOutletContext } from "react-router-dom"
import type { IContext } from "../../../types/utility";
import { Profile, Posts } from "./components";
import { Axios } from "../../../config/Axios";

export const Home = () => {
    const { user, setAccount } = useOutletContext<IContext>();

    const changeAvatar = (file: File) => {
        if (!file) return;

        const formData = new FormData();
        formData.append('profile-pic', file);

        Axios.patch('/account/avatar', formData).then(response => {
            setAccount(prev => prev ? {
                ...prev,
                avatar: response.data.picture
            } : null)
        }).catch(error => {
            console.error('Error uploading avatar:', error);
        });
    }

    return (
        <div className="home">
            <Profile
                user={user}
                changeAvatar={changeAvatar}
            />
            <Posts
                posts={user.posts}
            />
        </div>
    )
}