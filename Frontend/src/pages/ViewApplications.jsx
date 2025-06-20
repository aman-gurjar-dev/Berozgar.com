import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700 border-yellow-400",
  approved: "bg-green-100 text-green-700 border-green-400",
  rejected: "bg-red-100 text-red-700 border-red-400",
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
      <div className="min-h-screen flex justify-center items-center ml-72">
        <div className="w-12 h-12 border-4 border-[#7b5eff] border-t-transparent rounded-full animate-spin"></div>
        <p className="text-lg font-semibold ml-4 text-[#7b5eff]">
          Loading applications...
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center ml-72">
        <p className="text-lg font-semibold text-gray-600">
          No applications found for this task.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="h-screen w-full ml-72 px-6 py-10 bg-gradient-to-br from-[#f6f7ff] to-[#e9ecff]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <h2 className="text-4xl font-bold text-center mb-12 text-[#1100D1] tracking-wide">
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
            className="bg-white p-6 rounded-2xl shadow-lg border border-[#e4e4e7] space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-[#1100D1]">
                {app.applicant?.name}
              </h3>
              <p className="text-sm text-gray-500">{app.applicant?.email}</p>
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-semibold">Message:</span> {app.message}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-4 py-1 rounded-full border text-sm font-medium capitalize ${
                  statusColor[app.status] || "bg-gray-100 text-gray-600"
                }`}
              >
                {app.status}
              </span>

              {app.status === "pending" && (
                <button
                  onClick={() => handleAccept(app)}
                  className="bg-[#1100D1] hover:bg-[#0e00aa] text-white px-5 py-2 rounded-full text-sm font-semibold transition"
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
