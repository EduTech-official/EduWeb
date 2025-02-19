import React, { useEffect } from "react";
import Navbar from "./Navbar";

const BasicComp = () => {
  useEffect(() => {
    const preventFullscreen = (event) => {
      event.preventDefault();
    };

    const videoElement = document.querySelector("video");
    if (videoElement) {
      videoElement.addEventListener("fullscreenchange", preventFullscreen);
      videoElement.addEventListener("webkitfullscreenchange", preventFullscreen);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("fullscreenchange", preventFullscreen);
        videoElement.removeEventListener("webkitfullscreenchange", preventFullscreen);
      }
    };
  }, []);

  return (
    <>
      <Navbar />
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        className="brightness-50"
        style={{
          position: "absolute",
          width: "100%",
          objectFit: "cover",
          zIndex: "-1",
        }}
      >
        <source src="p.webm" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default BasicComp;
