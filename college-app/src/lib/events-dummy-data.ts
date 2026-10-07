export type CampusEvent = {
  id: string;
  title: string;
  description: string;
  date: string; // ISO date YYYY-MM-DD
  time: string;
  location: string;
  category: "social" | "academic" | "media" | "sports";
  isPast: boolean;
};

export const dummyEvents: CampusEvent[] = [
  {
    id: "1",
    title: "Welcome Week Concert",
    description: "Live DJ and student performances on the main quad.",
    date: "2026-03-01",
    time: "6:00 PM",
    location: "Main Quad",
    category: "social",
    isPast: true,
  },
  {
    id: "2",
    title: "Career Fair 2026",
    description: "Meet recruiters from tech and finance companies.",
    date: "2026-03-15",
    time: "10:00 AM",
    location: "Student Union Hall",
    category: "academic",
    isPast: true,
  },
  {
    id: "3",
    title: "Neon Nights Mixer",
    description: "Fall social mixer with food trucks and photo booth.",
    date: "2026-10-24",
    time: "7:00 PM",
    location: "Campus Green",
    category: "social",
    isPast: false,
  },
  {
    id: "4",
    title: "Tech Symposium",
    description: "Talks on AI, campus startups, and hackathon preview.",
    date: "2026-10-26",
    time: "9:00 AM",
    location: "Engineering Block",
    category: "academic",
    isPast: false,
  },
  {
    id: "5",
    title: "CRTA Media Live",
    description: "Recording CRT Africa campus episode—audience welcome.",
    date: "2026-11-02",
    time: "4:00 PM",
    location: "Media Studio B",
    category: "media",
    isPast: false,
  },
];

export const categoryColors: Record<CampusEvent["category"], string> = {
  social: "bg-pink-500",
  academic: "bg-indigo-500",
  media: "bg-orange-500",
  sports: "bg-green-500",
};
