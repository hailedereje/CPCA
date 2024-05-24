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
// import { loader as SingleCourseLoader } from "./pages/Lessons";
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
import { Editor } from "./components/textEditor/test";
import { CreateCourse } from "./components/createCourse/createCourse";
import { UpdataCourse } from "./components/createCourse/updateCourse";
import { CourseLayout } from "./components/createCourse/layout";
import { QuizBoard } from "./components/createCourse/QuizBoard";
import DraftCourses from "./components/createCourse/draftCourses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { draftCourseLoader } from "./loader/draftCourseLoader";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

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
      // errorElement: <ErrorPage />,
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
      children: [
        ...getDashboardRoutes(),
        {
          path:'course',
          element: <CreateCourse/>,
        },
        {
          path: 'course/update/:id',
          element: <UpdataCourse/>,
          // loader: draftCourseLoader(queryClient)
        },
      
        {
          path: "courses/draft",
          element: <DraftCourses/>
        },

        {
          path:'course/update/:id/chapters',
          element: <CourseLayout/>,
          children: [
           { index: true, element: <div className="flex flex-col items-center justify-center h-full p-4">
           <p className="text-3xl font-bold text-gray-600 mb-2 uppercase">Instruction</p>
           <p className="text-lg text-gray-400">Add Lessons after creating a chapter. Click on a lesson to view and edit its content.</p>
         </div>},
           {path: ":chapterId/lessons/:lessonId",element:<RichTextExample/>},
           { path: "add-test",element:<QuizBoard/>}
          ]
        },
      ],
    },
    {
      path: "code-editor",
      element: <CodeEditor />,
    },

    {
      path: "test",
      element: <Editor/>
    },
    
    
  ]);
  return(
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      </SocketContext.Provider>
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
