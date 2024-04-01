import * as React from "react"
import Autoplay from "embla-carousel-autoplay"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Team } from "./../assets/index";

export function CarouselComp() {
  const plugin = React.useRef(
    Autoplay({ delay: 3000})
  )

  return (
    <Carousel
      plugins={[plugin.current]}
      className="max-w-[125vh] col-span-2 min3xl:mr-7 flex items-center"
      // onMouseEnter={plugin.current.stop}
      // onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index} className="">
            <div className="p-1">
              <Card className="border-transparent bg-transparent">
                <CardContent className="flex items-center aspect-video justify-center p-1 ">
                  <span className="text-4xl font-semibold">
                    <img src={Team} className="rounded-lg" />
                  </span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}
