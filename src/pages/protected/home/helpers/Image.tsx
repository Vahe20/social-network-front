import type React from "react"
import { BASE } from '../../../../config/Axios';

interface props {
    src: string
}

export const Image: React.FC<props> = ({ src }) => {
    return (
        <>
            <img
                src={src ? BASE + "/" + src : "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541"}
                alt="images"
            />
        </>
    )
}