import { useNavigate } from "react-router-dom"
import { Axios } from "../../../../config/axios"
import { useState } from "react";

export const UpdatePassword = () => {
    const [error, setError] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const updatePassword = (currentPassword: string, newPassword: string) => {
        Axios.patch('account/settings/password', {
            currentPassword,
            newPassword
        }).then(() => {
            navigate("/profile");
        }).catch(err => {
            setError(err.response.data?.message);
        })
    }

    const openDialog = () => {
        setIsOpen(true);
        const dialog = document.querySelector(".dialog") as HTMLDialogElement;
        dialog.showModal();
    }

    const closeDialog = () => {
        setIsOpen(false);
        setError("");
        const dialog = document.querySelector(".dialog") as HTMLDialogElement;
        setTimeout(() => dialog.close(), 300);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const currentPassword = formData.get("currentPassword") as string;
        const newPassword = formData.get("newPassword") as string;

        if (!currentPassword || !newPassword) {
            setError("Please fill in all fields");
            return;
        }

        if (newPassword.length < 8) {
            setError("New password must be at least 8 characters long");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password");
            return;
        }

        if (error) {
            setError("");
        }

        updatePassword(currentPassword, newPassword);
        closeDialog();
    }

    return (
        <div>
            <button
                className="px-6 py-2.5 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-gray-900 font-semibold rounded-lg shadow-lg hover:shadow-lime-500/30 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                onClick={openDialog}
            >
                Change Password
            </button>

            <dialog className={`dialog overflow-visible justify-self-center self-center bg-transparent backdrop:bg-black/60 backdrop:backdrop-blur-sm transition-all duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
                <div className={`relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-700/50 p-8 shadow-2xl transform transition-all duration-300 min-w-[450px] ${isOpen ? 'scale-100' : 'scale-95'}`}>
                    {/* Close Button */}
                    <button 
                        onClick={closeDialog} 
                        className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-gray-700/50 rounded-lg p-2 transition-all duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-lime-400 to-emerald-500 rounded-2xl mb-4 shadow-lg shadow-lime-500/20">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 mb-2">
                            Change Password
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Keep your account secure with a strong password
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-lg flex items-start gap-3 animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <p className='text-red-300 text-sm'>{error}</p>
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    name="currentPassword"
                                    type="password"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50 transition-all duration-200 pr-10"
                                    placeholder="Enter your current password"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    name="newPassword"
                                    type="password"
                                    className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-lime-500/50 focus:border-lime-500/50 transition-all duration-200 pr-10"
                                    placeholder="Enter your new password"
                                />
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                                </svg>
                            </div>
                            <p className="mt-2 text-xs text-gray-500 flex items-center gap-1.5">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Must be at least 8 characters long
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-3 pt-2">
                            <button
                                type="button"
                                onClick={closeDialog}
                                className="flex-1 py-3 px-4 bg-gray-700/50 hover:bg-gray-700 text-gray-300 font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500/50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="flex-1 py-3 px-4 bg-gradient-to-r from-lime-500 to-emerald-500 hover:from-lime-600 hover:to-emerald-600 text-gray-900 font-semibold rounded-xl shadow-lg hover:shadow-lime-500/30 transform hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-lime-500/50"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>

                    {/* Security Tips */}
                    <div className="mt-6 p-4 bg-lime-500/10 rounded-lg border border-lime-500/20">
                        <p className="text-xs text-lime-300/80 flex items-start gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                            </svg>
                            <span>Use a strong password with a mix of letters, numbers, and symbols</span>
                        </p>
                    </div>
                </div>
            </dialog>
        </div>
    )
}