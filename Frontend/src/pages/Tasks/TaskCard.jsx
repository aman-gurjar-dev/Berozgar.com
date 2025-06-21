import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: "easeOut" }}
    whileHover={{ scale: 1.03 }}
    className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md relative"
  >
    {/* Category Badge */}
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700 inline-block"
    >
      {task.category}
    </motion.span>

    {/* Already Assigned Badge */}
    {task.assignedTo && (
      <span className="absolute top-4 right-4 text-[10px] bg-red-100 text-red-600 font-semibold px-2 py-[2px] rounded-full">
        Already Assigned
      </span>
    )}

    {/* Title */}
    <h3 className="font-semibold text-lg mt-2">{task.title}</h3>

    {/* Location */}
    <p className="text-gray-500 flex items-center text-sm mt-1">
      <FaMapMarkerAlt className="mr-1" />
      {task.location.city}
    </p>

    {/* Price */}
    <p className="mt-1 font-medium">₹{task.price}</p>

    {/* View Details Button */}
    <Link to={`/task/${task._id}`}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        disabled={task.assignedTo}
        className={
          task.assignedTo
            ? "bg-gray-400 text-white font-semibold py-1 px-4 mt-4 rounded-full opacity-50 cursor-not-allowed"
            : "mt-4 px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition text-sm"
        }
      >
        View Details
      </motion.button>
    </Link>
  </motion.div>
);

export default TaskCard;
