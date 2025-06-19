import React from "react";
import { motion } from "framer-motion";
import deliveryGuy from "../assets/delivery-guy.png";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#e2ddf5] flex flex-col relative overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-10 bg-white w-full h-full flex-grow">
        {/* Left Side */}
        <motion.div
          className="w-full lg:w-1/2 max-w-xl space-y-4"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#1100D1] font-medium">
            Welcome to your local helper Network
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-black leading-tight">
            Micro Tasks <span className="text-[#1100D1]">, Mega Impact</span>
          </h1>
          <h2 className="text-xl font-semibold text-black">
            Get Things Done AnyTime <br /> AnyWhere in Indore
          </h2>

          {/* Buttons */}
          <motion.div
            className="flex gap-4 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/tasks"
              className="bg-[#1100D1] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1100D1]"
            >
              Explore Now
            </Link>
            <Link
              to="/postjob"
              className="bg-white text-[#1100D1] px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100"
            >
              Post Task
            </Link>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            className="bg-[#FFF8F8] rounded-xl shadow-md border border-gray-300 max-w-lg p-6 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-white border border-[#1100D1] inline-block px-3 py-1 text-[#1100D1] font-bold rounded-t-xl -mt-8 ml-4">
              Mission
            </div>
            <h3 className="font-bold text-lg mt-4">
              Hire Locals , Instantly Easy
            </h3>
            <p className="text-gray-700 text-sm mt-2">
              Making everyday task easier and creating earning opportunities —
              by connecting real people, in realtime within your city.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-37 overflow-hidden"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <img
            src={deliveryGuy}
            alt="Delivery Guy"
            className="max-w-full w-[20vw] h-auto object-contain relative"
          />
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;
