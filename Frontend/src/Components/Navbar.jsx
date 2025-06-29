import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import logo from "../assets/logo.png";
import { UseAuth } from "../context/AuthProvider";
import { Menu, X } from "lucide-react";

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.4 },
  }),
};

const Navbar = () => {
  const { authUser } = UseAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/features", label: "Features" },
  ];

  return (
    <div className="relative z-50">
      {/* SVG Background */}

      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-6 py-4 md:px-8 bg-transparent">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 text-xl font-bold text-white"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span>Berozgar.com</span>
        </motion.div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden z-50 text-white">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Nav Links - Desktop */}
        <motion.ul
          className="hidden md:flex items-center lg:gap-8 gap-4 text-md font-medium bg-[#121212] px-6 py-2 rounded-full shadow-md"
          initial="initial"
          animate="animate"
        >
          {links.map((link, i) => (
            <motion.li key={link.to} custom={i} variants={linkVariants}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#00e0ff]"
                    : "text-gray-300 hover:text-[#00e0ff] transition-colors"
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        {/* Auth Box - Desktop */}
        <div className="hidden md:flex items-center gap-4">
          {authUser ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col text-right text-white"
            >
              <span className="text-sm text-gray-400">Welcome Back,</span>
              <span className="text-md font-semibold text-[#00e0ff]">
                {authUser.name}
              </span>
            </motion.div>
          ) : (
            <>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/login"
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#333]"
                >
                  Log In
                </Link>
              </motion.div>
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  to="/register"
                  className="bg-[#1a1a1a] text-white px-4 py-2 rounded-full font-medium shadow-md hover:bg-[#333]"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#121212] shadow-lg rounded-md mx-4 mt-2 p-4 space-y-4 text-white"
          >
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "block text-[#00e0ff] font-semibold"
                    : "block text-gray-300 hover:text-[#00e0ff]"
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}

            {!authUser ? (
              <div className="flex flex-col gap-2">
                <Link
                  to="/login"
                  className="block bg-[#1f2937] text-white px-4 py-2 rounded-full text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block bg-[#1f2937] text-white px-4 py-2 rounded-full text-center font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            ) : (
              <div className="text-right">
                <span className="text-sm text-gray-400">Welcome,</span>
                <p className="text-md font-semibold text-[#00e0ff]">
                  {authUser.name}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
