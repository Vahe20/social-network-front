import { useForm, type SubmitHandler } from "react-hook-form";
import type { ISigninRequest } from "../../../../types/utility";
import { Link } from "react-router-dom";

interface FormProps {
    handleLogin: SubmitHandler<ISigninRequest>;
    isLoading?: boolean;
}

export const Form: React.FC<FormProps> = ({ handleLogin, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<ISigninRequest>();

    return (
        <form className="regLog__form" onSubmit={handleSubmit(handleLogin)}>
            <div className="regLog__form-item">
                <label>Username</label>
                <input
                    {...register("username", { 
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                        }
                    })}
                    placeholder="Enter your username"
                    disabled={isLoading}
                />
                {errors.username && (
                    <span className="error">{errors.username.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Password</label>
                <input
                    {...register("password", { 
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                        }
                    })}
                    type="password"
                    placeholder="Enter your password"
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="error">{errors.password.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <p>
                    Don't have an account?{' '}
                    <Link to="/register">
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    );
};
