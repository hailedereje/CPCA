import React from "react";

import { AllCourses, Profile, Status } from "@/pages/dashboard";
import ClassroomLayout from "@/pages/classroom/ClassroomLayout";
import Classrooms from "@/pages/classroom/Classrooms";
import ClassroomDetails from "@/pages/classroom/ClassroomDetails";
import Stats from "@/pages/classroom/Stats";
import { ForumLayout, MyQuestions } from "@/pages";
import Forum from "@/pages/forum/Forum";
import Askquestion from "@/pages/forum/Askquestion";
import {loader as CoursesLoader} from "@/pages/dashboard/AllCourses";
import { Navigate } from "react-router-dom";
import { LabPractice } from "@/components/practiceQuestions/code-edtior";
import CourseDetails from "@/pages/course/CourseDetails";
import { Quiz } from "@/components/Quiz";
import StudentDetails from "@/pages/classroom/StudentDetails";
import StudentLandingPage from "@/pages/studentLandingPage";

const studentRoutes = (store) => [
  // { index: true, element: <Status /> },
  { index: true, element: <StudentLandingPage />},
  { path: "profile", element: <Profile /> },
  { path: "courses", element: <AllCourses />, loader: CoursesLoader(store), errorElement: <div>Failed to load courses</div> },
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
          { path: "content", element: <CourseDetails /> },
          { path: "content/labs/:labId", element: <LabPractice /> },
          { path: "content/quizzes/:quizId", element: <Quiz /> },
          { path: "progress/:studentId", element: <StudentDetails /> },
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
];

export default studentRoutes;
