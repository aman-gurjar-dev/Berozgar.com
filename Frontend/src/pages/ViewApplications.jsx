import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

const statusColor = {
  pending: "bg-yellow-800 text-yellow-100 border-yellow-500",
  approved: "bg-green-800 text-green-100 border-green-500",
  rejected: "bg-red-800 text-red-100 border-red-500",
};

const ViewApplications = () => {
  const { taskId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchApplications = async () => {
    try {
      const res = await axiosInstance.get(`api/task-applications/${taskId}`);
      setApplications(res.data.applications || []);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (application) => {
    try {
      await axiosInstance.post("api/task-applications/approve", {
        applicationId: application.applicant._id,
        taskId: application.task,
      });
      fetchApplications();
    } catch (error) {
      console.error("Error approving application:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [taskId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white ml-72">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold ml-4 text-purple-300">
          Loading applications...
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f172a] text-white ml-72">
        <p className="text-lg font-semibold text-gray-300">
          No applications found for this task.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="min-h-screen w-full ml-72 px-6 py-10  text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-white tracking-wide">
        Task Applications
      </h2>

      <div className="max-w-4xl mx-auto grid gap-6">
        {applications.map((app, index) => (
          <motion.div
            key={app._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="bg-[#1e293b] p-6 rounded-2xl shadow-md border border-gray-700 space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-purple-400">
                {app.applicant?.name}
              </h3>
              <p className="text-sm text-gray-400">{app.applicant?.email}</p>
            </div>

            <div>
              <p className="text-gray-300">
                <span className="font-semibold text-white">Message:</span>{" "}
                {app.message}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-4 py-1 rounded-full border text-sm font-medium capitalize ${
                  statusColor[app.status] || "bg-gray-600 text-gray-200"
                }`}
              >
                {app.status}
              </span>

              {app.status === "pending" && (
                <button
                  onClick={() => handleAccept(app)}
                  className="bg-purple-600 hover:bg-purple-700 relative z-10 text-white px-5 py-2 rounded-full text-sm font-semibold transition"
                >
                  Accept Application
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ViewApplications;
