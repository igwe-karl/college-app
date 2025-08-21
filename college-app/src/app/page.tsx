"use client";

import { useAuth } from "@/app/context/authContext";
import PopularTab from "./components/popularTab";
import { Accordion } from "./components/accordion";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/slider";
import { StoryGrid } from "@/components/storyGrid";

export default function Home() {
  const { currentUser } = useAuth();

  // console.log("currentUser", currentUser);

  const videoUrls = [
    {
      title: "Hammer Time and Malpractice Drama",
      description:
        "Hammer Time and Malpractice Drama as students suffer some sort of injustice after being acught for malpractice",
      image: "https://www.youtube.com/embed/Fh1_2KPw6go?si=9tF_7gkV4KjehzS8",
    },
    {
      title: "KIDNAP & RESCUED LAW STUDENTS SITUATION IN BENUE?",
      description:
        "Law students in Benue were kidnapped and a 50m ransom was requested but all thanks to the police to secure their release.",
      image: "https://www.youtube.com/embed/IeZ-rDLuyzI?si=2d9_4Wk7-4bCm9D9",
    },
  ];

  const faqs = [
    {
      title: "What is College Road Trip Africa ?",
      description:
        "College Road Trip Africa also known as CRTAfrica is a platform for students to share their experiences and advice.",
    },
    {
      title: "Who is College Road Trip Africa for?",
      description:
        "College Road Trip Africa is for students who are interested in sharing their experiences and advice.",
    },
    {
      title: "How do I become a College Road Trip Africa Ambassador?",
      description:
        "To become a CRTAfrica Ambassador, you need to be a student of a university in Africa and have a passion for sharing your experiences and school content.You can apply to become a CRTAfrica Ambassador by sending us a 1minute video of yourself sharing your experiences and school content. The video should be uploaded to your Instagram channel and the tag should be @crtafrica.",
    },
    {
      title: "How do I become a College Road Trip Africa studio Presenter?",
      description:
        "To become a CRTAfrica Presenter, you need to be a student of a university in Africa and have a passion for sharing your experiences and school content.You can apply to become a CRTAfrica Presenter by sending us a 1minute video of yourself sharing your experiences and school content. The video should be uploaded to your Instagram channel and the tag should be @crtafrica.",
    },
  ];

  const items = [
    {
      title: "Item 1",
      description: "Description 1",
      image: "/logo.jpg",
    },
    {
      title: "Item 2",
      description: "Description 2",
      image: "/logo.jpg",
    },
  ];

  return (
    <div className=" min-h-screen py-20 lg:px-20 px-4 ">
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

      <div className="grid grid-cols-1 gap-8 w-full">
        {/* <Label className="font-bold text-center text-2xl">
          Latest on CRTAFRICA
        </Label> */}
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
      <div>
        <StoryGrid></StoryGrid>
      </div>
      {/* <div className="w-full mb-20 bg-orange-500">
        <Slider items={items} /> 
      </div> */}
      {/* <div className="grid grid-cols-3 gap-10 mb-20 mt-20">
        <div className="col-span-2">x</div>
        <div className="col-span-1 w-full">
          <p className="lg:text-2xl text-xl font-bold text-center bg-orange-500 text-white rounded-t-md p-2 w-full">
            Let&apos;s get in touch
          </p>
          <div className="">
            <div className="grid grid-cols-1 gap-10 mt-10 ">
              <div className="flex flex-col gap-8">
                <Input
                  showIfValid={true}
                  placeholder="Name"
                  type="text"
                  name="name"
                />
                <Input
                  showIfValid={true}
                  placeholder="Email"
                  type="email"
                  name="email"
                />
                <Input
                  showIfValid={true}
                  placeholder="Message"
                  type="text"
                  name="message"
                />
                <Input
                  showIfValid={true}
                  placeholder="Phone"
                  type="text"
                  name="phone"
                />
              </div>
              <div className="flex flex-col gap-4 ">
                <div className="flex flex-row gap-4 items-center">
                  <Phone className="w-5 h-5" />
                  <p> +234 803 928 6926</p>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <MapPin className="w-5 h-5" />
                  <div className="flex flex-col gap-2">
                    <p>
                      2 Jacob Nwazota street, peace estate, Gbagada, Lagos,
                      Nigeria. 50234
                    </p>
                  </div>
                </div>
                <div className="flex flex-row gap-4 items-center">
                  <Mail className="w-5 h-5" />
                  <p>crtafrica@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="w-full mt-20 flex flex-col gap-4">
        <Label className="text-2xl font-bold text-center">FAQs</Label>
        <p className="text-center text-sm text-gray-500">
          Find answers to common questions and concerns
        </p>
        <Accordion items={faqs} />
      </div>
    </div>
  );
}
