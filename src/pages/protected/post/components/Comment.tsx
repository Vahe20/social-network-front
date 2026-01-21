import { useEffect, useState } from "react";
import { commentService } from "../../../../services";
import type { IAccount, IPostComments, IPostInfo } from "../../../../types/utility";
import { ProfileImage } from "../../helpers/Image";

interface props {
    post: IPostInfo;
    user: IAccount;
}

export const Comment: React.FC<props> = ({ user, post }) => {
    const [commentsList, setComments] = useState<IPostComments[]>([]);

    useEffect(() => {
        if (!post) return;

        const fetch = async () => {
            try {
                const comments = (await commentService.getAllComments(post.id)).data.comments;
                setComments(comments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };
        fetch();
    }, [post]);

    const deleteComment = (commentId: number) => {
        commentService.deleteComment(post.id, commentId);
        setComments(prev => prev.filter(value => value.id !== commentId))
    }

    return (
        <div className="post-comments__list">
            {commentsList.map((comment) => {
                return (
                    <div className="post-comments__item" key={comment.id}>
                        <div className='post-comments__item-header'>
                            <ProfileImage src={comment.user.avatar} />
                            <div>
                                <p>{comment.user.firstName} {comment.user.lastName}</p>
                                <p>@{comment.user.username}</p>
                            </div>
                            {user.id === comment.user.id && <button onClick={() => deleteComment(comment.id)}>delete</button>}
                        </div>
                        <p>{comment.text}</p>
                    </div>
                );
            })}
        </div>
    );
};
