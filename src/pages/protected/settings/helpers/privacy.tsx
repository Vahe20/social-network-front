import { useEffect, useState } from "react";
import { Axios } from "../../../../config/axios";
import { IContext } from "../../../../types/utility";
import { useOutletContext } from "react-router-dom";

export const Privacy = () => {
    const [isPrivate, setIsPrivate] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);

    const { user, setAccount } = useOutletContext<IContext>()

    useEffect(() => {
        const fetchPrivacySetting = async () => {
            try {
                const name = user ? user.username : '';
                const response = await Axios.get(`/account/${name}`);
                setIsPrivate(response.data.user.isAccountPrivate);
            } catch (error) {
                console.error('Failed to fetch privacy settings:', error);
            }
        };
        fetchPrivacySetting();
    }, []);

    const togglePrivacy = async () => {
        setIsUpdating(true);
        try {
            await Axios.patch('/account/privacy', {
                isPrivate: !isPrivate
            });
            setAccount(prev => prev ? { ...prev, isAccountPrivate: !isPrivate } : prev);
            setIsPrivate(!isPrivate);
        } catch (error) {
            console.error('Failed to update privacy settings:', error);
        } finally {
            setIsUpdating(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-900/30 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-all duration-200">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-white">Private Account</h3>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            isPrivate 
                                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                                : 'bg-gray-700/50 text-gray-400 border border-gray-600/30'
                        }`}>
                            {isPrivate ? 'Private' : 'Public'}
                        </span>
                    </div>
                    <p className="text-sm text-gray-400">
                        {isPrivate 
                            ? 'Only approved followers can see your posts and profile' 
                            : 'Anyone can see your posts and profile'}
                    </p>
                </div>
                
                <button
                    onClick={togglePrivacy}
                    disabled={isUpdating}
                    className={`relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                        isPrivate ? 'bg-blue-500' : 'bg-gray-600'
                    } ${isUpdating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-200 ${
                            isPrivate ? 'translate-x-7' : 'translate-x-1'
                        }`}
                    >
                        {isUpdating && (
                            <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                    </span>
                </button>
            </div>

            <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-300">Privacy Features</h4>
                
                <div className="space-y-2">
                    <div className="flex items-start gap-3 p-3 bg-gray-900/20 rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            isPrivate ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-500'
                        }`}>
                            {isPrivate ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium">Follower Approval</p>
                            <p className="text-xs text-gray-400 mt-0.5">Manually approve new followers</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-900/20 rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            isPrivate ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-500'
                        }`}>
                            {isPrivate ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium">Content Visibility</p>
                            <p className="text-xs text-gray-400 mt-0.5">Hide posts from non-followers</p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 p-3 bg-gray-900/20 rounded-lg">
                        <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                            isPrivate ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-700/50 text-gray-500'
                        }`}>
                            {isPrivate ? (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            )}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-white font-medium">Profile Protection</p>
                            <p className="text-xs text-gray-400 mt-0.5">Limit profile information visibility</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <div className="flex items-start gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                        <p className="text-sm text-blue-300 font-medium mb-1">About Privacy Settings</p>
                        <p className="text-xs text-blue-200/70">
                            When your account is private, only people you approve can see your photos, videos, and profile information. Your existing followers won't be affected.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}