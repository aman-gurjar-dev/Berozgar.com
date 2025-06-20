import React from "react";
import AppRoutes from "./Routes/AppRoutes";
import Navbar from "./Components/Navbar";

const App = () => {
  return (
    <>
      <div className="h-screen w-screen">
        <AppRoutes />
      </div>
    </>
  );
};

export default App;
