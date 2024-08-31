"use client";

import Image from "next/image";
import Icon from "@mdi/react";
import { mdiHeart, mdiShare } from "@mdi/js";
import { useRouter } from "next/navigation";

interface NewsTabProps {
  image?: any;
  title?: string;
  description?: string;
  className?: string;
  link?: string;
  isPage?: boolean;
}

const NewsTab = ({
  image,
  title,
  description,
  className,
  link,
  isPage = false,
}: NewsTabProps) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(link ?? "/")}
      className={`flex gap-8 cursor-pointer ${className}, ${
        isPage ? "flex-row " : "flex-col"
      }`}
    >
      <div>
        <Image src={image} alt="news" layout="contain" />
      </div>
      <div className="flex flex-col gap-2 text-black">
        <h1>{title}</h1>
        <p>{description}</p>
        <div className="flex flex-row items-center justify-start gap-2">
          <Icon path={mdiShare} title="User Profile" size={1} color="blue" />
          <Icon path={mdiHeart} title="User Profile" size={1} color="blue" />
        </div>
      </div>
    </div>
  );
};

export default NewsTab;
