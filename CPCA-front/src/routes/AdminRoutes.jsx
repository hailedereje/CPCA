import React from 'react';
import { Status, Profile } from'@/pages/dashboard';
import UsersList from '@/pages/dashboard/UsersList';

const AdminRoutes = [
  { index: true, element: <Status /> },
  {
    path: 'profile',
    element: <Profile />,
  },
  {
    path: 'users',
    element: <UsersList />,
  },
];

export default AdminRoutes;
