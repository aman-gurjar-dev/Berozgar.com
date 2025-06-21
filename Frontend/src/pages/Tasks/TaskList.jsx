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

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
    setCurrentPage(1); // reset to first page on filter change
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
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-lg font-semibold">Loading tasks...</p>
      </div>
    );
  }

  return (
    <div className="h-full w-[80vw] ml-[20vw] bg-[#e8e2fa] overflow-auto py-10 px-4 lg:px-20">
      <motion.h2
        className="text-3xl font-bold text-center mb-8"
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
        className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto"
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
