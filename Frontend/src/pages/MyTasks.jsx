import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import moment from "moment";
import { motion } from "framer-motion";

const statusStyles = {
  open: "bg-yellow-700 text-yellow-100",
  "in-progress": "bg-blue-700 text-blue-100",
  completed: "bg-green-700 text-green-100",
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarWide, setIsSidebarWide] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarWide(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.get("/api/task/user/getmytask");
        setTasks(res.data.tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen text-white flex flex-col justify-center items-center ${
          isSidebarWide ? "md:ml-[280px]" : ""
        }`}
      >
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold mt-4 text-purple-300">
          Loading your tasks...
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={`min-h-screen w-full overflow-y-auto px-4 sm:px-6 md:px-10 py-10  text-white transition-all duration-300 ${
        isSidebarWide ? "md:ml-[280px]" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          className="text-2xl sm:text-4xl font-extrabold text-center mb-12 text-white tracking-wide drop-shadow-md"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Posted Tasks
        </motion.h2>

        <motion.div layout className="space-y-6">
          {tasks.map((task, index) => (
            <motion.div
              key={task._id}
              layout
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1e293b] rounded-2xl px-6 py-5 shadow-md hover:shadow-xl transition-shadow border border-gray-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-purple-400">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-400">
                  📍 {task.location.area}, {task.location.city}
                </p>
                <p className="text-sm text-gray-300">
                  ⏳ Due:{" "}
                  <span className="font-semibold text-white">
                    {moment(task.deadline).format("D MMM YYYY")}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-start sm:items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusStyles[task.status] || "bg-gray-600 text-gray-100"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <button
                  onClick={() =>
                    navigate(`/dashboard/applications/${task._id}`)
                  }
                  className="text-sm text-blue-400 hover:underline relative z-10 font-medium"
                >
                  View Applications
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MyTasks;
