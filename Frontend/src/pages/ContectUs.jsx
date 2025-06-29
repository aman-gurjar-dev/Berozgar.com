import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2 + 0.5 },
  }),
};

const ContactUs = () => {
  return (
    <div className="relative h-[90vh] flex items-center justify-center px-4 py-8 overflow-hidden  text-white">
      {/* Animated SVG Background */}
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
            fillOpacity="0.1"
            d="M0,320L1440,128L1440,320L0,320Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Card Container */}
      <motion.div
        className="flex flex-col md:flex-row w-full max-w-6xl rounded-3xl overflow-hidden shadow-xl backdrop-blur-md bg-white/5 border border-white/10"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left Section */}
        <motion.div
          className="bg-[#1c1b35] text-white w-full md:w-1/2 p-10 flex flex-col justify-center space-y-6"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-white">
            Contact <span className="text-cyan-300">Us</span>
          </h2>
          <p className="text-gray-300 text-lg">We are here to help you.</p>

          {[
            {
              icon: <FaPhone className="text-2xl text-cyan-400" />,
              label: "Phone",
              value: "+91 1234567890",
            },
            {
              icon: <FaEnvelope className="text-2xl text-cyan-400" />,
              label: "Email",
              value: "abc@gmail.com",
            },
            {
              icon: <FaMapMarkerAlt className="text-2xl text-cyan-400" />,
              label: "Location",
              value: "xyz, Indore M.P.",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex items-start gap-4"
              custom={i}
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              {item.icon}
              <div>
                <p className="font-medium text-white">{item.label}</p>
                <p className="text-gray-400">{item.value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right Section */}
        <motion.div
          className="bg-[#111] w-full md:w-1/2 p-10"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-cyan-300 mb-2">Let’s Talk</h2>
          <p className="text-gray-400 mb-6">Feel free to contact us below</p>

          <form className="space-y-4">
            {["Your Name", "Email Address", "Phone Number", "Message"].map(
              (placeholder, i) =>
                placeholder === "Message" ? (
                  <motion.textarea
                    key={i}
                    placeholder={placeholder}
                    rows="4"
                    className="w-full p-3 rounded-md border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-cyan-500"
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  />
                ) : (
                  <motion.input
                    key={i}
                    type="text"
                    placeholder={placeholder}
                    className="w-full p-3 rounded-md border border-gray-600 bg-black text-white placeholder-gray-400 focus:outline-cyan-500"
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                  />
                )
            )}

            <motion.button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition w-full mt-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ContactUs;
