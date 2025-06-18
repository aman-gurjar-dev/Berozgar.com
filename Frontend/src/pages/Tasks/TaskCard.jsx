import React from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => (
  <motion.div
    whileHover={{ scale: 1.03 }}
    transition={{ duration: 0.3 }}
    className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md"
  >
    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-indigo-100 text-indigo-700">
      {task.category}
    </span>
    <h3 className="font-semibold text-lg mt-2">{task.title}</h3>
    <p className="text-gray-500 flex items-center text-sm mt-1">
      <FaMapMarkerAlt className="mr-1" />
      Indore
    </p>
    <p className="mt-1 font-medium">₹{task.price}</p>
    <Link to={`/task/${task._id}`}>
      <button className="mt-4 px-4 py-1 border border-black rounded-full hover:bg-black hover:text-white transition text-sm">
        View Details
      </button>
    </Link>
  </motion.div>
);

export default TaskCard;
