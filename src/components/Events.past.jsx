import { useState } from "react";
import PropTypes from "prop-types";

const EventCard = ({ events }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleReadMore = () => {
    // Use modal on mobile for better UX, inline on desktop
    if (window.innerWidth < 768) {
      setShowModal(true);
    } else {
      setIsExpanded(true);
    }
  };

  const handleClose = () => {
    setIsExpanded(false);
    setShowModal(false);
  };

  // Modal for mobile expanded view
  if (showModal) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        onClick={handleClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div
          className="bg-gray-900 rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            <img
              className="w-full rounded-t-2xl"
              src={events.image}
              alt={events.title}
            />
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm text-white rounded-full p-2 hover:bg-black/80 transition-colors"
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-6">
            <h3 id="modal-title" className="font-bold text-white font-tourney text-xl mb-3">
              {events.title}
            </h3>
            <p className="text-gray-300 font-mono text-base leading-relaxed whitespace-pre-wrap">
              {events.description}
            </p>
            {events.links && events.links.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {events.links.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-gray-800 border border-gray-700 rounded-full px-4 py-2 text-sm font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <article className="group bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col h-full">
      {/* Event Image / Poster */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          src={events.image}
          alt={events.title}
          loading="lazy"
        />
        {/* Gradient overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Event Title */}
        <h3 className="font-bold text-white font-tourney text-lg mb-3 line-clamp-2 min-h-[3rem]">
          {events.title}
        </h3>

        {/* Read More Button - Bottom of card (when collapsed) */}
        {!isExpanded && (
          <button
            type="button"
            onClick={handleReadMore}
            className="mt-auto w-full py-3 bg-gradient-to-r from-[#0CF996] to-[#E61AA1] text-gray-900 font-semibold rounded-xl hover:opacity-90 hover:scale-[1.02] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0CF996] focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-expanded={false}
          >
            Read More
          </button>
        )}
      </div>

      {/* Inline expanded description for desktop */}
      {isExpanded && window.innerWidth >= 768 && (
        <div className="px-5 pb-5 animate-slide-down border-t border-gray-800">
          <p className="text-gray-400 font-mono text-sm leading-relaxed pt-4">
            {events.description}
          </p>
          {events.links && events.links.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {events.links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-gray-800 border border-gray-700 rounded-full px-3 py-1 text-xs font-medium text-gray-200 hover:bg-gray-700 hover:text-white transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          )}
          {/* Read Less Button for desktop */}
          <button
            type="button"
            onClick={handleClose}
            className="mt-4 w-full py-2 bg-gray-800 border border-gray-700 text-gray-200 font-medium rounded-xl hover:bg-gray-700 hover:text-white transition-colors"
            aria-expanded={true}
          >
            Read Less
          </button>
        </div>
      )}
    </article>
  );
};

EventCard.propTypes = {
  events: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default EventCard;