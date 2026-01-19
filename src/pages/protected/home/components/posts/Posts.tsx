import type React from "react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { postService, likeService } from "../../../../../services";
import type { IPost } from "../../../../../types/utility";
import PostsList from './PostsList';

interface Props {
    posts: IPost[];
    currentUserId: number;
    refetch: () => Promise<void>;
}

interface ApiError {
    response?: {
        data?: {
            message?: string;
        };
    };
    message?: string;
}

interface PostFormData {
    title: string;
    description: string;
    image?: FileList;
}

export const Posts: React.FC<Props> = ({ posts, currentUserId, refetch }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, reset } = useForm<PostFormData>();

    Modal.setAppElement("#root");

    const uploadPost = useCallback(async (form: PostFormData) => {
        setIsLoading(true);

        try {
            const imageFile = form.image && form.image.length > 0 ? form.image[0] : undefined;

            await postService.createPost({
                title: form.title,
                description: form.description,
                image: imageFile
            });

            refetch();

            reset();
            setIsOpen(false);
        } catch (error) {
            const err = error as ApiError;
            console.error('Error creating post:', err);
            alert(err.response?.data?.message || err.message || 'Failed to create post');
        } finally {
            setIsLoading(false);
        }
    }, [refetch, reset])

    const handleDeletePost = useCallback(async (postId: number) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            await postService.deletePost(postId);
            refetch()
        } catch (error) {
            const err = error as ApiError;
            console.error('Error deleting post:', err);
            alert(err.response?.data?.message || err.message || 'Failed to delete post');
        }
    }, [refetch])

    const handleLikePost = useCallback(async (postId: number) => {
        try {
            await likeService.toggleLike(postId);
            refetch()
        } catch (error) {
            const err = error as ApiError;
            console.error('Error liking post:', err);
            alert(err.response?.data?.message || err.message || 'Failed to like post');
        }
    }, [refetch])

    return (
        <div className="posts">
            <div className="posts__addBtn">
                <button onClick={() => setIsOpen(true)}>
                    ✨ Add Post
                </button>
            </div>

            <Modal
                className={"posts__modal"}
                overlayClassName={"posts__modal-overlay"}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                closeTimeoutMS={200}
            >
                <button className="posts__modal-close" onClick={() => setIsOpen(false)}>
                    ✕ Close
                </button>
                <div>
                    <h2 style={{
                        color: 'var(--text-color)',
                        marginBottom: '1.5rem',
                        fontSize: '1.5rem',
                        fontWeight: 700
                    }}>
                        Create New Post
                    </h2>
                    <form onSubmit={handleSubmit(uploadPost)}>
                        <div>
                            <label>Title</label>
                            <input
                                {...register("title")}
                                required
                                placeholder="Enter post title..."
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label>Description</label>
                            <input
                                {...register("description")}
                                required
                                placeholder="What's on your mind?"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <label>Image</label>
                            <input
                                type="file"
                                {...register("image")}
                                accept="image/*"
                                disabled={isLoading}
                            />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading}>
                                {isLoading ? '🔄 Publishing...' : '🚀 Publish Post'}
                            </button>
                        </div>
                    </form>
                </div>
            </Modal>

            <PostsList
                posts={posts}
                currentUserId={currentUserId}
                handleDeletePost={handleDeletePost}
                handleLikePost={handleLikePost}
            />

        </div>
    );
};


