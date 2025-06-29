import React from "react";
import { motion } from "framer-motion";
import deliveryGuy from "../assets/delivery-guy.png";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthProvider";

const Home = () => {
  const { authUser } = UseAuth();
  console.log(authUser);

  return (
    <div className="w-screen h-[90vh] overflow-hidden relative flex items-center justify-center">
      {/* SVG Background */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            fill="#5B55CA"
            fillOpacity="0.25"
            d="M0,320L1440,128L1440,320L0,320Z"
            initial={{ pathLength: 0, x: 30 }}
            animate={{ pathLength: 1, x: 0 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-10 h-full w-full">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 max-w-2xl space-y-6"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#00e0ff] text-base font-semibold uppercase tracking-wide">
            Your Local Helper Network
          </p>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
            Micro Tasks, <span className="text-[#00e0ff]">Mega Impact</span>
          </h1>

          <p className="text-lg font-medium text-gray-300">
            Get things done anytime, anywhere with trusted locals in{" "}
            <span className="font-semibold text-[#00e0ff]">Indore</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-5 flex-wrap">
            <Link
              to="/dashboard"
              className="bg-[#00e0ff] text-black px-6 py-3 rounded-full text-base font-semibold hover:bg-[#00cbe0] shadow-md transition-all"
            >
              Explore Now
            </Link>
            <Link
              to="/dashboard/postjob"
              className="bg-transparent text-[#00e0ff] px-6 py-3 rounded-full text-base font-semibold border border-[#00e0ff] hover:bg-[#08111c] transition shadow"
            >
              Post Task
            </Link>
          </div>

          {/* Mission Card */}
          <motion.div
            className="relative bg-[#0f172a] rounded-xl shadow border border-[#00e0ff] p-6 pt-10 mt-16"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <span className="absolute -top-5 left-8 bg-[#0f172a] text-[#00e0ff] text-xs font-bold uppercase tracking-wide px-7 py-3 rounded-full shadow">
              Mission
            </span>

            <h3 className="font-semibold text-md text-white">
              Hire Locals, Instantly & Easily
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Making everyday tasks easier and enabling earning opportunities by
              connecting real people within your city.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-0 lg:w-1/3 flex justify-center items-center mt-10 lg:mt-0 relative top-[8vh]"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={deliveryGuy}
            alt="Delivery Guy"
            className="w-[220px] md:w-[300px] lg:w-[350px] object-contain drop-shadow-xl"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
