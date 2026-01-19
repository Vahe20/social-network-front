import { Link } from "react-router-dom";
import { ProfileImage } from "../../helpers/Image";
import type { IFollowers } from "../../../../types/utility";

interface Props {
    request: IFollowers;
    onAccept: (requestId: number) => void;
    onReject: (requestId: number) => void;
}

export const RequestCard: React.FC<Props> = ({ request, onAccept, onReject }) => {
    const user = request.sender;

    if (!user) return null;

    const timeAgo = (date: string) => {
        const now = new Date();
        const requestDate = new Date(date);
        const diffMs = now.getTime() - requestDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffDays > 0) return `${diffDays}d ago`;
        if (diffHours > 0) return `${diffHours}h ago`;
        if (diffMins > 0) return `${diffMins}m ago`;
        return 'Just now';
    };

    return (
        <div className="request-card">
            <Link to={`/account/profile/${user.id}`} className="request-card__link">
                <div className="request-card__avatar">
                    <ProfileImage src={user.avatar} />
                </div>
            </Link>

            <div className="request-card__info">
                <Link to={`/account/profile/${user.id}`} className="request-card__name">
                    {user.username}
                </Link>
                <p className="request-card__fullname">
                    {user.firstName} {user.lastName}
                </p>
                <span className="request-card__time">
                    {timeAgo(request.createdAt)}
                </span>
            </div>

            <div className="request-card__actions">
                <button
                    className="request-card__button request-card__button--accept"
                    onClick={() => onAccept(request.id)}
                >
                    ✓ Accept
                </button>
                <button
                    className="request-card__button request-card__button--reject"
                    onClick={() => onReject(request.id)}
                >
                    ✕ Decline
                </button>
            </div>
        </div>
    );
};
