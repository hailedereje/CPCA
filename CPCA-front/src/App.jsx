import { useEffect } from "react";
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
import { io } from 'socket.io-client'
import { addUsers } from './onlineSlice'
import Askquestion from "./components/Askquestion";
import Content from "./components/Content";
import MyQuestions from "./pages/MyQuestions";

// eslint-disable-next-line react-refresh/only-export-components
export const socket = io("http://localhost:8000", {
  withCredentials: true,
  secure: true,
});

function App() {
  // const [users, setUsers] = useState([])
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  console.log("user", user);

  useEffect(() => {
    socket.connect();
    socket.on("connect", () => {
      console.log("socket connected");
    });
    socket.auth = user;

    socket.on("user-connected", (users) => {
      console.log("users", users);

      dispatch(addUsers(users));
    });

    socket.on("user-disconnected", (users) => {
      console.log("users", users);
      dispatch(addUsers(users));
    });
    // const getUsers = async () => {
    //   const res = await axios.get(
    //     "http://localhost:5000/allusers"
    //   );
    //   setUsers(res.data);
    // };
    // getUsers();
  },[dispatch, user]);

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
          loader: CoursesLoader(store),
        },
        {
          path: "enrolled-courses",
          element: <EnrolledCourses />,
          // loader: EnrolledCourses(store),
        },
        {
          path: "forum",
          element: <Content />,
        },
        {
          path: "ask",
          element: <Askquestion />,
        },
        {
          path: "myqns",
          element: <MyQuestions />,
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
