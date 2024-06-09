import React from 'react';

import { store } from '@/store';
import { Activities, AllCourses, Profile } from '@/pages/dashboard';
import RichTextExample from '@/components/textEditor/textEditor';
import ClassroomLayout from '@/pages/classroom/ClassroomLayout';
import Classrooms from '@/pages/classroom/Classrooms';
import CreateClassroom, { createClassroomAction } from '@/pages/classroom/CreateClassroom';
import ClassroomDetails from '@/pages/classroom/ClassroomDetails';
import Stats from '@/pages/classroom/Stats';
import StudentsLayout from '@/pages/classroom/StudentsLayout';
import Students from '@/pages/classroom/Students';
import StudentDetails from '@/pages/classroom/StudentDetails';
import { ForumLayout, MyQuestions } from '@/pages';
import Forum from '@/pages/forum/Forum';
import Askquestion from '@/pages/forum/Askquestion';
import {loader as CoursesLoader} from '@/pages/dashboard/AllCourses';
import InviteForm from '@/components/Classroom/InvitationForm';
const InstructorRoutes = [
  { index: true, element: <Activities /> },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'add-course',
    element: <RichTextExample />,
  },
  {
    path: 'courses',
    element: <AllCourses />,
    loader: CoursesLoader(store),
  },
  {
    path: 'classrooms',
    element: <ClassroomLayout />,
    children: [
      { index: true, element: <Classrooms /> },
      {
        path: 'create',
        element: <CreateClassroom />,
        action: createClassroomAction(store),
      },
      {
        path: ':id',
        element: <ClassroomDetails />,
        children: [
          { index: true, element: <Stats /> },
          {
            path: 'students',
            element: <StudentsLayout />,
            children: [
              { index: true, element: <Students /> },
              { path: ':studentId', element: <StudentDetails /> },
              { path: 'invite', element: <InviteForm /> },
            ],
          },
          { path: 'invitations', element: <div>Invitations Page</div> },
          { path: 'status', element: <div>Status Page</div> },
          {
            path: 'discussions',
            element: <ForumLayout />,
            children: [
              // { path: '', element: <Navigate to='content' /> },
              { path: 'content', element: <Forum /> },
              { path: 'myqns', element: <MyQuestions /> },
              { path: 'ask', element: <Askquestion /> },
            ],
          },
        ],
      },
    ],
  },
];

export default InstructorRoutes;
