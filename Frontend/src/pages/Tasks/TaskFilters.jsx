import React from "react";
import { motion } from "framer-motion";

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

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const TaskFilters = ({ onFilterChange }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterChange(name, value);
  };

  const commonStyles =
    "px-4 py-2 rounded-full bg-zinc-800 text-gray-100 border border-gray-600 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600";

  return (
    <motion.div
      className="flex flex-wrap gap-4 justify-center mb-10"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.select
        name="city"
        className={commonStyles}
        onChange={handleChange}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <option value="">Select City</option>
        {locationOptions.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </motion.select>

      <motion.select
        name="category"
        className={commonStyles}
        onChange={handleChange}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <option value="">Select Category</option>
        {categoryOptions.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </motion.select>

      <motion.select
        name="sort"
        className={commonStyles}
        onChange={handleChange}
        variants={itemVariants}
        whileHover={{ scale: 1.03 }}
      >
        <option value="newest">Sort by: Newest</option>
        <option value="oldest">Sort by: Oldest</option>
        <option value="price_low">Price: Low to High</option>
        <option value="price_high">Price: High to Low</option>
      </motion.select>
    </motion.div>
  );
};

export default TaskFilters;
