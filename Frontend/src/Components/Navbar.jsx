import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#e2ddf5]">
      <div className="flex items-center gap-2 text-xl font-bold text-[#2e2e2e]">
        <img src="/logo.png" alt="logo" className="w-8 h-8" />
        <span>Berozgar.com</span>
      </div>

      <ul className="hidden md:flex items-center gap-8 text-md font-medium bg-white px-6 py-2 rounded-full shadow-md">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-[#1100D1]" : "text-gray-800 hover:text-[#1100D1]"
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive ? "text-[#1100D1]" : "text-gray-800 hover:text-[#1100D1]"
            }
          >
            About
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? "text-[#1100D1]" : "text-gray-800 hover:text-[#1100D1]"
            }
          >
            Contact
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/features"
            className={({ isActive }) =>
              isActive ? "text-[#1100D1]" : "text-gray-800 hover:text-[#1100D1]"
            }
          >
            Features
          </NavLink>
        </li>
      </ul>

      <button className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100">
        Sign Up
      </button>
    </nav>
  );
};

export default Navbar;
