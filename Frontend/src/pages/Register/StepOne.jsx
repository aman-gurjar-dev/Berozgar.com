import React from "react";

const StepOne = ({ nextStep, formData, updateForm }) => {
  const handleChange = (e) => updateForm({ [e.target.name]: e.target.value });

  return (
    <div className="bg-purple-100 p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6">Step 1: Basic Info</h2>
      <input
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <input
        name="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <button
        onClick={nextStep}
        className="w-full bg-purple-700 text-white py-2 rounded shadow"
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
