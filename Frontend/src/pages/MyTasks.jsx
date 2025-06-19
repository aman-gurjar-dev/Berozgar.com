import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import moment from "moment";
import { motion } from "framer-motion";

const statusStyles = {
  open: "bg-gray-300 text-black",
  "in-progress": "bg-blue-700 text-white",
  completed: "bg-gray-800 text-white",
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

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center ml-72">
        <p className="text-lg font-semibold">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full w-full max-w-5xl overflow-y-auto px-4 py-10 ml-72"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-3xl w-full mx-auto">
        <h2 className="text-3xl font-extrabold text-center mb-10 text-[#1100D1] tracking-wide drop-shadow-lg">
          My Tasks
        </h2>
        <div className="space-y-8">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-white rounded-2xl px-8 py-6 shadow-lg flex justify-between items-center border border-[#ececec]"
            >
              <div>
                <h3 className="text-xl font-bold mb-1 text-[#1100D1]">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {`${task.location.area}, ${task.location.city}`}
                </p>
                <p className="text-sm font-medium mt-1">
                  Due Date:{" "}
                  <span className="font-semibold">
                    {moment(task.deadline).format("D MMM YYYY")}
                  </span>
                </p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-4 py-1 rounded-full text-sm font-semibold ${
                    statusStyles[task.status] || "bg-gray-400"
                  }`}
                >
                  {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                </span>
                <button
                  className="text-sm underline text-blue-800 hover:text-blue-900"
                  onClick={() => navigate(`/applications/${task._id}`)}
                >
                  No of Applications
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MyTasks;
