import { useOutletContext } from "react-router-dom";
import type { IAccount, IContext } from "../../../types/utility";
import { Axios } from "../../../config/Axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { Profile } from './components/Profile';
import { Privacy } from './components/privacy';
import { Password } from './components/Password';
import { useState } from "react";
import { AxiosError } from "axios";

export interface Form extends IAccount {
    newPassword: string;
    confirmPassword: string;
}

interface ApiErrorResponse {
    message?: string;
}

interface AvatarResponse {
    picture: string;
}

export const Settings = () => {
    const { user, setAccount } = useOutletContext<IContext>();
    const { register, handleSubmit, reset } = useForm<Form>({
        defaultValues: {
            bio: user.bio,
            isAccountPrivate: user.isAccountPrivate
        }
    });

    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        const formData = new FormData();
        formData.append('profile-pic', file);

        Axios.patch<AvatarResponse>('/account/avatar', formData)
            .then(response => {
                setAccount(prev => prev ? {
                    ...prev,
                    avatar: response.data.picture
                } : null);
                setSuccessMessage('Profile picture updated successfully!');
                setError("");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((err: unknown) => {
                const axiosError = err as AxiosError<ApiErrorResponse>;
                console.error('Error uploading avatar:', axiosError);
                setError(axiosError.response?.data?.message || 'Failed to upload avatar');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleRemoveAvatar = () => {
        if (!confirm('Are you sure you want to remove your profile picture?')) return;

        setIsLoading(true);
        Axios.delete('/account/avatar')
            .then(() => {
                setAccount(prev => prev ? {
                    ...prev,
                    avatar: ''
                } : null);
                setSuccessMessage('Profile picture removed successfully!');
                setError("");
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((err: unknown) => {
                const axiosError = err as AxiosError<ApiErrorResponse>;
                console.error('Error removing avatar:', axiosError);
                setError(axiosError.response?.data?.message || 'Failed to remove avatar');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const submit: SubmitHandler<Form> = (form) => {
        const { password, newPassword, confirmPassword, bio, isAccountPrivate } = form;

        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        const promises: Promise<unknown>[] = [];

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
                Axios.patch("/account/settings/password", { 
                    currentPassword: password, 
                    newPassword 
                })
            );
        }

        // Bio update
        if (bio !== user.bio) {
            promises.push(
                Axios.patch("/account/bio", { bio })
            );
        }

        // Privacy update
        if (isAccountPrivate !== user.isAccountPrivate) {
            promises.push(
                Axios.patch("/account/privacy", { isAccountPrivate })
            );
        }

        if (promises.length === 0) {
            setError("No changes to save");
            setIsLoading(false);
            return;
        }

        Promise.all(promises)
            .then(() => {
                setSuccessMessage('Settings updated successfully!');
                setAccount(prev => prev ? {
                    ...prev,
                    bio: bio || prev.bio,
                    isAccountPrivate: isAccountPrivate ?? prev.isAccountPrivate
                } : null);
                
                // Clear password fields
                reset({
                    bio,
                    isAccountPrivate,
                    password: '',
                    newPassword: '',
                    confirmPassword: ''
                });
                
                setTimeout(() => setSuccessMessage(""), 3000);
            })
            .catch((err: unknown) => {
                const axiosError = err as AxiosError<ApiErrorResponse>;
                setError(axiosError.response?.data?.message || 'Failed to update settings');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleCancel = () => {
        reset({
            bio: user.bio,
            isAccountPrivate: user.isAccountPrivate,
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
