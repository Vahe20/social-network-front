import { Link } from "react-router-dom";
import { Image } from "../../helpers/Image";
import type { IUserSafe } from "../../../../types/utility";

interface Props {
    user: IUserSafe;
    currentUserId: number;
    isFollowing?: boolean;
    onFollow: (userId: number) => void;
    onUnfollow: (userId: number) => void;
}

export const UserCard: React.FC<Props> = ({ user, currentUserId, isFollowing = false, onFollow, onUnfollow }) => {
    const isCurrentUser = user.id === currentUserId;
    const displayName = user.username || 'User';

    const getBadge = () => {
        if (isCurrentUser) return null;
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
            </div>

            <div className="user-card__actions">
                {getActionButton()}
                {!isCurrentUser && (
                    <Link
                        to={`/account/profile/${user.id}`}
                        className="user-card__button user-card__button--view"
                    >
                        View Profile
                    </Link>
                )}
            </div>
        </div>
    );
};
