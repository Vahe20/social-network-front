import { useOutletContext } from "react-router-dom"
import { IContext } from "../../../types/utility"
import { Axios } from "../../../config/axios"

export const Profile = () => {

    const { user, setAccount } = useOutletContext<IContext>()

    const sendFile = (file: File | undefined) => {
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            console.error('File is not an image.');
            return;
        }

        const formData = new FormData();
        formData.append('profile-pic', file);

        Axios
            .patch('/account/avatar', formData)
            .then(response => {
                setAccount(prev => prev ? {
                    ...prev,
                    avatar: response.data.picture
                } : null)

            })
            .catch(error => {
                console.error('Error uploading avatar:', error);
            });
    }

    return (
        <div className="space-y-8">
            {/* Profile Header Card */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-pink-500/20 border border-indigo-500/20 shadow-xl shadow-indigo-500/10">
                {/* Cover Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.1),transparent_50%)]"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>

                <div className="relative p-8 md:p-12">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                            <div className="relative">
                                <img
                                    src={user.avatar ? `http://localhost:4002/${user.avatar}` : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                                    alt="Profile"
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-slate-800 shadow-2xl object-cover ring-4 ring-indigo-500/30 group-hover:ring-indigo-400/50 transition-all duration-300"
                                    onError={(e) => {
                                        console.error('Image failed to load:', user.avatar);
                                        (e.target as HTMLImageElement).src = "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
                                    }}
                                />
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-slate-800 shadow-lg"></div>
                                <input className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" type="file" onChange={(e) => sendFile(e.target.files?.[0])} />
                            </div>
                        </div>

                        <div className="flex-1 text-center md:text-left mb-4">
                            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mb-2">
                                {user.firstName} {user.lastName}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-2 text-gray-400 mb-3">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                                <span className="text-sm font-medium">@{user ? user.firstName?.toLowerCase() : ''}{user ? user.lastName?.toLowerCase() : ''}</span>
                                {user.isAccountPrivate && (
                                    <svg className="w-4 h-4 text-pink-700" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 2.02c2.05.24 3.81 1.89 4.75 4.02H7.25c.94-2.13 2.7-3.78 4.75-4.02zM7 8h10v6c0 .45-.05.88-.14 1.31-2.73 1.48-6.1 1.48-8.86 0-.09-.43-.14-.86-.14-1.31V8zm3 5h2v2h-2v-2z" />
                                    </svg>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                                <button className="group px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                    Edit Profile
                                </button>
                                <button className="px-6 py-2.5 bg-slate-700/50 backdrop-blur-sm text-gray-300 font-semibold rounded-xl border border-indigo-500/30 hover:bg-slate-600/50 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                    </svg>
                                    Share
                                </button>
                            </div>
                        </div>

                        <div className="hidden lg:flex gap-6">
                            <div className="text-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-indigo-500/20">
                                <div className="text-3xl font-bold text-indigo-400">248</div>
                                <div className="text-sm text-gray-400">Posts</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20">
                                <div className="text-3xl font-bold text-purple-400">1.2K</div>
                                <div className="text-sm text-gray-400">Followers</div>
                            </div>
                            <div className="text-center px-6 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-pink-500/20">
                                <div className="text-3xl font-bold text-pink-400">892</div>
                                <div className="text-sm text-gray-400">Following</div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 lg:hidden mt-8">
                        <div className="text-center px-4 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-indigo-500/20">
                            <div className="text-2xl font-bold text-indigo-400">248</div>
                            <div className="text-xs text-gray-400">Posts</div>
                        </div>
                        <div className="text-center px-4 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-purple-500/20">
                            <div className="text-2xl font-bold text-purple-400">1.2K</div>
                            <div className="text-xs text-gray-400">Followers</div>
                        </div>
                        <div className="text-center px-4 py-3 bg-slate-800/50 backdrop-blur-sm rounded-xl border border-pink-500/20">
                            <div className="text-2xl font-bold text-pink-400">892</div>
                            <div className="text-xs text-gray-400">Following</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-indigo-500/10 shadow-lg p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-indigo-500/20 rounded-lg">
                        <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-white">About</h2>
                </div>

                {user.bio ? (
                    <p className="text-gray-300 text-lg leading-relaxed">
                        {user.bio}
                    </p>
                ) : (
                    <p className="text-gray-500 italic">
                        No bio added yet. Share something about yourself!
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-indigo-500/10 shadow-lg p-6 group hover:border-indigo-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Member Since</p>
                            <p className="text-white font-semibold text-lg">January 2026</p>
                        </div>
                    </div>
                </div>

                <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-indigo-500/10 shadow-lg p-6 group hover:border-purple-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                            <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">Location</p>
                            <p className="text-white font-semibold text-lg">Worldwide</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}