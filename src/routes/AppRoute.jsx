import React from "react";
import { createBrowserRouter } from "react-router";

import Home from "../Pages/Home/Home";
import MainLayout from "../Components/Layouts/MainLayout/MainLayouts";
import AuthLayout from "../Components/Layouts/AuthLayout/AuthLayout";
import Signin from "../Components/AuthComponents/SignIn/Signin";
import Signup from "../Components/AuthComponents/SignUp/SignUp";

import UserDashBoardHome from "../Pages/Dashboard/User/UserDashBoardHome";
import AddLesson from "../Pages/Lessons/AddLesson/AddLesson";
import MyLesson from "../Pages/Lessons/MyLesson/MyLesson";
import DashboadLayout from "../Components/Layouts/DashboardLayout/DashboadLayout";
import MyFavorites from "../Pages/Dashboard/User/MyFavorites/MyFavorites";
import UserProfile from "../Pages/Dashboard/User/UserProfile/UserProfile";
import UpdateLesson from "../Pages/Dashboard/User/UpdateLesson/UpdateLesson";
import AdminDashboardHome from "../Pages/Dashboard/Admin/AdminDashboardHome/AdminDashboardHome";
import ManageUsers from "../Pages/Dashboard/Admin/ManageUsers/ManageUsers";
import ManageLessons from "../Pages/Dashboard/Admin/ManageLessons/ManageLessons";
import ReportedLessons from "../Pages/Dashboard/Admin/ReportedLessons/ReportedLessons";
import AdminProfile from "../Pages/Dashboard/Admin/AdminProfile/AdminProfile";
import AdminRoutes from "./AdminRoute/AdminRoute";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import PublicLessons from "../Pages/Lessons/PublicLessons/PublicLessons";
import UserRoutes from "./UserRoute/UserRoute";
import Upgrade from "../Pages/Upgrade/Upgrade";
import Checkout from "../Pages/Upgrade/Checkout/Checkout";
import CancelCheckOut from "../Pages/Upgrade/Checkout/CancelCheckout/CancelCheckOut";
import PremiumRote from "./PremiumRoute/PremiumRoute";
import LessonDetails from "../Pages/Lessons/LessonDetails/LessonDetails";
import ErrorPage from "../Components/ErrorPage/ErrorPage";

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
        element: <Home></Home>,
      },
      {
        path: "/lessons",
        element: <PublicLessons></PublicLessons>,
      },
      {
        path: "/lessons/:id",
        element: <LessonDetails></LessonDetails>,
      },
      {
        path: "/upgrade",
        element: (
          <PrivateRoute>
            <PremiumRote>
              <Upgrade></Upgrade>
            </PremiumRote>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/success",
        element: (
          <PrivateRoute>
            <Checkout></Checkout>
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout/cancel",
        element: (
          <PrivateRoute>
            <CancelCheckOut></CancelCheckOut>
          </PrivateRoute>
        ),
      },
    ],
  },

  // --------------------------------------
  // Auth Layout
  // --------------------------------------
  {
    path: "/",
    element: <AuthLayout></AuthLayout>,
    children: [
      {
        path: "/signin",
        element: <Signin></Signin>,
      },
      {
        path: "/signup",
        element: <Signup></Signup>,
      },
    ],
  },

  // -------------------------------------
  // Dashboard Layout
  // -------------------------------------
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboadLayout></DashboadLayout>
      </PrivateRoute>
    ),
    children: [
      // ====================
      // USER DASHBOARD ROUTES
      // ====================
      {
        path: "user",
        element: (
          <UserRoutes>
            <UserDashBoardHome></UserDashBoardHome>
          </UserRoutes>
        ),
      },
      {
        path: "add-lesson",
        element: (
          <UserRoutes>
            <AddLesson></AddLesson>
          </UserRoutes>
        ),
      },
      {
        path: "my-lessons",
        element: (
          <UserRoutes>
            <MyLesson></MyLesson>
          </UserRoutes>
        ),
      },
      {
        path: "my-favorites",
        element: (
          <UserRoutes>
            <MyFavorites></MyFavorites>
          </UserRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <UserRoutes>
            <UserProfile></UserProfile>
          </UserRoutes>
        ),
      },

      // ====================
      // UPDATE LESSON
      // ====================
      { path: "update-lesson/:id", element: <UpdateLesson></UpdateLesson> },

      // ====================
      // ADMIN DASHBOARD ROUTES
      // ====================
      {
        path: "admin",
        element: (
          <AdminRoutes>
            <AdminDashboardHome></AdminDashboardHome>
          </AdminRoutes>
        ),
      },
      {
        path: "admin/manage-users",
        element: (
          <AdminRoutes>
            <ManageUsers></ManageUsers>
          </AdminRoutes>
        ),
      },
      {
        path: "admin/manage-lessons",
        element: (
          <AdminRoutes>
            <ManageLessons></ManageLessons>
          </AdminRoutes>
        ),
      },
      {
        path: "admin/reported-lessons",
        element: (
          <AdminRoutes>
            <ReportedLessons></ReportedLessons>
          </AdminRoutes>
        ),
      },
      {
        path: "admin/profile",
        element: (
          <AdminRoutes>
            <AdminProfile></AdminProfile>
          </AdminRoutes>
        ),
      },
    ],
  },

  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default AppRoute;
