import { createBrowserRouter } from "react-router-dom"
import { Layout } from '../pages/protected/Layout';
import { NotFound } from "../pages/available/error/NotFound";
import { Signup } from "../pages/available/signup";
import { Login } from "../pages/available/login";
import { Home } from "../pages/protected/home";
import { Settings } from "../pages/protected/settings";
import { Subscriptions } from "../pages/protected/subscriptions";
import { Profile } from "../pages/protected/profile";
import { Requests } from "../pages/protected/requests";
import { Post } from "../pages/protected/post";

export const routes = createBrowserRouter([
    {
        path: '',
        element: <Login />
    },
    {
        path: 'register',
        element: <Signup />
    },
    {
        path: 'account',
        element: <Layout />,
        children: [
            { path: 'home', element: <Home /> },
            { path: 'subscriptions', element: <Subscriptions /> },
            { path: 'settings', element: <Settings /> },
            { path: 'profile/:username', element: <Profile /> },
            { path: 'requests', element: <Requests /> },
            { path: 'post/:id', element: <Post /> },
        ]
    },
    { path: "*", element: <NotFound /> }
]);
