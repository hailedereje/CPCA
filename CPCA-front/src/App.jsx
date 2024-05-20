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
  StudentsList,
  Profile,
  Status,
} from "./pages/dashboard/index";
import Askquestion from "./pages/forum/Askquestion";
import Forum from "./pages/forum/Forum";
import MyQuestions from "./pages/forum/MyQuestions";
import { CodeEditor } from "./components/CodeEditor";
import RichTextExample from "./components/textEditor/textEditor";
import LessonDetails from "./pages/LessonDetails";
import { useSelector } from "react-redux";
import { Editor } from "./components/textEditor/test";
import { CreateCourse } from "./components/createCourse/createCourse";
import { UpdataCourse } from "./components/createCourse/updateCourse";
import { CourseLayout } from "./components/createCourse/layout";
import { QuizBoard } from "./components/createCourse/QuizBoard";
import DraftCourses from "./components/createCourse/draftCourses";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { draftCourseLoader } from "./loader/draftCourseLoader";
import Home from "./pages/course/Courses";
import AboutCourse from "./pages/course/AboutCourse";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
    },
  },
});

function App() {
  const user = useSelector((state) => state.userState.user);

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
        { path: "all-instructors", element: <InstructorsList /> },
        { path: "all-students", element: <StudentsList /> },
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
        {
          path: "courses",
          element: <Home />,
        },
        {
          path: "course/detail",
          element: <AboutCourse />,
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
          ]
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
          loader: draftCourseLoader(queryClient)
        },
      
        {
          path: "courses/draft",
          element: <DraftCourses/>
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
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
