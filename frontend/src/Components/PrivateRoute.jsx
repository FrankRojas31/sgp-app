import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/Auth/authStore';

const PrivateRoute = () => {
  const useUser = useAuthStore((state) => state.user);

  if (!useUser) {
    return <Navigate to="/login" />;
  }

  if (!useUser.roles.includes('member')) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;