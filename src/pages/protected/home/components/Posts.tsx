import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

interface ReqPost {
    title: string;
    discription: string;
    location?: string;
    tags?: string;
    image?: File;
}

interface ResPost {
    id: number;
    text: string;
    createdAt: FormData;
}

interface Props {
    posts: Post[];
}

function formatDate(timestamp: number) {
    return new Date(timestamp).toLocaleString();
}

export const Posts: React.FC<Props> = ({ posts }) => {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [register, submitHandler] = useForm();

    const uploadPost = (form) => {

    }

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
                        backgroundColor: "rgba(0, 0, 0, 0.6)"
                    }
                }}
            >
                <button onClick={() => setIsOpen(false)}>Close</button>
                <div>
                    <form>

                    </form>
                </div>
            </Modal>

            <div className="posts__list">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="post__text">{post.title}</div>
                        </div>
                    ))
                ) : (
                    <p className="posts__empty">There are no posts</p>
                )}
            </div>
        </div>
    );
};
