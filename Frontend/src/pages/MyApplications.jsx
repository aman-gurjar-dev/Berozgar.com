import React, { useEffect, useState } from "react";
import axios from "../config/axios";
import moment from "moment";
import { motion } from "framer-motion";

const statusStyles = {
  pending: "bg-yellow-500 text-white",
  approved: "bg-green-600 text-white",
  rejected: "bg-red-500 text-white",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarWide, setIsSidebarWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarWide(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          "api/task-applications/fetchmyapplications/me"
        );
        setApplications(res.data.applications || []);
      } catch (error) {
        console.log("Failed to fetch applications", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, []);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center px-6 ${
          isSidebarWide ? "md:ml-[280px]" : ""
        }`}
      >
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-semibold text-purple-700">
          Loading applications...
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div
        className={`min-h-screen flex justify-center items-center px-6 ${
          isSidebarWide ? "md:ml-[280px]" : ""
        }`}
      >
        <p className="text-lg font-semibold text-gray-600">
          No applications found.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className={`min-h-screen w-full px-4 sm:px-6 md:px-10 py-10 transition-all duration-300 ${
        isSidebarWide ? "md:ml-[280px]" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-10 text-[#1100D1]">
        My Applications
      </h2>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {applications.map((app) => (
          <motion.div
            key={app._id}
            className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-gray-200 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-[#1100D1]">
                  {app.task.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {app.task.location.area}, {app.task.location.city}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold">Deadline:</span>{" "}
                  {moment(app.task.deadline).format("DD MMM YYYY")}
                </p>
                <p className="text-sm">
                  <span className="font-semibold">Budget:</span> ₹
                  {app.task.price}
                </p>
              </div>
              <span
                className={`self-start sm:self-auto px-4 py-1 rounded-full text-sm font-semibold uppercase ${
                  statusStyles[app.status]
                }`}
              >
                {app.status}
              </span>
            </div>

            <p className="text-gray-800 text-sm sm:text-base">
              <span className="font-semibold">Your Message:</span> {app.message}
            </p>

            <p className="text-sm text-gray-400">
              Applied on: {moment(app.createdAt).format("DD MMM YYYY, hh:mm A")}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyApplications;
