export const projectData = [
  {
    type: "developing",
    title_contents: {
      title: "LINEnglish",
      sub: "A web application for learning English more easily to continue :)",
      link: "https://github.com/chi1180/LINEnglish-Web",
    },
    tag_list: ["web", "next.js", "supabase", "line"],
    time: ["2025 May 04"],
    description: `LINEnglish is a web application that helps users learn English
  more easily. It provides a variety of features such as vocabulary
  quizzes, grammar exercises, and conversation practice. The
  application is designed to be user-friendly and accessible to all
  levels of English learners.`,
    pictures: [
      "/projects/linenglish/lp.png",
      "/projects/linenglish/dashboard.png",
      "/projects/linenglish/vocab.png",
    ],
  },
] as ProjectInfo[];

export interface ProjectInfo {
  type: "developing" | "developed";
  title_contents: {
    title: string;
    sub: string;
    link: string;
  };
  tag_list: string[];
  time: string[];
  description: string;
  pictures: string[];
}
