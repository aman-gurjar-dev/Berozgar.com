import React from "react";
import { motion } from "framer-motion";

const TaskPagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const maxButtons = 3;
  let start = Math.max(currentPage - 1, 1);
  let end = start + maxButtons - 1;

  if (end > totalPages) {
    end = totalPages;
    start = Math.max(end - maxButtons + 1, 1);
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }

  return (
    <motion.div
      className="flex justify-center items-center mt-10 space-x-4 text-sm text-white"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`transition ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-[#5d2fff]"
        }`}
      >
        &larr; Previous
      </motion.button>

      {pages.map((page) => (
        <motion.span
          key={page}
          onClick={() => setCurrentPage(page)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition font-medium ${
            currentPage === page
              ? "bg-[#5d2fff] text-white"
              : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          {page}
        </motion.span>
      ))}

      <motion.button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        whileHover={{ scale: currentPage === totalPages ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`transition ${
          currentPage === totalPages
            ? "opacity-50 cursor-not-allowed"
            : "hover:text-[#5d2fff]"
        }`}
      >
        Next &rarr;
      </motion.button>
    </motion.div>
  );
};

export default TaskPagination;
