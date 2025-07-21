import { TeamCard } from "@/app/components/teamCard";
import React from "react";

export default function Company() {
  const team = [
    {
      name: "Igwe Emmanuel Uzorchi",
      role: "Founder & CEO",
      image: "/assets/image/ceo.jpeg",
    },
    {
      name: "Igwe Chigozie Calistus",
      role: "Producer/Lead Engineer",
      image: "/assets/image/producer.jpeg",
    },
    {
      name: "Irene Otali",
      role: "Assistant Director",
      image: "/assets/image/irene.jpg",
    },
    {
      name: "Jerusalem Okechukwu",
      role: "Creative Director",
      image: "/assets/image/jerusalem.jpg",
    },
  ];  

  return (
    <div className="flex flex-col gap-4 px-20">
      <div className="text-4xl font-bold mt-16 text-center">About us</div>

      <div className="text-lg text-center">
        <p>
          College Road Trip Africa is a vibrant content creation channel dedicated to
          amplifying the voice of the African student. We’re currently
          recruiting campus reporters from universities across Africa to
          represent their schools and share unique stories, experiences, and
          insights. If you’re passionate about storytelling and want to be part
          of the CRTAFRICA network.
        </p>
      </div>
      {/* 
      <div className="w-full h-96 flex justify-center items-center">
        <SlickSlider items={SliderItems} />
      </div> */}

      <div className="flex flex-col gap-4 mt-10">
        <div className="text-4xl font-bold text-center">Our Team</div>
        <div className="text-lg grid grid-cols-2 items-center justify-center space-y-10 mt-10">
          {team.map((item, index) => (
            <TeamCard
              key={index}
              title={item.name}
              description={item.role}
              image={item.image}
              order={"first"}
            />
          ))}
    
        </div>
      </div>
    </div>
  );
}
