"use client";

import { useAuth } from "@/app/context/authContext";
import Image from "next/image";
import NewsTab from "./components/newsTab";

export default function Home() {
  const { currentUser } = useAuth();

  console.log("currentUser", currentUser);
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

      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 ">
        <div className="col-span-2">
          <NewsTab
            image={"/assets/image/news.jpeg"}
            title="News that will make you laugh"
            description="News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives"
            imageWidth={400}
            imageHeight={400}
          />

          <NewsTab
            image={"/assets/image/news.jpeg"}
            title="News that will make you cry"
            description="News that will make you cry and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives"
            imageWidth={400}
            imageHeight={400}
          />
        </div>
        <div className="col-span-2">
          <NewsTab
            image={"/assets/image/news.jpeg"}
            title="News that will make you laugh"
            description="News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives"
            imageWidth={400}
            imageHeight={400}
          />

          <NewsTab
            image={"/assets/image/news.jpeg"}
            title="News that will make you cry"
            description="News that will make you cry and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives"
            imageWidth={400}
            imageHeight={400}
          />
        </div>
        <div>
          <p className="text-2xl font-bold text-center mb-4 bg-orange-500 text-white rounded-md p-2">
            Popular News
          </p>
          <div className="flex flex-col gap-4">
            <NewsTab
              image={"/assets/image/news.jpeg"}
              title="News that will make you laugh"
              description="News that will make you "
              imageWidth={100}
              imageHeight={100}
            />
            <NewsTab
              image={"/assets/image/news.jpeg"}
              title="News that will make you laugh"
              description="News that will make you "
              imageWidth={100}
              imageHeight={100}
            />
            <NewsTab
              image={"/assets/image/news.jpeg"}
              title="News that will make you laugh"
              description="News that will make you "
              imageWidth={100}
              imageHeight={100}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
