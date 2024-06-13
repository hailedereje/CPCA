import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
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

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

function App() {
  const user = useSelector((state) => state.userState.user);

  console.log(user); 
  const getDashboardRoutes = () => {
    if (!user) return [];
    if (user.isAdmin) return adminRoutes;
    if (user.isInstructor) return instructorRoutes(store);
    return studentRoutes(store);
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Landing /> },
        { path: "register/:token?", element: <Register />, action: registerAction(store) },
        { path: "login", element: <Login />, action: loginAction(store) },
        { path: "join/:token", element: <JoinClass /> },
        { path: "/quiz",element: <Quiz /> },
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: getDashboardRoutes(),
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
}

export default App;
