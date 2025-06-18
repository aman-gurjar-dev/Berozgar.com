// AppRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Home";
import Login from "../Pages/Login";
import RegisterWrapper from "../pages/Register/RegisterWrapper";
import TaskList from "../pages/Tasks/TaskList";
import TaskDetails from "../pages/Tasks/TaskDetails";
import PostJobView from "../pages/PostJobView";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterWrapper />} />
      <Route path="/tasks" element={<TaskList />} />
      <Route path="/task/:id" element={<TaskDetails />} />
      <Route path="/postjob" element={<PostJobView />} />
    </Routes>
  );
};

export default AppRoutes;
