import React from "react";
import Navbar from "./Navbar";

const BasicComp = () => {
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
        {

        }
        <source src="p.webm" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default BasicComp;
