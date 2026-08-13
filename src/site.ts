export const site = {
  name: "Gabriel Kimutai",
  role: "Software Developer / Engineer",
  description:
    "Software Developer / Engineer. I build backend systems, networking software, Android applications, and developer infrastructure.",
  url: "https://gabrielkimutai.com",
  email: "contact@gabrielkimutai.com",
  location: "Nairobi, Kenya",
  github: "https://github.com/gabriel-kimutai",
  linkedin: "https://www.linkedin.com/in/gabriel-kimutai-72b958235",
} as const;

export const nav = [
  { href: "/work/", label: "Work" },
  { href: "/writing/", label: "Writing" },
  { href: "/about/", label: "About" },
] as const;

export const plannedWriting = [
  "Building mDNS service discovery from scratch",
  "Designing a computer management daemon",
  "Building a UDP-based application protocol",
  "Reverse engineering Bluetooth HCI traffic",
  "Designing event-driven systems",
  "Running production services on Linux",
] as const;
