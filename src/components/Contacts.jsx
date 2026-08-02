import Particles from "./Particles";
import { FaEnvelope, FaGithub, FaLinkedin } from "react-icons/fa";

export default function Contacts() {
  return (
    <section
      id="contact"
      className="relative h-[650px] overflow-hidden bg-[#22223b] py-12"
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

      <div className="relative z-10 mx-auto max-w-6xl px-8">
        <h2 className="text-center text-xl font-medium uppercase tracking-[0.2em] text-[#9a8c98] mt-12">
          Get In Touch
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-300">
          Whether you have an internship opportunity, an exciting project, or
          simply want to connect, I'd love to hear from you.
        </p>

        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
          {/* Email */}
          <a
            href="mailto:nupurchoudhary005@gmail.com"
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
            href="https://github.com/YOUR_GITHUB_USERNAME"
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
            href="https://linkedin.com/in/YOUR_LINKEDIN"
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
        <p className="mx-auto mt-16 max-w-3xl text-center text-gray-400">
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
