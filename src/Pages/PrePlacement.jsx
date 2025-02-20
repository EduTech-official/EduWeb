import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"; // Default styles

const PrePlacement = () => {
  // Sample data for resources (PDF links)
  const resources = [
    { title: "Resume Guide", link: "/pdfs/resume-guide.pdf" },
    { title: "Coding Tips", link: "/pdfs/coding-tips.pdf" },
    { title: "Interview Prep", link: "/pdfs/interview-prep.pdf" },
    { title: "Career Roadmap", link: "/pdfs/career-roadmap.pdf" },
    { title: "ATS Optimization", link: "/pdfs/ats-optimization.pdf" },
    { title: "HR Insights", link: "/pdfs/hr-insights.pdf" },
  ];

  // Sample data for speakers
  const speakers = [
    {
      name: "John Doe",
      designation: "Senior Software Engineer",
      company: "Google",
      topic: "Coding Best Practices",
      detail: "Learn how to write clean and efficient code.",
      image: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
    },
    {
      name: "Jane Smith",
      designation: "HR Manager",
      company: "Microsoft",
      topic: "Interview Techniques",
      detail: "Master the art of acing technical and HR interviews.",
      image: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
    },
    {
      name: "Alice Johnson",
      designation: "Career Coach",
      company: "EduMinerva",
      topic: "Career Roadmap",
      detail: "Plan your career path with industry insights.",
      image: "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-male-user-profile-vector-illustration-isolated-background-man-profile-sign-business-concept_157943-38764.jpg",
    },
  ];

  // Timeline data with more details
  const timeline = [
    {
      day: "Day 1",
      title: "Foundational Skills",
      description:
        "Kickstart your journey with sessions on coding basics, consultancy roles, and resume building. Learn how to create a professional resume that stands out.",
    },
    {
      day: "Day 2",
      title: "Technical Sessions",
      description:
        "Dive into ATS optimization using LaTeX, software development insights, and participate in a Placement Aptitude Quiz to test your knowledge.",
    },
    {
      day: "Day 3",
      title: "Career Roadmap Discussions",
      description:
        "Explore core industry insights and align your career goals with the latest trends. Understand the skills required for different roles.",
    },
    {
      day: "Day 4",
      title: "Mock Interviews",
      description:
        "Gain practical experience through mock interviews and resume screening. Receive feedback from industry experts to improve your performance.",
    },
    {
      day: "Day 5",
      title: "Advanced Coding Challenges",
      description:
        "Solve advanced coding problems and participate in group discussions. Enhance your problem-solving and teamwork skills.",
    },
    {
      day: "Day 6",
      title: "HR Discussions & Networking",
      description:
        "Interact with HR professionals, understand their expectations, and network with peers. Prize distribution for top performers.",
    },
  ];

  return (
    <div className="min-h-screen text-white p-4 md:p-8">
      {/* Big Heading */}
      <div className="flex flex-col items-center justify-center py-8 md:py-12">
        <h1 className="tracking-normal text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-2 md:my-3">
          Pre Placement Bootcamp 3.0
        </h1>
        <p className="text-stone-100 text-xs md:text-base text-center max-w-2xl mt-2 md:mt-4">
          Gear up for an exciting journey to enhance your employability skills!
          Join us for a 6-day bootcamp packed with speaker sessions, aptitude
          tests, mock interviews, and more.
        </p>
        <a
          href="/register"
          className="mt-4 md:mt-6 px-4 md:px-6 py-2 bg-gradient-to-r from-[#E61AA1] to-[#0CF996] text-white font-semibold rounded-lg hover:opacity-90 transition duration-300 text-sm md:text-base"
        >
          Register Now
        </a>
      </div>

      {/* Timeline Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-12">
        <h2 className="tracking-normal text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6 text-center">
          Timeline
        </h2>
        <VerticalTimeline lineColor="#0CF996">
          {timeline.map((event, index) => (
            <VerticalTimelineElement
              key={index}
              className="vertical-timeline-element--work"
              contentStyle={{
                background: "rgba(39, 39, 42, 0.8)", // Dark background
                color: "#fff",
                border: "1px solid #0CF996",
                borderRadius: "8px",
              }}
              contentArrowStyle={{ borderRight: "7px solid #0CF996" }}
              date={event.day}
              iconStyle={{
                background: "linear-gradient(to right, #E61AA1, #0CF996)",
                color: "#fff",
              }}
            >
              <h3 className="vertical-timeline-element-title text-base md:text-lg font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] bg-clip-text text-transparent">
                {event.title}
              </h3>
              <p className="text-xs md:text-sm text-stone-100">{event.description}</p>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>

      {/* Resources Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-12">
        <h2 className="tracking-normal text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6 text-center">
          Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {resources.map((resource, index) => (
            <a
              key={index}
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-gray-800 rounded-lg text-xs md:text-sm text-stone-100 hover:bg-gray-700 transition duration-300 text-center w-full"
            >
              {resource.title}
            </a>
          ))}
        </div>
      </div>

      {/* Our Speakers Section */}
      <div className="max-w-4xl mx-auto mt-8 md:mt-12">
        <h2 className="tracking-normal text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#E61AA1] to-[#0CF996] to-55% bg-clip-text text-transparent my-4 md:my-6 text-center">
          Our Speakers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {speakers.map((speaker, index) => (
            <div
              key={index}
              className="p-4 md:p-6 bg-gray-800 rounded-lg text-center"
            >
              <img
                src={speaker.image}
                alt={speaker.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full mx-auto mb-2 md:mb-4"
              />
              <h3 className="text-lg md:text-xl font-bold text-white">{speaker.name}</h3>
              <p className="text-xs md:text-sm text-stone-100">{speaker.designation}</p>
              <p className="text-xs md:text-sm text-stone-100">{speaker.company}</p>
              <p className="text-sm md:text-md font-semibold text-[#E61AA1] mt-1 md:mt-2">
                {speaker.topic}
              </p>
              <p className="text-xs text-stone-100 mt-1 md:mt-2">{speaker.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrePlacement;