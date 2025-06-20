import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import moment from "moment";
import { motion } from "framer-motion";

const statusStyles = {
  open: "bg-yellow-200 text-yellow-800",
  "in-progress": "bg-blue-200 text-blue-800",
  completed: "bg-green-200 text-green-800",
};

const MyTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  return loading ? (
    <div className="min-h-screen flex flex-col justify-center items-center ml-72">
      <div className="w-12 h-12 border-4 border-[#7b5eff] border-t-transparent rounded-full animate-spin"></div>
      <p className="text-lg font-semibold mt-4 text-[#7b5eff]">
        Loading your tasks...
      </p>
    </div>
  ) : (
    <motion.div
      className="h-full w-full overflow-y-auto ml-72 px-4 py-10 bg-gradient-to-br from-[#f5f7ff] to-[#e6ebff]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl w-full mx-auto">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12 text-[#1100D1] tracking-wide drop-shadow-md"
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
              className="bg-white rounded-2xl px-6 py-5 shadow-lg hover:shadow-2xl transition-shadow border border-[#e2e8f0] flex justify-between items-center"
            >
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-[#1100D1]">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-500">
                  📍 {task.location.area}, {task.location.city}
                </p>
                <p className="text-sm text-gray-700">
                  ⏳ Due:{" "}
                  <span className="font-semibold">
                    {moment(task.deadline).format("D MMM YYYY")}
                  </span>
                </p>
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    statusStyles[task.status] || "bg-gray-300 text-gray-700"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <button
                  onClick={() =>
                    navigate(`/dashboard/applications/${task._id}`)
                  }
                  className="text-sm text-blue-600 hover:underline font-medium"
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
