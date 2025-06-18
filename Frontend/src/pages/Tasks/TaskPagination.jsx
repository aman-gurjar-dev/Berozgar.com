import React from "react";

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
    <div className="flex justify-center items-center mt-10 space-x-4 text-sm">
      <button
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        className={`hover:underline ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        &larr; Previous
      </button>

      {pages.map((page) => (
        <span
          key={page}
          onClick={() => setCurrentPage(page)}
          className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ${
            currentPage === page ? "bg-[#5d2fff] text-white" : "hover:underline"
          }`}
        >
          {page}
        </span>
      ))}

      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`hover:underline ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        Next &rarr;
      </button>
    </div>
  );
};

export default TaskPagination;
