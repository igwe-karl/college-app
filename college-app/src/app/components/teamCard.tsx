import Image from "next/image";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export const TeamCard = ({
  title,
  description,
  image,
  order = "first",
}: {
  title: string;
  description: string;
  image: string;
  order?: string;
}) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className=" overflow-hidden">
        <Image
          src={image}
          alt={title}
          width={200}
          height={50}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
        <p className="text-accent font-semibold mb-3">{description}</p>
      </CardContent>
    </Card>
  );
};
