import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check for the auth token in localStorage
  const token = localStorage.getItem('authToken');

  if (!token) {
    // If no token, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If token exists, render the children components (the protected layout and pages)
  return children;
};

export default ProtectedRoute;