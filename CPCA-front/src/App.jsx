import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Dashboard,
  ErrorPage,
  ForumLayout,
  HomeLayout,
  Landing,
  Lessons,
  Login,
  Register,
} from "./pages";
import { loader as CoursesLoader } from "./pages/dashboard/AllCourses";
import { loader as SingleCourseLoader } from "./pages/Lessons";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as EditProfileAction } from "./pages/dashboard/Profile";
import { store } from "./store";
import {
  Activities,
  AddInstructor,
  AllCourses,
  // CreateCourse,
  EnrolledCourses,
  InstructorsList,
  Profile,
  Status,
} from "./pages/dashboard/index";
import { HeroSection } from "./components";
import Askquestion from "./components/Askquestion";
import Forum from "./pages/Forum";
import MyQuestions from "./pages/MyQuestions";
import { CodeEditor } from "./components/CodeEditor";
import RichTextExample from "./components/textEditor/textEditor";
import LessonDetails from "./pages/LessonDetails";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUsers } from "@/features/forum/socketSlice";
import SocketContext from "@/context/SocketContext";
import { QueryClient, QueryClientProvider } from "react-query";
import {  EditCourse } from "./components/createCourse/editCourse";
import { Editor } from "./components/textEditor/test";
import { CreateCourse } from "./components/createCourse/createCourse";
import { UpdataCourse } from "./components/createCourse/updateCourse";
import { CourseLayout } from "./components/createCourse/layout";
import { QuizBoard } from "./components/createCourse/QuizBoard";

// export const socket = io("http://localhost:5000", {
//   withCredentials: true,
//   secure: true,
// });
export const socket = ""
const queryClient = new QueryClient();

function App() {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   socket.connect();
  //   socket.on("connect", () => {
  //     console.log("socket connected", socket.id);
  //   });
  //   socket.auth = user;
  //   socket.on("user-connected", (users) => {
  //     dispatch(addUsers(users));
  //     console.log("users", users);
  //   });
  //   socket.on("user-disconnected", (users) => {
  //     console.log("users", users);
  //     dispatch(addUsers(users));
  //   });

  //   return () => {
  //     socket.disconnect();
  //   };
  // },[dispatch, user]);

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
      dashboardRoutes = [
        { index: true, element: <Activities /> },
        {
          path: "profile",
          element: <Profile />,
          action: EditProfileAction(store),
        },
        { path: "add-course", element: <RichTextExample /> },
        
        {
          path: "courses",
          element: <AllCourses />,
          loader: CoursesLoader(store),
        },
        // { path: "create-course", element: <CreateCourse /> },
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
          errorElement: <div>Failed to load courses</div>,
        },

        {
          path: "courses/:id",
          element: <Lessons />,
          loader: SingleCourseLoader(store),
        },
        { path: "courses/:id/lessons/:id", element: <LessonDetails/> },

        {
          path: "enrolled-courses",
          element: <EnrolledCourses />,
          // loader: EnrolledCourses(store),
        },
        {
          path: "forum",
          element: <ForumLayout />,
          children: [
            { path: "content", element: <Forum /> },
            { path: "myqns", element: <MyQuestions /> },
            {
              path: "ask",
              element: <Askquestion />,
            },
            // other child routes...
          ]
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
        { index: true, element: <Landing /> },

        {
          path: "register",
          element: <Register />,
          action: registerAction(store),
        },

        {
          path: "login",
          element: <Login />,
          action: loginAction(store),
        },
      ],
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [...getDashboardRoutes()],
    },
    {
      path: "code-editor",
      element: <CodeEditor />,
    },

    {
      path: "test",
      element: <Editor/>
    },
    {
      path:'course',
      element: <CreateCourse/>,
    },
    {
      path: 'course/update/:id',
      element: <UpdataCourse/>
    },
    {
      path:'course/edit/:id',
      element: <CourseLayout/>,
      children: [
       { index: true, element: <RichTextExample/>},
       { path: "add-test",element:<QuizBoard/>}
      ]
    },
    
  ]);
  return(
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
      </SocketContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
