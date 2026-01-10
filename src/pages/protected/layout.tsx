import { useEffect, useState } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"
import { Axios } from "../../config/axios"
import type { IAccount } from "../../types/utility"

export const Protected = () => {
    const [account, setAccount] = useState<IAccount | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get<{ user: IAccount }>("/auth/user")
            .then(response => {
                setAccount(response.data.user)
            })
            .catch(() => {
                navigate("/login")
            })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token")
        navigate("/login")
    }
    return account && (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
            {/* Navbar */}
            <nav className="bg-slate-800/50 backdrop-blur-lg border-b border-indigo-500/20 sticky top-0 z-50 shadow-lg shadow-indigo-500/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo/Brand */}
                        <div className="flex-shrink-0">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-500 bg-clip-text text-transparent">
                                Social Network
                            </h1>
                        </div>

                        {/* Navigation Links */}
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-2">
                                <Link
                                    to='/profile'
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200 font-medium border border-transparent hover:border-indigo-500/30"
                                >
                                    Profile
                                </Link>
                                <Link
                                    to='/profile/posts'
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200 font-medium border border-transparent hover:border-indigo-500/30"
                                >
                                    Posts
                                </Link>
                                <Link
                                    to='/profile/followers'
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200 font-medium border border-transparent hover:border-indigo-500/30"
                                >
                                    Followers
                                </Link>
                                <Link
                                    to='/profile/followings'
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200 font-medium border border-transparent hover:border-indigo-500/30"
                                >
                                    Following
                                </Link>
                                <Link
                                    to='/profile/settings'
                                    className="px-4 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200 font-medium border border-transparent hover:border-indigo-500/30"
                                >
                                    Settings
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button className="p-2 rounded-lg text-gray-400 hover:text-indigo-400 hover:bg-indigo-500/20 transition-colors duration-200">
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                <div className="md:hidden border-t border-indigo-500/20">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-800/30">
                        <Link
                            to='/'
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                        >
                            Profile
                        </Link>
                        <Link
                            to='/profile/posts'
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                        >
                            Posts
                        </Link>
                        <Link
                            to='/profile/followers'
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                        >
                            Followers
                        </Link>
                        <Link
                            to='/profile/followings'
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                        >
                            Following
                        </Link>
                        <Link
                            to='/profile/settings'
                            className="block px-3 py-2 rounded-lg text-gray-300 hover:bg-indigo-500/20 hover:text-indigo-400 transition-all duration-200"
                        >
                            Settings
                        </Link>

                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-slate-800/30  text-white backdrop-blur-sm rounded-2xl border border-indigo-500/10 shadow-2xl shadow-indigo-500/5 p-6">
                    <Outlet context={{ user: account, setAccount }} />
                </div>
            </main>

            {/* Decorative Elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
            </div>
        </div>
    )
}