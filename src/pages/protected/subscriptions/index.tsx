import { useState, useEffect, useCallback } from "react";
import { useOutletContext } from "react-router-dom";
import type { IContext, IUserSafe } from "../../../types/utility";
import { useDebounce } from "../../../hooks";
import { SearchBar } from "./components/SearchBar";
import { UserCard } from "./components/UserCard";
import { Tabs } from "./components/Tabs";
import { AxiosError } from "axios";
import { userService } from "../../../services";

interface ApiErrorResponse {
    message?: string;
}

export const Subscriptions = () => {
    const { user, refetch } = useOutletContext<IContext>();

    const [activeTab, setActiveTab] = useState<'search' | 'following' | 'followers'>('search');
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<IUserSafe[]>([]);
    const [following, setFollowing] = useState<IUserSafe[]>([]);
    const [followers, setFollowers] = useState<IUserSafe[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [error, setError] = useState("");
    const [, setActionLoading] = useState<number | null>(null);

    const debouncedSearchQuery = useDebounce(searchQuery, 500);

    useEffect(() => {
        if (debouncedSearchQuery.trim()) {
            performSearch(debouncedSearchQuery);
        } else {
            setSearchResults([]);
        }
    }, [debouncedSearchQuery]);

    const loadFollowing = useCallback(() => {
        const followingUsers = user.followings
            .filter(f => f.receiver && f.approved)
            .map(f => f.receiver);
        setFollowing(followingUsers);
    }, [user.followings]);

    const loadFollowers = useCallback(() => {
        const followerUsers = user.followers
            .filter(f => f.sender && f.approved)
            .map(f => f.sender);
        setFollowers(followerUsers);
    }, [user.followers]);

    useEffect(() => {
        loadFollowing();
        loadFollowers();
    }, [loadFollowing, loadFollowers]);

    const performSearch = async (query: string) => {
        setIsSearching(true);
        setError("");

        try {
            const response = await userService.searchUsers(query);
            setSearchResults(response.data.users);
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to search users');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    const handleFollow = async (userId: number) => {
        setActionLoading(userId);
        setError("");

        try {
            await userService.followUser(userId);
            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to follow user');
        } finally {
            setActionLoading(null);
        }
    };

    const handleUnfollow = async (userId: number) => {
        const userToUnfollow = getCurrentList().find(u => u.id === userId);
        const isPending = user.followings.find(
            f => f.receiver?.id === userId && !f.approved
        );

        const confirmMessage = isPending
            ? 'Cancel follow request?'
            : `Are you sure you want to unfollow ${userToUnfollow?.username}?`;

        if (!confirm(confirmMessage)) return;

        setActionLoading(userId);
        setError("");

        try {
            await userService.unfollowUser(userId);
            await refetch();
        } catch (err) {
            const axiosError = err as AxiosError<ApiErrorResponse>;
            setError(axiosError.response?.data?.message || 'Failed to unfollow user');
        } finally {
            setActionLoading(null);
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

    const getFollowStatus = (userId: number) => {
        const followingRelation = user.followings.find(f => f.receiver?.id === userId);
        return {
            isFollowing: followingRelation?.approved || false,
            isPending: followingRelation ? !followingRelation.approved : false
        };
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
                    <div className="subscriptions__error">
                        ⚠️ {error}
                    </div>
                )}

                <SearchBar
                    onSearch={handleSearch}
                    isLoading={isSearching}
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
                    {isSearching && activeTab === 'search' ? (
                        <div className="subscriptions__loading">
                            <div className="subscriptions__spinner"></div>
                            <p>Searching...</p>
                        </div>
                    ) : getCurrentList().length > 0 ? (
                        <div className="subscriptions__grid">
                            {getCurrentList().map(userItem => {
                                const { isFollowing, isPending } = getFollowStatus(userItem.id);

                                return (
                                    <UserCard
                                        key={userItem.id}
                                        user={userItem}
                                        currentUserId={user.id}
                                        isFollowing={isFollowing}
                                        isPending={isPending}
                                        onFollow={handleFollow}
                                        onUnfollow={handleUnfollow}
                                    />
                                );
                            })}
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
