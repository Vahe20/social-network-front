import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { useEffect, useState } from 'react';
import type { IAccount } from '../../types/utility';
import { Axios } from '../../config/Axios';

export const Layout = () => {
    const [account, setAccount] = useState<IAccount | null>(null)
    const navigate = useNavigate()

    useEffect(() => {
        Axios.get<{ user: IAccount }>("/auth/user")
            .then(response => {
                setAccount(response.data.user)
            })
            .catch(() => {
                navigate("/")
            })
    }, [])

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }

    return account && (
        <div className='layout'>
            <Header handleLogout={handleLogout} />
            <div className="wrap">
                <Outlet context={{ user: account, setAccount }} />
            </div>
        </div>
    )
}