import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../../types/utility";
import { Axios } from "../../../config/Axios";
import { Header } from './components/Header';
import { Form } from './components/Form';
import type { SubmitHandler } from "react-hook-form";

export const Signup = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleRegister: SubmitHandler<IUser> = (form) => {
        Axios
            .post('/auth/signup', form)
            .then(() => {
                navigate("/")
            })
            .catch(err => {
                setError(err.response.data?.message)
            })
    }

    return (
        <div className="regLog">
            <Header error={error} />
            <Form handleRegister={handleRegister} />
        </div>
    )
}