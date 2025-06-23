import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../config/axios";
import {
  FaMapMarkerAlt,
  FaUser,
  FaClock,
  FaMoneyBillAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

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
    <>
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            fill="#5B55CA"
            fillOpacity="0.35"
            d="M0,320L1440,128L1440,320L0,320Z"
            initial={{ pathLength: 0, x: 30 }}
            animate={{ pathLength: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <div className="h-[90vh] py-20 px-6 md:px-20">
        <motion.div
          className="max-w-3xl mx-auto bg-[#dccece28] shadow-lg rounded-xl p-8"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <motion.h2
            className="text-3xl font-bold mb-4"
            custom={0}
            variants={fadeInUp}
          >
            {task.title}
          </motion.h2>

          <motion.div
            className="flex flex-wrap gap-4 text-sm text-gray-600 mb-6"
            custom={1}
            variants={fadeInUp}
          >
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
          </motion.div>

          <hr className="my-4" />

          <motion.p
            className="text-gray-800 whitespace-pre-line"
            custom={2}
            variants={fadeInUp}
          >
            <strong>Description:</strong>
            <br />
            {task.description}
          </motion.p>

          <motion.div
            className="mt-6 text-right"
            custom={3}
            variants={fadeInUp}
          >
            <motion.input
              type="text"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSuccess("");
              }}
              placeholder="Enter your message"
              className="w-full mb-4 px-4 py-2 border rounded shadow-sm focus:outline-none"
              whileFocus={{ scale: 1.01 }}
            />
            <motion.button
              onClick={handleApply}
              disabled={isApplying || !message.trim()}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#5d2fff] text-white px-6 py-2 rounded-full shadow hover:bg-[#4a24d2] transition disabled:opacity-60"
            >
              {isApplying ? "Applying..." : "Apply for Task"}
            </motion.button>

            {success && (
              <motion.p
                className="mt-2 text-sm text-green-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {success}
              </motion.p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default TaskDetails;
