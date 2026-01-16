import { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import type { IAccount, IContext } from "../../../types/utility";
import { Axios } from "../../../config/Axios";
import { SearchBar } from "./components/SearchBar";
import { UserCard } from "./components/UserCard";
import { Tabs } from "./components/Tabs";
import { AxiosError } from "axios";


interface ApiErrorResponse {
    message?: string;
}

export const Subscriptions = () => {
    const { user } = useOutletContext<IContext>();

    const [activeTab, setActiveTab] = useState<'search' | 'following' | 'followers'>('search');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<IAccount[]>([]);
    const [following, setFollowing] = useState<IAccount[]>([]);
    const [followers, setFollowers] = useState<IAccount[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        loadFollowing();
        loadFollowers();
    }, [activeTab]);

    const loadFollowing = async () => {
        try {
            setFollowing(user.followings);
        } catch (err) {
            console.error('Error loading following:', err);
        }
    };

    const loadFollowers = async () => {
        try {
            setFollowers(user.followers);
        } catch (err) {
            console.error('Error loading followers:', err);
        }
    };

    const handleSearch = async (query: string) => {
        setSearchQuery(query);

        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const response = await Axios.get<{ users: IAccount[] }>(`/account/search/${query}`);
            setSearchResults(response.data.users);
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to search users');
            setSearchResults([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFollow = async (userId: number) => {
        try {
            await Axios.post(`/follow/${userId}`);

            setSearchResults(prev =>
                prev.map(u => u.id === userId ? { ...u, isFollowing: true } : u)
            );

            loadFollowing();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to follow user');
        }
    };

    const handleUnfollow = async (userId: number) => {
        if (!confirm('Are you sure you want to unfollow this user?')) return;

        try {
            await Axios.delete(`/follow/${userId}`);

            setSearchResults(prev =>
                prev.map(u => u.id === userId ? { ...u, isFollowing: false } : u)
            );
            setFollowing(prev => prev.filter(u => u.id !== userId));

            loadFollowing();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to unfollow user');
        }
    };

    const getCurrentList = () => {
        switch (activeTab) {
            case 'search':
                return searchResults;
            case 'following':
                return following;
            case 'followers':
                return followers;
            default:
                return [];
        }
    };

    const getEmptyMessage = () => {
        switch (activeTab) {
            case 'search':
                return searchQuery
                    ? 'No users found. Try a different search term.'
                    : 'Search for users by their username to connect with them.';
            case 'following':
                return "You're not following anyone yet. Search for users to follow!";
            case 'followers':
                return "No one is following you yet. Share your profile to get followers!";
            default:
                return '';
        }
    };

    return (
        <div className="subscriptions">
            <div className="subscriptions__container">
                <div className="subscriptions__header">
                    <h1 className="subscriptions__title">Connections</h1>
                    <p className="subscriptions__description">
                        Discover and connect with people on the platform
                    </p>
                </div>

                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}

                <SearchBar
                    onSearch={handleSearch}
                    isLoading={isLoading}
                />

                <Tabs
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                    counts={{
                        following: following.length,
                        followers: followers.length
                    }}
                />

                <div className="subscriptions__content">
                    {isLoading && activeTab === 'search' ? (
                        <div className="subscriptions__loading">
                            <div className="subscriptions__spinner"></div>
                            <p>Searching...</p>
                        </div>
                    ) : getCurrentList().length > 0 ? (
                        <div className="subscriptions__grid">
                            {getCurrentList().map(userItem => (
                                <UserCard
                                    key={userItem.id}
                                    user={userItem}
                                    currentUserId={user.id}
                                    onFollow={handleFollow}
                                    onUnfollow={handleUnfollow}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="subscriptions__empty">
                            <div className="subscriptions__empty-icon">
                                {activeTab === 'search' ? '🔍' :
                                    activeTab === 'following' ? '👥' :
                                        activeTab === 'followers' ? '👋' : '🤝'}
                            </div>
                            <h3 className="subscriptions__empty-title">
                                {activeTab === 'search' && !searchQuery ? 'Start Searching' :
                                    activeTab === 'search' ? 'No Results' :
                                        activeTab === 'following' ? 'No Following' :
                                            activeTab === 'followers' ? 'No Followers' : 'No Friends'}
                            </h3>
                            <p className="subscriptions__empty-text">
                                {getEmptyMessage()}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
