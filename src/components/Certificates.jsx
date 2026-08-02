import Particles from "./Particles";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import CloudDeveloping from "../assets/certificates/AWS_Academy_Graduate___Cloud_Developing___Training_Badge.jpg";
import CloudFoundations from "../assets/certificates/AWS_Academy_Graduate___Cloud_Foundations___Training_Badge.jpg";
import SIH from "../assets/certificates/SIH.png";
import DataAnalytics from "../assets/certificates/dataAnalyticsJobSimulation.jpg";
import datacleaning from "../assets/certificates/datacleaning.png";
import introml from "../assets/certificates/introml.png";
import pandas from "../assets/certificates/pandas.png";


const certificates = [
  {
    title: "AWS Academy Cloud Developing",
    issuer: "AWS Academy",
    date: "26/04/26",
    image: CloudDeveloping,
    link: "https://www.credly.com/go/83fqfK5i",
  },
  {
    title: "AWS Academy Cloud Foundations",
    issuer: "AWS Academy",
    date: "16/02/2026",
    image: CloudFoundations,
    link: "https://www.credly.com/go/020fk2o0",
  },
  {
    title: "Smart India Hackathon 2025",
    issuer: "Amity University",
    date: "2025",
    image: SIH,
  },
  {
    title: "Data Analytics Job Simulation",
    issuer: "TATA Forage",
    date: "29/05/26",
    image: DataAnalytics,
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "Kaggle",
    date: "16/03/26",
    image: introml,
    link: "https://www.kaggle.com/learn/certification/nupur16/intro-to-machine-learning",
  },
  {
    title: "Pandas: Course Completion",
    issuer: "Kaggle",
    date: "07/03/26",
    image: pandas,
    link: "https://www.kaggle.com/learn/certification/nupur16/pandas",
  },
  {
    title: "Data Cleaning: Course Completion",
    issuer: "Kaggle",
    date: "15/03/26",
    image: datacleaning,
    link: "https://www.kaggle.com/learn/certification/nupur16/data-cleaning",
  },
];

function getOffset(index, current, total) {
  let offset = index - current;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
}

function slideStyle(offset) {
  const abs = Math.abs(offset);

  if (abs > 2) {
    return {
      transform: `translateX(-50%) translateZ(-600px) scale(0.5)`,
      opacity: 0,
      pointerEvents: "none",
      zIndex: 0,
    };
  }

  const sign = Math.sign(offset);
  const translateX = offset === 0 ? 0 : sign * (260 + abs * 160);
  const translateZ = offset === 0 ? 0 : -160 * abs;
  const rotateY = offset === 0 ? 0 : -sign * 32;
  const scale = offset === 0 ? 1 : 1 - abs * 0.16;
  const blur = offset === 0 ? 0 : abs * 2.5;
  const brightness = offset === 0 ? 1 : 1 - abs * 0.28;
  const opacity = offset === 0 ? 1 : 1 - abs * 0.15;

  return {
    transform: `translateX(calc(-50% + ${translateX}px)) translateZ(${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
    filter: `blur(${blur}px) brightness(${brightness})`,
    opacity,
    zIndex: 10 - abs,
    pointerEvents: offset === 0 ? "auto" : "auto",
  };
}

export default function Certificates() {
  const [current, setCurrent] = useState(0);
  const total = certificates.length;

  const goTo = useCallback(
    (index) => setCurrent(((index % total) + total) % total),
    [total],
  );

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goTo(current - 1);
      if (e.key === "ArrowRight") goTo(current + 1);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo]);

  // Basic swipe support
  const [touchStartX, setTouchStartX] = useState(0);
  const handleTouchStart = (e) => setTouchStartX(e.touches[0].clientX);
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (dx > 50) goTo(current - 1);
    if (dx < -50) goTo(current + 1);
  };

  return (
    <section
      id="certificates"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-[#22223b] px-6 py-18"
    >
      <div className="absolute inset-0 -z-0 pointer-events-none">
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

      <h2 className="text-xl mt-5 font-medium uppercase tracking-[0.2em] text-[#9a8c98] text-center mb-5">
        Certificates
      </h2>

      <div
        className="relative z-20 w-full max-w-6xl"
        style={{ perspective: "1600px" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="relative mx-auto h-[500px] w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {certificates.map((cert, i) => {
            const offset = getOffset(i, current, total);
            return (
              <div
                key={cert.title}
                onClick={() => goTo(i)}
                className="absolute left-1/2 top-0 w-80 cursor-pointer rounded-2xl border border-[#4a4e69] bg-[#2f2f4a] p-4 shadow-2xl transition-all duration-500 ease-out sm:w-96 md:w-[420px]"
                style={slideStyle(offset)}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="mb-6 h-72 w-full rounded-xl object-contain bg-white p-2"
                  draggable={false}
                />
                <h3 className="text-xl font-semibold text-[#f2e9e4] sm:text-2xl">
                  {cert.title}
                </h3>
                <p className="mt-2 text-base text-[#c9ada7]">
                  {cert.issuer} &middot; {cert.date}
                </p>

                {offset === 0 && cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="mt-4 inline-flex items-center gap-1 text-base font-medium text-[#9a8c98] transition-colors hover:text-[#f2e9e4]"
                  >
                    View certificate <ExternalLink size={16} />
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </div>


      <div className="flex items-center gap-8">
        <button
          onClick={() => goTo(current - 1)}
          aria-label="Previous certificate"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4a4e69] text-[#f2e9e4] transition-transform hover:scale-110 hover:bg-[#9a8c98]"
        >
          <ChevronLeft size={18} />
        </button>

        <div className="flex gap-3">
          {certificates.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to certificate ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                i === current
                  ? "w-8 bg-[#f2e9e4]"
                  : "w-2.5 bg-[#4a4e69] hover:bg-[#9a8c98]"
              }`}
            />
          ))}
        </div>

        <button
          onClick={() => goTo(current + 1)}
          aria-label="Next certificate"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[#4a4e69] text-[#f2e9e4] transition-transform hover:scale-110 hover:bg-[#9a8c98]"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </section>
  );
}
