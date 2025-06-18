import React from "react";

const locationOptions = ["Indore", "Dewas", "Ujjain", "Delhi"];

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

const TaskFilters = ({ onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  return (
    <div className="flex flex-wrap gap-4 justify-center mb-10">
      <select
        name="city"
        className="px-4 py-2 rounded-full bg-white border shadow-sm"
        onChange={handleChange}
      >
        <option value="">Select City</option>
        {locationOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>

      <select
        name="category"
        className="px-4 py-2 rounded-full bg-white border shadow-sm"
        onChange={handleChange}
      >
        <option value="">Select Category</option>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      <select
        name="sort"
        className="px-4 py-2 rounded-full bg-white border shadow-sm"
        onChange={handleChange}
      >
        <option value="newest">Sort by: Newest</option>
        <option value="oldest">Sort by: Oldest</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </select>
    </div>
  );
};

export default TaskFilters;
