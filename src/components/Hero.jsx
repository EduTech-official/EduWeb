import React, { useEffect, useState } from "react";
import logo from "../assets/logo.jpeg";
import logo2 from "../assets/logot.png";
import logo3 from "../assets/Vector.png";

import TypewriterText from "./TyperWriterAnimate";

const Hero = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  // make a timeout that automatically send the user to the next page after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      // Redirect to the next page
      window.location.href = "/aboutus";
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    // Trigger animation after a delay
    const animationTimeout = setTimeout(() => {
      setIsAnimating(true);
    }, 200); // Adjust the delay as needed

    return () => {
      clearTimeout(animationTimeout); // Cleanup to prevent memory leaks
    };
  }, []);

  return (
    <div className="bg-transparent text-black min-h-[80vh] flex items-center translate-y-5 minsm:-translate-y-2 justify-center">
      <div className="text-center">
        <img src={logo3} alt="Logo" className="mx-auto h-24" />

        {/* {isAnimating ? (
          <h1 className="text-4xl font-bold mt-4">
            Learning Today
            
          </h1>
        ) : (
          <h1 className="text-4xl font-bold mt-4">Leading Tommorow</h1>
        )} */}
        <TypewriterText />
      </div>
    </div>
  );
};

export default Hero;
