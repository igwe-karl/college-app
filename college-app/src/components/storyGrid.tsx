import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function StoryGrid() {
  const stories = [
    {
      id: 1,
      title: "What type of student are you?",
      excerpt: "What type of student are you?",
      image: "/assets/image/student_types.jpeg",
    },
    {
      id: 2,
      title: "Uniport bans final-year signing out celebrations indefinitely",
      excerpt:
        "Effective October 3, 2025, Reason: elaborate signing out ceremonies, security concerns, and disruption of academic activities.",
      image: "/assets/image/uniport.jpeg",
      category: "Education",
      time: "1 hour ago",
      likes: 234,
      comments: 45,
    },
    {
      id: 3,
      title: "Unilag theatre drama",
      excerpt:
        "Students of the University of Lagos took to the stage in a drama that has left many in awe...",
      image: "/assets/image/drama.jpeg",
      category: "Entertainment",
      time: "3 hours ago",
      likes: 567,
      comments: 89,
    },
    {
      id: 4,
      title: "Peter obi visits University of Calabar, donates 20 million naira",
      excerpt:
        "Peter obi visits University of Calabar, donates 20 million naira to the faculty (Faculty of dentistry) to help the students who are being faced with expulsion....",
      image: "/assets/image/obi.jpeg",
      category: "Education",
      time: "5 hours ago",
      likes: 123,
      comments: 67,
    },
    {
      id: 5,
      title:
        "Six former Chukwuemeka Odumegwu Ojukwu University students, kidnapped",
      excerpt:
        "The students were kidnapped by unknown gunmen in the early hours of July 26, 2025...",
      image: "/assets/image/ojukwu.jpeg",
      category: "Education",
      time: "8 hours ago",
      likes: 345,
      comments: 112,
    },
    {
      id: 6,
      title: "OAU Student Union Oppose Alleged Dress Code Policy",
      excerpt:
        "The students of the Obafemi Awolowo University are currently in a protest over the alleged dress code policy...",
      image: "/assets/image/oau.PNG",
      category: "Education",
      time: "12 hours ago",
      likes: 189,
      comments: 34,
    },
  ];

  return (
    <section className="py-12">
      <div className=" mx-auto">
        <h2 className="text-3xl font-bold mb-8">Popular Stories</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((story) => (
            <Card
              key={story.id}
              className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={story.image || "/placeholder.svg"}
                  alt={story.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                  {story.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-bold text-xl mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {story.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {story.excerpt}
                </p>
                {/* <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{story.time}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <Heart className="h-4 w-4 mr-1" />
                      {story.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      {story.comments}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-accent">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
