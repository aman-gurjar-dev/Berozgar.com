import React, { useState } from "react";
import { FaGoogle, FaLinkedinIn } from "react-icons/fa";
import axiosInstance from "../config/axios";
import { useNavigate, Link } from "react-router-dom";
import { UseAuth } from "../context/AuthProvider";
import { SparklesCore } from "../Components/ui/sparkles";

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
        .post("api/auth/login", { email, password })
        .then((result) => {
          setAuthUser(JSON.stringify(result.data.user));
          localStorage.setItem("user", JSON.stringify(result.data.user));
          navigate("/dashboard");
        })
        .catch((err) => {
          setErrorMsg(err.response?.data?.message || "Login failed");
          setLoading(false);
        });
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white relative">
      {/* Sparkle Background */}
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        className="absolute inset-0"
        particleColor="#FFFFFF"
      />

      {/* Login Card */}
      <div className="relative p-8 w-full max-w-md bg-white/5 border border-white/10 rounded-3xl backdrop-blur-lg shadow-lg z-10">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 text-center">
            Sign In to EkKaamKaroge!
          </h2>

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                placeholder="name@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="pass@123"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 rounded-md bg-zinc-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm text-center mb-3">
                {errorMsg}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 rounded-full font-semibold transition 
                ${
                  loading
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-cyan-400 text-black hover:bg-cyan-300"
                }`}
            >
              {loading ? "Logging You In..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow h-px bg-gray-600" />
            <span className="mx-2 text-sm text-gray-400">or</span>
            <div className="flex-grow h-px bg-gray-600" />
          </div>

          <div className="text-center mb-4">
            <Link
              to="/register"
              className="text-cyan-400 hover:underline font-medium"
            >
              Don’t have an account? Register
            </Link>
          </div>

          <div className="text-xs text-center text-gray-400">
            <a href="#" className="hover:underline">
              Terms of use
            </a>{" "}
            &nbsp;|&nbsp;
            <a href="#" className="hover:underline">
              Policy & Privacy
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 text-xs text-center text-gray-500 w-full">
        © 2025 EkKaamKaroge!. All rights reserved.
      </div>
    </div>
  );
};

export default Login;
