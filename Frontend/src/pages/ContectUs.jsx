import React from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactUs = () => {
  return (
    <div className="h-[90vh] flex items-center justify-center bg-white px-4 py-8">
      <div className="flex flex-col md:flex-row w-full max-w-5xl rounded-lg overflow-hidden shadow-lg">
        {/* Left Section */}
        <div className="bg-[#a89eda] text-white w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-semibold mb-4">
            Contact <span className="text-white font-bold">Us</span>
          </h2>
          <p className="mb-6">We are here to help you</p>

          <div className="flex items-center mb-4">
            <FaPhone className="text-2xl mr-4" />
            <p>
              Phone - <br />
              +91 1234567890
            </p>
          </div>

          <div className="flex items-center mb-4">
            <FaEnvelope className="text-2xl mr-4" />
            <p>
              Email - <br />
              abc@gmail.com
            </p>
          </div>

          <div className="flex items-center">
            <FaMapMarkerAlt className="text-2xl mr-4" />
            <p>
              Location - <br />
              xyz, Indore M.P.
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="bg-[#d6d1f0] w-full md:w-1/2 p-8">
          <h2 className="text-2xl font-bold mb-1">Let’s Talk</h2>
          <p className="text-blue-800 mb-6">Feel free to contact us below</p>

          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your Name..."
              className="w-full p-2 border bg-gray-200"
            />
            <input
              type="email"
              placeholder="Email Id..."
              className="w-full p-2 border bg-gray-200"
            />
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full p-2 border bg-gray-200"
            />
            <textarea
              placeholder="Message.."
              rows="4"
              className="w-full p-2 border bg-gray-200"
            />
            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded-full transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
