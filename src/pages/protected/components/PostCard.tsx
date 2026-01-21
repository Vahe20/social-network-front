import { useNavigate } from 'react-router-dom';
import { Image, ProfileImage } from '../helpers/Image';
import type { IPost } from '../../../types/utility';

interface Props {
    post: IPost;
    currentUserId: number;
    onDelete?: (id: number) => void;
    showAuthor?: boolean;
}

export const PostCard: React.FC<Props> = ({
    post,
    currentUserId,
    onDelete,
    showAuthor = true
}) => {
    const navigate = useNavigate();
    const isOwner = post.authorId === currentUserId;

    const handleCardClick = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest('button')) {
            return;
        }
        navigate(`/account/post/${post.id}`);
    };

    return (
        <article
            className="post-card"
            onClick={handleCardClick}
        >
            {post.postImage && (
                <div className="post-card__image-container">
                    <Image src={post.postImage} className="post-card__image" />
                </div>
            )}

            <div className="post-card__content">
                {showAuthor && post.author && (
                    <div className="post-card__author">
                        <div className="post-card__author-avatar">
                            <ProfileImage src={post.author.avatar} />
                        </div>
                        <div className="post-card__author-info">
                            <span className="post-card__author-name">
                                {post.author.firstName} {post.author.lastName}
                            </span>
                            <span className="post-card__author-username">
                                @{post.author.username}
                            </span>
                        </div>
                    </div>
                )}

                <h3 className="post-card__title">{post.title}</h3>
                <p className="post-card__description">{post.description}</p>

                <div className="post-card__footer">
                    <div className="post-card__meta">
                        <span className="post-card__date">
                            {new Date(post.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    <div className="post-card__actions">
                        {isOwner && onDelete && (
                            <button
                                className="post-card__delete-btn"
                                onClick={() => onDelete(post.id)}
                                aria-label="Delete post"
                            >
                                🗑️
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </article>
    );
};
