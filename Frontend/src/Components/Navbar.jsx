import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";
import { UseAuth } from "../context/AuthProvider";

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
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/features", label: "Features" },
  ];

  return (
    <div className="relative ">
      {/* SVG Background */}
      <div className="absolute top-0 left-0 w-full h-[150px] -z-10 overflow-hidden">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="w-full h-full"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.path
            fill="#5B55CA"
            fillOpacity="0.35"
            d="M0,96L80,128C160,160,320,224,480,234.7C640,245,800,203,960,186.7C1120,171,1280,181,1360,186.7L1440,192L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: "easeInOut", delay: 0.2 }}
          />
        </motion.svg>
      </div>

      {/* Navbar */}
      <nav className="w-full flex h-[10vh] justify-between items-center px-8 py-4 bg-transparent">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 text-xl font-bold text-[#2e2e2e]"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img src={logo} alt="logo" className="w-8 h-8" />
          <span>Berozgar.com</span>
        </motion.div>

        {/* Nav Links */}
        <motion.ul
          className="hidden md:flex items-center gap-8 text-md font-medium bg-white px-6 py-2 rounded-full shadow-md"
          initial="initial"
          animate="animate"
        >
          {links.map((link, i) => (
            <motion.li key={link.to} custom={i} variants={linkVariants}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  isActive
                    ? "text-[#5B55CA]"
                    : "text-gray-800 hover:text-[#5B55CA] transition-colors"
                }
              >
                {link.label}
              </NavLink>
            </motion.li>
          ))}
        </motion.ul>

        {/* Auth Box */}
        <div className="flex items-center gap-4">
          {authUser ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col text-right"
            >
              <span className="text-sm text-gray-600">Welcome Back,</span>
              <span className="text-md font-semibold text-purple-800">
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
                  className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100"
                >
                  LogIn
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
                  className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100"
                >
                  Sign Up
                </Link>
              </motion.div>
            </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
