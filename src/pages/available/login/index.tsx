import { useForm, SubmitHandler } from 'react-hook-form'
import type { IUser } from '../../../types/utility.ts'
import { Axios } from '../../../config/axios.ts'
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'


export const Login = () => {
    const { register, handleSubmit } = useForm<IUser>()
    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleLogin: SubmitHandler<IUser> = (form) => {
        Axios.post<{ token: string }>("/auth/signin", form)
            .then(response => {
                localStorage.setItem("token", response.data.token)
                navigate("/profile")
            })
            .catch(err => {
                setError(err.response.data?.message)
            })
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-6">
            <div className="w-full max-w-md">
                <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-700/50 p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-600 mb-2">
                            Signin
                        </h1>
                        <p className="text-gray-400">Join our community today</p>
                    </div>
                    {error && <p className='text-red-400'>{error}</p>}
                    <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">

                        <div>
                            <label className="block text-sm font-medium text-lime-400 mb-2">
                                Username
                            </label>
                            <input
                                {...register("username")}
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
                                placeholder="Choose a username"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-lime-400 mb-2">
                                Password
                            </label>
                            <input
                                {...register("password")}
                                type="password"
                                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:border-transparent transition-all duration-200"
                                placeholder="Create a strong password"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full py-3 px-4 bg-gradient-to-r from-lime-500 to-lime-600 hover:from-lime-600 hover:to-lime-700 text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-lime-500/50 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                        >
                            Sign In
                        </button>

                        <p className="text-center text-gray-400 text-sm mt-4">
                            Don't you have an account?{' '}
                            <Link to="/" className="text-lime-400 hover:text-lime-300 font-medium transition-colors">
                                Sign up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}