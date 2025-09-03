// src/components/ProfileCompletionGuard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProfileCompletionGuard = ({ children }) => {
  const userString = localStorage.getItem('user');
  
  if (!userString) {
    // Should be handled by ProtectedRoute, but as a fallback
    return <Navigate to="/login" />;
  }

  const user = JSON.parse(userString);

  // THE CORE LOGIC:
  // If the user HAS completed their profile, DON'T show the form.
  // Redirect them away to their main dashboard.
  if (user.hasCompletedProfile) {
    return <Navigate to="/dashboard" />;
  }

  // Otherwise, if the profile is NOT complete, allow access to the form.
  return children;
};

export default ProfileCompletionGuard;