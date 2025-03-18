import { useState } from "react";
// import Logo from "../assets/logo.jpeg";
import Logo2 from "../assets/Vector.png";
// import { Outlet, Link } from "react-router-dom";
// import HamburgerMenu from "./HambergerMenu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "./ui/navigation-menu";
import { SheetClose } from "./ui/sheet";

const Navbar = () => {
  const [showLogo, setShowLogo] = useState(false);
  const links = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "About Us",
      url: "/aboutus",
    },
    {
      name: "Team",
      url: "/team",
    },
    {
      name: "Events",
      url: "/events",
    },
    {
      name: "Gallery",
      url: "/gallery2",
    },
    {
      name: "Contact Us",
      url: "/contact",
    },
    {
      name: "Resources",
      url: "/resources",
    },
  ];

  return (
    <div>
      <header className=" group/navbar: top-0 bg-transparent z-10 h-6 ">
        <nav className="flex items-end justify-between minlg:hidden ">
          <div className="flex items-center justify-between space-x-4">
            {
              <a href="/" target="_self">
                <img
                  src={Logo2}
                  alt="Logo"
                  className="mt-2 min-h-[50px] min-w-[70px] w-10 h-10 aspect-[1/2]"
                  loading="lazy"
                />
              </a>
            }
          </div>
          <ul className="flex pb-4">
            <li className="pr-5 m2xl:pr-9  text-[15px] hover:animate-bounce">
              <a
                href="/"
                className="text-blue-500 hover:underline hover:text-blue-200 "
              >
                EduMinerva
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9 text-[15px] hover:animate-bounce">
              <a
                href="/team"
                className="text-blue-500 hover:underline  hover:text-blue-200 "
              >
                Team
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px] hover:animate-bounce">
              <a
                href="/events"
                className="text-blue-500 hover:underline  hover:text-blue-200 "
              >
                Events
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px] hover:animate-bounce">
              <a
                href="/gallery2"
                className="text-blue-500 hover:underline  hover:text-blue-200 "
              >
                Gallery
              </a>
            </li>
            <li className="pr-5 m2xl:pr-9  text-[15px] hover:animate-bounce">
              <a
                href="/contact"
                className="text-blue-500 hover:underline  hover:text-blue-200 "
              >
                Contact Us
              </a>
            </li>
          </ul>
        </nav>
        <nav className=" justify-end hidden minlg:flex cursor-pointer text-white my-3 mr-3">
          {/* <HamburgerMenu /> */}
          <Sheet>
            <SheetTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 50 50"
                width="50px"
                height="50px"
                fill="white"
              >
                <path d="M 5 8 A 2.0002 2.0002 0 1 0 5 12 L 45 12 A 2.0002 2.0002 0 1 0 45 8 L 5 8 z M 5 23 A 2.0002 2.0002 0 1 0 5 27 L 45 27 A 2.0002 2.0002 0 1 0 45 23 L 5 23 z M 5 38 A 2.0002 2.0002 0 1 0 5 42 L 45 42 A 2.0002 2.0002 0 1 0 45 38 L 5 38 z" />
              </svg>
            </SheetTrigger>
            <SheetContent>
              <SheetClose></SheetClose>
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
                {links.map((link) => (
                  <a key={link.url} className="text-white" href={link.url}>
                    {link.name}
                  </a>
                ))}
              </SheetHeader>
            </SheetContent>
          </Sheet>
        </nav>
      </header>
      {/* Rest of your website content */}
    </div>
  );
};

export default Navbar;
