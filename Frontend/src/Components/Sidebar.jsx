import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/dashboard/mytasks", label: "My Tasks" },
  { to: "/dashboard/postjob", label: "Post Task" },
  { to: "/dashboard/message", label: "Message" },
];

const Sidebar = () => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axiosInstance.get("api/auth/logout");
      navigate("/login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <aside className="fixed top-0 left-0 h-screen w-[20vw] bg-gradient-to-b from-[#f4f0ff] to-[#dad3ff] shadow-xl flex flex-col py-10 px-6 text-gray-800 z-50">
      <div className="mb-10 text-3xl font-extrabold text-center tracking-wider drop-shadow-lg">
        <span className="text-[#3a2e6c]">Berozgar</span>
        <span className="text-[#7b5eff]">.com</span>
      </div>
      <nav className="flex flex-col gap-4">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) =>
              `px-5 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 hover:shadow-md ${
                isActive
                  ? "bg-white text-[#5a29e4] shadow-lg"
                  : "hover:bg-white/60 hover:scale-[1.03]"
              }`
            }
            end
          >
            {item.label}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          disabled={loggingOut}
          className="mt-6 px-5 py-3 rounded-xl text-base font-semibold tracking-wide text-white bg-red-500 hover:bg-red-600 transition-all duration-200 hover:scale-105 disabled:opacity-60"
        >
          {loggingOut ? "Logging out..." : "Logout"}
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;
