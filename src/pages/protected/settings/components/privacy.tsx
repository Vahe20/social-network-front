import type { UseFormRegister } from "react-hook-form";
import type { IAccount } from "../../../../types/utility";
import { useState } from "react";

interface Props {
    user: IAccount;
    register: UseFormRegister<IAccount>;
}

export const Privacy: React.FC<Props> = ({ user, register }) => {
    const [isPrivate, setIsPrivate] = useState(user.isAccountPrivate);

    const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPrivate(e.target.checked);
    };

    return (
        <div className="settings__section">
            <h2 className="settings__section-title">Privacy & Security</h2>
            <p className="settings__section-description">
                Control who can see your content and interact with you
            </p>
            
            <div className="settings__toggle-group">
                <div className="settings__toggle-item">
                    <div className="settings__toggle-info">
                        <span className="settings__toggle-label">Private Account</span>
                        <span className="settings__toggle-description">
                            When your account is private, only people you approve can see your posts, 
                            followers list, and following list. Your profile information and bio remain visible.
                        </span>
                    </div>
                    <label className="settings__switch">
                        <input
                            {...register("isAccountPrivate")}
                            type="checkbox"
                            onChange={handleToggle}
                            checked={isPrivate}
                        />
                        <span className="settings__slider"></span>
                    </label>
                </div>
            </div>

            {isPrivate && (
                <div style={{
                    marginTop: '16px',
                    padding: '12px 16px',
                    background: 'rgba(0, 102, 255, 0.1)',
                    border: '1px solid rgba(0, 102, 255, 0.3)',
                    borderRadius: '10px',
                    fontSize: '13px',
                    color: 'var(--text-color)',
                    lineHeight: '1.5'
                }}>
                    <strong style={{ display: 'block', marginBottom: '4px' }}>
                        ℹ️ Private Account Active
                    </strong>
                    New followers will need to send a follow request that you can approve or decline.
                </div>
            )}
        </div>
    );
};
