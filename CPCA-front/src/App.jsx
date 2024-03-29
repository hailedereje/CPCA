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
import { loader as CoursesLoader } from "./pages/dashboard/AllCourses";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as EditProfileAction } from "./pages/dashboard/Profile";
import { store } from "./store";
import { loader as AddCourseLoader } from "./pages/dashboard/AddCourse";
import {
  AddCourse,
  AddInstructor,
  AllCourses,
  CreateCourse,
  EnrolledCourses,
  InstructorsList,
  Profile,
  Status,
} from "./pages/dashboard";
import { HeroSection } from "./components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function App() {
  const user = useSelector((state) => state.userState.user);
  console.log(user);

  const getDashboardRoutes = () => {
    if (!user) return [];

    let dashboardRoutes = [];
    if (user.isAdmin) {
      dashboardRoutes = [
        { index: true, element: <Status /> },
        {
          path: "profile",
          element: <Profile />,
          action: EditProfileAction(store),
        },
        { path: "add-instructor", element: <AddInstructor /> },
        { path: "instructors", element: <InstructorsList /> },
      ];
    } else if (user.isInstructor) {
      // Define routes for instructor dashboard
      dashboardRoutes = [
        { index: true, element: <Status /> },
        {
          path: "profile",
          element: <Profile />,
          action: EditProfileAction(store),
        },
        { path: "add-course", element: <AddCourse /> , loader: AddCourseLoader()},
        {
          path: "all-courses",
          element: <AllCourses />,
          loader: CoursesLoader(store),
        },
        { path: "create-course", element: <CreateCourse /> },
      ];
    } else {
      // Assume student role
      // Define routes for student dashboard
      // Modify this according to your requirements
      dashboardRoutes = [
        { index: true, element: <Status /> },
        {
          path: "profile",
          element: <Profile />,
          action: EditProfileAction(store),
        },
        {
          path: "all-courses",
          element: <AllCourses />,
          // loader: CoursesLoader(store),
        },
        {
          path: "enrolled-courses",
          element: <EnrolledCourses />,
          // loader: EnrolledCourses(store),
        },
      ];
    }

    return dashboardRoutes;
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
      children: [
        { index: true, element: <HeroSection /> },
        { path: "login", element: <Login />, action: loginAction(store) },
        {
          path: "register",
          element: <Register />,
          action: registerAction(store),
        },
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
      children: [...getDashboardRoutes()],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
