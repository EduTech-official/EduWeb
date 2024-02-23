
import { useState } from "react";

function HamburgerMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="flex items-center justify-between pt-4 pb-6 bg-transparent">
            <nav>
                <div
                    className={`${isOpen ? 'opacity-0 ' : ''}flex flex-col  items-center lg:hidden`}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <div className="h-0.5 w-8 my-1 bg-gray-600"></div>
                    <div className="h-0.5 w-8 my-1 bg-gray-600"></div>
                    <div className="h-0.5 w-8 my-1 bg-gray-600"></div>
                </div>

                {isOpen && (
                    <div className="absolute top-0 right-0 h-screen w-screen bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="space-y-4 flex flex-col items-center text-white">
                            <a href="/">Home</a>
                            <a href="/aboutus">Eduminerva</a>
                            <a href="/team">Team</a>
                            <a href="/events">Events</a>
                            <a href="/gallery">Gallery</a>
                            <a href="/contact">Contactus</a>
                        </div>
                        <div
                            className="absolute top-0 right-0 p-4 pb-6 pr-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="h-8 w-8 text-white"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>
                )}
            </nav>
        </div>
    );
}

export default HamburgerMenu;