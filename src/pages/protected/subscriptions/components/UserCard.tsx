import { Link } from "react-router-dom";
import { Image } from "../../helpers/Image";
import type { IUserSafe } from "../../../../types/utility";

interface Props {
    user: IUserSafe;
    currentUserId: number;
    isFollowing?: boolean;
    isPending?: boolean;
    onFollow: (userId: number) => void;
    onUnfollow: (userId: number) => void;
}

export const UserCard: React.FC<Props> = ({ 
    user, 
    currentUserId, 
    isFollowing = false, 
    isPending = false,
    onFollow, 
    onUnfollow 
}) => {
    const isCurrentUser = user.id === currentUserId;
    const displayName = user.username || 'User';

    const getActionButton = () => {
        if (isCurrentUser) {
            return (
                <Link to="/account/settings" className="user-card__button user-card__button--view">
                    ⚙️ Settings
                </Link>
            );
        }

        if (isPending) {
            return (
                <button
                    className="user-card__button user-card__button--pending"
                    onClick={() => onUnfollow(user.id)}
                >
                    ⏳ Pending
                </button>
            );
        }

        if (isFollowing) {
            return (
                <button
                    className="user-card__button user-card__button--unfollow"
                    onClick={() => onUnfollow(user.id)}
                >
                    ✓ Following
                </button>
            );
        }

        if (user.isAccountPrivate) {
            return (
                <button
                    className="user-card__button user-card__button--follow"
                    onClick={() => onFollow(user.id)}
                >
                    🔒 Request
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
            </div>

            <div className="user-card__actions">
                {getActionButton()}
                {!isCurrentUser && (
                    <Link
                        to={`/account/profile/${user.username}`}
                        className="user-card__button user-card__button--view"
                    >
                        View Profile
                    </Link>
                )}
            </div>
        </div>
    );
};
