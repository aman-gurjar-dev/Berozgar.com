import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UseAuth } from "../context/AuthProvider";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const { authUser, setAuthUser } = UseAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get("http://localhost:3000/api/auth/protected", {
          withCredentials: true, // <-- needed for cookie to be sent
        });
        setIsAuthenticated(true);
      } catch (error) {
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return children;
};

export default ProtectedRoute;
