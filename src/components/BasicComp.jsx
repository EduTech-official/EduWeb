import React from "react";
import Navbar from "./Navbar";
import InteractiveStarfield from "./InteractiveStarfield";

const BasicComp = () => {
  return (
    <>
      <Navbar />

      {/* Dark Ambient Base Backdrop */}
      <div className="site-backdrop" aria-hidden="true" />

      {/* Interactive Twinkling Space Stars Background */}
      <InteractiveStarfield />
    </>
  );
};

export default BasicComp;
