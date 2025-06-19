import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex min-h-screen bg-[#f5f6fa]">
    <Sidebar />
    <main className="flex-1 flex justify-center items-start p-8">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout; 