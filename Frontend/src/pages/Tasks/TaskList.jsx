import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import TaskCard from "./TaskCard";
import TaskFilters from "./TaskFilters";
import TaskPagination from "./TaskPagination";

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
    <div className="min-h-screen bg-[#e8e2fa] py-10 px-4 lg:px-20">
      {/* Navbar */}

      <h2 className="text-3xl font-bold text-center mb-8">Explore Tasks</h2>

      <TaskFilters onFilterChange={handleFilterChange} />

      <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {currentTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>

      <TaskPagination
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default TaskList;
