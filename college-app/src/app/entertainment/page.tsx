import ContentUploader from "../components/contentUploader";
import { Input } from "../components/input";
import { Textarea } from "../components/textArea";
const Home = () => {
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
          <Textarea
            label="Description of the content"
            placeholder="Describe the content"
          />
        </div>
      </div>

      {/* <Counter /> */}
    </div>
  );
};

export default Home;
