import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { SparklesCore } from "../Components/ui/sparkles";

const DashboardLayout = () => (
  <div className="flex h-screen w-screen bg-black overflow-x-hidden">
    <SparklesCore
      id="tsparticlesfullpage"
      background="transparent"
      minSize={0.6}
      maxSize={1.4}
      particleDensity={80}
      className="absolute inset-0 "
      particleColor="#FFFFFF"
    />
    <Sidebar />
    <main className="flex-1 flex justify-center items-start ">
      <Outlet />
    </main>
  </div>
);

export default DashboardLayout;
