import { useState, useEffect } from "react";
import events from "../Config/Events";
import upcomingEvents from "../Config/Events/upcoming.index";
import EventsCard from "../components/Events.past";
import aecc from "../assets/aecc.png";
import careerClash from "../assets/careerClash.png";
import cracksuccess from "../assets/cracksuccess.png";
import bootcamp3 from "../assets/bootcamp3.png";
import fresher from "../assets/fresher.png";
import defensebootcamp from "../assets/defensebootcamp.png";
import aecc23 from "../assets/aecc23.png";
import skillSynergy from "../assets/skillSynergy.png";

const Events = () => {
  const [selectedEvent, setSelectedEvent] = useState(events[0]);
  const [year, setYear] = useState("2024-2025");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const yearChange = (e) => {
    setYear(e.target.value);
  };

  // 2024-2025 events
  const events2024 = [
    {
      title: "AECC GLOBAL Industrial Visit",
      description: "The industrial visit provided participants with comprehensive insights into opportunities for studying abroad and its associated processes. Attendees were able to gain a clear understanding of various study programs, application procedures, and potential career benefits through one-on-one counseling. The visit aimed at helping participants make choices regarding pursuing international academic endeavors.",
      image: aecc,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2024"],
    },
    {
      title: "Career Clash: Battle of Professions",
      description: "The goal of Career Clash: Battle of Professions is to give students a fun way to learn about different careers while improving their debating and thinking skills. The event helps participants explore various jobs and understand what they involve. Through exciting quizzes and debates, students will work together, think quickly, and confidently present their ideas. It's a great chance to learn, compete, and have fun at the same time!",
      image: careerClash,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2024"],
    },
    {
      title: "Crack the Success Code",
      description: "The primary objective of Crack the Success Code was to empower participants with the essential skills and strategies needed to achieve greater success in their personal and professional lives. The goal was for participants to leave with a renewed sense of purpose, a clear action plan, and the necessary tools and techniques to crack the code to their success. The workshop aimed to provide attendees with practical, actionable insights across four key areas: Clear goal setting, Effective time management, Communication Mastery, and Self-empowerment techniques.",
      image: cracksuccess,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2024"],
    },
    {
      title: "Pre-Placement Boot Camp 3.0",
      description: "The event aimed to bridge the gap between academic knowledge and industry expectations by providing hands-on exposure to technical concepts, problem-solving approaches, and real-world interview scenarios. It focused on boosting confidence, enhancing decision-making abilities, and developing analytical thinking to prepare students for diverse career opportunities.",
      image: bootcamp3,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2024"],
    },
  ];

  // 2023-2024 events
  const events2023 = [
    {
      title: "FRESH ON CAMPUS",
      description: "To welcome the freshers to the new life of college and introduce them to college an induction program was organised by Bharati Vidyapeeth College of Engineering namely Fresh On Campus. Under the program schedule societies were tasked to conduct interviews and events for freshers and recruit them.",
      image: fresher,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2023"],
    },
    {
      title: "EduMinerva Defence Bootcamp",
      description: "This event was designed to create a comprehensive learning experience for the participants. By bringing in experienced speakers to share their insights, conducting mock interviews to enhance interview skills, facilitating group discussions to foster teamwork, and guidance on how to give defence exams, the bootcamp aimed to empower attendees with the knowledge, skills, and confidence needed for their holistic preparation for their defence career.",
      image: defensebootcamp,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2023"],
    },
    {
      title: "AECC CAREER FAIR",
      description: "EduMinerva was invited to an event namely CAREER FAIR on 8th October 2023. It was a one-hour session that was conducted in offline mode at AECC India Pvt Ltd's office at The International Trade Tower, Nehru Place which included one-on-one counseling with the the counselors from AECC India Pvt Ltd. The event's main purpose was to help students who want to pursue education out of India and help them with proper guidance regarding universities best in town for the desired course.",
      image: aecc23,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2023"],
    },
    {
      title: "Skill Synergy",
      description: "This event was organized for third-year students with a primary focus on aiding them in navigating the challenging landscape of placements, particularly within the IT sector. We aimed to provide attendees with a comprehensive roadmap and invaluable personal insights from esteemed alumni, equipping them with the tools and knowledge needed to excel in their chosen career path.",
      image: skillSynergy,
      links: [{ name: "Website", url: "" }, { name: "Registration", url: "" }],
      tags: ["education", "2023"],
    },
  ];

  const currentEvents = year === "2024-2025" ? events2024 : events2023;

  return (
    <>
      {/* Hero Section - Preserved */}
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

      {/* Year Filter Dropdown - Preserved */}
      <div className="flex justify-center w-full mt-7">
        <select
          className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#0CF996] cursor-pointer"
          value={year}
          onChange={yearChange}
        >
          <option value="2023-2024">2023-2024</option>
          <option value="2024-2025">2024-2025</option>
        </select>
      </div>

      {/* Current Events Grid - Compact Card Layout */}
      <section className="mx-5 mt-10">
        <h2 className="text-2xl bg-gradient-to-r brightness-150 from-[#0CF996] to-[#E61AA1] bg-clip-text text-transparent mb-6">
          {year === "2024-2025" ? "Current Events" : "Past Events (2023-2024)"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {currentEvents.map((event, index) => (
            <div key={index}>
              <EventsCard events={event} />
            </div>
          ))}
        </div>
      </section>

      {/* Past Events Grid - Compact Card Layout */}
      <section className="mx-5 mt-16 mb-16">
        <h2 className="text-2xl bg-gradient-to-r brightness-150 from-[#0CF996] to-[#E61AA1] bg-clip-text text-transparent mb-6">
          Past Events
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
          {/* first event contains the title and description of /events page. Skip it. */}
          {events.slice(1).map((event, index) => (
            <div key={index}>
              <EventsCard events={event} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Events;