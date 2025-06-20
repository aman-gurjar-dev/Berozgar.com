import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import axiosInstance from "../config/axios";
import { motion } from "framer-motion";

const categoryOptions = [
  "Cleaning",
  "Delivery",
  "Tutoring",
  "Gardening",
  "Repair",
  "Event Help",
  "Cooking",
  "Driving",
  "Pet Care",
  "Shopping",
  "Babysitting",
  "Tech Support",
  "Moving Help",
  "Data Entry",
  "Photography",
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
      setResponseMsg("✅ Task posted successfully!");
      setFormData({
        title: "",
        description: "",
        category: "",
        location: { city: "", area: "" },
        price: "",
        deadline: "",
      });
    } catch (err) {
      setResponseMsg(err?.response?.data?.message || "❌ Failed to post task.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="h-full w-full ml-72 px-4 py-10 bg-gradient-to-br from-[#f0f4ff] to-[#dfe3ee] overflow-y-auto"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-3xl w-full mx-auto bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl border border-[#e2e8f0]">
        <h2 className="text-4xl font-extrabold text-center mb-10 text-[#1100D1] tracking-wide drop-shadow">
          Post a Job
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Job title"
          />
          <SelectField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            options={categoryOptions}
            defaultOption="Select a category"
          />
          <SelectField
            label="City"
            name="city"
            value={formData.location.city}
            onChange={handleChange}
            options={["Indore", "Dewas", "Ujjain", "Delhi"]}
            defaultOption="Select a city"
          />
          <Field
            label="Area"
            name="area"
            value={formData.location.area}
            onChange={handleChange}
            placeholder="e.g. Vijay Nagar"
          />
          <Field
            label="Budget (₹)"
            name="price"
            value={formData.price}
            onChange={handleChange}
            type="number"
            placeholder="e.g. 200"
          />
          <DateField
            label="Due Date"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
          />
        </div>

        <div className="mt-6">
          <label className="block mb-2 text-[#1100D1] font-semibold">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe the task"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#1100D1] outline-none transition"
            rows={4}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-8 w-full bg-[#1100D1] text-white py-3 rounded-xl font-bold text-lg shadow-md hover:bg-[#0e00aa] disabled:opacity-50 transition"
        >
          {loading ? "Posting..." : "Post Job"}
        </button>

        {responseMsg && (
          <p
            className={`mt-4 text-center text-sm ${
              responseMsg.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {responseMsg}
          </p>
        )}
      </div>
    </motion.div>
  );
};

// Reusable input field
const Field = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
}) => (
  <div>
    <label className="block mb-2 text-[#1100D1] font-semibold">{label}</label>
    <input
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#1100D1] outline-none transition"
    />
  </div>
);

// Reusable select field
const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  defaultOption,
}) => (
  <div>
    <label className="block mb-2 text-[#1100D1] font-semibold">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#1100D1] outline-none transition"
    >
      <option value="" disabled>
        {defaultOption}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// Reusable date picker field
const DateField = ({ label, name, value, onChange }) => (
  <div>
    <label className="block mb-2 text-[#1100D1] font-semibold">{label}</label>
    <div className="relative">
      <input
        name={name}
        type="date"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 focus:ring-2 focus:ring-[#1100D1] outline-none transition"
      />
      <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 pointer-events-none" />
    </div>
  </div>
);

export default PostJobForm;
