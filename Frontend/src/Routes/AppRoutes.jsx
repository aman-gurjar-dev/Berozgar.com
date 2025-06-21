import { createBrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login";
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

import RootLayout from "./RootLayout";
import { UseAuth } from "../context/AuthProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // Includes <Navbar />
    children: [
      { index: true, element: <Home /> },
      { path: "contact", element: <ContactUs /> },
      { path: "about", element: <AboutUs /> },
      { path: "features", element: <Features /> },
      {
        path: "task/:id",
        element: (
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "chat",
        element: <Chat />,
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "register", element: <RegisterWrapper /> },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      {
        path: "applications/:taskId",
        element: (
          <ProtectedRoute>
            <ViewApplications />
          </ProtectedRoute>
        ),
      },
      { path: "mytasks", element: <MyTasks /> },
      { path: "postjob", element: <PostJobView /> },
      { path: "alltasks", element: <TaskList /> },
      { path: "myapplications", element: <MyApplications /> },
      { path: "message", element: <Chat /> },
    ],
  },
]);

export default router;
