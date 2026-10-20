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

const TeamCards = ({ PicLink, Name, Position }) => {
  const imageUrl = getDirectDriveUrl(PicLink) || Logo;

  return (
    <div className="team-card-wrapper">
      <style>{`
        .team-card-wrapper {
          flex: 1 0 20%;
          display: flex;
          justify-content: center;
          align-items: center;
          border: none;
          padding: 0.75rem;
        }

        .team-card {
          width: 100%;
          max-width: 16rem;
          min-width: 10rem;
          padding: 1rem;
          border-radius: 0.75rem;
          background-color: rgba(31, 41, 55, 0.8);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-sizing: border-box;
          transition: background-color 0.2s ease,
                      filter 0.2s ease,
                      transform 0.2s ease;
        }

        .team-card:hover {
          background-color: rgba(31, 41, 55, 0.95);
          filter: brightness(1.1);
          transform: translateY(-2px);
        }

        .team-card-image {
          width: 300px;
          height: 300px;
          max-width: 100%;
          object-fit: cover;
          border-radius: 0.5rem;
          display: block;
        }

        .team-card-name {
          margin: 0;
          padding-top: 0.75rem;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.025em;
          color: #ffffff;
        }

        .team-card-position {
          margin: 0.75rem 0;
        }

        .team-card-position span {
          font-size: 0.75rem;
          font-weight: 700;
          color: #ffffff;
        }
      `}</style>

      <div className="team-card">
        <img
          className="team-card-image"
          src={imageUrl}
          alt={Name || "Team member"}
          crossOrigin="anonymous"
          onError={(e) => {
            // Fallback to logo if Google Drive fails to load
            e.target.src = Logo;
          }}
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