import React, { useEffect, useState } from "react";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";
import {
  UserCircle,
  Mail,
  Phone,
  BadgeCheck,
  MapPin,
  Info,
  Settings,
  CheckCircle,
  Calendar,
} from "lucide-react";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [isSidebarWide, setIsSidebarWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axiosInstance.get("api/auth/fetch");
        setUser(res.data.user);
        setFormData(res.data.user);
      } catch (err) {
        setError("Failed to fetch user info");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarWide(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "area") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else if (name === "skills") {
      setFormData((prev) => ({ ...prev, skills: value.split(",") }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleUpdate = async () => {
    try {
      setSaving(true);
      await axiosInstance.patch("api/auth/update", {
        name: formData.name,
        bio: formData.bio,
        skills: formData.skills,
        location: formData.location,
      });
      setSuccessMsg("Profile updated successfully!");
      setEditable(false);
    } catch (err) {
      setError("Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div
      className={`min-h-screen overflow-y-auto w-full px-4 sm:px-6 md:px-10 py-10  text-white transition-all duration-300 ${
        isSidebarWide ? "md:ml-[280px]" : ""
      }`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {loading ? (
        <div className="h-[75vh] w-full flex flex-col justify-center items-center">
          <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-semibold mt-4 text-purple-400">
            Loading your dashboard...
          </p>
        </div>
      ) : error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : !user ? (
        <div className="text-center text-gray-300">No user data found.</div>
      ) : (
        <div className="max-w-4xl w-full mx-auto bg-[#1c1c2b] p-6 relative z-10 sm:p-10 rounded-3xl shadow-xl border border-gray-700">
          <h2 className="text-2xl sm:text-4xl font-bold mb-10 text-center text-purple-300 tracking-wide">
            Welcome, {user.name.split(" ")[0]} 👋
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <EditableField
              icon={<UserCircle />}
              label="Name"
              name="name"
              value={formData.name}
              editable={editable}
              onChange={handleChange}
            />
            <Field icon={<Mail />} label="Email" value={formData.email} />
            <Field icon={<Phone />} label="Phone" value={formData.phone} />
            <Field icon={<BadgeCheck />} label="Role" value={formData.role} />
            <EditableField
              icon={<Info />}
              label="Bio"
              name="bio"
              value={formData.bio}
              editable={editable}
              onChange={handleChange}
            />
            <EditableField
              icon={<Settings />}
              label="Skills"
              name="skills"
              value={formData.skills?.join(", ")}
              editable={editable}
              onChange={handleChange}
            />
            <EditableField
              icon={<MapPin />}
              label="City"
              name="city"
              value={formData.location?.city || ""}
              editable={editable}
              onChange={handleChange}
            />
            <EditableField
              icon={<MapPin />}
              label="Area"
              name="area"
              value={formData.location?.area || ""}
              editable={editable}
              onChange={handleChange}
            />
            <Field
              icon={<CheckCircle />}
              label="Verified"
              value={formData.isVerified ? "Yes ✅" : "No ❌"}
            />
            <Field
              icon={<Calendar />}
              label="Created At"
              value={
                formData.createdAt
                  ? new Date(formData.createdAt).toLocaleString()
                  : ""
              }
            />
          </div>

          {successMsg && (
            <p className="text-green-400 text-sm text-center mt-4">
              {successMsg}
            </p>
          )}

          <div className="mt-10 text-center flex justify-center flex-wrap gap-4">
            {!editable ? (
              <button
                className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-full hover:bg-purple-700 transition"
                onClick={() => setEditable(true)}
              >
                Update Information
              </button>
            ) : (
              <>
                <button
                  className="px-6 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition"
                  onClick={handleUpdate}
                  disabled={saving}
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  className="px-6 py-3 bg-gray-600 text-white font-semibold rounded-full hover:bg-gray-700 transition"
                  onClick={() => {
                    setEditable(false);
                    setFormData(user);
                  }}
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
};

const Field = ({ label, value = "", icon }) => (
  <div className="flex items-start space-x-4 bg-[#2b2b3d] rounded-xl px-4 py-5 shadow-sm">
    <div className="text-purple-400">{icon}</div>
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
      </label>
      <p className="text-md font-medium text-white mt-1 break-words">{value}</p>
    </div>
  </div>
);

const EditableField = ({
  label,
  name,
  value = "",
  icon,
  editable,
  onChange,
}) => (
  <div className="flex items-start space-x-4 bg-[#2b2b3d] rounded-xl px-4 py-5 shadow-sm">
    <div className="text-purple-400">{icon}</div>
    <div className="w-full">
      <label className="block text-sm font-semibold text-gray-300">
        {label}
      </label>
      {editable ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="mt-1 w-full border px-3 py-2 rounded-md bg-[#1e1e2f] text-white border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      ) : (
        <p className="text-md font-medium text-white mt-1 break-words">
          {value}
        </p>
      )}
    </div>
  </div>
);

export default Dashboard;
