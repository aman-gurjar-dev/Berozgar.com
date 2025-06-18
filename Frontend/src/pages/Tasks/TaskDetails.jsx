import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isApplying, setIsApplying] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axiosInstance.get(`/api/task/${id}`);
        setTask(res.data);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleApply = async () => {
    if (!message.trim()) return;

    try {
      setIsApplying(true);
      const response = await axiosInstance.post(
        "/api/task-applications/apply",
        {
          taskId: id,
          message,
        }
      );
      setSuccess("✅ Application submitted successfully!");
      setMessage("");
    } catch (error) {
      console.error("Failed to apply:", error);
      setSuccess(`❌ Failed to apply for task.`);
    } finally {
      setIsApplying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading Task Details...</p>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold text-red-500">Task not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f5ff] py-10 px-6 md:px-20">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-3xl font-bold mb-4">{task.title}</h2>

        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6">
          <span className="flex items-center gap-2">
            <FaUser /> Posted by: <strong>{task.createdBy?.name}</strong>
          </span>
          <span className="flex items-center gap-2">
            <FaClock /> Deadline:{" "}
            <strong>{new Date(task.deadline).toLocaleDateString()}</strong>
          </span>
          <span className="flex items-center gap-2">
            <FaMoneyBillAlt /> Budget: <strong>₹{task.price}</strong>
          </span>
          <span className="flex items-center gap-2">
            <FaMapMarkerAlt /> Status:{" "}
            <strong className="capitalize">{task.status}</strong>
          </span>
          <span className="flex items-center gap-2">
            Category: <strong>{task.category}</strong>
          </span>
        </div>

        <hr className="my-4" />

        <p className="text-gray-800 whitespace-pre-line">
          <strong>Description:</strong>
          <br />
          {task.description}
        </p>

        <div className="mt-6 text-right">
          <input
            type="text"
            value={message}
            onChange={(e) => {
              setMessage(e.target.value);
              setSuccess("");
            }}
            placeholder="Enter your message"
            className="w-full mb-4 px-4 py-2 border rounded shadow-sm focus:outline-none"
          />
          <button
            onClick={handleApply}
            disabled={isApplying || !message.trim()}
            className="bg-[#5d2fff] text-white px-6 py-2 rounded-full shadow hover:bg-[#4a24d2] transition disabled:opacity-60"
          >
            {isApplying ? "Applying..." : "Apply for Task"}
          </button>
          {success && <p className="mt-2 text-sm text-green-600">{success}</p>}
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
