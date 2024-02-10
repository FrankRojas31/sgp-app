import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuthStore } from '../stores/Auth/authStore.jsx';

const PrivateRoute = ({ allowRoles }) => {
  const useUser = useAuthStore((state) => state.user);

  if (!useUser) {
    return <Navigate to="/login" />;
  }

  if (!allowRoles.some(word => useUser.roles.includes(word))) {
    return <Navigate to="/notfound" />;
  }

  return <Outlet />;
};

export default PrivateRoute;