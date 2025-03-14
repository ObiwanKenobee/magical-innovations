
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "About", path: "#about" },
    { name: "Projects", path: "#projects" },
    { name: "Tech Stack", path: "#tech-stack" },
    { name: "Contact", path: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4 px-6 md:px-12
      ${isScrolled
        ? "bg-white/80 backdrop-blur-md dark:bg-background/80 shadow-md"
        : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a 
          href="/" 
          className="text-2xl font-playfair font-bold tracking-tight group"
        >
          <span className="inline-block transition-transform duration-300 group-hover:-translate-y-1 text-emerald dark:text-celestial">
            Eugene
          </span>
          <span className="inline-block transition-transform duration-300 delay-100 group-hover:-translate-y-1 ml-2 text-mystical/80 dark:text-gold/90">
            Ochako
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.path}
                  className="text-foreground/80 hover:text-emerald dark:hover:text-celestial animated-link py-2 font-medium transition-colors duration-300"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="flex items-center md:hidden space-x-4">
          <ThemeToggle />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-5 flex flex-col justify-between relative">
              <span
                className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  mobileMenuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
                  mobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`w-full h-0.5 bg-current transform transition-transform duration-300 ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full px-6 py-4 
        transition-all duration-300 ease-in-out origin-top transform 
        ${
          mobileMenuOpen
            ? "opacity-100 scale-y-100 pointer-events-auto"
            : "opacity-0 scale-y-90 pointer-events-none"
        }
        bg-white/90 dark:bg-background/90 backdrop-blur-md shadow-lg`}
      >
        <ul className="flex flex-col space-y-4">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.path}
                className="block py-2 text-foreground/90 hover:text-emerald dark:hover:text-celestial transition-colors duration-300"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
