import PropTypes from "prop-types"; 
 
const EventCard = ({ events }) => { 
  const validLinks = (events.links || []).filter((link) => link.url?.trim()); 
  const hasTags = events.tags && events.tags.length > 0; 
 
  return ( 
    <div className="event-card"> 
      <style>{` 
        .event-card { 
          max-width: 24rem; 
          height: 32rem;
          box-sizing: border-box;
          border-radius: 0.75rem; 
          background-color: #111827; 
          border: 1px solid rgba(250, 204, 21, 0.15); 
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3), 
            0 4px 6px -4px rgba(0, 0, 0, 0.3); 
          overflow: hidden; 
          display: flex; 
          flex-direction: column; 
          transition: border-color 0.2s ease, transform 0.2s ease; 
        } 
 
        .event-card:hover { 
          border-color: rgba(250, 204, 21, 0.4); 
          transform: translateY(-2px); 
        } 
 
        .event-card__image-wrap { 
          width: 100%; 
          aspect-ratio: 16 / 9; 
          overflow: hidden; 
          border-bottom: 1px solid rgba(250, 204, 21, 0.15); 
        } 
 
        .event-card__image { 
          width: 100%; 
          height: 100%; 
          object-fit: cover; 
          display: block; 
        } 
 
        .event-card__body { 
          padding: 1.25rem 1.5rem; 
          flex: 1; 
          display: flex; 
          flex-direction: column; 
        } 
 
        .event-card__title { 
          font-weight: 700; 
          color: #ffffff; 
          font-family: "Tourney", sans-serif; 
          font-size: 1.25rem; 
          line-height: 1.75rem; 
          margin: 0 0 0.75rem 0; 
        } 
 
        .event-card__description { 
          color: #facc15; 
          font-family: monospace; 
          font-size: 0.9rem; 
          line-height: 1.5rem; 
          margin: 0; 
          display: -webkit-box; 
          -webkit-line-clamp: 4; 
          -webkit-box-orient: vertical; 
          overflow: hidden; 
        } 
 
        .event-card__description--empty { 
          color: rgba(250, 204, 21, 0.4); 
          font-style: italic; 
        } 
 
        .event-card__divider { 
          border: none; 
          border-top: 1px solid rgba(250, 204, 21, 0.15); 
          margin: 1rem 0 0 0; 
        } 
 
        .event-card__footer { 
          padding: 1rem 1.5rem 1.25rem; 
        } 
 
        .event-card__tags { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.5rem; 
          margin-bottom: ${validLinks.length ? "0.75rem" : "0"}; 
        } 
 
        .event-card__tag { 
          display: inline-block; 
          background-color: rgba(250, 204, 21, 0.1); 
          border: 1px solid rgba(250, 204, 21, 0.3); 
          border-radius: 9999px; 
          padding: 0.2rem 0.7rem; 
          font-size: 0.7rem; 
          font-weight: 600; 
          letter-spacing: 0.02em; 
          text-transform: uppercase; 
          color: #facc15; 
        } 
 
        .event-card__links { 
          display: flex; 
          flex-wrap: wrap; 
          gap: 0.5rem; 
        } 
 
        .event-card__link { 
          display: inline-block; 
          background-color: #facc15; 
          border-radius: 0.375rem; 
          padding: 0.4rem 0.9rem; 
          font-size: 0.8rem; 
          font-weight: 700; 
          color: #111827; 
          text-decoration: none; 
          transition: background-color 0.15s ease; 
        } 
 
        .event-card__link:hover { 
          background-color: #fde047; 
        } 
      `}</style> 
 
      <div className="event-card__image-wrap"> 
        <img 
          className="event-card__image" 
          src={events.image} 
          alt={events.title} 
          loading="lazy" 
        /> 
      </div> 
 
      <div className="event-card__body"> 
        <h3 className="event-card__title">{events.title}</h3> 
        {events.description?.trim() ? ( 
          <p className="event-card__description">{events.description}</p> 
        ) : ( 
          <p className="event-card__description event-card__description--empty"> 
            No description available. 
          </p> 
        )} 
      </div> 
 
      {(hasTags || validLinks.length > 0) && ( 
        <> 
          <hr className="event-card__divider" /> 
          <div className="event-card__footer"> 
            {hasTags && ( 
              <div className="event-card__tags"> 
                {events.tags.map((tag, index) => ( 
                  <span key={index} className="event-card__tag"> 
                    {tag} 
                  </span> 
                ))} 
              </div> 
            )} 
 
            {validLinks.length > 0 && ( 
              <div className="event-card__links"> 
                {validLinks.map((link, index) => ( 
                  <a 
                    key={index} 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="event-card__link" 
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