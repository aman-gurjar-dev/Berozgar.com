import React from "react";

const StepTwo = ({ nextStep, prevStep, formData, updateForm }) => {
  const handleChange = (e) => updateForm({ [e.target.name]: e.target.value });

  return (
    <div className="bg-zinc-900 p-8 rounded-xl shadow-md w-full max-w-md text-white z-10">
      <h2 className="text-xl font-semibold mb-6 text-cyan-400">
        Step 2: Contact & Role
      </h2>

      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
      />

      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 shadow"
      >
        <option value="">Select Role</option>
        <option value="tasker">Tasker</option>
        <option value="poster">Poster</option>
      </select>

      <div className="flex justify-between">
        <button
          onClick={prevStep}
          className="px-4 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white transition"
        >
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 rounded bg-cyan-500 hover:bg-cyan-400 text-black font-semibold transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
