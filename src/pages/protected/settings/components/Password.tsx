import { useState } from "react";
import type { UseFormRegister } from "react-hook-form";
import type { Form } from '../index';

interface Props {
    register: UseFormRegister<Form>;
}

export const Password: React.FC<Props> = ({ register }) => {
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false
    });

    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: ''
    });

    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const calculatePasswordStrength = (password: string) => {
        if (!password) {
            setPasswordStrength({ score: 0, feedback: '' });
            return;
        }

        let score = 0;
        let feedback = '';

        if (password.length >= 8) score++;
        if (password.length >= 12) score++;

        if (/[A-Z]/.test(password)) score++;

        if (/[a-z]/.test(password)) score++;

        if (/\d/.test(password)) score++;

        if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++;

        if (score <= 2) feedback = 'Weak';
        else if (score <= 4) feedback = 'Medium';
        else feedback = 'Strong';

        setPasswordStrength({ score, feedback });
    };

    const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewPassword(value);
        calculatePasswordStrength(value);
    };

    const getStrengthColor = () => {
        if (passwordStrength.score <= 2) return '#ff6b6b';
        if (passwordStrength.score <= 4) return '#fbbf24';
        return '#4ade80';
    };

    const getStrengthWidth = () => {
        return `${(passwordStrength.score / 6) * 100}%`;
    };

    const passwordsMatch = newPassword && confirmPassword && newPassword === confirmPassword;
    const passwordsDontMatch = newPassword && confirmPassword && newPassword !== confirmPassword;

    return (
        <div className="settings__section">
            <h2 className="settings__section-title">Change Password</h2>
            <p className="settings__section-description">
                Update your password to keep your account secure. Use a strong, unique password.
            </p>

            <div className="settings__field">
                <label className="settings__label" htmlFor="current-password">
                    Current Password
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        {...register("password")}
                        id="current-password"
                        type={showPassword.current ? "text" : "password"}
                        className="settings__input"
                        placeholder="Enter your current password"
                        style={{ paddingRight: '45px' }}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, current: !prev.current }))}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--second-text-color)',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '4px 8px'
                        }}
                    >
                        {showPassword.current ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>
            </div>

            <div className="settings__field">
                <label className="settings__label" htmlFor="new-password">
                    New Password
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        {...register("newPassword")}
                        id="new-password"
                        type={showPassword.new ? "text" : "password"}
                        className="settings__input"
                        placeholder="Enter your new password"
                        style={{ paddingRight: '45px' }}
                        onChange={handleNewPasswordChange}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--second-text-color)',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '4px 8px'
                        }}
                    >
                        {showPassword.new ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                {newPassword && (
                    <div style={{ marginTop: '8px' }}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '6px'
                        }}>
                            <span className="settings__hint">
                                Password strength: <strong style={{ color: getStrengthColor() }}>
                                    {passwordStrength.feedback}
                                </strong>
                            </span>
                        </div>
                        <div style={{
                            width: '100%',
                            height: '6px',
                            background: 'rgba(199, 199, 199, 0.2)',
                            borderRadius: '3px',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                width: getStrengthWidth(),
                                height: '100%',
                                background: getStrengthColor(),
                                transition: 'all 0.3s ease',
                                borderRadius: '3px'
                            }} />
                        </div>
                    </div>
                )}
            </div>

            <div className="settings__field">
                <label className="settings__label" htmlFor="confirm-password">
                    Confirm New Password
                </label>
                <div style={{ position: 'relative' }}>
                    <input
                        {...register("confirmPassword")}
                        id="confirm-password"
                        type={showPassword.confirm ? "text" : "password"}
                        className="settings__input"
                        placeholder="Confirm your new password"
                        style={{ 
                            paddingRight: '45px',
                            borderColor: passwordsMatch 
                                ? 'rgba(74, 222, 128, 0.5)' 
                                : passwordsDontMatch 
                                    ? 'rgba(255, 107, 107, 0.5)' 
                                    : undefined
                        }}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        style={{
                            position: 'absolute',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            background: 'none',
                            border: 'none',
                            color: 'var(--second-text-color)',
                            cursor: 'pointer',
                            fontSize: '18px',
                            padding: '4px 8px'
                        }}
                    >
                        {showPassword.confirm ? '👁️' : '👁️‍🗨️'}
                    </button>
                </div>

                {passwordsMatch && (
                    <span className="settings__hint" style={{ color: '#4ade80', marginTop: '6px' }}>
                        ✓ Passwords match
                    </span>
                )}
                {passwordsDontMatch && (
                    <span className="settings__hint" style={{ color: '#ff6b6b', marginTop: '6px' }}>
                        ✗ Passwords do not match
                    </span>
                )}
            </div>

            <div className="settings__password-requirements">
                <h4 className="settings__requirements-title">Password Requirements:</h4>
                <ul className="settings__requirements-list">
                    <li style={{ 
                        color: newPassword.length >= 8 ? '#4ade80' : undefined,
                        fontWeight: newPassword.length >= 8 ? '500' : undefined
                    }}>
                        At least 8 characters long {newPassword.length >= 8 && '✓'}
                    </li>
                    <li style={{ 
                        color: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? '#4ade80' : undefined,
                        fontWeight: /[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) ? '500' : undefined
                    }}>
                        Contains uppercase and lowercase letters {/[A-Z]/.test(newPassword) && /[a-z]/.test(newPassword) && '✓'}
                    </li>
                    <li style={{ 
                        color: /\d/.test(newPassword) ? '#4ade80' : undefined,
                        fontWeight: /\d/.test(newPassword) ? '500' : undefined
                    }}>
                        Contains at least one number {/\d/.test(newPassword) && '✓'}
                    </li>
                    <li style={{ 
                        color: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? '#4ade80' : undefined,
                        fontWeight: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword) ? '500' : undefined
                    }}>
                        Contains at least one special character {/[!@#$%^&*(),.?":{}|<>]/.test(newPassword) && '✓'}
                    </li>
                </ul>
            </div>
        </div>
    );
};
