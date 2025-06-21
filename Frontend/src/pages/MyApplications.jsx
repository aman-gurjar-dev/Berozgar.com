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
      <div className="min-h-screen flex justify-center items-center ml-72">
        <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="ml-4 text-lg font-semibold text-purple-700">
          Loading applications...
        </p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center ml-72">
        <p className="text-lg font-semibold text-gray-600">
          No applications found.
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="h-full w-full ml-72 px-6 py-10 overflow-y-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-extrabold text-center mb-10 text-[#1100D1]">
        My Applications
      </h2>

      <div className="grid gap-6 max-w-4xl mx-auto">
        {applications.map((app) => (
          <motion.div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow-xl border border-gray-200 space-y-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-[#1100D1]">
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
                className={`px-4 py-1 rounded-full text-sm font-semibold uppercase ${
                  statusStyles[app.status]
                }`}
              >
                {app.status}
              </span>
            </div>

            <p className="mt-2 text-gray-800">
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
