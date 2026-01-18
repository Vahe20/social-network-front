import { memo } from "react";
import type { IPost } from "../../../../../types/utility"

interface props {
    posts: IPost[];
    currentUserId: number;
    handleDeletePost: (id: number) => void;
}

const PostsList: React.FC<props> = ({ posts, currentUserId, handleDeletePost }) => {
    return (
        <div className="posts__list">
            {posts.length > 0 ? (
                posts.map((post, index) => (
                    <div className="post" key={post.id} style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="post__header">
                            <div className="post__title">{post.title}</div>
                            {post.authorId === currentUserId && (
                                <button
                                    className="post__delete"
                                    onClick={() => handleDeletePost(post.id)}
                                    title="Delete post"
                                >
                                    🗑️
                                </button>
                            )}
                        </div>
                        <div className="post__body">
                            {post.postImage && (
                                <img
                                    src={`http://localhost:4002/${post.postImage}`}
                                    alt={post.title}
                                    className="post__image"
                                    loading="lazy"
                                />
                            )}
                            <div className="post__description">{post.description}</div>
                        </div>
                        <div className="post__createdAt">
                            📅 {new Date(post.createdAt).toLocaleString()}
                        </div>
                    </div>
                ))
            ) : (
                <p className="posts__empty">
                    📝 No posts yet. Create your first post!
                </p>
            )}
        </div>
    )
}

export default memo(PostsList);
