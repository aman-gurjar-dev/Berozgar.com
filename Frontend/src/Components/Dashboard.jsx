import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("api/auth/fetch");
        setUser(res.data.user);
      } catch (err) {
        setError("Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <motion.div
      className="h-full overflow-y-auto w-full ml-72 px-4 py-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {loading ? (
        <div className="text-center text-lg font-medium">Loading...</div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !user ? (
        <div className="text-center">No user data found.</div>
      ) : (
        <div className="max-w-3xl w-full mx-auto bg-white p-12 rounded-3xl shadow-2xl border border-[#ececec]">
          <h2 className="text-3xl font-extrabold mb-8 text-center text-[#1100D1] tracking-wide drop-shadow-lg">
            User Dashboard
          </h2>
          <form className="space-y-6">
            <Field label="Name" value={user.name} />
            <Field label="Email" value={user.email} type="email" />
            <Field label="Phone" value={user.phone} />
            <Field label="Role" value={user.role} />
            <Field label="Bio" value={user.bio} />
            <Field label="Skills" value={user.skills?.join(", ")} />
            <Field
              label="Location"
              value={
                user.location
                  ? `${user.location.city}, ${user.location.area}`
                  : ""
              }
            />
            <Field label="Verified" value={user.isVerified ? "Yes" : "No"} />
            <Field
              label="Created At"
              value={
                user.createdAt
                  ? new Date(user.createdAt).toLocaleString()
                  : ""
              }
            />
          </form>
        </div>
      )}
    </motion.div>
  );
};

const Field = ({ label, value = "", type = "text" }) => (
  <div>
    <label className="block font-semibold text-[#1100D1]">{label}</label>
    <input
      type={type}
      value={value}
      readOnly
      className="w-full border rounded-lg px-4 py-3 bg-gray-100 focus:outline-none"
    />
  </div>
);

export default Dashboard;
