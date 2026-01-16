import type React from "react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";
import { Axios } from "../../../../config/Axios";

interface ReqPost {
    title: string;
    description: string;
    image?: File;
}

interface ResPost {
    id: number;
    title: string;
    description: string;
    image?: string;
    createdAt: string;
}

interface Props {
    posts: ResPost[];
}

export const Posts: React.FC<Props> = ({ posts }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const { register, handleSubmit, reset } = useForm<ReqPost>();

    useEffect(() => {
        Modal.setAppElement("#root");
    }, []);

    const uploadPost = (form: ReqPost) => {
        const formData = new FormData();

        formData.append("title", form.title);
        formData.append("description", form.description);
        if (form.image) formData.append("image", form.image);

        Axios.post("/posts", formData)
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        reset();
        setIsOpen(false);
    };

    return (
        <div className="posts">
            <div className="posts__addBtn">
                <button onClick={() => setIsOpen(true)}>Add Post</button>
            </div>

            <Modal
                className={"posts__modal"}
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                style={{
                    overlay: {
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                    },
                }}
            >
                <button onClick={() => setIsOpen(false)}>Close</button>
                <div>
                    <form onSubmit={handleSubmit(uploadPost)}>
                        <div>
                            <label>Title</label>
                            <input {...register("title")} required />
                        </div>
                        <div>
                            <label>Description</label>
                            <input {...register("description")} required />
                        </div>
                        <div>
                            <label>Image</label>
                            <input type="file" {...register("image")} />
                        </div>
                        <div>
                            <button type="submit">Add Post</button>
                        </div>
                    </form>
                </div>
            </Modal>

            <div className="posts__list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="post__title">{post.title}</div>
                            <div className="post__description">{post.description}</div>
                            {post.image && (
                                <img
                                    src={post.image}
                                    alt="Post Image"
                                    className="post__image"
                                />
                            )}
                            <div className="post__createdAt">
                                {new Date(post.createdAt).toLocaleString()}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="posts__empty">There are no posts</p>
                )}
            </div>
        </div>
    );
};
