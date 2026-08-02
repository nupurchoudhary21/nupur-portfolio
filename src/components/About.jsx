import photo from "../assets/photo.jpg";
import Particles from "./Particles";

const skills = ["Machine Learning", "Artificial Intelligence", "Node.js", "MongoDB"];

export default function About() {
  return (
    <section
      id="about"
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#22223b]"
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

<div className="relative z-10 grid h-full w-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-[1.3fr_1fr] md:gap-6 md:px-16">
  <div className="order-2 mx-auto max-w-7xl text-center md:order-1 md:mx-0 md:text-left px-15 tracking-wide">
    <p className="text-2xl font-medium uppercase tracking-[0.2em] text-[#9a8c98] text-[16px] mt-20">
      About Me
    </p>

        
    <p className="mt-6 text-lg leading-relaxed text-[#c9ada7] md:text-xl">
      I'm a{" "}
      <span className="font-semibold text-[#f2e9e4]">
        third-year Computer Science student
      </span>{" "}
      passionate about{" "}
      <span className="font-semibold text-[#f2e9e4]">Artificial Intelligence</span>,{" "}
      <span className="font-semibold text-[#f2e9e4]">Machine Learning</span>, and{" "}
      <span className="font-semibold text-[#f2e9e4]">Web Development</span>. I enjoy
      transforming complex problems into simple and efficient solutions, while
      continuously learning new technologies and building impactful projects.
    </p>

          <div className="mt-10">
            <h3 className="text-lg font-semibold text-white">Currently Exploring</h3>

            <div className="mt-4 flex flex-wrap justify-center gap-3 md:justify-start">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-[#9a8c98] px-6 py-3 text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        
        <div className="relative order-1 flex h-[320px] w-full items-center justify-center md:order-2 md:h-[70%] mt-20">
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-[#f2e9e4]/20" />
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[#4a4e69]/50 to-transparent blur-2xl" />

            <img
              src={photo}
              alt="Nupur Choudhary"
              className="relative h-72 w-72 rounded-[2rem] object-cover shadow-2xl ring-1 ring-[#f2e9e4]/20 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]"
            />

          </div>
        </div>
      </div>
    </section>
  );
}