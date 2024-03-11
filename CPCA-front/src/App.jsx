import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeLayout from "./pages/HomeLayout";
import Register from "./pages/Register";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <h1>Home page</h1> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
