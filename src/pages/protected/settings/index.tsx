import { useOutletContext } from "react-router-dom";
import type { IAccount, IContext } from "../../../types/utility";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Profile } from './components/Profile';
import { Privacy } from './components/privacy';
import { Password } from './components/Password';
import { useState } from "react";
import { accountService } from "../../../services";
import { AxiosError } from "axios";

interface ApiErrorResponse {
    message?: string;
}

export interface Form extends IAccount {
    newPassword: string;
    confirmPassword: string;
}

export const Settings = () => {
    const { user, refetch } = useOutletContext<IContext>();
    const { register, handleSubmit, reset } = useForm<Form>({
        defaultValues: {
            bio: user.bio,
            isAccountPrivate: user.isAccountPrivate,
            theme: user.theme
        }
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size should be less than 5MB');
            return;
        }

        setIsLoading(true);

        try {
            const response = await accountService.uploadAvatar(file);
            await refetch();
            setSuccessMessage('Profile picture updated successfully!');
            setError("");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            console.error('Error uploading avatar:', error);
            setError(error.response?.data?.message || 'Failed to upload avatar');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveAvatar = async () => {
        if (!confirm('Are you sure you want to remove your profile picture?')) return;

        setIsLoading(true);

        try {
            await accountService.deleteAvatar();
            await refetch();
            setSuccessMessage('Profile picture removed successfully!');
            setError("");
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            console.error('Error removing avatar:', error);
            setError(error.response?.data?.message || 'Failed to remove avatar');
        } finally {
            setIsLoading(false);
        }
    };

    const submit: SubmitHandler<Form> = async (form) => {
        const { password, newPassword, confirmPassword, bio, isAccountPrivate, theme } = form;

        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        const promises: Promise<unknown>[] = [];

        try {
            // Password change
            if (password && newPassword) {
                if (newPassword !== confirmPassword) {
                    setError("New passwords do not match");
                    setIsLoading(false);
                    return;
                }

                if (newPassword.length < 8) {
                    setError("Password must be at least 8 characters long");
                    setIsLoading(false);
                    return;
                }

                promises.push(
                    accountService.updatePassword({ 
                        currentPassword: password, 
                        newPassword 
                    })
                );
            }

            // Bio update
            if (bio !== user.bio) {
                promises.push(
                    accountService.updateBio({ bio })
                );
            }

            // Privacy update
            if (isAccountPrivate !== user.isAccountPrivate) {
                promises.push(
                    accountService.updatePrivacy({ isAccountPrivate })
                );
            }

            // Theme update
            if (theme !== user.theme) {
                promises.push(
                    accountService.updateTheme({ theme })
                );
            }

            if (promises.length === 0) {
                setError("No changes to save");
                setIsLoading(false);
                return;
            }

            await Promise.all(promises);

            setSuccessMessage('Settings updated successfully!');
            await refetch();
            
            // Clear password fields
            reset({
                bio,
                isAccountPrivate,
                theme,
                password: '',
                newPassword: '',
                confirmPassword: ''
            });
            
            setTimeout(() => setSuccessMessage(""), 3000);
        } catch (err) {
            const error = err as AxiosError<ApiErrorResponse>;
            setError(error.response?.data?.message || 'Failed to update settings');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancel = () => {
        reset({
            bio: user.bio,
            isAccountPrivate: user.isAccountPrivate,
            theme: user.theme,
            password: '',
            newPassword: '',
            confirmPassword: ''
        });
        setError("");
        setSuccessMessage("");
    };

    return (
        <div className="settings">
            <div className="settings__container">
                <h1 className="settings__title">Settings</h1>
                
                {error && (
                    <div className="error">
                        {error}
                    </div>
                )}
                
                {successMessage && (
                    <div style={{
                        marginBottom: '20px',
                        padding: '12px 16px',
                        background: 'rgba(34, 197, 94, 0.1)',
                        border: '1px solid rgba(34, 197, 94, 0.3)',
                        borderRadius: '10px',
                        color: '#4ade80',
                        fontSize: '14px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span style={{ fontSize: '18px' }}>✓</span>
                        {successMessage}
                    </div>
                )}
                
                <form onSubmit={handleSubmit(submit)}>
                    <Profile
                        user={user}
                        register={register}
                        handleAvatarChange={handleAvatarChange}
                        handleRemoveAvatar={handleRemoveAvatar}
                        isLoading={isLoading}
                    />

                    <Privacy
                        user={user}
                        register={register}
                    />

                    <Password
                        register={register}
                    />

                    <div className="settings__actions">
                        <button 
                            type="submit" 
                            className="settings__save-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Saving...' : 'Save Changes'}
                        </button>
                        <button 
                            type="button" 
                            className="settings__cancel-btn"
                            onClick={handleCancel}
                            disabled={isLoading}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
