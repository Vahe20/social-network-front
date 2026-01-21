import { useEffect, useState } from 'react';
import { useParams, useNavigate, useOutletContext } from 'react-router-dom';
import { postService, likeService, commentService } from '../../../services';
import type { IContext, IPostInfo } from '../../../types/utility';
import { Image, ProfileImage } from '../helpers/Image';
import { Comment } from './components/Comment';

export const Post = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { user } = useOutletContext<IContext>();
    const [post, setPost] = useState<IPostInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentText, setCommentText] = useState('');
    const [submittingComment, setSubmittingComment] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            if (!id) return;

            try {
                setLoading(true);
                const postData = (await postService.getPostById(Number(id))).data.postInfo;
                postData.isLiked = postData.postReactions.some(u => u.userId === user.id);
                postData.likesCount = postData.postReactions.length;
                setPost(postData);
            } catch {
                setError('Failed to load post');
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [id, user.id]);

    const handleBack = () => {
        navigate(-1);
    };

    const handleLike = () => {
        if (!post) return;

        try {
            likeService.toggleLike(post.id);
            setPost(prev => prev ? {
                ...prev,
                isLiked: !prev.isLiked,
                likesCount: prev.isLiked ? (prev.likesCount || 1) - 1 : (prev.likesCount || 0) + 1
            } : null);
        } catch (err) {
            console.error('Error liking post:', err);
        }
    };

    const handleDelete = () => {
        if (!post || !confirm('Are you sure you want to delete this post?')) return;

        try {
            postService.deletePost(post.id);
            navigate('/account/home');
        } catch (err) {
            console.error('Error deleting post:', err);
            alert('Failed to delete post');
        }
    };

    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!commentText.trim() || !post) return;

        try {
            setSubmittingComment(true);
            await commentService.addComment(post.id, commentText);

            // Refresh post data to get new comments
            const updatedPost = (await postService.getPostById(post.id)).data.postInfo;
            updatedPost.isLiked = updatedPost.postReactions.some(u => u.userId === user.id);
            updatedPost.likesCount = updatedPost.postReactions.length;
            setPost(updatedPost);

            setCommentText('');
        } catch (err) {
            console.error('Error adding comment:', err);
            alert('Failed to add comment');
        } finally {
            setSubmittingComment(false);
        }
    };

    if (loading) {
        return (
            <div className="post-page">
                <div className="post-page__loading">
                    <div className="spinner"></div>
                    <p>Loading post...</p>
                </div>
            </div>
        );
    }

    if (error || !post) {
        return (
            <div className="post-page">
                <div className="post-page__error">
                    <h2>😕 Post Not Found</h2>
                    <p>{error || 'This post may have been deleted'}</p>
                    <button onClick={handleBack} className="btn-primary">
                        ← Go Back
                    </button>
                </div>
            </div>
        );
    }

    const isOwner = post.authorId === user?.id;

    return (
        <div className="post-page">
            <div className="post-page__header">
                <button onClick={handleBack} className="post-page__back-btn">
                    ← Back
                </button>
            </div>

            <div className="post-page__container">
                <article className="post-detail">
                    {post.postImage && (
                        <div className="post-detail__image-container">
                            <Image src={post.postImage} className="post-detail__image" />
                        </div>
                    )}

                    <div className="post-detail__content">
                        {post.author && (
                            <div className="post-detail__author">
                                <div className="post-detail__author-avatar">
                                    <ProfileImage src={post.author.avatar} />
                                </div>
                                <div className="post-detail__author-info">
                                    <span className="post-detail__author-name">
                                        {post.author.firstName} {post.author.lastName}
                                    </span>
                                    <span className="post-detail__author-username">
                                        @{post.author.username}
                                    </span>
                                </div>
                                <div className="post-detail__date">
                                    📅 {new Date(post.createdAt).toLocaleDateString('en-US', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </div>
                            </div>
                        )}

                        <h1 className="post-detail__title">{post.title}</h1>
                        <p className="post-detail__description">{post.description}</p>

                        <div className="post-detail__footer">
                            <div className="post-detail__stats">
                                <button
                                    className={`post-detail__like-btn ${post.isLiked ? 'active' : ''}`}
                                    onClick={handleLike}
                                >
                                    {post.isLiked ? '❤️' : '🤍'}
                                    <span>{post.likesCount || 0} {post.likesCount === 1 ? 'like' : 'likes'}</span>
                                </button>
                            </div>

                            {isOwner && (
                                <button
                                    className="post-detail__delete-btn"
                                    onClick={handleDelete}
                                >
                                    🗑️ Delete Post
                                </button>
                            )}
                        </div>
                    </div>
                </article>

                <aside className="post-comments">
                    <h2>💬 Comments ({post.postComments?.length || 0})</h2>

                    <form className='post-comments__addCommentsForm' onSubmit={handleCommentSubmit}>
                        <div>
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                disabled={submittingComment}
                            />
                        </div>
                        <div>
                            <button
                                type="submit"
                                disabled={!commentText.trim() || submittingComment}
                            >
                                {submittingComment ? 'Sending...' : 'Send Comment'}
                            </button>
                        </div>
                    </form>

                    {post.postComments && post.postComments.length > 0 ? (
                        <Comment
                            user={user}
                            post={post}
                        />
                    ) : (
                        <div className="post-comments__empty">
                            No comments yet. Be the first to comment! 💭
                        </div>
                    )}
                </aside>
            </div>
        </div>
    );
};
