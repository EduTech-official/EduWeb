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

const [year, setYear] = useState("2024-2025")
const yearChange = (e) => {
  setYear((y) => e)
}

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

      <div className="flex justify-center w-full mt-7">
        <select
              className="bg-gray-800 text-white border border-gray-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              value={year}
              onChange={(e) => yearChange(e.target.value)}
            >
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
      </div>


      {year === "2024-2025" && (
        <>
        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
              AECC GLOBAL Industrial Visit
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10] bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\aecc.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                The industrial visit provided participants with comprehensive insights into opportunities for studying abroad and its associated processes. Attendees were able to gain a clear understanding of various study programs, application procedures, and potential career benefits through one-on-one counseling. The visit aimed at helping participants make choices regarding pursuing international academic endeavors. 
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl">
              <img className="rounded-md w-[90vh]" src="src\assets\aecc.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14"> 
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3 ">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                Career Clash: Battle of Professions
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\careerClash.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                The goal of Career Clash: Battle of Professions is to give students a fun way to learn about different careers while improving their debating and thinking skills. The event helps participants explore various jobs and understand what they involve. Through exciting quizzes and debates, students will work together, think quickly, and confidently present their ideas. It's a great chance to learn, compete, and have fun at the same time!
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl">
              <img className="rounded-md w-[90vh]" src="src\assets\careerClash.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                Crack the Success Code
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10] bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\cracksuccess.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                The primary objective of  Crack the Success Code was to empower participants with the essential skills and strategies needed to achieve greater success in their personal and professional lives. The goal was for participants to leave with a renewed sense of purpose, a clear action plan, and the necessary tools and techniques to crack the code to their success. The workshop aimed to provide attendees with practical, actionable insights across four key areas: Clear goal setting, Effective time management, Communication Mastery, and Self-empowerment techniques. 
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10] bg-slate-800 bg-opacity-30 rounded-xl">
              <img className="rounded-md w-[90vh]" src="src\assets\cracksuccess.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14"> 
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3 ">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                Pre-Placement Boot Camp 3.0
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\bootcamp3.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                The event aimed to bridge the gap between academic knowledge and industry expectations by providing hands-on exposure to technical concepts, problem-solving approaches, and real-world interview scenarios. It focused on boosting confidence, enhancing decision-making abilities, and developing analytical thinking to prepare students for diverse career opportunities.
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl mr-7">
              <img className="rounded-md w-[90vh]" src="src\assets\bootcamp3.png" alt="AECC " /> 
            </div>
          </div>
        </div>
      </>
      )}



    {year === "2023-2024" && (
        <>
        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                FRESH ON CAMPUS
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10] bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\fresher.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                To welcome the freshers to the new life of college and introduce them to college an induction program was organised by Bharati Vidyapeeth College of Engineering namely Fresh On Campus. Under the program schedule societies were tasked to conduct interviews and events for freshers and recruit them. 
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl">
              <img className="rounded-md w-[90vh]" src="src\assets\fresher.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3 ">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                EduMinerva Defence Bootcamp
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\defensebootcamp.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                This event was designed to create a comprehensive learning experience for the participants. By bringing in experienced speakers to share their insights, conducting mock interviews to enhance interview skills, facilitating group discussions to foster teamwork, and guidance on how to give defence exams, the bootcamp aimed to empower attendees with the knowledge, skills, and confidence needed for their holistic preparation for their defence career.
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl mr-7">
              <img className="rounded-md w-[90vh]" src="src\assets\defensebootcamp.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
              AECC CAREER FAIR 
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10] bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\aecc23.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                EduMinerva was invited to an event namely CAREER FAIR on 8th October 2023. It was a one-hour session that was conducted in offline mode at AECC India Pvt  Ltd’s office at The  International Trade Tower, Nehru Place which included one-on-one counseling with the the counselors from AECC India Pvt  Ltd. The event’s main purpose was to help students who want to pursue education out of India and help them with proper guidance regarding universities best in town for the desired course.
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10] bg-slate-800 bg-opacity-30 rounded-xl">
              <img className="rounded-md w-[90vh]" src="src\assets\aecc23.png" alt="AECC " /> 
            </div>
          </div>
        </div>

        <div className="gap-4 mx-5 mt-10">
          <div className="flex items-center gap-14">
            <div className="lg:text-left text-centre lg:w-[45%] col-span-1 minmd:col-span-3 ">
              <h1 className="text-xl bg-gradient-to-r brightness-150 font-semibold flex justify-evenly bg-clip-text text-white mt-3">
                Skill Synergy
              </h1>
              <div className=" lg:hidden col-span-2 minmd:col-span-3 my-5 aspect-[16/10]  bg-slate-800 rounded-xl">
                <img
                  className="my-auto object-cover w-full h-full rounded-xl"
                  src= "src\assets\skillSynergy.png"
                  alt="photo"
                />
              </div>
              <p className="font-light text-white text-sm mt-2">
                This event was organized for third-year students with a primary focus on aiding them in navigating the challenging landscape of placements, particularly within the IT sector. We aimed to provide attendees with a comprehensive roadmap and invaluable personal insights from esteemed alumni, equipping them with the tools and knowledge needed to excel in their chosen career path.
              </p>
            </div>
            <div className="z-10 minlg:hidden col-span-2 minmd:col-span-3 aspect-[16/10]  bg-slate-800 bg-opacity-30 rounded-xl mr-7">
              <img className="rounded-md w-[90vh]" src="src\assets\skillSynergy.png" alt="AECC " /> 
            </div>
          </div>
        </div>
      </>
      )}
      
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
