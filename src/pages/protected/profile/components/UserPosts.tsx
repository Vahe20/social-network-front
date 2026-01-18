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
                    <div className="user-posts__private-illustration">
                        <div className="lock-icon">
                            <svg width="80" height="80" viewBox="0 0 24 24" fill="none">
                                <path d="M19 11H5C3.89543 11 3 11.8954 3 13V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V13C21 11.8954 20.1046 11 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M7 11V7C7 5.67392 7.52678 4.40215 8.46447 3.46447C9.40215 2.52678 10.6739 2 12 2C13.3261 2 14.5979 2.52678 15.5355 3.46447C16.4732 4.40215 17 5.67392 17 7V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>
                    <h3>This Account is Private</h3>
                    <p>Follow this account to see their posts and photos</p>
                </div>
            </div>
        );
    }

    if (posts.length === 0) {
        return (
            <div className="user-posts">
                <div className="user-posts__empty">
                    <div className="user-posts__empty-illustration">
                        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
                            <path d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8.5 10C9.32843 10 10 9.32843 10 8.5C10 7.67157 9.32843 7 8.5 7C7.67157 7 7 7.67157 7 8.5C7 9.32843 7.67157 10 8.5 10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M21 15L16 10L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </div>
                    <h3>No Posts Yet</h3>
                    <p>{isCurrentUser ? "You haven't" : "This user hasn't"} shared anything yet</p>
                </div>
            </div>
        );
    }

    return (
        <div className="user-posts">
            <div className="user-posts__header">
                <h2 className="user-posts__title">
                    <span className="title-icon">📸</span>
                    Posts
                    <span className="title-count">{posts.length}</span>
                </h2>
            </div>
            
            <div className="user-posts__grid">
                {posts.map(post => (
                    <div key={post.id} className="user-post-card">
                        {post.postImage && (
                            <div className="user-post-card__image">
                                <img src={post.postImage} alt={post.title} />
                                <div className="user-post-card__overlay">
                                    <div className="overlay-stats">
                                        <span className="stat-item">
                                            <span className="stat-icon">❤️</span>
                                            {post.likesCount || 0}
                                        </span>
                                    </div>
                                </div>
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
                                <span className="meta-item">
                                    <span className="meta-icon">📅</span>
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { 
                                        month: 'short', 
                                        day: 'numeric',
                                        year: 'numeric'
                                    })}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
