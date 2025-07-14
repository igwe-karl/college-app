"use client";

import Image from "next/image";
import Icon from "@mdi/react";
import { mdiHeart, mdiShare } from "@mdi/js";
import { useRouter } from "next/navigation";
import clsx from "clsx";

interface NewsTabProps {
  image?: string;
  title?: string;
  description?: string;
  className?: string;
  link?: string;
  isPage?: boolean;
}

const PopularTab = ({
  image = "/assets/image/news.jpeg",
  title = "News Title",
  description = "This is a short description of the news item.",
  className = "",
  link = "/",
  isPage = false,
}: NewsTabProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(link)}
      className={clsx(
        "cursor-pointer w-full bg-gray-100 rounded-3xl hover:shadow transition-all duration-200",
        isPage
          ? "flex flex-row gap-4 items-start"
          : "flex flex-col",
        className
      )}
    >
      <iframe
        className="aspect-video w-full rounded-t-3xl h-full"
        src={image}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        title="Welcome to Vascan"
      />
      <div
        className={clsx(
          "flex flex-col gap-2 text-black w-full",
          isPage ? "p-4" : "p-2 mt-2 h-full"
        )}
      >
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className={("text-sm w-full truncate max-w-xs")}>
          {description}
        </p>
        {/* <div className="flex flex-row items-center justify-end gap-2 mt-2">
          <Icon path={mdiShare} size={1} color="blue" />
          <Icon path={mdiHeart} size={1} color="orange" />
        </div> */}
      </div>
    </div>
  );
};

export default PopularTab;
