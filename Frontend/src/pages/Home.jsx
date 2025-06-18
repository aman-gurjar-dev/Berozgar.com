import React from "react";
import deliveryGuy from "../assets/delivery-guy.png"; // replace with your actual path

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-[#e2ddf5] flex flex-col relative overflow-hidden">
      {/* Navbar */}
      <nav className="w-full flex justify-between items-center px-8 py-4 bg-[#e2ddf5]">
        <div className="flex items-center gap-2 text-xl font-bold text-[#2e2e2e]">
          <img src="/logo.png" alt="logo" className="w-8 h-8" />
          <span>Berozgar.com</span>
        </div>
        <ul className="hidden md:flex items-center gap-8 text-md font-medium bg-white px-6 py-2 rounded-full shadow-md">
          <li>
            <a href="#" className="text-[#1100D1]">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#1100D1]">
              About
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#1100D1]">
              Contact
            </a>
          </li>
          <li>
            <a href="#" className="hover:text-[#1100D1]">
              Features
            </a>
          </li>
        </ul>
        <button className="bg-white text-black px-4 py-2 rounded-full font-medium shadow-md hover:bg-gray-100">
          Sign Up
        </button>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col-reverse lg:flex-row items-center justify-between px-6 lg:px-20 py-10 bg-white w-full h-full flex-grow">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 max-w-xl space-y-4">
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
          <div className="flex gap-4 mt-6">
            <button className="bg-[#1100D1] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#1100D1]">
              Explore Now
            </button>
            <button className="bg-white text-[#1100D1] px-6 py-3 rounded-full font-semibold shadow-md hover:bg-gray-100">
              Post Task
            </button>
          </div>

          {/* Mission Section */}
          <div className="bg-[#FFF8F8] rounded-xl shadow-md border border-gray-300 max-w-lg p-6 mt-8">
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
          </div>
        </div>

        {/* Right Side */}

        <div className=""></div>
        <div className="w-full lg:w-1/2 flex justify-center mt-10 lg:mt-37 overflow-hidden">
          <img
            src={deliveryGuy}
            alt="Delivery Guy"
            className="max-w-full w-[20vw] h-auto object-contain relative"
          />
        </div>
      </section>
    </div>
  );
};

export default HomePage;
