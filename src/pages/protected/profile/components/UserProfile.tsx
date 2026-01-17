import { Image } from "../../helpers/Image";
import type { IUserSafe } from "../../../../types/utility";

interface Props {
    user: IUserSafe;
    currentUserId: number;
    isFollowing: boolean;
    isPending: boolean;
    onFollow: () => void;
    onUnfollow: () => void;
}

export const UserProfile: React.FC<Props> = ({
    user,
    currentUserId,
    isFollowing,
    isPending,
    onFollow,
    onUnfollow
}) => {
    const isCurrentUser = user.id === currentUserId;

    const getActionButton = () => {
        if (isCurrentUser) {
            return null;
        }

        if (isPending) {
            return (
                <button
                    className="user-profile__button user-profile__button--pending"
                    onClick={onUnfollow}
                >
                    ⏳ Pending
                </button>
            );
        }

        if (isFollowing) {
            return (
                <button
                    className="user-profile__button user-profile__button--unfollow"
                    onClick={onUnfollow}
                >
                    ✓ Following
                </button>
            );
        }

        return (
            <button
                className="user-profile__button user-profile__button--follow"
                onClick={onFollow}
            >
                {user.isAccountPrivate ? '🔒 Request to Follow' : '+ Follow'}
            </button>
        );
    };

    return (
        <div className="user-profile__card">
            <div className="user-profile__header">
                <div className="user-profile__avatar">
                    <Image src={user.avatar} />
                </div>
                <div className="user-profile__info">
                    <h1 className="user-profile__username">
                        {user.username}
                        {isCurrentUser && <span className="user-profile__badge"> (You)</span>}
                    </h1>
                    <p className="user-profile__name">
                        {user.firstName} {user.lastName}
                    </p>
                    {user.isAccountPrivate && (
                        <span className="user-profile__privacy">
                            🔒 Private Account
                        </span>
                    )}
                </div>
                <div className="user-profile__actions">
                    {getActionButton()}
                </div>
            </div>

            {user.bio && (
                <div className="user-profile__bio">
                    <h3>Bio</h3>
                    <p>{user.bio}</p>
                </div>
            )}
        </div>
    );
};
