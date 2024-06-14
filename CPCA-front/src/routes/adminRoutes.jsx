import { QuizBoard } from "@/components/createCourse/QuizBoard";
import { CreateLab, UpdateLab } from "@/components/createCourse/components/create-lab";
import { StarterPage } from "@/components/createCourse/components/starterPage";
import { CreateCourse } from "@/components/createCourse/createCourse";
import { Courses } from "@/components/createCourse/courses";
import { CourseLayout } from "@/components/createCourse/layout";
import { AddQuestion } from "@/components/createCourse/quiz/add-questions";
import { UpdataCourse } from "@/components/createCourse/updateCourse";
import { LabPractice } from "@/components/practiceQuestions/code-edtior";
import RichTextExample from "@/components/textEditor/textEditor";
import { Profile } from "@/pages/dashboard";
import UsersList from "@/pages/dashboard/UsersList";
import QuizQuestionsList, { QuizQuestionsWrapper } from "@/pages/quiz/QuizQuestionsList";
import React from "react";
import StatisticsPage from "@/pages/dashboard/Status";

const adminRoutes = [
  { index: true, element: <StatisticsPage /> },
  { path: "profile", element: <Profile /> },
  { path: "users", element: <UsersList /> },
  { path: "course", children: [
    { path: "create", element: <CreateCourse /> },
    { index: true, element: <Courses />},
    { path: "update/:id", children: [
      { index: true, element: <UpdataCourse/>},
      { path: "lab", element: <CreateLab /> },
      { path: "lab/:labId", element: <UpdateLab /> },
      { path: "lab/:labId/view", element: <LabPractice /> },
      { path: "chapters", element: <CourseLayout />, children: [
        { index: true, element: <StarterPage /> },
        { path: ":chapterId/lessons/:lessonId", element: <RichTextExample /> },
        { path: ":chapterId/add-test", element: <QuizBoard /> },
        { path: ":chapterId/add-test/:quizId", element: <QuizQuestionsWrapper />, children: [
          { index: true, element: <QuizQuestionsList /> },
          { path: "question", element: <AddQuestion /> },
          { path: "question/:questionId", element: <AddQuestion /> },
         ]
        }
      ]
    }],
    },
  ]
  },

    
];

export default adminRoutes;