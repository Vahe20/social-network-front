import { ProfileImage } from "../../helpers/Image";
import type { IAccount } from "../../../../types/utility";

interface Props {
    user: IAccount;
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
                    <span className="button-icon">⏳</span>
                    <span>Pending</span>
                </button>
            );
        }

        if (isFollowing) {
            return (
                <button
                    className="user-profile__button user-profile__button--unfollow"
                    onClick={onUnfollow}
                >
                    <span className="button-icon">✓</span>
                    <span>Following</span>
                </button>
            );
        }

        return (
            <button
                className="user-profile__button user-profile__button--follow"
                onClick={onFollow}
            >
                {user.isAccountPrivate ? (
                    <>
                        <span className="button-icon">🔒</span>
                        <span>Request to Follow</span>
                    </>
                ) : (
                    <>
                        <span className="button-icon">+</span>
                        <span>Follow</span>
                    </>
                )}
            </button>
        );
    };

    return (
        <div className="user-profile__card">
            <div className="user-profile__cover">
                <div className="user-profile__cover-gradient"></div>
            </div>

            <div className="user-profile__content">
                <div className="user-profile__main">
                    <div className="user-profile__avatar-wrapper">
                        <div className="user-profile__avatar">
                            <ProfileImage src={user.avatar} />
                        </div>
                        {user.isAccountPrivate && (
                            <div className="user-profile__privacy-badge">
                                <span>🔒</span>
                            </div>
                        )}
                    </div>

                    <div className="user-profile__info">
                        <div className="user-profile__header-content">
                            <h1 className="user-profile__username">
                                @{user.username}
                                {isCurrentUser && (
                                    <span className="user-profile__badge">You</span>
                                )}
                            </h1>
                            <p className="user-profile__fullname">
                                {user.firstName} {user.lastName}
                            </p>
                        </div>

                        {!isCurrentUser && (
                            <div className="user-profile__actions">
                                {getActionButton()}
                            </div>
                        )}
                    </div>
                </div>

                {user.bio && (
                    <div className="user-profile__bio">
                        <div className="user-profile__bio-icon">📝</div>
                        <p>{user.bio}</p>
                    </div>
                )}

                <div className="user-profile__stats">
                    <div className="user-profile__stat">
                        <div className="user-profile__stat-value">{user.posts.length}</div>
                        <div className="user-profile__stat-label">Posts</div>
                    </div>
                    <div className="user-profile__stat-divider"></div>
                    <div className="user-profile__stat">
                        <div className="user-profile__stat-value">{user.followers.length}</div>
                        <div className="user-profile__stat-label">Followers</div>
                    </div>
                    <div className="user-profile__stat-divider"></div>
                    <div className="user-profile__stat">
                        <div className="user-profile__stat-value">{user.followings.length}</div>
                        <div className="user-profile__stat-label">Following</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
