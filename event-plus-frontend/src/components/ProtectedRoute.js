/*
REFERENCE (Following link is referred for conceptual reference): 
- Gathoni, M. (2023) Protected routes in React. Available at: https://www.makeuseof.com/create-protected-route-in-react/?utm_source=chatgpt.com
*/

import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return children;
}
