import Particles from "./Particles";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contacts() {
  return (
    <section
      id="contact"
      className="relative h-full overflow-hidden bg-[#22223b] py-12"
    >
      <div className="absolute inset-0 -z-10 pointer-events-none">
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

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 md:px-8 sm:mt-20">
        <h2 className="mt-8 text-center text-lg font-medium uppercase tracking-[0.15em] text-[#9a8c98] sm:text-xl sm:tracking-[0.2em] md:mt-12">
          Get In Touch
        </h2>

        <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-gray-300 sm:mt-6 sm:text-lg sm:leading-8">
          Whether you have an internship opportunity, an exciting project, or
          simply want to connect, I'd love to hear from you.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3 sm:gap-5 md:gap-6">
          {/* Email */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=nupurchoudhary005@gmail.com&su=Portfolio%20Inquiry&body=Hi%20Nupur,"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 
            backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#9a8c98] hover:bg-white/10"
          >
            <FaEnvelope className="text-3xl text-[#9a8c98] transition-transform duration-300 group-hover:scale-110" />

            <h3 className="mt-4 text-lg font-semibold text-[#f2e9e4]">Email</h3>

            <p className="mt-2 break-all text-sm text-gray-300">
              nupurchoudhary005@gmail.com
            </p>
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/nupurchoudhary21"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 
            backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#9a8c98] hover:bg-white/10"
          >
            <FaGithub className="text-3xl text-[#9a8c98] transition-transform duration-300 group-hover:scale-110" />

            <h3 className="mt-4 text-lg font-semibold text-[#f2e9e4]">
              GitHub
            </h3>

            <p className="mt-2 text-sm text-gray-300">View my repositories</p>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/nupurchoudhary18/"
            target="_blank"
            rel="noopener noreferrer"
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 
            backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:border-[#9a8c98] hover:bg-white/10"
          >
            <FaLinkedin className="text-3xl text-[#9a8c98] transition-transform duration-300 group-hover:scale-110" />

            <h3 className="mt-4 text-lg font-semibold text-[#f2e9e4]">
              LinkedIn
            </h3>

            <p className="mt-2 text-sm text-gray-300">
              Let's connect professionally
            </p>
          </a>
        </div>

        {/* Bottom Text */}
        <p className="mx-auto mt-12 max-w-3xl px-2 text-center text-sm leading-7 text-gray-400 sm:mt-16 sm:px-0 sm:text-base">
          I'm currently seeking{" "}
          <span className="font-semibold text-[#f2e9e4]">
            internship opportunities
          </span>
          , collaborating on{" "}
          <span className="font-semibold text-[#f2e9e4]">
            AI & Web Development
          </span>{" "}
          projects, and connecting with like-minded developers.
        </p>

        {/* Footer */}
        <div className="mt-20 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          Designed & Developed with ❤️ by{" "}
          <span className="text-[#f2e9e4]">Nupur Choudhary</span> © 2026
        </div>
      </div>
    </section>
  );
}
