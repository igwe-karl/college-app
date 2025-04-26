"use client";

import { mdiFacebook, mdiInstagram, mdiYoutube } from "@mdi/js";
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

  const iconLinks = [
    {
      id: 1,
      icon: mdiInstagram,
      link: "https://www.instagram.com/crtafrica/?hl=en",
      iconColor: "bg-red-500",
    },
    {
      id: 2,
      icon: mdiYoutube,
      link: "https://www.youtube.com/channel/UC8-888888888888888888",
      iconColor: "bg-red-500",
    },
    {
      id: 3,
      icon: mdiFacebook,
      link: "https://web.facebook.com/search/top?q=crtafrica",
      iconColor: "bg-blue-500",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-between bg-black p-4">
      <div className="flex flex-row items-center justify-start p-4">
        {/* <p className="text-4xl font-bold text-black">CRT</p> */}
        {/* <Image src={logo} alt="logo" width={120} height={120} /> */}
      </div>
      <div>
        <ul className="flex flex-row items-center justify-start p-4 text-white gap-4 cursor-pointer">
          {links.map((link) => (
            <li key={link.id} onClick={() => router.push(link.link)}>
              {link.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-row items-center justify-end p-4 space-x-4">
        <div className="flex flex-row items-center justify-end cursor-pointer gap-2">
          {iconLinks.map((icon) => (
            <IconButton
              path={icon.icon}
              size={1.5}
              iconColor={icon.iconColor}
              onClick={() => window.open(icon.link, "_blank")}
              // spin
            />
          ))}
        </div>
        {/* {currentUser?.email && ( */}
          <div>
            <Button variant="destructive" onClick={handleSignOut}>
              Sign out
            </Button>
          </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default Header;
