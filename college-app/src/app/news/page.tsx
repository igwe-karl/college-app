import NewsTab from "../components/newsTab";

const Home = () => {
  const items = [
    {
      id: 1,
      title: "Transitioning into College",
      description: "Get the latest news from the college.",
    },
    {
      id: 2,
      title: "Preparing Financially for School",
      description: "Learn how to budget and manage finances before college.",
    },
    {
      id: 3,
      title: "Tips for Freshmen",
      description: "Helpful advice for students starting college this fall.",
    },
    {
      id: 4,
      title: "Orientation Week",
      description: "What to expect during your college orientation.",
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-white py-10">
      <h1 className="text-4xl font-bold text-black text-center">
        Welcome to College Road Trip
      </h1>
      <p className="text-sm font-bold text-orange-500 text-center max-w-xl mt-2">
        Plan your college journey with news, entertainment, and helpful tips.
      </p>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-[90%] max-w-5xl">
        {items.map((item) => (
          <NewsTab
            key={item.id}
            isPage={true}
            link={`/news/${item.id}`}
            className="mt-2"
            image="/assets/image/news.jpeg"
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;