import React from "react";
import { motion } from "framer-motion";
import { FaSearch, FaUserFriends, FaWallet, FaMobileAlt } from "react-icons/fa";

// Feature card data
const features = [
  {
    icon: <FaSearch className="text-4xl text-purple-700" />,
    title: "Find Tasks Easily",
    description:
      "Browse and filter tasks based on your location, skills, and interests.",
  },
  {
    icon: <FaUserFriends className="text-4xl text-purple-700" />,
    title: "Connect With Locals",
    description: "Get hired or hire people from your neighborhood or city.",
  },
  {
    icon: <FaWallet className="text-4xl text-purple-700" />,
    title: "Earn On Your Terms",
    description: "Choose tasks that suit your schedule and get paid securely.",
  },
  {
    icon: <FaMobileAlt className="text-4xl text-purple-700" />,
    title: "Simple To Use",
    description:
      "User-friendly mobile and web interface for fast task posting and applying.",
  },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.4,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const Features = () => {
  return (
    <div className="relative min-h-[90vh] py-16 px-4 lg:px-20 overflow-hidden">
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
            fillOpacity="0.25"
            d="M0,320L1440,128L1440,320L0,320Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          />
        </svg>
      </motion.div>

      {/* Heading */}
      <motion.h1
        className="text-4xl font-bold text-center text-[#5d2fff] mb-14"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        Features
      </motion.h1>

      {/* Feature Cards */}
      <motion.div
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-[#FFF8F8] p-6 rounded-xl shadow-md hover:shadow-xl transition-all"
            variants={cardVariants}
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-[#5d2fff]">
              {feature.title}
            </h2>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Features;
