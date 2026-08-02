import Particles from "./Particles";

import {
  FaCode,
  FaGlobe,
  FaBrain,
  FaTools,
  FaDatabase,
  FaJava,
  FaPython,
  FaGitAlt,
  FaGithub,
  FaAws,
  FaHtml5,
} from "react-icons/fa";

import {
  SiCplusplus,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiPandas,
  SiNumpy,
  SiScikitlearn,
  SiC,
} from "react-icons/si";

import { VscVscode } from "react-icons/vsc";
import { FaCss } from "react-icons/fa6";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: <FaCode />,
    skills: [
      { name: "C", icon: <SiC /> },
      { name: "C++", icon: <SiCplusplus /> },
      { name: "Python", icon: <FaPython /> },
      { name: "Java", icon: <FaJava /> },
      { name: "JavaScript", icon: <SiJavascript /> },
    ],
  },

  {
    title: "AI & Machine Learning",
    icon: <FaBrain />,
    skills: [
      { name: "Pandas", icon: <SiPandas /> },
      { name: "NumPy", icon: <SiNumpy /> },
      { name: "Machine Learning", icon: <FaBrain /> },
      { name: "Scikit Learn", icon: <SiScikitlearn /> },
    ],
  },

  {
    title: "Web Development",
    icon: <FaGlobe />,
    skills: [
      { name: "React", icon: <SiReact /> },
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
    ],
  },

  {
    title: "Tools & Technologies",
    icon: <FaTools />,
    skills: [
      { name: "Git", icon: <FaGitAlt /> },
      { name: "GitHub", icon: <FaGithub /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "VS Code", icon: <VscVscode /> },
    ],
  },

  {
    title: "Core CS Concepts",
    icon: <FaDatabase />,
    skills: [
      { name: "Data Structure and Algorithm (DSA)" },
      { name: "Object Oriented Programming (OPP)" },
      { name: "Data Base Management System (DBMS)" },
      { name: "Operating Systems" },
      { name: "Computer Networks" },
      { name: "Software Engineering" },
    ],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
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

      <div className="relative z-10 mx-auto max-w-7xl px-8 mt-5">

        <p className="text-xl font-medium uppercase tracking-[0.2em] text-[#9a8c98] text-center">
          Skills
        </p>

        <h2 className="mt-3 text-center text-xl font-bold text-[#9a8c98]">
          Technologies I Work With
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-2">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className={
                category.title === "Core CS Concepts" ? "md:col-span-2" : ""
              }
            >
              <h3 className="mb-4 flex items-center gap-2 text-xl font-semibold text-[#9a8c98]">
                <span className="text-xl">{category.icon}</span>
                {category.title}
              </h3>

              <div className="flex flex-wrap gap-4">
                {category.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className="
                    flex items-center
                    gap-2
                    rounded-full border
                    border-[#9a8c98]/40
                    bg-[#4a4e69]/20
                    px-6
                    py-3
                    text-[#f2e9e4]
                    backdrop-blur-md
                    transition-all
                    duration-300
                    hover:-translate-y-1
                    hover:border-[#F8B2B2]
                    hover:bg-[#9a8c98]
                    hover:text-[#22223b]
                    hover:shadow-lg
                    cursor-default "
                  >
                    {skill.icon && (
                      <span className="text-lg">{skill.icon}</span>
                    )}
                    <span>{skill.name}</span>
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
