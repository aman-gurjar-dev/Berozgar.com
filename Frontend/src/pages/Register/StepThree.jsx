import React from "react";
import axiosInstance from "../../config/axios"; // make sure path is correct
import { useNavigate } from "react-router-dom";
import { UseAuth } from "../../context/AuthProvider";

const StepThree = ({ prevStep, formData, updateForm }) => {
  const { authUser, setAuthUser } = UseAuth();

  const locationOptions = ["Indore", "Dewas", "Ujjain", "Delhi"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["city", "area"].includes(name)) {
      updateForm({ location: { ...formData.location, [name]: value } });
    } else {
      updateForm({ [name]: value });
    }
  };

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("api/auth/register", formData);
      console.log("Registered:", res.data);
      setAuthUser(JSON.stringify(res.data.user));
      localStorage.setItem("user", JSON.stringify(res.data.user));
      alert("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="bg-purple-100 p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6">Step 3: Profile Info</h2>
      <input
        name="bio"
        placeholder="Bio"
        value={formData.bio}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <input
        name="skills"
        placeholder="Skills (e.g., Plumber)"
        value={formData.skills}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <select
        name="city"
        value={formData.location.city}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      >
        <option value="" disabled>
          Select City
        </option>
        {locationOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <input
        name="area"
        placeholder="Area"
        value={formData.location.area}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 rounded bg-gray-300">
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-4 py-2 rounded bg-purple-700 text-white"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default StepThree;
