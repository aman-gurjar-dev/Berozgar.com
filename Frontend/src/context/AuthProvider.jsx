import React, { createContext, useContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const token = Cookies.get("token");
  const user = localStorage.getItem("user");

  const [authUser, setAuthUser] = useState(user ? JSON.parse(user) : undefined);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UseAuth = () => useContext(AuthContext);
