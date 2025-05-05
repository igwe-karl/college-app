"use client";

import { mdiInstagram } from "@mdi/js";
import { mdiFacebook, mdiYoutube } from "@mdi/js";
import { IconButton } from "./iconButton";
import { Input } from "./input";

export default function Footer() {
  const companyItems = [
    {
      title: "Company",
      items: [
        { label: "About Us" },
        { label: "Contact Us" },
        { label: "Sponsors" },
        { label: "Terms of Service" },
      ],
    },
    {
      title: "News",
      items: [
        { label: "Entertainment" },
        { label: "Road Trip" },
        { label: "Privacy Policy" },
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
              <span key={subItem.label} className="text-sm text-gray-700">
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
