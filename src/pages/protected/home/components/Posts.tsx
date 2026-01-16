
import type React from "react"

interface Post {
    text: string;
    createdAt: number;
}

interface Props {
    posts: Post[];
}

function formatDate(timestamp: number) {
    const date = new Date(timestamp);
    return date.toLocaleString();
}

export const Posts: React.FC<Props> = ({ posts }) => {
    return (
        <div className="posts">
            {posts && posts.length > 0 ? (
                posts.map((val: Post) => (
                    <div className="post" key={val.createdAt}>
                        <div className="post__text">{val.text}</div>
                        <div className="post__date">{formatDate(val.createdAt)}</div>
                    </div>
                ))
            ) : (
                <p className="posts__empty">There are no posts</p>
            )}
        </div>
    )
}