import { useState, useEffect } from "react";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#certificates", label: "Certificates" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = links.map((l) => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    sections.forEach((s) => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-3xl">
      <div
        className="
          flex items-center justify-between
          rounded-full
          border border-white/15
          bg-white/[0.07]
          px-3 py-2
          backdrop-blur-xl
          shadow-[0_8px_32px_rgba(0,0,0,0.45)]
        "
      >
        {/* Logo */}
        <a
          href="#home"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                     bg-gradient-to-br from-[#4a4e69] to-[#22223b]
                     ring-1 ring-white/20
                     text-[#f2e9e4] font-semibold text-sm"
        >
          NC
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1 rounded-full bg-black/10 px-1 py-1">
          {links.map((link) => {
            const isActive = active === link.href.slice(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={`
                  relative px-4 py-2 text-sm rounded-full transition-colors duration-300
                  ${isActive ? "text-[#22223b] bg-[#f2e9e4]" : "text-[#f2e9e4]/80 hover:text-[#f2e9e4] hover:bg-white/10"}
                `}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex h-9 w-9 items-center justify-center rounded-full text-[#f2e9e4] hover:bg-white/10"
          aria-label="Toggle menu"
        >
          <span className="sr-only">Menu</span>
          ☰
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-2 rounded-2xl border border-white/15 bg-[#22223b]/95 backdrop-blur-xl p-2 flex flex-col gap-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-sm text-[#f2e9e4]/90 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}

export default Navbar;