import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Dashboard, ErrorPage, HomeLayout, Landing, Login, Register } from "./pages";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "@/context/DiscussionContext";
import { JoinClass } from "./components";

import adminRoutes from "./routes/adminRoutes";
import instructorRoutes from "./routes/instructorRoutes";
import studentRoutes from "./routes/studentRoutes";
import React from "react";
import MyChatBot from "./components/chatbot/chat";

const API_URL = import.meta.env.VITE_PUBLIC_API_URL;

const queryClient = new QueryClient();

export const socket = io(`${API_URL}`, {
  withCredentials: true,
  secure: true,
});

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.userState.user);
  if (user) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};

const getDashboardRoutes = (user) => {
  if (!user) return [];
  if (user.isAdmin) return adminRoutes;
  if (user.isInstructor) return instructorRoutes(store);
  return studentRoutes(store);
};

const App = () => {
  const user = useSelector((state) => state.userState.user);
  console.log(user)
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <HomeLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Landing /> },
        { path: "login", element: <Login /> },
      ],
    },
    { path: "register/:token?", element: <Register /> },
    { path: "join/:token", element: <JoinClass /> },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: getDashboardRoutes(user),
    },
  ]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
        <ReactQueryDevtools />
      </SocketContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
