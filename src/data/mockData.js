// src/data/mockData.js

export const mockPosts = [
  {
    id: 1,
    authorName: "Jane Doe",
    authorDP: "https://i.pravatar.cc/150?u=jane_doe",
    createdAt: "2025-09-24",
    type: "OFFERING", 
    offeringSkills: ["React", "Next.js", "UI Animation"],
    seekingSkills: ["Node.js", "Express"],
    description: "Frontend dev here, can build you a stunning UI. Looking for a backend partner to build a full-stack app.",
  },
  {
    id: 2,
    authorName: "Arun Kumar",
    authorDP: "https://i.pravatar.cc/150?u=arun_kumar",
    createdAt: "2025-09-23",
    type: "SEEKING",
    offeringSkills: ["Figma", "UI/UX Design"],
    seekingSkills: ["Webflow", "Frontend Dev"],
    description: "I'm a UI/UX designer and can create beautiful mockups for your project. I need a developer to bring my portfolio website to life.",
  },
  {
    id: 3,
    authorName: "Sara Khan",
    authorDP: "https://i.pravatar.cc/150?u=sara_khan",
    createdAt: "2025-09-22",
    type: "OFFERING",
    offeringSkills: ["Content Writing", "SEO", "Marketing"],
    seekingSkills: ["Graphic Design"],
    description: "I can write compelling content for your blog or website. In return, I'm looking for someone to design a logo for my brand.",
  },
];

export const mockUser = {
  name: "John Wick",
  bio: "Full-Stack Developer | Swapping Skills to Build Great Things",
  dp: "https://i.pravatar.cc/150?u=john_wick",
  mySkills: ["React", "Node.js", "TailwindCSS", "MongoDB"]
};