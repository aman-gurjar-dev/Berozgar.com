import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axios";
import moment from "moment";

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
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading your tasks...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ebe6fd] px-4 py-10 lg:px-32">
      <h2 className="text-3xl font-bold text-center mb-10">My Tasks</h2>

      <div className="space-y-6">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-xl px-6 py-4 shadow-sm flex justify-between items-center"
          >
            <div>
              <h3 className="text-lg font-bold mb-1">{task.title}</h3>
              <p className="text-sm text-gray-600">{`${task.location.area}, ${task.location.city}`}</p>
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
  );
};

export default MyTasks;
