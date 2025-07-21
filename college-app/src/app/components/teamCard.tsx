import Image from "next/image";
import React from "react";

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
    <div className="flex flex-row space-x-4 items-center justify-center w-[60%] ">
      <div
        className={`${order === "first" ? "order-first" : "order-last"}`}
      >
        <Image
          src={image}
          alt="team"
          width={200}
          height={100}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full flex flex-col space-y-4">
        <p className="text-2xl font-bold">{title}</p>
        <p className="text-lg">{description}</p>
      </div>
    </div>
  );
};
