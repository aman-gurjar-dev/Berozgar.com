import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { SparklesCore } from "../Components/ui/sparkles";

const RootLayout = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden text-white">
      {/* Background Particles */}
      <SparklesCore
        id="tsparticlesfullpage"
        background="transparent"
        minSize={0.6}
        maxSize={1.4}
        particleDensity={80}
        className="absolute inset-0 "
        particleColor="#FFFFFF"
      />

      {/* Foreground Content */}
      <Navbar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
