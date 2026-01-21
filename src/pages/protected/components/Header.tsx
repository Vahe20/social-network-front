import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userService } from '../../../services';

interface props {
    handleLogout: () => void;
}

export const Header: React.FC<props> = ({ handleLogout }) => {
    const [requestCount, setRequestCount] = useState(0);

    useEffect(() => {
        const loadRequestCount = async () => {
            try {
                const response = await userService.getFollowRequests();
                setRequestCount(response.data.requests.length);
            } catch (err) {
                console.log(err);
            }
        };

        loadRequestCount();
        const interval = setInterval(loadRequestCount, 30000);
        return () => clearInterval(interval);
    }, []);


    return (
        <header className='header'>
            <div className='header__container'>
                <h1 className='header__logo'>Social Network</h1>
                <nav className='header__nav'>
                    <ul className='header__list'>
                        <li className='header__item'>
                            <NavLink to="/account/home" className='header__link'>
                                🏠 Home
                            </NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to="/account/subscriptions" className='header__link'>
                                👥 Connections
                            </NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to="/account/requests" className='header__link'>
                                ✉️ Requests
                                {requestCount > 0 && (
                                    <span className='header__badge'>{requestCount}</span>
                                )}
                            </NavLink>
                        </li>
                        <li className='header__item'>
                            <NavLink to="/account/settings" className='header__link'>
                                ⚙️ Settings
                            </NavLink>
                        </li>
                        <li className='header__item'>
                            <button
                                onClick={handleLogout}
                                className='header__link header__logout'
                            >
                                🚪 Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}
