import { NavLink, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const linkVariants = {
  initial: { opacity: 0, y: -10 },
  animate: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 + 0.3, duration: 0.4 },
  }),
};

const Navbar = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
    { to: "/features", label: "Features" },
  ];

  return (
    <nav className="w-full flex h-[10vh] justify-between items-center px-8 py-4 bg-[#e2ddf5]">
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
                  ? "text-[#1100D1]"
                  : "text-gray-800 hover:text-[#1100D1] transition-colors"
              }
            >
              {link.label}
            </NavLink>
          </motion.li>
        ))}
      </motion.ul>

      {/* Sign Up Button */}
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
    </nav>
  );
};

export default Navbar;
