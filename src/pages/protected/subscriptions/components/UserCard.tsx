import { Link } from "react-router-dom";
import { Image } from "../../helpers/Image";

interface User {
    id: number;
    login?: string;
    username?: string;
    avatar: string;
    bio?: string;
    isFollowing?: boolean;
    isFollower?: boolean;
    isFriend?: boolean;
    followersCount?: number;
}

interface Props {
    user: User;
    currentUserId: number;
    onFollow: (userId: number) => void;
    onUnfollow: (userId: number) => void;
}

export const UserCard: React.FC<Props> = ({ user, currentUserId, onFollow, onUnfollow }) => {
    const isCurrentUser = user.id === currentUserId;
    const displayName = user.username || user.login || 'User';

    const getBadge = () => {
        if (isCurrentUser) return null;
        if (user.isFriend) return <span className="user-card__badge user-card__badge--friend">🤝 Friend</span>;
        if (user.isFollowing && user.isFollower) return <span className="user-card__badge user-card__badge--mutual">↔️ Mutual</span>;
        if (user.isFollower) return <span className="user-card__badge user-card__badge--follower">👋 Follows you</span>;
        return null;
    };

    const getActionButton = () => {
        if (isCurrentUser) {
            return (
                <Link to="/account/settings" className="user-card__button user-card__button--view">
                    ⚙️ Settings
                </Link>
            );
        }

        if (user.isFollowing) {
            return (
                <button
                    className="user-card__button user-card__button--unfollow"
                    onClick={() => onUnfollow(user.id)}
                >
                    ✓ Following
                </button>
            );
        }

        return (
            <button
                className="user-card__button user-card__button--follow"
                onClick={() => onFollow(user.id)}
            >
                + Follow
            </button>
        );
    };

    return (
        <div className="user-card">
            <Link to={`/account/profile/${user.id}`} className="user-card__link">
                <div className="user-card__avatar">
                    <Image src={user.avatar} />
                    {getBadge()}
                </div>
            </Link>

            <div className="user-card__info">
                <Link to={`/account/profile/${user.id}`} className="user-card__name">
                    {displayName}
                    {isCurrentUser && <span className="user-card__you"> (You)</span>}
                </Link>

                {user.bio && (
                    <p className="user-card__bio">
                        {user.bio.length > 80 ? `${user.bio.slice(0, 80)}...` : user.bio}
                    </p>
                )}

                {user.followersCount !== undefined && (
                    <p className="user-card__stats">
                        <span className="user-card__stat">
                            👥 {user.followersCount} {user.followersCount === 1 ? 'follower' : 'followers'}
                        </span>
                    </p>
                )}
            </div>

            <div className="user-card__actions">
                {getActionButton()}
                <Link
                    to={`/account/profile/${user.id}`}
                    className="user-card__button user-card__button--view"
                >
                    View Profile
                </Link>
            </div>
        </div>
    );
};
