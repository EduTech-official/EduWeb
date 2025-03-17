import PropTypes from "prop-types";
import Logo from "../assets/logo.jpeg";
import "./../App.css";

const TeamCards = ({ PicLink, Name, Position, InstaLink, LinkdLink }) => {
  return (
    <div className="flex justify-center  border-none " style={{ flex: "1 0 20%" }}>
      <div
        id="hove"
        className="w-full h-full hover max-w-[16rem] min-w-[10rem]  border-gray-200 rounded-xl bg-gray-800 bg-opacity-80 hover:bg-opacity-95 hover:brightness-110 dark:border-gray-700 p-4 flex-4 items-center "
      >
{/*         <a href="#"> */}
          <img
            className="rounded-lg object-cover"
            src={PicLink ? PicLink : Logo}
            alt="product image"
            loading="lazy"
            style={{ height: 300, width: 300, objectFit: "cover" }}
          />
{/*         </a>
        <div className="px-2 mt-3"> */}
          <a href="#">
            <h5 className="text-xl pt-3 text-left font-semibold tracking-tight text-white">
              {Name}
            </h5>
          </a>

          <div className="grid grid-cols-4 gap-4 my-3 items-center" id="hove">
            <span className="text-xs col-span-2 my-2 text-left font-bold pr-3 text-white">
              {Position}
            </span>
            
{/*             <a
              href={InstaLink}
              className="h-8 focus:outline-none col-span-1 dark:focus:ring-blue-800"
              id="stuff"
            >
              <svg
                className="w-12 text-gray-500 dark:text-gray-400 mb-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
              </svg>
            </a>
            <a
              href={LinkdLink}
              className="h-8 focus:outline-none col-span-1 dark:focus:ring-blue-800"
              id="stuff"
            >
              <svg
                className="w-12 text-gray-500 dark:text-gray-400 mb-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 100 100"
              >
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M17,20v19h-6V20H17z M11,14.47c0-1.4,1.2-2.47,3-2.47s2.93,1.07,3,2.47c0,1.4-1.12,2.53-3,2.53C12.2,17,11,15.87,11,14.47z M39,39h-6c0,0,0-9.26,0-10 c0-2-1-4-3.5-4.04h-0.08C27,24.96,26,27.02,26,29c0,0.91,0,10,0,10h-6V20h6v2.56c0,0,1.93-2.56,5.81-2.56 c3.97,0,7.19,2.73,7.19,8.26V39z"></path>
              </svg>
            </a> */}
          </div>
        </div>
      </div>
    </div>
  );
};

TeamCards.propTypes = {
  PicLink: PropTypes.string,
  Name: PropTypes.string,
  Position: PropTypes.string,
  InstaLink: PropTypes.string,
  LinkdLink: PropTypes.string,
  index: PropTypes.number,
};

export default TeamCards;
