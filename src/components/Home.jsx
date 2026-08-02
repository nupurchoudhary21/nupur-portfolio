import Particles from "./Particles";
import Laptop3D from "./Laptop3D";

export default function Home() {
  return (
    <section
      id="home"
      className="relative h-[calc(100vh-4rem)] w-full overflow-hidden bg-[#22223b]"
    >
      <div className="absolute inset-0 -z-0">
        <Particles
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleColors={["#4a4e69", "#9a8c98", "#f2e9e4"]}
          moveParticlesOnHover
          particleHoverFactor={1.8}
          alphaParticles={false}
          particleBaseSize={100}
          sizeRandomness={1}
          cameraDistance={20}
          disableRotation={false}
        />
      </div>

      <div className="relative z-10 grid h-full w-full grid-cols-1 items-center gap-8 px-8 md:grid-cols-2 md:gap-4 md:px-16">
        <div className="relative order-2 h-[320px] w-full md:order-1 md:h-[70%] mt-40">
          <Laptop3D className="h-full w-full" />
        </div>

        <div className="order-1 mx-auto max-w-xl text-center md:order-2 md:mx-0 md:text-left mt-20">
          <p className="text-xl text-[#f2e9e4]">Hello, I'm</p>

          <h1 className="mt-2 text-5xl font-bold text-[#f2e9e4] md:text-6xl">
            Nupur Choudhary
          </h1>

          <h2 className="mt-4 text-2xl font-semibold text-[#c9ada7] md:text-3xl">
            AI Enthusiast ・ Web Developer
          </h2>

          <p className="mt-6 text-lg leading-8 text-gray-300">
            Passionate about Artificial Intelligence, Machine Learning, and
            building beautiful web experiences.
          </p>

          <div className="mt-10 flex justify-center gap-6 md:justify-start">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nupurchoudhary005@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Nupur,"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl border border-[#9a8c98] px-6 py-3 
              text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16v12H4V6zm0 0l8 6 8-6"
                />
              </svg>

              <span>Contact Me</span>
            </a>

            <a
              href="/resume.pdf"
              download="Nupur_Choudhary_Resume.pdf"
              className="flex items-center gap-3 rounded-xl border border-[#9a8c98] px-6 py-3 
              text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v12m0 0l-4-4m4 4l4-4M5 20h14"
                />
              </svg>

              <span>Download Resume</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
