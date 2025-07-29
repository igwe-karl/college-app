"use client";

import { useAuth } from "@/app/context/authContext";
import NewsTab from "./components/newsTab";
import PopularTab from "./components/popularTab";

export default function Home() {
  const { currentUser } = useAuth();

  console.log("currentUser", currentUser);

  const videoUrls = [
    {
      title: "Campus crisis and cash giveaway?",
      description: "A jampacked story involving ex-presendential candidate Peter Obi, protest on campus...",
      image: "https://www.youtube.com/embed/NNZFETTu2oI?si=KX25vhgoydJLE3MO",
    },
    {
      title: "Do you want to be a CRTA Ambassador?",
      description: "Do you want to be a CRTA Ambassador?",
      image: "https://www.youtube.com/embed/lE-46kMCplI?si=6C9w4ptoZdqmGJW2",
    },
    {
      title: "Unilag student and VDM to the rescue from her landlord",
      description: "Landlord demands more than house rent then threatens to kill and bury his tenant with 500k",
      image: "https://www.youtube.com/embed/6TKKfny-9Gk?si=u4iZ5nmQBHoyYrJm",
    },
    {
      title:
        "Drama Beyond the Stage: NYSC Wahala, Attendance Games & Theatre Induction Palava.",
      description:
        "this piece dives into the real-life drama surrounding theatre art inductions, NYSC uncertainties, and the comical chaos of attendance politics in schools.",
      image: "https://www.youtube.com/embed/hHIKgqFX0C8?si=fQcB0_6nyHbvYTSe",
    },
    {
      title: "Theatre Art Induction: The Drama of First Impressions",
      description:
        "From the moment they step onto the stage, the first impression is everything.",
      image: "https://www.youtube.com/embed/ouYUsj_Z4Ho?si=Ob-XYQ6J4InisAt8",
    },

    {
      title: "News that will make you laugh",
      description:
        "College Road Trip is a Magazine Campus Content targeted at African youths. It is a weekly highlight of Campus activities - News, Fashion, Music, Life Style and more",
      image: "https://www.youtube.com/embed/JIrBOPBCTpw?si=96cx3JT4TI-W5Ay8",
    },
    {
      title: "How to spot a fresher",
      description: "How to spot a fresher in the university",
      image: "https://www.youtube.com/embed/9rsSHZtESsY?si=imAKIawqyiaQQi5u",
    },
    {
      title: "Hostel war between Nigeria and Ghana",
      description: "Hostel war between Nigeria and Ghana",
      image: "https://www.youtube.com/embed/vZnnwzCw7jY?si=rfsG2uCuIccjpkcD",
    },
  ];

  const news = [
    {
      title: "Nigeria's Former President is dead",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/bubu.JPG",
    },
    {
      title: "What was special for you in school?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/simba.png",
    },
    {
      title: "Who/what/where?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/trans.webp",
    },

    {
      title: "Asuu strike again?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Dating in the university",
      description:
        "Dating in the university",
      // image: "/assets/image/bubu.jpeg",
    },
  ];

  return (
    <div className=" min-h-screen py-20 px-20">
      {/* {currentUser ? (
        <div className="w-full items-center justify-between font-mono text-sm ">
          <p className="text-xl">Hello and welcome back</p>
          <div className="flex flex-col gap-2">
            <p className="text-lg">{currentUser?.displayName}</p>
            <p className="text-lg">{currentUser?.email}</p>
          </div>
        </div>
      ) : (
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          hello and welcome to the app
        </div>
      )} */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 w-full">
        <div className="md:col-span-4">
          <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4">
            {videoUrls.map((url, index) => (
              <PopularTab
                key={url.title}
                className="mb-4"
                image={url.image}
                title={url.title}
                description={url.description}
              />
            ))}
          </div>
        </div>

        <div className="col-span-1 w-full">
          <p className="text-2xl font-bold text-center bg-orange-500 text-white rounded-t-md p-2 w-full">
            Highlights
          </p>
          <div className="flex flex-col w-full">
            {news.map((item, index) => (
              <NewsTab
                key={index}
                // image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
