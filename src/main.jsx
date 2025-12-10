import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router/dom";
import AppRoute from "./routes/AppRoute.jsx";
import AuthProvider from "./Context/AuthContext/AuthProvider.jsx";
import { Flip, ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Flip}
    />
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={AppRoute}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);
