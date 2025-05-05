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
  imageWidth?: number;
  imageHeight?: number;
}

const NewsTab = ({
  image = "/assets/image/news.jpeg",
  title = "News Title",
  description = "This is a short description of the news item.",
  className = "",
  link = "/",
  isPage = false,
  imageWidth = 120,
  imageHeight = 120,
}: NewsTabProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(link)}
      className={clsx(
        "cursor-pointer w-full p-4 bg-gray-100 rounded-lg hover:shadow transition-all duration-200",
        isPage ? "flex flex-row gap-4 items-start" : "flex flex-col items-center text-center",
        className
      )}
    >
      <div>
        <Image
          src={image}
          alt="news"
          width={imageWidth}
          height={imageHeight}
          className="rounded-md object-cover"
        />
      </div>

      <div className={clsx("flex flex-col gap-2 text-black", isPage ? "" : "items-center mt-2")}>
        <h1 className="text-lg font-semibold">{title}</h1>
        <p className={clsx("text-sm", isPage ? "w-full truncate" : "max-w-xs")}>
          {description}
        </p>
        <div className="flex flex-row items-center justify-end gap-2 mt-2">
          <Icon path={mdiShare} size={1} color="blue" />
          <Icon path={mdiHeart} size={1} color="orange" />
        </div>
      </div>
    </div>
  );
};

export default NewsTab;