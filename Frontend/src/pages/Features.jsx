import React from "react";
import { FaSearch, FaUserFriends, FaWallet, FaMobileAlt } from "react-icons/fa";

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

const Features = () => {
  return (
    <div className="min-h-screen bg-[#e9e4ff] py-12 px-4 lg:px-20">
      <h1 className="text-4xl font-bold text-center text-[#5d2fff] mb-10">
        Features
      </h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="mb-4">{feature.icon}</div>
            <h2 className="text-xl font-semibold mb-2 text-[#5d2fff]">
              {feature.title}
            </h2>
            <p className="text-gray-700 text-sm">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Features;
