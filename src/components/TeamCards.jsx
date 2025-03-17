import PropTypes from "prop-types";
import Logo from "../assets/logo.jpeg";
import "./../App.css";

const TeamCards = ({ PicLink, Name, Position }) => {
  const handleClick = (event) => {
    event.preventDefault(); // Prevent default behavior
  };

  return (
    <div className="flex justify-center border-none" style={{ flex: "1 0 20%" }}>
      <div
        id="hove"
        className="w-full h-full hover max-w-[16rem] min-w-[10rem] border-gray-200 rounded-xl bg-gray-800 bg-opacity-80 hover:bg-opacity-95 hover:brightness-110 dark:border-gray-700 p-4 flex-4 items-center"
      >
        <img
          className="rounded-lg object-cover"
          src={PicLink ? PicLink : Logo}
          alt="product image"
          loading="lazy"
          style={{ height: 300, width: 300, objectFit: "cover" }}
        />
        <a href="#" onClick={handleClick}>
          <h5 className="text-xl pt-3 text-left font-semibold tracking-tight text-white">
            {Name}
          </h5>
        </a>
        <div className="my-3">
          <span className="text-xs text-left font-bold text-white">
            {Position}
          </span>
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
