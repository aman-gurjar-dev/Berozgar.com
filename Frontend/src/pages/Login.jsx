import React, { useState } from "react";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import axiosInstance from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../context/AuthProvider";

const Login = () => {
  const { authUser, setAuthUser } = UseAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setLoading(true);

    try {
      await axiosInstance
        .post("api/auth/login", {
          email,
          password,
        })
        .then((result) => {
          console.log("Login Success:", result.data);
          setAuthUser(JSON.stringify(result.data.user));
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Login Failed:", err.response?.data || err.message);
          setErrorMsg(err.response?.data?.message || "Login failed");
          setLoading(false);
        });
    } catch (err) {
      console.log("Error in login ", err);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="relative p-8 w-full max-w-md bg-gradient-to-br from-purple-200 to-blue-100 rounded-3xl shadow-lg">
        <div className="bg-gradient-to-br from-purple-300 to-purple-100 rounded-2xl p-8 shadow-md">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Sign In to Techno Clubs
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-purple-900 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="pass@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-purple-900 text-white placeholder-gray-300 focus:outline-none"
              />
            </div>

            {errorMsg && (
              <p className="text-red-600 text-sm mb-4 text-center">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={
                loading
                  ? "w-full py-2 rounded-full bg-gray-200 text-purple-900 font-semibold shadow-sm"
                  : "w-full py-2 rounded-full bg-white text-purple-900 font-semibold shadow-sm hover:bg-purple-800 hover:text-white transition"
              }
            >
              {loading ? "Logging You In..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-300" />
            <span className="mx-2 text-sm text-gray-500">or</span>
            <div className="flex-grow h-px bg-gray-300" />
          </div>

          <div className="flex gap-4 justify-center mb-4">
            <Link
              to="/register"
              className="flex items-center gap-2 px-4 py-2 bg-purple-900 text-white rounded-full"
            >
              <span className="text-sm">Register Now</span>
            </Link>
          </div>

          <div className="text-xs text-center text-gray-500">
            <a href="#" className="hover:underline">
              Terms of use
            </a>{" "}
            &nbsp; | &nbsp;
            <a href="#" className="hover:underline">
              Policy & Privacy
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 text-xs text-center text-gray-700 w-full">
        © 2025 EkKaamKaroge!. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
