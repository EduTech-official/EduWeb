import { CarouselComp } from "./CaroselComp";
import { GOT, BBattles } from "./../assets/index";
import { useEffect, useState } from "react";

const UpcomingEvents = () => {
  const Events = [
    {
      link: "https://eduhackedu.devfolio.co/",
      title: "EduHack",
      Image:
        "https://eduhackedu.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F68fb59f41ba642c4aaecc6b121fb8aca%2Fassets%2Fcover%2F376.png&w=1440&q=100",
      desc: "EduHack is a hackathon where students from all over the world come together to solve real-world problems. The hackathon is a 24-hour coding competition where students can showcase their skills and compete for exciting prizes and opportunities. EduHack is a platform for students to learn, grow, and innovate.",
    },
    {
      link: "https://unstop.com/p/bvcoes-got-talent-eduvation-bvcoe-947904",
      Image: GOT,
      title: "BVCOE's Got Talent",
      desc: "BVCOE's Got Talent is a competition where students showcase their unique skills and talents. From singing to dancing, acting to stand-up comedy, and much more. The event is a platform for students to express themselves and compete for the title of the most talented student in BVCOE.",
    },
    {
      link: "https://unstop.com/p/baggage-battles-eduvation-bvcoe-947958",
      Image: BBattles,
      title: "Baggage Battles",
      desc: "Think you have an eye for treasure? Baggage Battles is a competition where teams put their deduction skills to the test. Analyze clues from unclaimed baggage and uncover their hidden value! Can you strategize your bids and win big in the fast-paced auction round?",
    },
  ];
  const [eventNumber, seteventNumber] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      seteventNumber((prev) => prev + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 grid-rows-2 gap-4 minxl:flex minxl:flex-col p-4">
        <div className="col-span-2 flex justify-center row-span-2">
          <CarouselComp />
        </div>
        <div className="col-span-1 my-auto py-4">
          <h2 className="text-2xl text-left text-stone-50 ">Description</h2>
          <p className="text-stone-500 text-left text-base minmd:text-xs ">
            {Events[eventNumber % 3].desc}
          </p>

          <h6 className="text-mg pt-4 text-left text-stone-50 ">Link Below</h6>
          <p className="animate-bounce align- text-white text-xl">↓</p>
        </div>
      </div>
      <div>
        <a href={Events[eventNumber % 3].link}>
          <h1 className="border-white rounded-3xl border-2 text-4xl mt-8 mx-6 py-1 minmd:text-xs text-slate-100 hover:bg-slate-200 hover:bg-opacity-20 hover:animate-bounce ">
            Register Here
          </h1>
        </a>
      </div>
    </>
  );
};

export default UpcomingEvents;
