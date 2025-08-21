"use client";

import { Button } from "@/components/ui/button";
import { mdiFacebook, mdiInstagram, mdiYoutube } from "@mdi/js";
import { IconButton } from "./iconButton";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Footer() {
  const router = useRouter();
  
  const companyItems = [
    {
      title: "Company",
      items: [
        { label: "About Us", url: "./company" },
        { label: "Contact Us", url: "/contact" },
        // { label: "Sponsors", url: "/sponsor" },
        { label: "Terms of Service", url: "/terms" },
      ],
    },
    {
      title: "News",
      items: [
        { label: "Entertainment", url: "/entertainment" },
        { label: "News", url: "/news" },
        { label: "Privacy Policy", url: "/privacy" },
      ],
    },
  ];

  const iconLinks = [
    {
      id: 1,
      icon: mdiInstagram,
      link: "https://www.instagram.com/crtafrica/?hl=en",
      iconColor: "text-red-500",
    },
    {
      id: 2,
      icon: mdiYoutube,
      link: "https://youtube.com/@crtafrica9710?si=0dyNNzZner_VHkT8",
      iconColor: "text-red-500",
    },
    {
      id: 3,
      icon: mdiFacebook,
      link: "https://web.facebook.com/search/top?q=crtafrica",
      iconColor: "text-blue-500",
    },
  ];

  return (
    <footer className="bg-sidebar text-sidebar-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-sidebar-primary">
              CRTAFRICA
            </h3>
            <p className="text-muted-foreground mb-4">
              Students go to for gossips, drama, entertainment and everything in
              between.
            </p>
            <div className="flex gap-2">
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
          <div className="col-span-1 md:col-span-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {companyItems.map((item) => (
                <div key={item.title} className="flex flex-col gap-2">
                  <p className="font-bold text-xl capitalize">{item.title}</p>
                  {item.items.map((subItem) => (
                    <span
                      onClick={() => router.push(subItem.url)}
                      key={subItem.label}
                      className="text-sm text-gray-700 cursor-pointer"
                    >
                      {subItem.label}
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="col-span-1 md:col-span-1">
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-muted-foreground mb-4">
              Stay updated with the latest gossip and entertainment news.
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-input border border-border rounded-md text-sm"
              />
              <Button className="bg-blue-500 hover:bg-blue-600">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 CRTAFRICA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
