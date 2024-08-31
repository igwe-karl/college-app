"use client";

import NewsTab from "@/app/components/newsTab";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import TransImage from "/Users/chigoziecalistusigwe/Documents/CRTA/college-app/college-app/public/assets/image/news.jpeg";

const NewsPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const params: { id: any } = useParams();
  const router = useRouter();

  console.log("id", params);
  const items = [
    {
      id: "1",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
    {
      id: "2",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
    {
      id: "3",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
    {
      id: "4",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
    {
      id: "5",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
    {
      id: "6",
      title: "Transitioning into College",
      description: "Get the latest news from the college",
    },
  ];

  const news = items.find((item) => item.id === params.id);
  console.log("first", news);
  return (
    <div className="flex flex-col items-center h-screen bg-white ">
      <div className="flex text-2xl font-bold text-black mt-10">
        <div className="col-span-2">
          {" "}
          this is the individual news page
          <NewsTab
            // link={`/news/${item.id}`}
            className="mt-4"
            key={news?.id}
            image={TransImage}
            title={news?.title}
            description={news?.description}
          />
        </div>
        <div className="col-span-1 text-black"> news page</div>
      </div>
    </div>
  );
};

export default NewsPage;
