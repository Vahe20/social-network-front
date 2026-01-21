import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from './components/Header';
import { Form } from './components/Form';
import type { SubmitHandler } from "react-hook-form";
import { authService } from "../../../services";
import type { ISigninRequest } from "../../../types/utility";
import { AxiosError } from "axios";

interface ApiErrorResponse {
    message?: string;
}

export const Login = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin: SubmitHandler<ISigninRequest> = async (form) => {
        setError("");
        setIsLoading(true);

        try {
            const response = await authService.signin(form);
            localStorage.setItem("token", response.data.token);
            navigate("/account/home");
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            setError(error.response?.data?.message || "Failed to sign in");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="regLog">
            <div className="regLog__container">
                <Header error={error} />
                <Form handleLogin={handleLogin} isLoading={isLoading} />
            </div>
        </div>
    );
};
