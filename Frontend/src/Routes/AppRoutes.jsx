// AppRoutes.jsx
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
import NoApplications from "../pages/NoApplications";
import Dashboard from "../Components/Dashboard";
import DashboardLayout from "../Components/DashboardLayout";

const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route
      path="/"
      element={
        <>
          <Navbar />
          <HomePage />
        </>
      }
    />
    <Route
      path="/login"
      element={
        <>
          <Login />
        </>
      }
    />
    <Route path="/register" element={<RegisterWrapper />} />
    <Route
      path="/tasks"
      element={
        <ProtectedRoute>
          <Navbar />
          <TaskList />
        </ProtectedRoute>
      }
    />
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
      path="/postjob"
      element={
        <ProtectedRoute>
          <Navbar />
          <PostJobView />
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
    <Route
      path="/mytasks"
      element={
        <>
          <ProtectedRoute>
            <Navbar />
            <MyTasks />
          </ProtectedRoute>
        </>
      }
    />
    <Route
      path="/applications/:taskId"
      element={
        <>
          <ProtectedRoute>
            <Navbar />
            <NoApplications />
          </ProtectedRoute>
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
      <Route path="mytasks" element={<MyTasks />} />
      <Route path="postjob" element={<PostJobView />} />
      {/* Add more dashboard child routes as needed */}
    </Route>
  </Routes>
);

export default AppRoutes;
