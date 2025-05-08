"use client";

import { mdiInstagram } from "@mdi/js";
import { mdiFacebook, mdiYoutube } from "@mdi/js";
import { IconButton } from "./iconButton";
import { Input } from "./input";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();

  const companyItems = [
    {
      title: "Company",
      items: [
        { label: "About Us", url: "./about" },
        { label: "Contact Us", url: "/contact" },
        { label: "Sponsors", url: "/sponsor" },
        { label: "Terms of Service", url: "/terms" },
      ],
    },
    {
      title: "News",
      items: [
        { label: "Entertainment", url: "/entertainment" },
        { label: "Road Trip",url:"" },
        { label: "Privacy Policy", url: "/privacy" },
      ],
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
    <div className="bg-gray-100 w-full py-10 px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {companyItems.map((item) => (
          <div key={item.title} className="flex flex-col gap-2">
            <p className="font-bold text-xl capitalize">{item.title}</p>
            {item.items.map((subItem) => (
              <span
                onClick={() => router.push(subItem?.url)}
                key={subItem.label}
                className="text-sm text-gray-700 cursor-pointer"
              >
                {subItem.label}
              </span>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-4">
          <p className="font-bold text-xl">Subscribe</p>
          <Input type="text" placeholder="Enter your email" showIfValid />

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
        </div>
      </div>
      <div className="flex flex-row items-center justify-end p-4">
        <p>All rights reserved &copy; 2025</p>
      </div>
    </div>
  );
}
