import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const EventCard = ({ events }) => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  useEffect(() => {
    if (!showModal) return undefined;

    const handleEscape = (event) => {
      if (event.key === "Escape") handleClose();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [showModal]);

  return (
    <article className="group w-full h-full max-h-[min(34rem,calc(100dvh-2rem))] bg-gray-900/70 rounded-2xl overflow-hidden border border-gray-800 hover:border-gray-700 transition-all duration-300 flex flex-col">
      {/* Event Image / Poster */}
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
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
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        {/* Event Title */}
        <h3 className="font-bold text-white font-tourney text-lg mb-4 line-clamp-2 min-h-[3rem]">
          {events.title}
        </h3>

        <button
          type="button"
          onClick={() => setShowModal(true)}
          className="mt-auto w-full py-2.5 bg-gradient-to-r from-[#0CF996] to-[#E61AA1] text-gray-900 font-semibold rounded-xl hover:opacity-90 hover:scale-[1.01] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#0CF996] focus:ring-offset-2 focus:ring-offset-gray-900"
          aria-haspopup="dialog"
        >
          Read More
        </button>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-3 sm:p-6"
          onClick={handleClose}
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-modal-title"
        >
          <div
            className="relative grid w-full max-w-4xl max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl border border-gray-700 bg-gray-900 shadow-2xl md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:overflow-hidden"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="h-44 sm:h-56 md:h-full md:min-h-[28rem]">
              <img
                className="h-full w-full object-cover"
                src={events.image}
                alt={events.title}
              />
            </div>
            <div className="flex flex-col justify-center p-5 sm:p-7">
              <button
                type="button"
                onClick={handleClose}
                className="absolute right-3 top-3 rounded-full bg-black/70 p-2 text-white transition-colors hover:bg-black focus:outline-none focus:ring-2 focus:ring-[#0CF996]"
                aria-label="Close event details"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 id="event-modal-title" className="pr-10 font-tourney text-xl font-bold text-white sm:text-2xl">
                {events.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-300 sm:text-base">
                {events.description}
              </p>
              {events.links?.some((link) => link.url) && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {events.links.filter((link) => link.url).map((link, index) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block rounded-full border border-gray-700 bg-gray-800 px-4 py-2 text-sm font-medium text-gray-200 transition-colors hover:bg-gray-700 hover:text-white"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
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
