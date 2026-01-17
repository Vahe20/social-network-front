import { useForm, type SubmitHandler } from "react-hook-form";
import type { ISignupRequest } from "../../../../types/utility";
import { Link } from "react-router-dom";

interface FormProps {
    handleRegister: SubmitHandler<ISignupRequest>;
    isLoading?: boolean;
}

export const Form: React.FC<FormProps> = ({ handleRegister, isLoading }) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<ISignupRequest & { confirmPassword: string }>();

    const password = watch("password");

    const onSubmit: SubmitHandler<ISignupRequest & { confirmPassword: string }> = (data) => {
        const { confirmPassword, ...signupData } = data;
        handleRegister(signupData);
    };

    return (
        <form className="regLog__form" onSubmit={handleSubmit(onSubmit)}>
            <div className="regLog__form-item">
                <label>First Name</label>
                <input
                    {...register("firstName", { 
                        required: "First name is required",
                        minLength: {
                            value: 2,
                            message: "First name must be at least 2 characters"
                        }
                    })}
                    placeholder="Enter your first name"
                    disabled={isLoading}
                />
                {errors.firstName && (
                    <span className="error">{errors.firstName.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Last Name</label>
                <input
                    {...register("lastName", { 
                        required: "Last name is required",
                        minLength: {
                            value: 2,
                            message: "Last name must be at least 2 characters"
                        }
                    })}
                    placeholder="Enter your last name"
                    disabled={isLoading}
                />
                {errors.lastName && (
                    <span className="error">{errors.lastName.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Username</label>
                <input
                    {...register("username", { 
                        required: "Username is required",
                        minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                        },
                        pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: "Username can only contain letters, numbers, and underscores"
                        }
                    })}
                    placeholder="Choose a username"
                    disabled={isLoading}
                />
                {errors.username && (
                    <span className="error">{errors.username.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Email (Optional)</label>
                <input
                    {...register("email", {
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                        }
                    })}
                    type="email"
                    placeholder="Enter your email"
                    disabled={isLoading}
                />
                {errors.email && (
                    <span className="error">{errors.email.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Password</label>
                <input
                    {...register("password", { 
                        required: "Password is required",
                        minLength: {
                            value: 8,
                            message: "Password must be at least 8 characters"
                        }
                    })}
                    type="password"
                    placeholder="Create a strong password"
                    disabled={isLoading}
                />
                {errors.password && (
                    <span className="error">{errors.password.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <label>Confirm Password</label>
                <input
                    {...register("confirmPassword", { 
                        required: "Please confirm your password",
                        validate: value => value === password || "Passwords do not match"
                    })}
                    type="password"
                    placeholder="Confirm your password"
                    disabled={isLoading}
                />
                {errors.confirmPassword && (
                    <span className="error">{errors.confirmPassword.message}</span>
                )}
            </div>

            <div className="regLog__form-item">
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Creating account..." : "Sign Up"}
                </button>

                <p>
                    Already have an account?{' '}
                    <Link to="/">
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};
