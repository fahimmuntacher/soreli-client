import React from 'react';
import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Components/MainLayouts/MainLayouts';
import Home from '../Pages/Home/Home';

const AppRoute = createBrowserRouter([
    // -----------------------------------------
    //MainLayout
    //------------------------------------------
    {
        path: "/",
        element: <MainLayouts></MainLayouts>,
        children: [
            {
                index: true,
                element: <Home></Home>
            }
        ]
    }
])

export default AppRoute;