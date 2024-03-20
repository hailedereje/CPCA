import React from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin, Dashboard, HomeLayout, Login, Register } from "./pages";
import { loader as adminLoader } from "./pages/Admin";
import { action as loginAction } from "./pages/Login";
import { store } from "./store";


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <h1>Home page</h1> },
        { path: "login", element: <Login />, action: loginAction(store) },
        { path: "register", element: <Register /> },
      ],
    },

    {
      path: "/admin",
      element: <Admin />,
      loader: adminLoader,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
