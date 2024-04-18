import { Children, useEffect } from "react";
// import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  ErrorPage,
  HomeLayout,
  Lessons,
  Login,
  Register,
  SingleCourse,
} from "./pages";
import { loader as CoursesLoader } from "./pages/dashboard/AllCourses";
import { loader as SingleCourseLoader } from "./pages/Lessons";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as EditProfileAction } from "./pages/dashboard/Profile";
import { store } from "./store";
import {
  Activities,
  AddCourse,
  AddInstructor,
  AllCourses,
  CreateCourse,
  // CreateCourse,
  EnrolledCourses,
  InstructorsList,
  Profile,
  Status,
} from "./pages/dashboard/index";
import { ContactSection, HeroSection } from "./components";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import { addUsers } from "./onlineSlice";
import About from "./components/About";
import Askquestion from "./components/Askquestion";
import Content from "./components/Content";
import MyQuestions from "./pages/MyQuestions";
import { CodeEditor } from "./components/CodeEditor";
import EditorComponent from "./components/codeEditor/Editor";
import LessonDetails from "./pages/LessonDetails";

// eslint-disable-next-line react-refresh/only-export-components
// export const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   secure: true,
// });

function App() {
  // const [users, setUsers] = useState([])
  // const dispatch = useDispatch();
  const user = useSelector((state) => state.userState.user);
  // console.log("user", user);

  // useEffect(() => {
  //   socket.connect();
  //   socket.on("connect", () => {
  //     console.log("socket connected");
  //   });
  //   socket.auth = user;

  //   socket.on("user-connected", (users) => {
  //     console.log("users", users);

  //     dispatch(addUsers(users));
  //   });

  //   socket.on("user-disconnected", (users) => {
  //     console.log("users", users);
  //     dispatch(addUsers(users));
  //   });
  //   // const getUsers = async () => {
  //   //   const res = await axios.get(
  //   //     "http://localhost:5000/allusers"
  //   //   );
  //   //   setUsers(res.data);
  //   // };
  //   // getUsers();
  // }, [dispatch, user]);

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
        { index: true, element: <Activities /> },
        {
          path: "profile",
          element: <Profile />,
          action: EditProfileAction(store),
        },
        { path: "add-course", element: <AddCourse /> },
        {
          path: "add-course",
          element: <AddCourse />,
        },
        {
          path: "courses",
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
          path: "courses",
          element: <AllCourses />,
          loader: CoursesLoader(store),
          errorElement: <div>Failed to load courses</div>,
        },

        {
          path: "courses/:id",
          element: <Lessons />,
          loader: SingleCourseLoader(store),
        },
        { path: "courses/:id/lessons/:id", element: <LessonDetails /> },

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
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HeroSection /> },

        {
          path: "register",
          element: <Register />,
          action: registerAction(store),
        },

        {
          path: "about",
          element: <About />,
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction(store),
        },
        {
          path: "contact",
          element: <ContactSection></ContactSection>,
        },
      ],
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
      children: [...getDashboardRoutes()],
    },
    {
      path: "code-editor",
      element: <CodeEditor />,
    },
    {
      path: "instructor",
      element: <EditorComponent />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
