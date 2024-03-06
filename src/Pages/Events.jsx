import { useState } from "react";
// import photo from "../assets/IMG.png";
// import photo1 from "../assets/IMG_6961.png";
// import Cards from "../components/Cards";
// import InfoCard from "../components/InfoCard";
import events from "../Config/Events";
import upcomingEvents from "../Config/Events/upcoming.index";
import EventsCard from "../components/Events.past";

const Events = () => {
  const [toggle, setToggle] = useState(false);
  const toggleOptions = () => {
    setToggle(!toggle);
    console.log("clicked");
  };

  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const EventToggle = ({ eventDetils }) => {
    setSelectedEvent(eventDetils);
    console.log(selectedEvent);
  };

  // const EventList = ["Event 1", "Event 2", "Event 3", "Event 4"];

  return (
    <>
      <div className="grid grid-cols-3 minlg:grid-cols-1 gap-4 mx-5 mt-10">
        <div className="col-span-1 minmd:col-span-3">
          <h1 className="text-4xl bg-gradient-to-r brightness-150 flex justify-center from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent mt-3">
            Events
          </h1>
          <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
            <img
              className="object-cover w-full h-full rounded-xl"
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

          <a
            href={selectedEvent.links[1].url}
            className="inline-block bg-gray-200 rounded-full px-6 py-3 text-lg font-semibold text-gray-700 mr-2 mb-2"
          >
            {selectedEvent.links[1].name}
          </a>

          {/* toogle events Logic */}
          <div className=" p-3 flex  flex-col items-center">
            <button
              onClick={toggleOptions}
              className="flex flex-row justify-between w-full max-w-[15rem] px-2 py-2 text-white bg-slate-600 bg-opacity-75  border-2 border-slate-500 rounded-md shadow focus:outline-none focus:border-blue-600"
            >
              <span className="select-none minlg:text-sm">Select an Event</span>

              <svg
                id="arrow-down"
                className={`${toggle ? "hidden" : ""} w-6 h-6 stroke-current`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                id="arrow-up"
                className={`${toggle ? "" : "hidden"} w-6 h-6 stroke-current`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div
              id="options"
              className={
                toggle
                  ? "w-full max-w-[15rem] py-2 mt- bg-slate-600 bg-opacity-50 rounded-lg shadow-xl"
                  : ` hidden max-w-[15rem] w-full py-2 mt-2 bg-slate-600 bg-opacity-50 rounded-lg shadow-xl`
              }
            >
              {upcomingEvents.map((event, index) => (
                <a
                  href="#"
                  key={index}
                  className="block z-1 px-4 py-2 text-stone-200 hover:bg-indigo-500 hover:text-white"
                  onClick={() => {
                    EventToggle({ eventDetils: event });
                    toggleOptions();
                  }}
                >
                  {event.title}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 rounded-xl">
          <img
            className="object-cover w-full h-full rounded-xl"
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
