import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";
import TaskPagination from "./TaskPagination";
import { motion } from "framer-motion";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    city: "",
    category: "",
    sort: "newest",
  });

  const [isSidebarWide, setIsSidebarWide] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarWide(window.innerWidth >= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1);
  };

  const tasksPerPage = 4;

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axiosInstance.post("/api/task/getalltasks", filters);
        setTasks(res.data);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filters]);

  const indexOfLastTask = currentPage * tasksPerPage;
  const indexOfFirstTask = indexOfLastTask - tasksPerPage;
  const currentTasks = tasks.slice(indexOfFirstTask, indexOfLastTask);
  const totalPages = Math.ceil(tasks.length / tasksPerPage);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#0f0f0f]">
        <p className="text-lg font-semibold text-white">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen w-full z-10 text-white py-6 px-4 sm:px-6 md:px-10 lg:px-20 transition-all duration-300 ${
        isSidebarWide ? "md:ml-[270px]" : "ml-0"
      }`}
    >
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 text-white"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Explore Tasks
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <TaskFilters onFilterChange={handleFilterChange} />
      </motion.div>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto px-2 mt-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {currentTasks.map((task) => (
          <motion.div
            key={task._id}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
            }}
          >
            <TaskCard task={task} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="mt-10 flex justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <TaskPagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </motion.div>
    </div>
  );
};

export default TaskList;
