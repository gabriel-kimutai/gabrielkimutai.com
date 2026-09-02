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

export const currently = [
  {
    label: "Working",
    value: "Full-stack developer at Innovative Tech Labs",
    href: null,
  },
  {
    label: "Building",
    value: "Heimdall — machine management over a LAN",
    href: "/work/heimdall/",
  },
  {
    label: "Reading",
    value: "Protocol specs, mostly other people's",
    href: null,
  },
] as const;
