import React from "react";

const StepOne = ({ nextStep, formData, updateForm }) => {
  const handleChange = (e) => updateForm({ [e.target.name]: e.target.value });

  return (
    <div className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-md text-white">
      <h2 className="text-xl font-semibold mb-6 text-cyan-400">
        Step 1: Basic Info
      </h2>

      <input
        name="name"
        placeholder="Full Name"
        required
        value={formData.name}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
      />

      <input
        name="email"
        type="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
      />

      <input
        name="password"
        type="password"
        required
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
      />

      <button
        onClick={nextStep}
        className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-semibold py-2 rounded shadow transition"
      >
        Next
      </button>
    </div>
  );
};

export default StepOne;
