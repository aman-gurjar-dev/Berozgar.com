import React from "react";
import { motion } from "framer-motion";

const AboutUs = () => {
  return (
    <div className="relative h-[90vh] py-16 px-4 lg:px-24 overflow-hidden flex items-center justify-center ">
      {/* Animated Background SVG */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full -z-10"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
        >
          <motion.path
            fill="#5B55CA"
            fillOpacity="0.2"
            d="M0,320L1440,128L1440,320L0,320Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto text-center">
        <motion.h1
          className="text-5xl lg:text-6xl font-extrabold bg-gradient-to-r from-[#5B55CA] to-[#8e44ad] bg-clip-text text-transparent mb-6"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          About Us
        </motion.h1>

        <motion.p
          className="text-gray-800 text-lg md:text-xl mb-10 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          At <span className="font-semibold text-[#5d2fff]">Berozgar.com</span>,
          we empower individuals to discover opportunities, offer services, and
          earn by helping their local community. Whether you're a student,
          freelancer, or someone seeking flexible work, we're here to connect
          you with meaningful tasks and great people.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10 mt-10 text-left">
          {/* Mission Card */}
          <motion.div
            className="bg-[#FFF8F8] backdrop-blur-md rounded-xl shadow-lg border border-[#ddd] p-6 hover:shadow-xl transition"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <h2 className="text-2xl font-semibold text-[#5d2fff] mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700 text-md">
              To create equal chances for everyone to work, grow, and earn in a
              trusted task-sharing system. We're building a better tomorrow
              through meaningful micro-tasks.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div
            className="bg-[#FFF8F8] backdrop-blur-md rounded-xl shadow-lg border border-[#ddd] p-6 hover:shadow-xl transition"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <h2 className="text-2xl font-semibold text-[#5d2fff] mb-2">
              Our Vision
            </h2>
            <p className="text-gray-700 text-md">
              We imagine a world where finding or offering help is just a few
              clicks away. Berozgar.com wants to fuel independent, reliable
              communities across India.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
