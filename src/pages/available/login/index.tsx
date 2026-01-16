import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { IUser } from "../../../types/utility";
import { Axios } from "../../../config/Axios";
import { Header } from './components/Header';
import { Form } from './components/Form';
import type { SubmitHandler } from "react-hook-form";

export const Login = () => {
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<IUser> = (form) => {
        Axios.post<{ token: string }>("/auth/signin", form)
            .then(response => {
                localStorage.setItem("token", response.data.token)
                navigate("/account/home")
            })
            .catch(err => {
                setError(err.response.data?.message)
            })
    }

    return (
        <div className="regLog">
            <Header error={error} />
            <Form handleLogin={handleLogin} />
        </div>
    )
}