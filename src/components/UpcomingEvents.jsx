import { CarouselComp } from "./CaroselComp";
import { GOT, BBattles, EDUHack } from "./../assets/index";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const UpcomingEvents = () => {
  const [api, setApi] = React.useState();
  const [current, setCurrent] = React.useState(1);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const Events = [
    {
      link: "https://eduhackedu.devfolio.co/",
      title: "EduHack",
      Image: EDUHack,
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

  const plugin = React.useRef(Autoplay({ delay: 4000 }));

  return (
    <>
      <div className="grid grid-cols-3 minmd:grid-rows-2 gap-4 minxl:flex minxl:flex-col p-4">
        <div className="col-span-2 flex justify-center row-span-2">
          <Carousel
            setApi={setApi}
            plugins={[plugin.current]}
            className="max-w-[125vh] col-span-2 min3xl:mr-7 flex items-center"
            // onMouseEnter={plugin.current.stop}
            // onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {Events.map((_, index) => (
                <CarouselItem key={index} className="">
                  <div className="p-1">
                    <Card className="border-transparent bg-transparent">
                      <CardContent className=" pt-2 px-3 ">
                        <a href={_.link}>
                          <img
                            src={_.Image}
                            alt=""
                            className="rounded-xl w-full "
                          />
                        </a>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="translate-x-7 minlg:hidden " />
            <CarouselNext className="-translate-x-7 minlg:hidden" />
          </Carousel>
        </div>
        <div className="col-span-1 my-auto py-4">
          <h2 className="text-2xl text-left text-stone-50 ">Description</h2>
          <p className="text-stone-500 text-left text-base minmd:text-xs ">
            {Events[current - 1].desc}
            {/* {current} */}
          </p>

          <h6 className="text-mg pt-4 text-left text-stone-50 ">Link Below</h6>
          <p className="animate-bounce align- text-white text-xl">↓</p>
        </div>
      </div>
      <div>
        <a href={Events[current - 1].link}>
          <h1 className="border-white rounded-3xl border-2 text-4xl mt-8 mx-6 py-1 minmd:text-xs text-slate-100 hover:bg-slate-200 hover:bg-opacity-20 hover:animate-bounce ">
            Register Here
          </h1>
        </a>
      </div>
    </>
  );
};

export default UpcomingEvents;
