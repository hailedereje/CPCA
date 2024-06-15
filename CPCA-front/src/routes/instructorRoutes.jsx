import React from "react";

import { Activities, AllCourses, Profile, Status } from "@/pages/dashboard";
import ClassroomLayout from "@/pages/classroom/ClassroomLayout";
import Classrooms from "@/pages/classroom/Classrooms";
import CreateClassroom, { createClassroomAction } from "@/pages/classroom/CreateClassroom";
import ClassroomDetails from "@/pages/classroom/ClassroomDetails";
import Stats from "@/pages/classroom/Stats";
import StudentsLayout from "@/pages/classroom/StudentsLayout";
import Students from "@/pages/classroom/Students";
import InviteForm from "@/components/Classroom/InvitationForm";
import InvitationList from "@/pages/classroom/Invitations";
import { ForumLayout, MyQuestions } from "@/pages";
import Forum from "@/pages/forum/Forum";
import Askquestion from "@/pages/forum/Askquestion";
import {loader as CoursesLoader} from "@/pages/dashboard/AllCourses";
import RichTextExample from "@/components/textEditor/textEditor";
import StudentDetails from "@/pages/classroom/StudentDetails";
import InstructorLandingPage from "@/pages/instructorLandingPage";

const instructorRoutes = (store) => [
  { index: true, element: <InstructorLandingPage /> },
  { path: "profile", element: <Profile /> },
  // { path: "add-course", element: <RichTextExample /> },
  { path: "courses", element: <AllCourses />, loader: CoursesLoader(store) },
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
              { index: true, element: <Students /> },
              { path: "invite", element: <InviteForm /> },
              { path: ':studentId', element: <StudentDetails />}
            ],
          },
          { path: "invitations", element: <InvitationList /> },
          { path: "status", element: <Status /> },
          {
            path: "discussions",
            element: <ForumLayout />,
            children: [
              { index:true, element: <Forum /> },
              { path: "myqns", element: <MyQuestions /> },
              { path: "ask", element: <Askquestion /> },
            ],
          },
        ],
      },
    ],
  },
];

export default instructorRoutes;
