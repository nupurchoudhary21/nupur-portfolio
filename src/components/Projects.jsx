import Particles from "./Particles";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import spamEmail from "../assets/projects/spamemail.png";
import blogify from "../assets/projects/blogify.png";
import netflix from "../assets/projects/netflix.png";
import wordGuess from "../assets/projects/wordGuess.png";
import weatherApp from "../assets/projects/weatherApp.png";


const projects = [
  {
    id: 1,
    title: "Spam Detection",
    description:
      "Spam detection ML pipeline in Python with a deployed web interface for real-time classification.",
    tech: ["Python", "Streamlit", "scikit-learn"],
    image: spamEmail,
    github: "https://github.com/nupurchoudhary21/spam-classifier",
    demo: "https://spam-classifier-website.streamlit.app/",
  },
  {
    id: 2,
    title: "Blogify",
    description:
      "A full-stack blogging platform where users can create, publish, and explore blog posts. Blogify provides user authentication, image uploads, blog management, and a commenting system through a React frontend and Express.js REST API.",
    tech: ["React", "Nodejs", "MOngodb"],
    image: blogify,
    github: "https://github.com/nupurchoudhary21/blog-website",
    demo: "https://blog-website-xlem.onrender.com/",
  },
  {
    id: 3,
    title: "Netflix Website Clone",
    description:
      "A modern Netflix landing page clone built using HTML, CSS, and JavaScript. This project recreates the look and feel of Netflix's homepage with interactive UI components and smooth user experience.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: netflix,
    github: "https://github.com/nupurchoudhary21/netflix-website-clone",
    demo: "https://netflix-website-clone-delta.vercel.app/",
  },
  {
    id: 4,
    title: "Word Guess Gaming",
    description:
      "A responsive Word Guessing Game built using HTML, CSS, and JavaScript. Players can guess letters or attempt to guess the entire country name before running out of attempts.",
    tech: ["HTML", "CSS", "JavaScript"],
    image: wordGuess,
    github: "https://github.com/nupurchoudhary21/word-guessing-name",
    demo: "https://word-guessing-name.vercel.app/",
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "A simple and responsive weather application built using HTML, CSS, and JavaScript that fetches real-time weather information using the OpenWeather API.",
    tech: ["HTML", "CSS", "JavaScript", "API"],
    image: weatherApp ,
    github: "https://github.com/nupurchoudhary21/weather-app",
    demo: "https://weather-app-sigma-eight-33.vercel.app/",
  },
];

function ProjectCard({ project, index }) {
  const isReversed = index % 2 === 1;

  return (
    <div
      className={`
        group flex flex-col md:flex-row ${isReversed ? "md:flex-row-reverse" : ""}
        items-stretch gap-5 md:gap-8
        rounded-2xl border border-[#9a8c98]/40 bg-[#4a4e69]/20
        p-4 md:p-5 backdrop-blur-md
        transition-all duration-300
        hover:-translate-y-1 hover:border-[#F8B2B2] hover:shadow-lg
      `}
    >
      <div className="w-full md:w-2/5 shrink-0 overflow-hidden rounded-xl border border-[#9a8c98]/30">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-40 md:h-full object-cover transition-transform duration-300 ease-out group-hover:scale-110"
        />
      </div>

      <div className="w-full md:w-3/5">
        <h3 className="text-xl font-semibold text-[#f2e9e4] mb-2">
          {project.title}
        </h3>
        <p className="text-[#c9c2cc] leading-relaxed mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((t) => (
            <span
              key={t}
              className="
                text-xs font-medium px-3 py-1.5 rounded-full
                border border-[#9a8c98]/40 bg-[#22223b]/40
                text-[#f2e9e4]
              "
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 text-sm font-medium
                px-4 py-2 rounded-full
                border border-[#9a8c98]/40 text-[#f2e9e4]
                transition-all duration-300
                hover:border-[#F8B2B2] hover:bg-[#9a8c98] hover:text-[#22223b]
              "
            >
              <FaGithub className="text-base" />
              Code
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="
                flex items-center gap-2 text-sm font-medium
                px-4 py-2 rounded-full
                border border-[#9a8c98]/40 text-[#f2e9e4]
                transition-all duration-300
                hover:border-[#F8B2B2] hover:bg-[#9a8c98] hover:text-[#22223b]
              "
            >
              <FaExternalLinkAlt className="text-sm" />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen overflow-hidden bg-[#22223b] py-20"
    >
      <div className="absolute inset-0 -z-0">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={["#4a4e69", "#f2e9e4", "#f2e9e4"]}
          moveParticlesOnHover
          particleHoverFactor={1.8}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-8 mt-5">
        <p className="text-xl font-medium uppercase tracking-[0.2em] text-[#9a8c98] text-center">
          Projects
        </p>

        <h2 className="mt-3 text-center text-xl font-bold text-[#9a8c98]">
          Things I&apos;ve Built
        </h2>

        <div className="mt-12 flex flex-col gap-6">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
