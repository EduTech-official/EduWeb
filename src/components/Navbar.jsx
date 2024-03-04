import { useState } from "react";
// import Logo from "../assets/logo.jpeg";
import Logo2 from "../assets/Vector.png";
// import { Outlet, Link } from "react-router-dom";
import HamburgerMenu from "./HambergerMenu";

const Navbar = () => {
  const [showLogo, setShowLogo] = useState(false);

  return (
    <div>
      <header className=" top-0 bg-transparent z-10 ">
        <nav className="flex items-end justify-end minlg:hidden ">
          <div className="flex items-center space-x-4">
            {showLogo && (
              <img
                src={Logo2}
                alt="Logo"
                className="mt-2 min-h-[50px] min-w-[70px] w-10 h-10 aspect-[1/2]"
                loading="lazy"
              />
            )}
          </div>
          <ul className="flex pt-4">
            <li className="pr-5 m2xl:pr-9 text-[15px]">
              <a
                href="/"
                className="text-blue-500 hover:underline hover:text-blue-200"
              >
                Home
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px]">
              <a href="/aboutus" className="text-blue-500 hover:underline">
                Eduminerva
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9 text-[15px]">
              <a href="/team" className="text-blue-500 hover:underline">
                Team
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px]">
              <a href="/events" className="text-blue-500 hover:underline">
                Events
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px]">
              <a href="/gallery2" className="text-blue-500 hover:underline">
                Gallery
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px]">
              <a href="/contact" className="text-blue-500 hover:underline">
                Contact Us
              </a>
            </li>
          </ul>
          <button
            onClick={() => setShowLogo(!showLogo)}
            className="text-blue-500 hover:underline"
          ></button>
        </nav>
        <nav className=" container hidden minlg:flex minlg:justify-end cursor-pointer pb-3">
          <HamburgerMenu />
        </nav>
      </header>
      {/* Rest of your website content */}
    </div>
  );
};

export default Navbar;
