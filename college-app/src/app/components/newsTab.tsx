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
  className = "",
  link = "/",
  isPage = false,
  imageWidth = 100,
  imageHeight = 100,
}: NewsTabProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(link)}
      className={clsx(
        "cursor-pointer flex w-full p-4 bg-gray-100 hover:shadow flex flex-col gap-2",
        className
      )}
    >
      <div className="flex flex-row gap-2">
        {image && (
          <Image
            src={image}
            alt="news"
            width={imageWidth}
            height={imageHeight}
            className="rounded-md object-cover w-10 h-10"
          />
        )}
        <h1 className="text-sm font-semibold">{title}</h1>
      </div>
    </div>
  );
};

export default NewsTab;
