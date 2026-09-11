import Particles from "./Particles";
import Laptop3D from "./Laptop3D";

export default function Home() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full h-screen overflow-hidden bg-[#22223b] md:h-[calc(100vh-4rem)]"
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

      <div className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 pt-16 sm:grid sm:min-h-0 sm:h-[calc(100vh-4rem)] sm:grid-cols-2 sm:items-center sm:gap-4 sm:px-8 sm:pt-0 md:gap-4 md:px-16">

        <div className="relative order-2 hidden h-full w-full sm:order-1 sm:block sm:h-[50%] md:h-[70%] md:mt-50">
          <Laptop3D className="h-full w-full" />
        </div>

        <div className="order-1 mx-auto max-w-xl text-center sm:order-2 sm:mx-0 sm:text-left sm:mt-0 md:mt-20">
          <p className="text-lg text-[#f2e9e4] sm:text-xl">Hello, I'm</p>

          <h1 className="mt-2 text-4xl font-bold text-[#f2e9e4] sm:text-5xl md:text-6xl">
            Nupur Choudhary
          </h1>

          <h2 className="mt-3 text-xl font-semibold text-[#c9ada7] sm:mt-4 sm:text-2xl md:text-3xl">
            AI Enthusiast ・ Web Developer
          </h2>

          <p className="mt-4 text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
            Passionate about Artificial Intelligence, Machine Learning, and
            building beautiful web experiences.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:mt-10 sm:flex-row sm:justify-start sm:gap-6">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=nupurchoudhary005@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Nupur,"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#9a8c98] px-5 py-3 
              text-sm text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b] sm:px-6 sm:text-base"
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
              href="/Resume-final-nupur.pdf"
              download="nupur_choudhary_resume.pdf"
              className="flex items-center justify-center gap-3 rounded-xl border border-[#9a8c98] px-5 py-3 
              text-sm text-[#f2e9e4] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-[#9a8c98] hover:text-[#22223b] sm:px-6 sm:text-base"
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
