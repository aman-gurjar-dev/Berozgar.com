import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "../Pages/Home";
import Login from "../Pages/Login";
import RegisterWrapper from "../pages/Register/RegisterWrapper";
import TaskList from "../pages/Tasks/TaskList";
import TaskDetails from "../pages/Tasks/TaskDetails";
import PostJobView from "../pages/PostJobView";
import ProtectedRoute from "../Middlewares/ProtectedRoute";
import Navbar from "../Components/Navbar";
import ContactUs from "../pages/ContectUs";
import AboutUs from "../pages/AboutUs";
import Features from "../pages/Features";
import MyTasks from "../pages/MyTasks";
import ViewApplications from "../pages/ViewApplications";
import Dashboard from "../Components/Dashboard";
import DashboardLayout from "../Components/DashboardLayout";
import Chat from "../pages/Chat";
import MyApplications from "../pages/MyApplications";
import { UseAuth } from "../context/AuthProvider";

const AppRoutes = () => {
  const { authUser } = UseAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/chat" element={<Chat />} />
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<RegisterWrapper />} />

      <Route
        path="/task/:id"
        element={
          <ProtectedRoute>
            <Navbar />
            <TaskDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/contact"
        element={
          <>
            <Navbar />
            <ContactUs />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <Navbar />
            <AboutUs />
          </>
        }
      />
      <Route
        path="/features"
        element={
          <>
            <Navbar />
            <Features />
          </>
        }
      />

      {/* Dashboard layout and nested routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />

        {/* Routes only for posters */}
        {authUser?.role !== "tasker" && (
          <>
            <Route path="mytasks" element={<MyTasks />} />
            <Route path="postjob" element={<PostJobView />} />
          </>
        )}

        {/* Routes only for taskers */}
        {authUser?.role === "tasker" && (
          <>
            <Route path="alltasks" element={<TaskList />} />
            <Route path="myapplications" element={<MyApplications />} />
            <Route
              path="applications/:taskId"
              element={
                <ProtectedRoute>
                  <ViewApplications />
                </ProtectedRoute>
              }
            />
          </>
        )}

        <Route path="message" element={<Chat />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
