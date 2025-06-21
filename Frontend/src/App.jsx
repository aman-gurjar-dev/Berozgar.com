import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./Routes/AppRoutes"; // import your central router config
import { AuthContext, AuthProvider } from "./context/AuthProvider.jsx";

const App = () => {
  return (
    <AuthProvider>
      <div className="h-screen w-screen">
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
