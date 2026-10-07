export const profileDummy = {
  coverImage:
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1600&q=80",
  avatarImage:
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80",
  displayName: "Ada Okonkwo",
  handle: "@ada.campus",
  about:
    "Final-year Computer Science student passionate about campus media, student leadership, and building community through CRT Africa. Always looking for the next campus story to tell.",
  info: {
    university: "Janet 'N' John College",
    major: "Computer Science",
    year: "400 Level",
    location: "Lagos, Nigeria",
    phone: "+234 803 000 0000",
    memberSince: "September 2024",
  },
  subscriptions: [
    {
      id: "sub_1",
      name: "Campus Hub Premium",
      description: "Ad-free feed, early event access, profile badge",
      price: "₦2,500 / month",
      status: "active" as const,
      renewsOn: "April 7, 2026",
    },
    {
      id: "sub_2",
      name: "Fall Events Pass",
      description: "All campus festivals & mixer tickets",
      price: "₦8,000 one-time",
      status: "expired" as const,
      renewsOn: "Expired Oct 1, 2025",
    },
    {
      id: "sub_3",
      name: "CRTA Media Bundle",
      description: "Exclusive episodes & behind-the-scenes content",
      price: "₦1,500 / month",
      status: "active" as const,
      renewsOn: "April 12, 2026",
    },
  ],
};
