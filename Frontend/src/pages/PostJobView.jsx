import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

const categoryOptions = [
  "Cleaning", "Delivery", "Tutoring", "Gardening", "Repair",
  "Event Help", "Cooking", "Driving", "Pet Care", "Shopping",
  "Babysitting", "Tech Support", "Moving Help", "Data Entry", "Photography",
];

const PostJobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: { city: "", area: "" },
    price: "",
    deadline: "",
  });
  const [loading, setLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "city" || name === "area") {
      setFormData((prev) => ({
        ...prev,
        location: { ...prev.location, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const payload = { ...formData, status: "open" };
      await axiosInstance.post("api/task/", payload);
      setResponseMsg("Task posted successfully!");
      setFormData({
        title: "", description: "", category: "", location: { city: "", area: "" },
        price: "", deadline: "",
      });
    } catch (err) {
      setResponseMsg(err?.response?.data?.message || "Failed to post task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="h-full w-full screen overflow-y-auto w-full ml-72 px-4 py-10 "
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl w-full mx-auto bg-white p-12 rounded-3xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-8 text-[#1100D1] tracking-wide drop-shadow-lg">
          Post a Job
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Job title"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            >
              <option value="" disabled>Select a category</option>
              {categoryOptions.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">City</label>
            <select
              name="city"
              value={formData.location.city}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            >
              <option value="" disabled>Select a city</option>
              <option value="Indore">Indore</option>
              <option value="Dewas">Dewas</option>
              <option value="Ujjain">Ujjain</option>
              <option value="Delhi">Delhi</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Area</label>
            <input
              name="area"
              value={formData.location.area}
              onChange={handleChange}
              placeholder="e.g. Vijay Nagar"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Budget</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="e.g. 200"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Due Date</label>
            <div className="relative">
              <input
                name="deadline"
                type="date"
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              />
              <FaCalendarAlt className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold text-[#1100D1]">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the task"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
              rows={3}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-[#1100D1] text-white py-3 rounded-xl font-bold text-lg shadow-lg hover:bg-[#6C63FF] transition-all duration-200"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {responseMsg && (
          <p className="mt-4 text-center text-sm text-green-600">
            {responseMsg}
          </p>
        )}
      </div>
    </motion.div>
  );
};

export default PostJobForm;
