import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const AuthRedirect = () => {
  const user = useSelector((state) => state.userState.user);

  if (user) {
    if (user.isAdmin) return <Navigate to="/dashboard/admin" />;
    if (user.isInstructor) return <Navigate to="/dashboard/instructor" />;
    return <Navigate to="/dashboard/student" />;
  }

  return <Navigate to="/landing" />;
};

export default AuthRedirect;
