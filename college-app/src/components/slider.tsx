import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

interface Item {
  title: string;
  description: string;
  image: string;
}

interface SliderProps {
  items: Item[];
}

export const Slider: React.FC<SliderProps> = ({ items }) => {
  return (
    <Carousel className="w-full max-w-sm">
      <CarouselContent className="-ml-1">
        {items.map((item, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Image
                src={item.image}
                alt={item.title}
                width={100}
                height={100}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2 mt-2">
                <h3 className="text-lg font-bold">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};