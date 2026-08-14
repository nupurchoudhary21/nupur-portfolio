import photo from "../assets/photo.jpg";
import Particles from "./Particles";

const skills = [
  "Machine Learning",
  "Artificial Intelligence",
  "Node.js",
  "MongoDB",
];

export default function About() {
  return (
    <section
      id="about"
      className="relative h-full w-full overflow-hidden bg-[#22223b]"
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

      <div className="relative z-10 grid h-screen w-full grid-cols-1 items-center gap-6 px-6 py-6 sm:px-8 md:grid-cols-[1.3fr_1fr] md:gap-6 md:px-30 md:py-0 mt-20">
        <div className="order-1 mx-auto max-w-xl text-center sm:max-w-2xl md:order-1 md:mx-0 md:max-w-none md:text-left tracking-wide">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#9a8c98] sm:text-base md:mt-0">
            About Me
          </p>

          <div className="order-2 my-8 flex h-[260px] w-full items-center justify-center sm:h-[320px] md:hidden">
            <div className="relative">
              <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-[#f2e9e4]/20" />
              <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[#4a4e69]/50 to-transparent blur-2xl" />
              <img
                src={photo}
                alt="Nupur Choudhary"
                className="relative h-56 w-56 rounded-[2rem] object-cover shadow-2xl ring-1 ring-[#f2e9e4]/20 sm:h-72 sm:w-72 md:h-[22rem] md:w-[22rem]"
              />
            </div>
          </div>

          <p className="mt-4 text-base leading-relaxed text-[#c9ada7] md:text-xl sm:text-lg md:mt-6">
            I'm a{" "}
            <span className="font-semibold text-[#f2e9e4]">
              third-year Computer Science student
            </span>{" "}
            passionate about{" "}
            <span className="font-semibold text-[#f2e9e4]">
              Artificial Intelligence
            </span>
            ,{" "}
            <span className="font-semibold text-[#f2e9e4]">
              Machine Learning
            </span>
            , and{" "}
            <span className="font-semibold text-[#f2e9e4]">
              Web Development
            </span>
            . I enjoy transforming complex problems into simple and efficient
            solutions, while continuously learning new technologies and building
            impactful projects.
          </p>

          <div className="mt-8 md:mt-10">
            <h3 className="text-base font-semibold text-white sm:text-lg">
              Currently Exploring
            </h3>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3 md:justify-start">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-xl border border-[#9a8c98] px-3 py-1.5 text-xs text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b] sm:px-6 sm:py-3 sm:text-base"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="order-2 hidden h-[70%] w-full items-center justify-center md:order-2 md:flex">
          <div className="relative">
            <div className="absolute -right-4 -top-4 h-full w-full rounded-[2rem] border-2 border-[#f2e9e4]/20" />
            <div className="absolute -inset-3 rounded-[2.2rem] bg-gradient-to-br from-[#4a4e69]/50 to-transparent blur-2xl" />
            <img
              src={photo}
              alt="Nupur Choudhary"
              className="relative h-[22rem] w-[22rem] rounded-[2rem] object-cover shadow-2xl ring-1 ring-[#f2e9e4]/20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
