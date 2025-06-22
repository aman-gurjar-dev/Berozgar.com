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

  // Close sidebar on route change or window resize
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
      {/* Overlay when sidebar is open on mobile */}
      {isOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/30 z-[900] md:hidden"
        />
      )}

      {/* Hamburger menu */}
      <div className="md:hidden fixed top-4 left-4 z-[1001]">
        <button
          onClick={toggleSidebar}
          className="p-2 bg-white shadow-md rounded-full text-purple-700"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-[75vw] md:w-auto bg-gradient-to-b from-[#f4f0ff] to-[#dad3ff] shadow-xl flex flex-col py-10 px-6 text-gray-800 z-[1000] transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}
      >
        <div className="mb-10 text-3xl font-extrabold text-center tracking-wider drop-shadow-lg">
          <span className="text-[#3a2e6c]">Berozgar </span>
          <span className="text-[#7b5eff]">.com</span>
        </div>

        <nav className="flex flex-col gap-3 overflow-y-auto flex-grow">
          {navItems.map((item) => (
            <NavLink
              key={item.label}
              to={item.to}
              onClick={closeSidebar}
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
    </>
  );
};

export default Sidebar;
