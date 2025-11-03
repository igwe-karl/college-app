import PopularTab from "../components/popularTab";
import NewsTab from "../components/newsTab";

const Home = () => {
  const videoUrls = [
    {
      title: "Ep 17: UNIJOS Student Murder Shock + FUTO Lecturer Destroys Project and Fashion Edition",
      description:
        "UNIJOS Student Murder Shock + FUTO Lecturer Destroys Project and Fashion Edition",
      image: "https://www.youtube.com/embed/j87WtRvPztY?si=GZ4gJAFFGNlW5Xli",
    },
    {
      title: "EP 16: From Fear to Fun — Security Talks, Favorite Artiste & School Battles LASPOTECH vs YABATECH",
      description:
        "From Fear to Fun — Security Talks, Favorite Artiste & School Battles ...",
      image: "https://www.youtube.com/embed/ehtRJVWQtJw?si=EtzGNcTr1CSOA6H7",
    },
    {
      title: "Ep 15: Campus Chronicles: ASUU Strike Gist, ₦1K Meal Struggle & Lecturer's Bingo Game",
      description:
        "Campus Chronicles: ASUU Strike Gist, ₦1K Meal Struggle & Lecturer's Bingo Game",
      image: "https://www.youtube.com/embed/Co-wXPfjN7Y?si=Y0RFB6nGB58bzZN0",
    },
    {
      title: "Expectation VS Reality: Love on Campus and Battle of Brains",
      description:
        "Love on Campus and Battle of Brains...",
      image: "https://www.youtube.com/embed/TTxOU15Ffjg?si=VSqIf3C7mvug9hOA",
    },
    {
      title: "The Uni Hustle: Hacks We Swear By, Lies We Tell & Strikes Endured",
      description:
        "The Uni Hustle: Hacks We Swear By, Lies We Tell & Strikes Endured",
      image: "https://www.youtube.com/embed/mbpMlw7DKZw?si=8LpSp508K9OSNjDS",
    },
    {
      title: "Campus heat: University Ranking, Phone bans etc",
      description:
        "Campus heat: University Ranking, Phone bans etc",
      image: "https://www.youtube.com/embed/5MBdBprTTtM?si=ZTLiZeZKp7vf820u",
    },
    {
      title: "A chill time with the ladies",
      description:
        "A chill time with the ladies as they share their experiences and school content.",
      image: "https://www.youtube.com/embed/JYE5TfARaGk?si=tRQSMkXexzicrfLl",
    },
    {
      title: "A date with Mr Unilag",
      description:
        "A date with Mr Unilag as he shares his experience as a student of the university of Lagos.",
      image: "https://www.youtube.com/embed/pxMn3gwNb0M?si=_sKYQOL3uTjXVCIM",
    },
    {
      title: "Hammer Time and Malpractice Drama",
      description:
        "Hammer Time and Malpractice Drama as students suffer some sort of injustice after being acught for malpractice",
      image: "https://www.youtube.com/embed/Fh1_2KPw6go?si=9tF_7gkV4KjehzS8",
    },
    {
      title: "NELFUND DISBURSEMENT IN SOKOTO & AHMADU BELLO UNIVERSITY ONLY ?",
      description:
        "Nelfund disbursement in Sokoto and Ahmadu Bello University only ?",
      image: "https://www.youtube.com/embed/K9uriAvcSI8?si=ZdlMJzBOWhzMvAj1",
    },
    {
      title: "Campus crisis and cash giveaway?",
      description:
        "A jampacked story involving ex-presendential candidate Peter Obi, protest on campus...",
      image: "https://www.youtube.com/embed/NNZFETTu2oI?si=KX25vhgoydJLE3MO",
    },
    {
      title: "Do you want to be a CRTA Ambassador?",
      description: "Do you want to be a CRTA Ambassador?",
      image: "https://www.youtube.com/embed/lE-46kMCplI?si=6C9w4ptoZdqmGJW2",
    },
    {
      title: "Unilag student and VDM to the rescue from her landlord",
      description:
        "Landlord demands more than house rent then threatens to kill and bury his tenant with 500k",
      image: "https://www.youtube.com/embed/6TKKfny-9Gk?si=u4iZ5nmQBHoyYrJm",
    },
    {
      title:
        "Drama Beyond the Stage: NYSC Wahala, Attendance Games & Theatre Induction Palava.",
      description:
        "this piece dives into the real-life drama surrounding theatre art inductions, NYSC uncertainties, and the comical chaos of attendance politics in schools.",
      image: "https://www.youtube.com/embed/hHIKgqFX0C8?si=fQcB0_6nyHbvYTSe",
    },
    {
      title: "Theatre Art Induction: The Drama of First Impressions",
      description:
        "From the moment they step onto the stage, the first impression is everything.",
      image: "https://www.youtube.com/embed/ouYUsj_Z4Ho?si=Ob-XYQ6J4InisAt8",
    },

    {
      title: "News that will make you laugh",
      description:
        "College Road Trip is a Magazine Campus Content targeted at African youths. It is a weekly highlight of Campus activities - News, Fashion, Music, Life Style and more",
      image: "https://www.youtube.com/embed/JIrBOPBCTpw?si=96cx3JT4TI-W5Ay8",
    },
    {
      title: "How to spot a fresher",
      description: "How to spot a fresher in the university",
      image: "https://www.youtube.com/embed/9rsSHZtESsY?si=imAKIawqyiaQQi5u",
    },
    {
      title: "Hostel war between Nigeria and Ghana",
      description: "Hostel war between Nigeria and Ghana",
      image: "https://www.youtube.com/embed/vZnnwzCw7jY?si=rfsG2uCuIccjpkcD",
    },
  ];

  const news = [
    {
      title: "What is CRTAfrica?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/trans.webp",
    },
    {
      title: "Nigeria's Former President Muhammadu Buhari is dead",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/bubu.JPG",
    },
    {
      title: "What was special for you in school?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      image: "/assets/image/simba.png",
    },

    {
      title: "Asuu strike again?",
      description:
        "News that will make you laugh and fall to the back of yoiur chair and cry so hard uou would miss your dead relatives",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Dating in the university",
      description: "Dating in the university",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Lecturer and student relationship",
      description: "lecturer and student relationship",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "How to get a job in the university",
      description: "How to get a job in the university",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "How to be a straight A's student",
      description: "How to be a good student",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Third class is not a problem",
      description: "Third class is not a problem",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Student vs working class",
      description: "Student vs working class",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Handling parents expectations",
      description: "Handling parents expectations",
      // image: "/assets/image/bubu.jpeg",
    },
    {
      title: "Final year students and their final year project",
      description: "Final year students and their final year project",
      // image: "/assets/image/bubu.jpeg",
    },
  ];

  return (
    <div className=" min-h-screen py-20 lg:px-20 px-4 ">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-8 w-full">
        <div className="md:col-span-4 col-span-2">
          <div className="grid sm:grid-cols-1 xl:grid-cols-2 gap-4">
            {videoUrls.map((url, index) => (
              <PopularTab
                key={url.title}
                className="mb-4"
                image={url.image}
                title={url.title}
                description={url.description}
              />
            ))}
          </div>
        </div>

        <div className="col-span-2 w-full">
          <p className="lg:text-2xl text-xl font-bold text-center bg-orange-500 text-white rounded-t-md p-2 w-full">
            Highlights
          </p>
          <div className="flex flex-col w-full">
            {news.map((item, index) => (
              <NewsTab
                key={index}
                // image={item.image}
                title={item.title}
                description={item.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
