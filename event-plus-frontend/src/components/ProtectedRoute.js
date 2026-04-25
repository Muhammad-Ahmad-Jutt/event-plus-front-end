/*
  REFERENCE (Following link is referred for conceptual reference): 
  - Gathoni, M. (2023) Protected routes in React. Available at: https://www.makeuseof.com/create-protected-route-in-react
*/

import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token, authLoading } = useContext(AuthContext);
  const location = useLocation();

  if (authLoading) {
    return null;
  }

  if (!token) {
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  return children;
}
