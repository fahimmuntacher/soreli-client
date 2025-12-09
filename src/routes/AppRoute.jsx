import React from 'react';
import { createBrowserRouter } from 'react-router';

import Home from '../Pages/Home/Home';
import MainLayout from '../Components/Layouts/MainLayout/MainLayouts';
import AuthLayout from '../Components/Layouts/AuthLayout/AuthLayout';
import Signin from '../Components/AuthComponents/SignIn/Signin';
import Signup from '../Components/AuthComponents/SignUp/SignUp';

const AppRoute = createBrowserRouter([
    // -----------------------------------------
    //MainLayout
    //------------------------------------------
    {
        path: "/",
        element: <MainLayout></MainLayout>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    },

    // --------------------------------------
    // Auth Layout
    // --------------------------------------
    {
        path: "/",
        element : <AuthLayout></AuthLayout>,
        children : [
            {
                path : "/signin",
                element: <Signin></Signin>
            },
            {
                path : "/signup",
                element : <Signup></Signup>
            }
        ]
    }
])

export default AppRoute;