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
import QuizQuestionsList from "./pages/quiz/QuizQuestionsList";
import { Editor } from "./components/textEditor/test";
import AdminRoutes from "./routes/AdminRoutes";
import InstructorRoutes from "./routes/InstructorRoutes";
import StudentRoutes from "./routes/StudentRoutes";

const queryClient = new QueryClient();

export const socket = io("http://localhost:5000", {
  withCredentials: true,
  secure: true,
});

function App() {
  const user = useSelector((state) => state.userState.user);

  const getDashboardRoutes = () => {
    if (!user) return [];
    if (user.isAdmin) return AdminRoutes;
    if (user.isInstructor) return InstructorRoutes;
    return StudentRoutes; // Assume student role
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
