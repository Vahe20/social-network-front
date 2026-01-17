import { useState, useEffect } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import type { IContext, IUserSafe, IPost } from "../../../types/utility";
import { userService } from "../../../services";
import { AxiosError } from "axios";
import { UserProfile, UserPosts } from "./components";

interface UserProfileData {
    user: IUserSafe;
    posts: IPost[];
}

interface ApiErrorResponse {
    message?: string;
}

export const Profile = () => {
    const { userId } = useParams<{ userId: string }>();
    const navigate = useNavigate();
    const { user: currentUser, refetch } = useOutletContext<IContext>();

    const [profileData, setProfileData] = useState<UserProfileData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isFollowing, setIsFollowing] = useState(false);
    const [isPending, setIsPending] = useState(false);

    useEffect(() => {
        if (!userId) {
            navigate("/account/home");
            return;
        }

        loadUserProfile();
    }, [userId, currentUser]);

    const loadUserProfile = async () => {
        if (!userId) return;

        setLoading(true);
        setError("");

        try {
            const response = await userService.getUserById(Number(userId));
            const userData = response.data.user;

            // Проверяем статус подписки
            const following = currentUser.followings.find(
                f => f.receiver?.id === userData.id
            );

            setIsFollowing(following?.approved || false);
            setIsPending(following ? !following.approved : false);

            // Если это приватный аккаунт и мы не подписаны, не показываем посты
            if (userData.isAccountPrivate && !following?.approved && userData.id !== currentUser.id) {
                setProfileData({
                    user: userData,
                    posts: []
                });
            } else {
                setProfileData({
                    user: userData,
                    posts: [] // Здесь должны быть посты пользователя из API
                });
            }
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to load user profile');
        } finally {
            setLoading(false);
        }
    };

    const handleFollow = async () => {
        if (!profileData) return;

        try {
            await userService.followUser(profileData.user.id);
            
            if (profileData.user.isAccountPrivate) {
                setIsPending(true);
            } else {
                setIsFollowing(true);
            }

            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to follow user');
        }
    };

    const handleUnfollow = async () => {
        if (!profileData) return;

        const confirmMessage = isPending 
            ? 'Cancel follow request?' 
            : 'Are you sure you want to unfollow this user?';

        if (!confirm(confirmMessage)) return;

        try {
            await userService.unfollowUser(profileData.user.id);
            setIsFollowing(false);
            setIsPending(false);
            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to unfollow user');
        }
    };

    if (loading) {
        return (
            <div className="user-profile-page">
                <div className="user-profile-page__loading">
                    <div className="user-profile-page__spinner"></div>
                    <p>Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !profileData) {
        return (
            <div className="user-profile-page">
                <div className="user-profile-page__error">
                    <h2>⚠️ Error</h2>
                    <p>{error || 'User not found'}</p>
                    <button onClick={() => navigate("/account/subscriptions")}>
                        ← Back to Connections
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="user-profile-page">
            <div className="user-profile-page__container">
                <UserProfile
                    user={profileData.user}
                    currentUserId={currentUser.id}
                    isFollowing={isFollowing}
                    isPending={isPending}
                    onFollow={handleFollow}
                    onUnfollow={handleUnfollow}
                />

                <UserPosts
                    posts={profileData.posts}
                    isPrivate={profileData.user.isAccountPrivate}
                    isFollowing={isFollowing}
                    isCurrentUser={profileData.user.id === currentUser.id}
                />
            </div>
        </div>
    );
};
