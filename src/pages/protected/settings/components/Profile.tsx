import { useState } from "react";
import type { IAccount } from "../../../../types/utility";
import { Image } from "../../helpers/Image";
import type { UseFormRegister } from "react-hook-form";

interface Props {
    user: IAccount;
    register: UseFormRegister<IAccount>;
    handleAvatarChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleRemoveAvatar: () => void;
    isLoading: boolean;
}

export const Profile: React.FC<Props> = ({
    user,
    register,
    handleAvatarChange,
    handleRemoveAvatar,
    isLoading
}) => {
    const [bio, setBio] = useState(user.bio || "");
    const maxBioLength = 200;

    const inputHandler = (value: string) => {
        if (value.length > maxBioLength) return;
        setBio(value);
    };

    const bioCharactersRemaining = maxBioLength - bio.length;
    const bioPercentage = (bio.length / maxBioLength) * 100;

    return (
        <div className="settings__section">
            <h2 className="settings__section-title">Profile Information</h2>
            <p className="settings__section-description">
                Update your profile details and how others see you on the platform
            </p>

            <div className="settings__field">
                <label className="settings__label">Profile Picture</label>
                <div className="settings__avatar-upload">
                    <div className="settings__avatar-preview">
                        <Image src={user.avatar} />
                    </div>
                    <div className="settings__avatar-actions">
                        <label className="settings__upload-btn">
                            <input
                                type="file"
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleAvatarChange}
                                className="settings__file-input"
                                disabled={isLoading}
                            />
                            {isLoading ? 'Uploading...' : 'Upload New Photo'}
                        </label>
                        {user.avatar && (
                            <button
                                type="button"
                                className="settings__remove-btn"
                                onClick={handleRemoveAvatar}
                                disabled={isLoading}
                            >
                                Remove
                            </button>
                        )}
                    </div>
                </div>
                <span className="settings__hint">
                    Recommended: Square image, at least 400x400px. Max size: 5MB
                </span>
            </div>

            <div className="settings__field">
                <label className="settings__label" htmlFor="bio">
                    Bio
                </label>
                <textarea
                    {...register("bio")}
                    id="bio"
                    value={bio}
                    onChange={e => inputHandler(e.target.value)}
                    className="settings__textarea"
                    placeholder="Tell us about yourself... What are your interests? What do you do?"
                    rows={4}
                    maxLength={maxBioLength}
                />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '8px'
                }}>
                    <span className="settings__hint">
                        {bio.length}/{maxBioLength} characters
                        {bioCharactersRemaining <= 20 && bioCharactersRemaining > 0 && (
                            <span style={{ color: '#fbbf24', marginLeft: '8px' }}>
                                ({bioCharactersRemaining} remaining)
                            </span>
                        )}
                        {bioCharactersRemaining === 0 && (
                            <span style={{ color: '#ff6b6b', marginLeft: '8px' }}>
                                (limit reached)
                            </span>
                        )}
                    </span>
                    {bio.length > 0 && (
                        <div style={{
                            width: '100px',
                            height: '4px',
                            background: 'rgba(199, 199, 199, 0.2)',
                            borderRadius: '2px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: `${bioPercentage}%`,
                                height: '100%',
                                background: bioPercentage < 80
                                    ? 'linear-gradient(90deg, #0066ff, #00ccff)'
                                    : bioPercentage < 95
                                        ? '#fbbf24'
                                        : '#ff6b6b',
                                transition: 'all 0.2s'
                            }} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
