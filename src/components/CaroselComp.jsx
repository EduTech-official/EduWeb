import * as React from "react";
import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Team, GOT, BBattles } from "./../assets/index";

export function CarouselComp() {
  const plugin = React.useRef(Autoplay({ delay: 4000 }));
  let Events = [
    {
      link: "https://eduhackedu.devfolio.co/",
      Image:
        "https://eduhackedu.devfolio.co/_next/image?url=https%3A%2F%2Fassets.devfolio.co%2Fhackathons%2F68fb59f41ba642c4aaecc6b121fb8aca%2Fassets%2Fcover%2F376.png&w=1440&q=100",
    },
    {
      link: "https://www.instagram.com/edu_minerva/p/C5JZDExy3Cq/?hl=en",
      Image: GOT,
    },
    {
      link: "https://www.instagram.com/edu_minerva/p/C5JZDExy3Cq/?hl=en",
      Image: BBattles,
    },
  ];

  return (
    <Carousel
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
                    <img src={_.Image} alt="" className="rounded-xl w-full " />
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
  );
}
