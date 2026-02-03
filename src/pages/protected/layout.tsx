import { Outlet, useNavigate } from 'react-router-dom';
import { Header } from './components/Header';
import { useEffect, useCallback } from 'react';
import type { IAccount } from '../../types/utility';
import { useHttp } from '../../hooks';

export const Layout = () => {
    const { data, loading, refetch } = useHttp<IAccount>("/auth/user");
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        refetch();
    }, [navigate, refetch]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    const optimizedRefetch = useCallback(async (silent: boolean = true) => {
        await refetch(silent);
    }, [refetch]);

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                background: 'var(--background_dark)',
                color: 'var(--text-color)'
            }}>
                <div style={{
                    fontSize: '1.5rem',
                    animation: 'fadeInUp 0.6s ease-out'
                }}>
                    Loading...
                </div>
            </div>
        );
    }

    return data && (
        <div className='layout'>
            <Header handleLogout={handleLogout} />
            <div className="wrap">
                <Outlet context={{ user: data, refetch: optimizedRefetch }} />
            </div>
        </div>
    );
};
