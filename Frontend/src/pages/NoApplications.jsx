import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../config/axios";

const NoApplications = () => {
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

  const handleAccept = async (applicationId) => {
    try {
      await axiosInstance.post("api/task-applications/approve", {
        applicationId: applicationId.applicant._id,
        taskId: applicationId.task,
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
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading applications...</p>
      </div>
    );
  }

  if (applications.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">
          No applications found for this task.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0ebff] px-4 py-10 lg:px-32">
      <h2 className="text-3xl font-bold text-center mb-10">Applications</h2>

      <div className="grid gap-6">
        {applications.map((app) => (
          <div
            key={app._id}
            className="bg-white p-6 rounded-xl shadow-md flex flex-col gap-3"
          >
            <div>
              <h3 className="font-bold text-xl text-[#5a29e4]">
                {app.applicant?.name}
              </h3>
              <p className="text-sm text-gray-500">{app.applicant?.email}</p>
            </div>

            <div>
              <p className="text-gray-700">
                <span className="font-medium">Message:</span> {app.message}
              </p>
            </div>

            <div className="flex justify-between items-center">
              <span
                className={`px-4 py-1 rounded-full text-sm font-semibold text-white uppercase ${
                  app.status === "pending"
                    ? "bg-yellow-500"
                    : app.status === "approved"
                    ? "bg-green-600"
                    : "bg-red-500"
                }`}
              >
                {app.status}
              </span>

              {app.status === "pending" && (
                <button
                  onClick={() => handleAccept(app)}
                  className="text-sm bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
                >
                  Accept Application
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoApplications;
