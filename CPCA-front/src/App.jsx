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
import { action, action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { action as EditProfileAction } from "./pages/dashboard/Profile";
import { store } from "./store";
import {
  Activities,
  AllCourses,
  // CreateCourse,
  EnrolledCourses,
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
// import { draftCourseLoader } from "./loader/draftCourseLoader";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import Home from "./pages/course/Courses";
import AboutCourse from "./pages/course/AboutCourse";
import QuestionsList from "./pages/question/QuestionList";
import AddQuestionForm from "./pages/question/PracticeQuestionForm";
import PracticeQuestionPage from "./pages/question/Practice";
import UsersList from "./pages/dashboard/UsersList";
import QuizQuestionsList, { QuizQuestionsWrapper } from "./pages/quiz/QuizQuestionsList";
import { EditCourseError } from "./components/createCourse/error/editCourseError";
import { StarterPage } from "./components/createCourse/components/starterPage";
import ClassroomLayout from "./pages/classroom/ClassroomLayout";
import CreateClassroom, { createClassroomAction } from "./pages/classroom/CreateClassroom";
import Stats from "./pages/classroom/Stats";
import Classrooms from "./pages/classroom/Classrooms";
import { JoinClass } from "./components";
import { AddQuestion } from "./components/createCourse/quiz/add-questions";
import ClassroomDetails from "./pages/classroom/ClassroomDetails";
import Students from "./pages/classroom/Students";



const queryClient = new QueryClient();

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
        { path: "users", element: <UsersList /> },
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
        {
          path: 'classrooms',
          element: <ClassroomLayout />,
          children: [
            { index: true, element: <Classrooms/>},
            { path: "create", element: <CreateClassroom/>, action: createClassroomAction(store)}, 
            {
              path: ":id",
              element: <ClassroomDetails />,
              children: [
                { index: true, element: <div>Details Page</div> },
                { path: "students", element: <Students />},
                { path: "invitations", element: <div>Invitations Page</div> },
                { path: "status", element: <div>Status Page</div> },
                { path: "discussion", element: <ForumLayout />, children: [
                  {path: "content", element: <Forum />},
                  {path: "myqns", element: <MyQuestions />},
                  {path: "ask", element: <Askquestion />},
                ]},
              ]
            }            // {path: 'classrooms', element: <Classrooms />}
           
          ]
        }
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
          path: "register/:token?",
          element: <Register />,
          action: registerAction(store),
        },
        {
          path: "login",
          element: <Login />,
          action: loginAction(store),
        },
        {
          path: "join/:token",
          element: <JoinClass />,
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
          path: "practice_question/add",
          element: <AddQuestionForm />,
        },
        {
          path: "practice_question",
          element: <QuestionsList />,
        },
        {
          path: "practice_question/:id",
          element: <PracticeQuestionPage />,
        },
        {
          path: "quiz_question",
          element: <QuizQuestionsList />,
        },
        {
          path: "forum",
          element: <ForumLayout classroomId={"665a1674842f8630ac9bfd69"} />,
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
          // loader: draftCourseLoader(queryClient)
        },
      
        {
          path: "courses/draft",
          element: <DraftCourses/>
        },

        {
          path:'course/update/:id/chapters',
          element: <CourseLayout/>,
          // errorElement:<EditCourseError/>,
          children: [
           { index: true, element: <StarterPage/>},
           { path: ":chapterId/lessons/:lessonId",element:<RichTextExample/>},
           { path: ":chapterId/add-test",element:<QuizBoard/>},
           { 
            path: ":chapterId/add-test/:quizId",
            element:<QuizQuestionsWrapper/>,
            children: [
              {index:true,element: <QuizQuestionsList/>},
              { path: "question",element:<AddQuestion/>},
              { path: "question/:questionId",element:<AddQuestion/>}
            ]
          },
           
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
      <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
      <ReactQueryDevtools/>
    </QueryClientProvider>
  );
}

export default App;
