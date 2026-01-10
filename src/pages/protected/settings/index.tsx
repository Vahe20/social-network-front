import { UpdatePassword } from './helpers/UpdatePassword';
import { Privacy } from "./helpers/privacy"
import { Bio } from './helpers/Bio';

export const Settings = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-lime-500/20">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-lime-500 mb-3">
                        Settings
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Manage your account preferences and privacy
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-lime-500/30 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4 mb-6">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-lime-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border border-lime-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-lime-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">Security</h2>
                                <p className="text-gray-400 mb-4">Keep your account secure with a strong password</p>
                                <UpdatePassword />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-lime-500/30 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">Privacy</h2>
                                <p className="text-gray-400 mb-4">Control who can see your profile and content</p>
                                <Privacy />
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:border-lime-500/30 transition-all duration-300 shadow-xl">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-pink-500/20 to-rose-500/20 rounded-xl flex items-center justify-center border border-pink-500/30">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-bold text-white mb-2">Profile Information</h2>
                                <p className="text-gray-400 mb-4">Update your bio and personal details</p>
                                <Bio />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <p className="text-gray-500 text-sm">
                        Changes are saved automatically • Last updated just now
                    </p>
                </div>
            </div>
        </div>
    )
}