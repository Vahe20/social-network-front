import { useOutletContext } from "react-router-dom"
import type { IContext } from "../../../types/utility";
import { Profile, Posts } from "./components";

export const Home = () => {
    const {user, refetch} = useOutletContext<IContext>();

    return (
        <div className="home">
            <Profile
                user={user}
                refetch={refetch}
            />
            <Posts
                posts={user.posts}
                currentUserId={user.id}
                refetch={refetch}
            />
        </div>
    );
};
