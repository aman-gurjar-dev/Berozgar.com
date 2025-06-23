import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => (
  <div className="flex h-screen w-screen bg-[#f5f6fa] overflow-x-hidden">
    <Sidebar />
    <main className="flex-1 flex justify-center items-start ">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
