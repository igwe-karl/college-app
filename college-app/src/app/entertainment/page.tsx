import ContentUploader from "../components/contentUploader";
import Counter from "../components/counter";
import Header from "../components/header";
import { Input } from "../components/input";
import NewsTab from "../components/newsTab";
import TransImage from "/Users/chigoziecalistusigwe/Documents/CRTA/college-app/college-app/public/assets/image/news.jpeg";
// /Users/chigoziecalistusigwe/Documents/CRTA/college-app/college-app/public/assets/image/news.jpeg
const Home = () => {
  const items = [
    {
      id: 1,
      title: "Transitioning into College",
      description:
        "Get the latest news from the college Get the latest news from the college",
    },
    {
      id: 2,
      title: "Transitioning into College",
      description:
        "Get the latest news from the college Get the latest news from the college",
    },
    {
      id: 3,
      title: "Transitioning into College",
      description:
        "Get the latest news from the college Get the latest news from the college",
    },
    {
      id: 4,
      title: "Transitioning into College",
      description:
        "Get the latest news from the college Get the latest news from the college",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-10 ">
      {/* <Header /> */}
      <h1 className="text-4xl font-bold text-black">Upload Content</h1>
      <p className="text-sm font-bold text-orange-500">
        This is a page to help you plan your college road trip, news,
        entertainment, etc.
      </p>
      <div className="mt-10 grid grid-cols-2 gap-4 w-[80%]">
        <div className="">
          <ContentUploader />
        </div>
        <div className="flex flex-col gap-4">
          <Input label="Title of the content" />
          <Input label="Description of the content" />
        </div>
      </div>

      {/* <Counter /> */}
    </div>
  );
};

export default Home;
