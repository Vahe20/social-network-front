import { createBrowserRouter } from 'react-router-dom'
import { Signup } from '../pages/available/signup'
import { Login } from '../pages/available/login'
import { Profile } from '../pages/protected/profile'
import { Protected } from '../pages/protected/layout'
import { NotFound } from '../pages/available/error/not-found'
import { Settings } from '../pages/protected/settings'

export const routes = createBrowserRouter([
    {
        path: '',
        element: <Signup />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'profile',
        element: <Protected />,
        children: [
            { path: '', element: <Profile /> },
            { path: 'settings', element: <Settings /> },
        ]
    },
    { path: "*", element: <NotFound /> }
])