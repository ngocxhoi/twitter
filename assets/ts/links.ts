interface Link {
  icon: string;
  to?: string;
  name: string;
}

export const links: Link[] = [
  {
    icon: "i-heroicons-home",
    name: "Home",
    to: "/",
  },
  {
    icon: "i-heroicons-hashtag",
    name: "Explore",
    to: "#",
  },
  {
    icon: "i-heroicons-bell",
    name: "Notifications",
    to: "#",
  },
  {
    icon: "i-heroicons-inbox",
    name: "Messages",
    to: "#",
  },
  {
    icon: "i-heroicons-bookmark",
    name: "Bookmarks",
    to: "#",
  },
  {
    icon: "i-heroicons-document-text",
    name: "Lists",
    to: "#",
  },
  {
    icon: "i-heroicons-user-circle",
    name: "Profile",
    to: "/profile",
  },
  {
    icon: "i-heroicons-ellipsis-horizontal-circle",
    name: "Mores",
    to: "#",
  },
];
