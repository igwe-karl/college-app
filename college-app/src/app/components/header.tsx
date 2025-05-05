"use client";

import { mdiFacebook, mdiInstagram, mdiSearchWeb, mdiYoutube } from "@mdi/js";
import { doSignOut } from "@/app/firebase/auth";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import logo from "/Users/chigoziecalistusigwe/Documents/CRTA/college-app/college-app/public/assets/image/logo.jpg";
import { IconButton } from "./iconButton";

const Header = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await doSignOut();
    router.push("/login");
  };

  const links = [
    {
      id: 1,
      title: "Home",
      link: "/",
    },
    {
      id: 2,
      title: "News",
      link: "/news",
    },
    {
      id: 3,
      title: "Entertainment",
      link: "/entertainment",
    },
    {
      id: 4,
      title: "Contact",
      link: "/contact",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between bg-orange-500 px-4 py-10 ">
      <div className="flex flex-row items-center justify-start p-4">
        {/* <p className="text-4xl font-bold text-black">CRT</p> */}
        <Image
          src={"/assets/image/logo.jpg"}
          alt="logo"
          width={80}
          height={80}
        />
      </div>
      {/* <div>
        <ul className="flex flex-row items-center justify-start p-4 text-white gap-4 cursor-pointer">
          {links.map((link) => (
            <li key={link.id} onClick={() => router.push(link.link)}>
              {link.title}
            </li>
          ))}
        </ul>
      </div> */}
      <div className="flex flex-row items-start justify-start p-4 space-x-4">
        <div>
          <p className="text-white text-5xl font-bold ">
            Welcome to College Road Trip Africa
          </p>
          <p className="text-white text-sm italic mt-2">
            Welcome to the home of college news, gossips and information
          </p>
        </div>
        <div>
          <IconButton path={mdiSearchWeb}></IconButton>
        </div>
      </div>
      <div className="flex flex-row items-center justify-end p-4 space-x-4">
        {/* <div>
          <Button variant="destructive" onClick={handleSignOut}>
            Sign out
          </Button>
        </div> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default Header;
