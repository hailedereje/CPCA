import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from "react-router-dom";
import { Dashboard, ErrorPage, ForumLayout, HomeLayout, Landing, Login, MyQuestions, Register } from "./pages";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
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
import { Quiz } from "./components/Quiz";
import React from "react";

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
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
        { path: "register/:token?", element: <Register />, action: registerAction(store) },
        { path: "login", element: <Login />, action: loginAction(store) },
        { path: "join/:token", element: <JoinClass /> },
        { path: "quiz", element: <Quiz /> },
      ],
    },
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
