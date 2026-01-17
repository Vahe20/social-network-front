import React, { useRef } from "react"
import type { IAccount } from "../../../../types/utility"
import { Image } from "../../helpers/Image"
import { accountService } from "../../../../services"

interface Props {
    user: IAccount;
    refetch: () => Promise<void>;
}

export const Profile: React.FC<Props> = ({ user, refetch }) => {
    const inputRef = useRef<HTMLInputElement | null>(null)

    const sendFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return
        
        try {
            await accountService.uploadAvatar(file);
            await refetch();
        } catch (error) {
            console.error('Error uploading avatar:', error);
            alert('Failed to upload avatar');
        }
    }

    return (
        <div className="profile">
            <div className="profile__card">
                <div className="profile__avatar">
                    <div className="avatar-frame">
                        <Image src={user.avatar} />

                        <button
                            className="avatar-edit"
                            onClick={() => inputRef.current?.click()}
                            aria-label="Change avatar"
                            title="Change avatar"
                        >
                            ✎
                        </button>

                        <input
                            ref={inputRef}
                            className="hide"
                            type="file"
                            accept="image/*"
                            onChange={sendFile}
                        />
                    </div>
                </div>

                <div className="profile__info">
                    <h2 className="profile__name">{user.firstName} {user.lastName}</h2>
                    <p className="profile__username">@{user.username}</p>
                    <p className="profile__bio">{user.bio ?? 'Не указано описание профиля.'}</p>
                </div>

                <div className="profile__statistic">
                    <div className="stat">
                        <div className="stat__num">{user.posts.length}</div>
                        <div className="stat__label">Posts</div>
                    </div>
                    <div className="stat">
                        <div className="stat__num">{user.followers.length}</div>
                        <div className="stat__label">Followers</div>
                    </div>
                    <div className="stat">
                        <div className="stat__num">{user.followings.length}</div>
                        <div className="stat__label">Following</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
