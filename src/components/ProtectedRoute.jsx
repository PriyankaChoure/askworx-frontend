import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { user, tokens } = useSelector((state) => state.auth);

  // Check if user is authenticated
  if (!tokens || !user) {
    return <Navigate to="/login" replace />;
  }

  // Check if first login password reset is required
  if (user.isFirstLogin) {
    return <Navigate to="/reset-password" replace />;
  }

  // Check if admin access is required
  if (adminOnly && user.role !== 'Super Admin') {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;