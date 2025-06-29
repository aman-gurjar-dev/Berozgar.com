import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UseAuth } from "../context/AuthProvider";
import axiosInstance from "../config/axios";
import { FiMenu, FiX } from "react-icons/fi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const { authUser } = UseAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let navItems = [];

  if (authUser?.role === "poster") {
    navItems = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/dashboard/mytasks", label: "My Tasks" },
      { to: "/dashboard/postjob", label: "Post Task" },
      { to: "/dashboard/message", label: "Message" },
    ];
  } else {
    navItems = [
      { to: "/dashboard", label: "Dashboard" },
      { to: "/dashboard/alltasks", label: "Tasks" },
      { to: "/dashboard/myapplications", label: "My Applications" },
      { to: "/dashboard/message", label: "Message" },
    ];
  }

  const handleLogout = async () => {
    setLoggingOut(true);
    try {
      await axiosInstance.get("api/auth/logout");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (err) {
      alert("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/50 z-[900] md:hidden"
        />
      )}

      {/* Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-[1001]">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-black text-white border border-gray-700 shadow-md rounded-full"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[75vw] md:w-auto  text-white shadow-xl flex flex-col py-10 px-6 z-[1000] transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mb-10 text-3xl font-extrabold text-center tracking-wider drop-shadow-lg">
          <span className="text-white">Berozgar</span>
          <span className="text-purple-500">.com</span>
        </div>

        <nav className="flex flex-col gap-3 flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `px-5 py-3 rounded-xl text-base font-semibold tracking-wide transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-purple-700 text-white shadow-md"
                    : "hover:bg-white/10"
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
            className="mt-6 px-5 py-3 rounded-xl text-base font-semibold tracking-wide bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105 disabled:opacity-60"
          >
            {loggingOut ? "Logging out..." : "Logout"}
          </button>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
