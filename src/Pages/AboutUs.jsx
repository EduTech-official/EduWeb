// import React from "react";
// import photo from "../assets/IMG.png";
// import photo1 from "../assets/IMG_6961.png";
// import Cards from "../components/Cards";
import InfoCard from "../components/InfoCard";

// import { IMG, IMG2, logo, Team } from "./../assets/index";
import { Team } from "./../assets/index";
import "../components/Content_index";
import topics from "../components/Content_index";
import upcomingEvents from "../Config/Events/upcoming.index";

const AboutUs = () => {
  

  return (
    <div className="m-4">
      <div className="grid grid-cols-3 minlg:grid-cols-1  gap-4 py-5 md:py-0 h-max my-5">
        <div className="my-5 py-4 text-left pr-4">
          <h1 className="tracking-normal text-4xl minmd:text-lg minsm:text-3xl bg-gradient-to-r font-bold  from-[#E61AA1]  to-[#0CF996] to-55% bg-clip-text text-transparent my-3">
            ABOUT US
          </h1>
          <p className="text-stone-100 text-sm minmd:text-xs tracking-tighter text-left font-IBMplex h-auto">
            EduMinerva, founded in 2019, is a society of Bharati
            Vidyapeeth&apos;s College of Engineering, assisting students by
            providing opportunities to explore different career fields and
            co-curricular activities by organising various webinars and
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

        <img
          src={Team}
          className="col-span-2  my-auto rounded-2xl shadow-2xl aspect-video object-fill"
        />
      </div>
      <div className="grid m-5 p-4 gap-4 h-full child grid-cols-3">
        {topics.map((topic, index) => (
          <InfoCard
            key={index}
            Topic={topic.Topic}
            Content={topic.Content}
            links={topic.links}
          />
        ))}
      </div>
      <div className=" mb-32 grid ">
        <h1 className="text-4xl bg-gradient-to-r brightness-150 font-semibold tracking-tight from-[#0CF996]  to-[#E61AA1] bg-clip-text text-transparent my-3">
          UPCOMING EVENTS
        </h1>
        <div className="grid grid-cols-3 grid-rows-2 gap-4 minxl:flex minxl:flex-col p-4">
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
            <p className="text-stone-500 text-left text-base">
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
          </div> */}
        </div>
        <div>
          <a href={upcomingEvents[0].links[1].url}>
            <h1 className="border-white rounded-3xl border-2 text-4xl mt-8 mx-6 py-1 text-slate-100 hover:bg-slate-200 hover:bg-opacity-20 ">
              Register Here
            </h1>
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
