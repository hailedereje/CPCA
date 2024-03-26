import React from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Admin,
  Dashboard,
  HomeLayout,
  Login,
  Register,
  InstructorDashboardLayout,
} from "./pages";
import { loader as adminLoader } from "./pages/Admin";
import { action as loginAction } from "./pages/Login";
import {action as registerAction} from './pages/Register'
import { store } from "./store";
import { AddCourse, AllCourses, Profile, Status } from "./pages/dashboard";
import { HeroSection } from "./components";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <HeroSection /> },
        { path: "login", element: <Login />, action: loginAction(store) },
        { path: "register", element: <Register /> , action: registerAction(store)},
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
      children: [
       { index: true, element: <Status/> }, 
       {path: 'profile', element: <Profile/>}, 
       {path: 'all-course', element: <AllCourses />}, 
       {path: 'add-course', element: <AddCourse/>}

      ]
    },
    {
      path: "/instructor",
      element: <InstructorDashboardLayout />,
      children: [
        { index: true, element: <Status /> },
        { path: "all-courses", element: <AllCourses /> },
        { path: "add-course", element: <AddCourse /> },
        { path: "profile", element: <Profile /> },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
