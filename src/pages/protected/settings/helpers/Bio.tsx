import { useOutletContext } from "react-router-dom";
import { Axios } from "../../../../config/axios"
import { useEffect, useState } from "react";
import { IContext } from "../../../../types/utility";

export const Bio = () => {
    const [bio, setBio] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const { user, setAccount } = useOutletContext<IContext>()

    useEffect(() => {
        if (user && user.bio) {
            setBio(user.bio);
        }
    }, []);

    const updateBio = (newBio: string) => {
        setIsSaving(true);
        setSaveStatus('idle');
        
        Axios.patch('/account/bio', { bio: newBio })
            .then(() => {
                setSaveStatus('success');
                setTimeout(() => setSaveStatus('idle'), 3000);
            })
            .catch(() => {
                setSaveStatus('error');
                setTimeout(() => setSaveStatus('idle'), 3000);
            })
            .finally(() => {
                setAccount(prev => prev ? { ...prev, bio: newBio } : prev);
                setIsSaving(false);
            });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateBio(bio);
    }

    return (
        <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-3">
                        About You
                    </label>
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        placeholder="Tell us about yourself... What makes you unique?"
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-pink-500/50 transition-all duration-200 resize-none h-32"
                        maxLength={500}
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                        {bio.length}/500
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-pink-500/30 transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? (
                            <span className="flex items-center gap-2">
                                <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Saving...
                            </span>
                        ) : 'Save Bio'}
                    </button>

                    {saveStatus === 'success' && (
                        <div className="flex items-center gap-2 text-green-400 text-sm animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>Bio saved successfully!</span>
                        </div>
                    )}

                    {saveStatus === 'error' && (
                        <div className="flex items-center gap-2 text-red-400 text-sm animate-fade-in">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                            <span>Failed to save bio</span>
                        </div>
                    )}
                </div>
            </form>

            <div className="mt-6 p-4 bg-gray-900/30 rounded-lg border border-gray-700/30">
                <p className="text-xs text-gray-400 flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 flex-shrink-0 mt-0.5 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Your bio will be visible on your profile. Make it interesting and authentic!</span>
                </p>
            </div>
        </div>
    )
}