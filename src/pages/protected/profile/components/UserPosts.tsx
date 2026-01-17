import type { IPost } from "../../../../types/utility";

interface Props {
    posts: IPost[];
    isPrivate: boolean;
    isFollowing: boolean;
    isCurrentUser: boolean;
}

export const UserPosts: React.FC<Props> = ({ posts, isPrivate, isFollowing, isCurrentUser }) => {
    if (isPrivate && !isFollowing && !isCurrentUser) {
        return (
            <div className="user-posts">
                <div className="user-posts__private">
                    <div className="user-posts__private-icon">🔒</div>
                    <h3>This Account is Private</h3>
                    <p>Follow this account to see their posts</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="user-posts">
                <div className="user-posts__empty">
                    <div className="user-posts__empty-icon">📝</div>
                    <h3>No Posts Yet</h3>
                    <p>{isCurrentUser ? "You haven't" : "This user hasn't"} shared anything yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-posts">
            <h2 className="user-posts__title">Posts ({posts.length})</h2>
            <div className="user-posts__grid">
                {posts.map(post => (
                    <div key={post.id} className="user-post-card">
                        {post.postImage && (
                            <div className="user-post-card__image">
                                <img src={post.postImage} alt={post.title} />
                            </div>
                        )}
                        <div className="user-post-card__content">
                            <h3 className="user-post-card__title">{post.title}</h3>
                            <p className="user-post-card__description">
                                {post.description.length > 150 
                                    ? `${post.description.slice(0, 150)}...` 
                                    : post.description}
                            </p>
                            <div className="user-post-card__meta">
                                <span>❤️ {post.likesCount || 0}</span>
                                <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
