import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from './components/Header';
import { Form } from './components/Form';
import type { SubmitHandler } from "react-hook-form";
import { authService } from "../../../services";
import type { ISignupRequest } from "../../../types/utility";
import { AxiosError } from "axios";

interface ApiErrorResponse {
    message?: string;
}

export const Signup = () => {
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegister: SubmitHandler<ISignupRequest> = async (form) => {
        setError("");
        setIsLoading(true);

        try {
            await authService.signup(form);
            navigate("/");
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            setError(error.response?.data?.message || "Failed to sign up");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="regLog">
            <Header error={error} />
            <Form handleRegister={handleRegister} isLoading={isLoading} />
        </div>
    );
};
