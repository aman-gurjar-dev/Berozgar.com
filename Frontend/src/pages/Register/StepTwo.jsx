import React from "react";

const StepTwo = ({ nextStep, prevStep, formData, updateForm }) => {
  const handleChange = (e) => updateForm({ [e.target.name]: e.target.value });

  return (
    <div className="bg-purple-100 p-8 rounded-xl shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6">Step 2: Contact & Role</h2>
      <input
        name="phone"
        placeholder="Phone"
        value={formData.phone}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="w-full mb-4 px-4 py-2 rounded bg-white shadow"
      >
        <option value="">Select Role</option>
        <option value="tasker">Tasker</option>
        <option value="poster">Poster</option>
      </select>
      <div className="flex justify-between">
        <button onClick={prevStep} className="px-4 py-2 rounded bg-gray-300">
          Back
        </button>
        <button
          onClick={nextStep}
          className="px-4 py-2 rounded bg-purple-700 text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default StepTwo;
