import { memo } from "react";
import type { IPost } from "../../../../../types/utility"
import { PostCard } from "../../../components/PostCard";

interface props {
    posts: IPost[];
    currentUserId: number;
    handleDeletePost: (id: number) => void;
    handleLikePost?: (id: number) => void;
}

const PostsList: React.FC<props> = ({ posts, currentUserId, handleDeletePost }) => {
    return (
        <div className="posts__grid">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <PostCard
                        key={post.id}
                        post={post}
                        currentUserId={currentUserId}
                        onDelete={handleDeletePost}
                        showAuthor={true}
                    />
                ))
            ) : (
                <div className="posts__empty">
                    <div className="posts__empty-icon">📝</div>
                    <h3>No posts yet</h3>
                    <p>Create your first post to get started!</p>
                </div>
            )}
        </div>
    )
}

export default memo(PostsList);
