import "react-toastify/dist/ReactToastify.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { Dashboard, ErrorPage, ForumLayout, HomeLayout, Landing, Login, Register } from "./pages";
import { loader as CoursesLoader } from "./pages/dashboard/AllCourses";
import { action as loginAction } from "./pages/Login";
import { action as registerAction } from "./pages/Register";
import { store } from "./store";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import SocketContext from "@/context/DiscussionContext";
import { JoinClass } from "./components";
import Home from "./pages/course/Courses";
import AboutCourse from "./pages/course/AboutCourse";
import QuestionsList from "./pages/question/QuestionList";
import AddQuestionForm from "./pages/question/PracticeQuestionForm";
import PracticeQuestionPage from "./pages/question/Practice";
<<<<<<< HEAD
import QuizQuestionsList from "./pages/quiz/QuizQuestionsList";
import { Editor } from "./components/textEditor/test";
import AdminRoutes from "./routes/AdminRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";
=======
import UsersList from "./pages/dashboard/UsersList";
import QuizQuestionsList, {
  QuizQuestionsWrapper,
} from "./pages/quiz/QuizQuestionsList";
import { EditCourseError } from "./components/createCourse/error/editCourseError";
import { StarterPage } from "./components/createCourse/components/starterPage";
import ClassroomLayout from "./pages/classroom/ClassroomLayout";
import CreateClassroom, {
  createClassroomAction,
} from "./pages/classroom/CreateClassroom";
import Stats from "./pages/classroom/Stats";
import Classrooms from "./pages/classroom/Classrooms";
import { JoinClass } from "./components";
import { AddQuestion } from "./components/createCourse/quiz/add-questions";
import ClassroomDetails from "./pages/classroom/ClassroomDetails";
import Students from "./pages/classroom/Students";
import { LabPractice } from "./components/practiceQuestions/code-edtior";
import { CreateLab, UpdateLab } from "./components/createCourse/components/create-lab";
import { io } from "socket.io-client";
import SocketContext from "@/context/DiscussionContext";
import StudentsLayout from "./pages/classroom/StudentsLayout";
import InviteForm from "./components/Classroom/InvitationForm";
import InvitationList from "./pages/classroom/Invitations";
>>>>>>> 678f503f8c6eb8664f999a3088df2b1a7ee711bd

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

function App() {
  const user = useSelector((state) => state.userState.user);

  const getDashboardRoutes = () => {
    if (!user) return [];
<<<<<<< HEAD
    if (user.isAdmin) return AdminRoutes;
    if (user.isInstructor) return InstructorRoutes;
    return StudentRoutes; // Assume student role
=======

    let dashboardRoutes = [];
    if (user.isAdmin) {
      dashboardRoutes = [
        { index: true, element: <Status /> },
        {
          path: "profile",
          element: <Profile />,
        },
        { path: "users", element: <UsersList /> },
      ];
    } else if (user.isInstructor) {
      dashboardRoutes = [
        { index: true, element: <Activities /> },
        {
          path: "profile",
          element: <Profile />,
        },
        { path: "add-course", element: <RichTextExample /> },

        {
          path: "courses",
          element: <AllCourses />,
          loader: CoursesLoader(store),
        },
        {
          path: "classrooms",
          element: <ClassroomLayout />,
          children: [
            { index: true, element: <Classrooms /> },
            {
              path: "create",
              element: <CreateClassroom />,
              action: createClassroomAction(store),
            },
            {
              path: ":id",
              element: <ClassroomDetails />,
              children: [
                { index: true, element: <Stats /> },
                {
                  path: "students",
                  element: <StudentsLayout />,
                  children: [
                    {index: true, element: <Students />},
                    { path: "invite", element: <InviteForm /> },
                  ],
                },
                { path: "invitations", element: <InvitationList /> },
                { path: "status", element: <div>Status Page</div> },
                { path: "discussions", element: <ForumLayout />, children: [
                  { path: "", element: <Navigate to="content" /> }, 
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
        },
        {
          path: "courses",
          element: <AllCourses />,
          errorElement: <div>Failed to load courses</div>,
        },
        {
          path: "classrooms",
          element: <ClassroomLayout />,
          children: [
            { index: true, element: <Classrooms /> },
            {
              path: ":id",
              element: <ClassroomDetails />,
              children: [
                { index: true, element: <Stats /> },
                { path: "content", element: <div>Content</div> },
                { path: "progress", element: <div>Progress</div> },
                { path: "discussions", element: <ForumLayout />, children: [
                  { path: "", element: <Navigate to="content" /> }, 
                  {path: "content", element: <Forum />},
                  {path: "myqns", element: <MyQuestions />},
                  {path: "ask", element: <Askquestion />},
                ]},
              ]
            } 
          ]
        },
        {
          path: "courses/:id",
          element: <Lessons />,
        },
        { path: "courses/:id/lessons/:id", element: <LessonDetails /> },

        {
          path: "enrolled-courses",
          element: <EnrolledCourses />,
          // loader: EnrolledCourses(store),
        },
      ];
    }

    return dashboardRoutes;
>>>>>>> 678f503f8c6eb8664f999a3088df2b1a7ee711bd
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeLayout />,
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
      ],
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
      errorElement: <ErrorPage />,
      children: [
        ...getDashboardRoutes(),





        // {
        //   path: "course",
        //   element: <CreateCourse />,
        // },
        // {
        //   path: "course/update/:id",
        //   children: [
        //     { index: true, element: <UpdateCourse /> },
        //     { path: "lab", element: <CreateLab /> },
        //     { path: "lab/:labId", element: <UpdateLab /> },
        //     { path: "lab/:labId/view", element: <LabPractice /> },
        //     {
        //       path: "chapters",
        //       element: <CourseLayout />,
        //       children: [
        //         { index: true, element: <StarterPage /> },
        //         {
        //           path: ":chapterId/lessons/:lessonId",
        //           element: <RichTextExample />,
        //         },
        //         { path: ":chapterId/add-test", element: <QuizBoard /> },
        //         {
        //           path: ":chapterId/add-test/:quizId",
        //           element: <QuizQuestionsWrapper />,
        //           children: [
        //             { index: true, element: <QuizQuestionsList /> },
        //             { path: "question", element: <AddQuestion /> },
        //             { path: "question/:questionId", element: <AddQuestion /> },
        //           ],
        //         },
        //       ],
        //     },
        //   ],
        // },
        // {
        //   path: "courses/draft",
        //   element: <DraftCourses />,
        // },
        // {
        //   path: "course/update/:id/chapters",
        //   element: <CourseLayout />,
        //   children: [
        //     { index: true, element: <StarterPage /> },
        //     {
        //       path: ":chapterId/lessons/:lessonId",
        //       element: <RichTextExample />,
        //     },
        //     { path: ":chapterId/add-test", element: <QuizBoard /> },
        //     {
        //       path: ":chapterId/add-test/:quizId",
        //       element: <QuizQuestionsWrapper />,
        //       children: [
        //         { index: true, element: <QuizQuestionsList /> },
        //         { path: "question", element: <AddQuestion /> },
        //         { path: "question/:questionId", element: <AddQuestion /> },
        //       ],
        //     },
        //   ],
        // },
      ],
    },
   

  ]);

  return (
    <QueryClientProvider client={queryClient} contextSharing={true}>
      <SocketContext.Provider value={socket}>
        <RouterProvider router={router} />
        <Toaster position="top-center" reverseOrder={false} />
        <ReactQueryDevtools />
      </SocketContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
