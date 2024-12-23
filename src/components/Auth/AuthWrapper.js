import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebaseConfig"; // Import your Firebase auth object

const AuthWrapper = ({ children }) => {
  const user = auth.currentUser; // Check the current authenticated user
    console.log(user,"diwdw",auth);
  if (!user) {
    // If no user is logged in, redirect to the login page
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>; // Render children if the user is authenticated
};

export default AuthWrapper;
