import React from "react";
import { motion } from "framer-motion";
import deliveryGuy from "../assets/delivery-guy.png";
import { Link } from "react-router-dom";
import { UseAuth } from "../context/AuthProvider";

const HomePage = () => {
  const {authUser, setAuthUser} = UseAuth();
  console.log(authUser);

  return (
    <div className="w-screen h-[90vh] overflow-hidden bg-gradient-to-br from-[#f4f2ff] to-[#e2ddf5] flex items-center justify-center">
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-24 py-10 h-full w-full">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 max-w-2xl space-y-6"
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-[#6C63FF] text-base font-semibold uppercase tracking-wide">
            Your Local Helper Network
          </p>

          <h1 className="text-4xl lg:text-5xl font-extrabold text-[#1a1a2e] leading-tight">
            Micro Tasks, <span className="text-[#6C63FF]">Mega Impact</span>
          </h1>

          <p className="text-lg font-medium text-gray-800">
            Get things done anytime, anywhere with trusted locals in{" "}
            <span className="font-semibold text-[#1100D1]">Indore</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex gap-4 mt-5 flex-wrap">
            <Link
              to="/dashboard"
              className="bg-[#1100D1] text-white px-6 py-3 rounded-full text-base font-semibold hover:bg-[#0e00aa] shadow-md transition-all"
            >
              Explore Now
            </Link>
            <Link
              to="/dashboard/postjob"
              className="bg-white text-[#1100D1] px-6 py-3 rounded-full text-base font-semibold border border-[#1100D1] hover:bg-[#f3f0ff] transition shadow"
            >
              Post Task
            </Link>
          </div>

          {/* Mission Card */}
          <motion.div
            className="bg-white rounded-xl shadow border border-gray-200 p-6 mt-6"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <div className="bg-[#1100D1] text-white px-4 py-1 text-sm font-semibold rounded-full inline-block mb-3">
              Mission
            </div>
            <h3 className="font-semibold text-md text-[#1a1a2e]">
              Hire Locals, Instantly & Easily
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Making everyday tasks easier and enabling earning opportunities by
              connecting real people within your city.
            </p>
          </motion.div>
        </motion.div>

        {/* Right Image */}
        <motion.div
          className="w-full lg:w-1/3 flex justify-center items-center mt-10 lg:mt-0 relative top-[8vh]"
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

export default HomePage;
