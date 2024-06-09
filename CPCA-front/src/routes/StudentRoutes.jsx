import { Lessons } from '@/pages';
import { AllCourses, EnrolledCourses, Profile, Status } from '@/pages/dashboard';
import LessonDetails from '@/pages/LessonDetails';
import React from 'react';

const StudentRoutes = [
  { index: true, element: <Status /> },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'courses',
    element: <AllCourses />,
    errorElement: <div>Failed to load courses</div>,
  },
  {
    path: 'courses/:id',
    element: <Lessons />,
  },
  {
    path: 'courses/:id/lessons/:id',
    element: <LessonDetails />,
  },
  {
    path: 'enrolled-courses',
    element: <EnrolledCourses />,
  },
];

export default StudentRoutes;
