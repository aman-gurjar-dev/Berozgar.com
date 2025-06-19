import React from "react";

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#f4f0ff] py-12 px-4 lg:px-20">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-[#5d2fff] mb-6">About Us</h1>
        <p className="text-gray-700 text-lg mb-6">
          At <span className="font-semibold">Berozgar.com</span>, we believe in
          empowering individuals to find opportunities, offer services, and earn
          by helping each other in their community.
          <br />
          Whether you are a student, freelancer, or anyone looking for part-time
          work, our platform connects you with the right people for the right
          task.
        </p>
        <div className="grid md:grid-cols-2 gap-8 mt-10 text-left">
          <div>
            <h2 className="text-2xl font-semibold text-[#5d2fff] mb-2">
              Our Mission
            </h2>
            <p className="text-gray-700">
              To provide equal opportunities for everyone to work, grow, and
              earn while creating a supportive and trustworthy task-sharing
              ecosystem.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-[#5d2fff] mb-2">
              Our Vision
            </h2>
            <p className="text-gray-700">
              We envision a future where finding or offering help is just a few
              clicks away — creating self-reliant, helpful communities all over
              India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
