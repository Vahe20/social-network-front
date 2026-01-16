import { useForm, type SubmitHandler } from "react-hook-form";
import type { IUser } from "../../../../types/utility";
import { Link } from "react-router-dom";

interface FormProps {
    handleRegister: SubmitHandler<IUser>;
}

export const Form: React.FC<FormProps> = ({ handleRegister }) => {
    const { register, handleSubmit } = useForm<IUser>();

    return (
        <form className="regLog__form" onSubmit={handleSubmit(handleRegister)}>

            <div className="regLog__form-item">
                <label>FirstName</label>

                <input
                    {...register("firstName")}
                    placeholder="Enter your first name" />
            </div>

            <div className="regLog__form-item">
                <label>LastName</label>

                <input
                    {...register("lastName")}
                    placeholder="Enter your last name"
                />
            </div>

            <div className="regLog__form-item">
                <label>UserName</label>

                <input
                    {...register("username")}
                    placeholder="Choose a username" />
            </div>

            <div className="regLog__form-item">
                <label>Password</label>

                <input
                    {...register("password")}
                    type="password"
                    placeholder="Create a strong password"
                />
            </div>

            <div className="regLog__form-item">
                <button type="submit">
                    Sign In
                </button>

                <p>
                    Don't you have an account?{' '}
                    <Link to="/">
                        Sign in
                    </Link>
                </p>
            </div>

        </form>
    )
}