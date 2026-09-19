import PropTypes from "prop-types";

const EventCard = ({ events }) => {
  const validLinks = (events.links || []).filter((link) => link.url?.trim());
  const hasTags = events.tags && events.tags.length > 0;
  const hasDescription = events.description?.trim();

  return (
    <div className="flex w-full max-w-sm mx-auto flex-col overflow-hidden rounded-xl border border-yellow-400/15 bg-gray-900 shadow-lg shadow-black/30 transition-all duration-200 hover:-translate-y-0.5 hover:border-yellow-400/40">
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden border-b border-yellow-400/15">
        <img
          className="h-full w-full object-cover"
          src={events.image}
          alt={events.title}
          loading="lazy"
        />
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col px-5 py-4 sm:px-6 sm:py-5">
        <h3 className="mb-3 font-['Tourney',sans-serif] text-lg sm:text-xl font-bold leading-snug text-white">
          {events.title}
        </h3>

        {hasDescription ? (
          <p className="line-clamp-4 font-mono text-sm leading-6 text-yellow-400">
            {events.description}
          </p>
        ) : (
          <p className="font-mono text-sm italic leading-6 text-yellow-400/40">
            No description available.
          </p>
        )}
      </div>

      {/* Footer: tags + links */}
      {(hasTags || validLinks.length > 0) && (
        <>
          <hr className="border-t border-yellow-400/15" />
          <div className="px-5 pb-5 pt-4 sm:px-6">
            {hasTags && (
              <div className={`flex flex-wrap gap-2 ${validLinks.length ? "mb-3" : ""}`}>
                {events.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block rounded-full border border-yellow-400/30 bg-yellow-400/10 px-2.5 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-yellow-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {validLinks.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {validLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block rounded-md bg-yellow-400 px-3.5 py-1.5 text-sm font-bold text-gray-900 no-underline transition-colors duration-150 hover:bg-yellow-300"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

EventCard.propTypes = {
  events: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    image: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        url: PropTypes.string,
      })
    ),
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default EventCard;