import React, { useState } from "react";
import PropTypes from "prop-types";
import Logo from "../assets/logo.jpeg";

// Helper function to extract Google Drive File ID and convert to direct image URL
const getDirectDriveUrl = (url) => {
  if (!url) return null;

  // Extract ID if URL matches standard drive formats (/d/ID, id=ID, or direct lh3 link)
  const regExp = /(?:\d\/|id=|lh3\.googleusercontent\.com\/d\/)([a-zA-Z0-9_-]+)/;
  const match = url.match(regExp);

  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }

  return url; // Return original if it's not a recognized Drive URL
};

// Helper to format Google Drive links to reliable direct CDN URLs
const formatGoogleDriveUrl = (url) => {
  if (!url || typeof url !== "string") return Logo;
  
  // Extract file ID if it's a Google Drive link
  const driveMatch = url.match(/id=([a-zA-Z0-9_-]+)/) || url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (driveMatch && driveMatch[1]) {
    const fileId = driveMatch[1];
    // Google User Content CDN endpoint with high reliability
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return url;
};

const TeamCards = ({ PicLink, Name, Position }) => {
  const [imgSrc, setImgSrc] = useState(() => formatGoogleDriveUrl(PicLink));
  const [hasFailedOnce, setHasFailedOnce] = useState(false);

  const handleClick = (event) => {
    event.preventDefault();
  };

  const handleImageError = () => {
    if (!hasFailedOnce && PicLink && typeof PicLink === "string") {
      setHasFailedOnce(true);
      // Try fallback to drive thumbnail endpoint
      const driveMatch = PicLink.match(/id=([a-zA-Z0-9_-]+)/) || PicLink.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (driveMatch && driveMatch[1]) {
        setImgSrc(`https://drive.google.com/thumbnail?id=${driveMatch[1]}&sz=w800`);
        return;
      }
    }
    setImgSrc(Logo);
  };

  return (
    <div
      className="flex justify-center items-center border-none"
      style={{ flex: "1 0 20%" }}
    >
      <div
        id="hove"
        className="w-full h-full max-w-[16rem] min-w-[10rem] border-gray-200 rounded-xl bg-gray-800 bg-opacity-80 hover:bg-opacity-95 hover:brightness-110 dark:border-gray-700 p-4 flex flex-col items-center text-center transition-all"
      >
        <img
          className="rounded-lg object-cover"
          src={imgSrc}
          alt={Name || "team member"}
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          loading="lazy"
          onError={handleImageError}
          style={{ height: 300, width: 300, objectFit: "cover" }}
        />

        <h5 className="team-card-name">{Name}</h5>

        <div className="team-card-position">
          <span>{Position}</span>
        </div>
      </div>
    </div>
  );
};

TeamCards.propTypes = {
  PicLink: PropTypes.string,
  Name: PropTypes.string,
  Position: PropTypes.string,
};

export default TeamCards;