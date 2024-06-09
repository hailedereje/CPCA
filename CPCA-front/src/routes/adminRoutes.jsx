import CreateCourse from "@/features/course/createCourse";
import { Profile, Status } from "@/pages/dashboard";
import UsersList from "@/pages/dashboard/UsersList";
import React from "react";

const adminRoutes = [
  { index: true, element: <Status /> },
  { path: "profile", element: <Profile /> },
  { path: "users", element: <UsersList /> },
    
];

export default adminRoutes;





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