import { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Logo2 from "../assets/Vector.png";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

// Single source of truth. The desktop bar and the mobile sheet previously kept
// two different hand written lists, which is why they showed different items.
const links = [
  { name: "EduMinerva", url: "/" },
  { name: "Team", url: "/team" },
  { name: "Events", url: "/events" },
  { name: "Gallery", url: "/gallery2" },
  { name: "Resources", url: "/resources" },
  { name: "Leaderboard", url: "/leaderboard" },
  { name: "Contact Us", url: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);
  const ticking = useRef(false);

  // rAF throttled so the scroll handler cannot fire more often than the browser
  // paints. A bare scroll listener that writes state on every event is a common
  // cause of janky headers.
  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      window.requestAnimationFrame(() => {
        setStuck(window.scrollY > 8);
        ticking.current = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const renderLogo = () => (
    <Link to="/" aria-label="EduMinerva home" className="nav-logo">
      <img
        src={Logo2}
        alt="EduMinerva logo"
        width="70"
        height="50"
        className="nav-logo__img"
      />
    </Link>
  );

  return (
    <header className={`site-nav ${stuck ? "is-stuck" : ""}`}>
      <nav className="site-nav__inner">
        {/* Single Logo for both mobile and desktop */}
        {renderLogo()}

        {/* Desktop links (hidden on mobile, visible on desktop >= 1024px) */}
        <ul className="nav-list hidden lg:flex">
          {links.map((link, i) => (
            <li key={link.url} className="nav-list__item">
              <NavLink
                to={link.url}
                end={link.url === "/"}
                style={{ "--i": i }}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "is-active" : ""}`
                }
              >
                <span className="nav-link__label">{link.name}</span>
                <span className="nav-link__underline" aria-hidden="true" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Mobile menu sheet (visible on mobile < 1024px, hidden on desktop) */}
        <div className="flex items-center lg:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger aria-label="Open menu" className="nav-burger">
              <span className={`nav-burger__box ${open ? "is-open" : ""}`}>
                <span className="nav-burger__bar" />
                <span className="nav-burger__bar" />
                <span className="nav-burger__bar" />
              </span>
            </SheetTrigger>

            <SheetContent className="bg-[rgba(7,11,20,0.97)] backdrop-blur-xl border-l border-white/10">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>

              <ul className="nav-sheet">
                {links.map((link, i) => (
                  <li key={link.url} style={{ "--i": i }} className="nav-sheet__item">
                    <SheetClose asChild>
                      <NavLink
                        to={link.url}
                        end={link.url === "/"}
                        className={({ isActive }) =>
                          `nav-sheet__link ${isActive ? "is-active" : ""}`
                        }
                      >
                        {link.name}
                      </NavLink>
                    </SheetClose>
                  </li>
                ))}
              </ul>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
