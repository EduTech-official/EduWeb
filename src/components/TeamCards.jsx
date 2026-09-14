import PropTypes from "prop-types";
import Logo from "../assets/logo.jpeg";
import "./../App.css";

const TeamCards = ({ PicLink, Name, Position, isCore, index }) => {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent default behavior
  };

  return (
    <div
      className="flex justify-center items-center border-none"
      style={{ flex: "1 0 20%" }}
    >
      <div
        id="hove"
        className="w-full h-full max-w-[16rem] min-w-[10rem] border-gray-200 rounded-xl bg-gray-800 bg-opacity-80 hover:bg-opacity-95 hover:brightness-110 dark:border-gray-700 p-4 flex flex-col items-center text-center"
      >
        {isCore && (
          <div className="w-full text-left text-xs font-mono text-gray-400 mb-2">
            CORE • {String(index).padStart(2, "0")}
          </div>
        )}
        <img
          className="rounded-lg object-cover"
          src={PicLink ? PicLink : Logo}
          alt="team member"
          style={{ height: 300, width: 300, objectFit: "cover" }}
        />
        <a href="#" onClick={handleClick}>
          <h5 className="text-xl pt-3 font-semibold tracking-tight text-white">
            {Name}
          </h5>
        </a>
        <div className="my-3">
          <span className="text-xs font-bold text-white">{Position}</span>
        </div>
      </div>
    </div>
  );
};

TeamCards.propTypes = {
  PicLink: PropTypes.string,
  Name: PropTypes.string,
  Position: PropTypes.string,
  isCore: PropTypes.bool,
  index: PropTypes.number,
};

export default TeamCards;
