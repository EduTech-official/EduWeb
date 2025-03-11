import PropTypes from "prop-types";

const EventCard = ({ events }) => {
  return (
    <div className="max-w-sm rounded shadow-lg">
      <img
        className="w-full rounded-xl"
        src={events.image}
        alt={events.description}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-white font-tourney text-xl mb-2">
          {events.title}
        </div>
        <p className="text-gray-700 font-mono text-base">
          {events.description}
        </p>
      </div>
{/*       <div className="px-6 pt-4 pb-2">
        {events.links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2"
          >
            {link.name}
          </a>
        ))}
        <p className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {events.tags[2]}
        </p>
      </div> */}
    </div>
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
    ).isRequired,
    tags: PropTypes.arrayOf(PropTypes.string), // Keeping tags in case it's needed later
  }),
};

export default EventCard;
