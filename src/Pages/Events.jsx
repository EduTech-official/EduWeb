import { useState } from "react";
// import photo from "../assets/IMG.png";
// import photo1 from "../assets/IMG_6961.png";
// import Cards from "../components/Cards";
// import InfoCard from "../components/InfoCard";
import events from "../Config/Events";
import upcomingEvents from "../Config/Events/upcoming.index";
import EventsCard from "../components/Events.past";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const EventToggle = ({ eventDetils }) => {
    setSelectedEvent(eventDetils);
    console.log(selectedEvent);
  };

  return (
    <>
      <div className="grid items-center grid-cols-3 minlg:grid-cols-1 gap-4 mx-5 mt-10">
        <div className="col-span-1 minmd:col-span-3">
          <h1 className="text-4xl bg-gradient-to-r brightness-150 font-semibold flex justify-center from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent mt-3">
            Events
          </h1>
          <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
            <img
              className="my-auto object-cover w-full h-full rounded-xl"
              src={
                selectedEvent.image
                  ? selectedEvent.image
                  : upcomingEvents[0].image
              }
              alt="photo"
            />
          </div>

          <p className="text-left p-4 text-white minxl:text-xs">
            {selectedEvent.description}
          </p>
          {selectedEvent.tags[0] == "MAIN" ? (
            ""
          ) : (
            <a
              href={selectedEvent.links[1].url}
              className="inline-block bg-gray-200 rounded-full px-6 py-3 text-lg font-semibold text-gray-700 mr-2 mb-2"
            >
              {selectedEvent.links[1].name}
            </a>
          )}
        </div>

        <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl">
          <img
            className="object-contain w-full h-full rounded-xl"
            src={selectedEvent.image}
            alt="photo"
          />
        </div>
      </div>
      <h1 className="text-2xl  bg-gradient-to-r brightness-150 from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent mt-8 mb-3">
        Past Events
      </h1>
      <div className="col-span-1 minmd:col-span-3 flex gap-4 flex-wrap justify-center">
        {/* first event contains the title and description of /events page.Skip it. */}
        {events.slice(1).map((event, index) => (
          <div key={index} className="py-7">
            <EventsCard events={event} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Events;
