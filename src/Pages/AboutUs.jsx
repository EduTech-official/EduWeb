// import React from "react";
// import photo from "../assets/IMG.png";
// import photo1 from "../assets/IMG_6961.png";
// import Cards from "../components/Cards";

import { CarouselComp } from "../components/CaroselComp";

// import { IMG, IMG2, logo, Team } from "./../assets/index";
import "../components/Content_index";

import teams from "../Config/Team";
import events from "../Config/Events";
import UpcomingEvents from "../components/UpcomingEvents";

const AboutUs = () => {
  const coreTeam = teams.find((team) => team.teamName === "Core Team");
  const departments = teams.filter(
    (team) => team.teamName !== "Faculty Mentors",
  );

  const stats = [
    { value: "2019", label: "Founded", detail: "Building opportunities" },
    {
      value: coreTeam?.members.length ?? 0,
      label: "Core Members",
      detail: "Leading the community",
    },
    {
      value: Math.max(events.length - 1, 0),
      label: "Events Conducted",
      detail: "Workshops and webinars",
    },
    {
      value: departments.length,
      label: "Departments",
      detail: "Different ways to grow",
    },
  ];

  return (
    <div className="m-4">
      <div className="grid grid-cols-1 items-center gap-8 py-5 md:py-0 lg:grid-cols-2 lg:gap-12 my-5">
        <div className="my-5 py-4 text-left lg:pr-8">
          <h1 className="tracking-normal text-4xl minmd:text-lg minsm:text-3xl bg-gradient-to-r font-bold  from-[#E61AA1]  to-[#0CF996] to-55% bg-clip-text text-transparent my-3">
            ABOUT US
          </h1>
          <p className="text-stone-100 text-sm minmd:text-xs tracking-tighter text-left font-IBMplex h-auto">
            EduMinerva, founded in 2019, is a society of Bharati
            Vidyapeeth&apos;s College of Engineering, assisting students by
            providing opportunities to explore different career fields and
            co-curricular activities by organizing various webinars and
            workshops. EduMinerva focuses on providing a holistic development to
            anyone who&apos;s dedicated and has a will to improve.
          </p>
          {/* <p className="text-stone-100 font-thin text-sm minmd:text-xs tracking-tighter text-left h-auto">
            EduTech, founded in 2022, is a technical subchapter of EduMinerva
            society of Bharati Vidyapeeth's College of Engineering, New Delhi.
            The main purpose of EduTech is to guide and educate students more in
            this vast world of technology. We aim to provide new and fascinating
            content, such as workshops, quizes, facts, study material etc., on a
            regular basis.EduTech, founded in 2022, is a technical subchapter of
            EduMinerva society of Bharati Vidyapeeth's College of Engineering,
            New Delhi. The main purpose of EduTech is to guide and educate
            students more in this vast world of technology. We aim to provide
            new and fascinating content, such as workshops, quizes, facts, study
            material etc., on a regular basis.
          </p> */}
        </div>

        <div className="relative grid grid-cols-2 gap-3 text-left sm:gap-4">
          <div className="pointer-events-none absolute -right-3 -top-5 h-24 w-24 rounded-full border border-[#0CF996]/20" />
          <div className="pointer-events-none absolute -bottom-4 -left-4 h-16 w-16 rounded-full border border-[#E61AA1]/20" />
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`group relative overflow-hidden border border-white/10 bg-white/[0.04] p-4 shadow-lg backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#0CF996]/60 hover:bg-white/[0.08] sm:p-5 ${
                index === 1 ? "mt-6" : ""
              } ${index === 2 ? "-mt-6" : ""}`}
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="h-2 w-2 rounded-full bg-[#0CF996] shadow-[0_0_14px_#0CF996]" />
                <span className="text-xs font-semibold tracking-[0.2em] text-white/30">
                  0{index + 1}
                </span>
              </div>
              <p className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {stat.value}
                {index === 1 || index === 2 ? "+" : ""}
              </p>
              <p className="mt-2 text-sm font-semibold text-white/90">
                {stat.label}
              </p>
              <p className="mt-1 text-xs text-white/45">{stat.detail}</p>
              <div className="absolute bottom-0 left-0 h-0.5 w-1/2 bg-gradient-to-r from-[#E61AA1] to-[#0CF996] transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* <img
          src={Team}
          className="col-span-2  my-auto rounded-2xl shadow-2xl aspect-video object-fill"
        /> */}
        {/*         <CarouselComp /> */}
      </div>

      <div className=" mb-32 grid ">
        <h1 className="text-4xl bg-gradient-to-r brightness-150 font-semibold tracking-tight from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent my-3">
          Our Upcoming Events
        </h1>
        {/* <div className="grid grid-cols-3 grid-rows-2 gap-4 minxl:flex minxl:flex-col p-4">
          <div className="col-span-2 flex row-span-2">
            <img
              src={upcomingEvents[0].image}
              alt=""
              style={{ height: "100%" }}
              className="rounded-xl h-fit object-cover m-auto"
            />
          </div>
          <div className="col-span-1 my-auto py-4">
            <h2 className="text-2xl text-left text-stone-50 ">Description</h2>
            <p className="text-stone-500 text-left text-base minmd:text-xs ">
              {upcomingEvents[0].description}
            </p>
          </div>
          {/* <div className="col-span-1 py-auto py-4 ">
            <h2 className=" text-left  text-stone-50">Details</h2>
            <p className="text-stone-500 text-left flex justify-center">
              <a
                href={upcomingEvents[0].links[0].url}
                className="inline-block bg-gray-200 rounded-full px-6 py-3 text-lg font-semibold text-gray-700 mr-2 mb-2"
              >
                {upcomingEvents[0].links[0].name}
              </a>
            </p>
          </div> 
        </div> */}
        <UpcomingEvents />
      </div>
    </div>
  );
};

export default AboutUs;
