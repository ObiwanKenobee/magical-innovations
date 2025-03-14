
import React, { useState, useEffect, useRef } from "react";
import AnimatedText from "../ui/AnimatedText";
import TechItem from "../ui/TechItem";

export default function TechStack() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Tech icons as SVG components
  const TechIcons = {
    CloudComputing: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path>
      </svg>
    ),
    AI: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M12 2H2v10h10V2Z"></path>
        <path d="M22 2h-5v5h5V2Z"></path>
        <path d="M22 12h-5v10h5V12Z"></path>
        <path d="M12 12H7v5h5v-5Z"></path>
        <path d="M7 12H2v10h5V12Z"></path>
      </svg>
    ),
    Frontend: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    Backend: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14a9 3 0 0 0 18 0V5"></path>
      </svg>
    ),
    DevOps: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
        <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
        <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
        <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
        <line x1="12" y1="22.08" x2="12" y2="12"></line>
      </svg>
    ),
    Mobile: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2"></rect>
        <path d="M12 18h.01"></path>
      </svg>
    ),
    Database: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
      </svg>
    ),
    Security: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
      </svg>
    ),
    ML: () => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M2 3h19.138a.5.5 0 0 1 .435.736L18 10 4 21V3Z"></path>
        <path d="M22 3 2 22"></path>
      </svg>
    ),
  };

  // Tech categories and skills
  const techCategories = [
    {
      name: "Cloud Computing",
      icon: <TechIcons.CloudComputing />,
      proficiency: 9,
    },
    {
      name: "Artificial Intelligence",
      icon: <TechIcons.AI />,
      proficiency: 8,
    },
    {
      name: "Frontend Development",
      icon: <TechIcons.Frontend />,
      proficiency: 10,
    },
    {
      name: "Backend Systems",
      icon: <TechIcons.Backend />,
      proficiency: 9,
    },
    {
      name: "DevOps & Infrastructure",
      icon: <TechIcons.DevOps />,
      proficiency: 7,
    },
    {
      name: "Mobile Development",
      icon: <TechIcons.Mobile />,
      proficiency: 8,
    },
    {
      name: "Database Design",
      icon: <TechIcons.Database />,
      proficiency: 9,
    },
    {
      name: "Security",
      icon: <TechIcons.Security />,
      proficiency: 7,
    },
    {
      name: "Machine Learning",
      icon: <TechIcons.ML />,
      proficiency: 8,
    },
  ];

  return (
    <section
      id="tech-stack"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -inset-[100px] opacity-20 dark:opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald/5 via-transparent to-celestial/5 dark:from-mystical/5 dark:to-celestial/5 blur-3xl"></div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 rounded-full text-primary dark:bg-primary/20">
            My Skills
          </span>
          <AnimatedText
            text="Magical Technologies"
            tag="h2"
            className={`text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
          <p 
            className={`mt-4 max-w-2xl mx-auto text-foreground/70 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Explore the technologies I've mastered to create digital experiences 
            that blend technical excellence with enchanting interactions.
          </p>
        </div>

        {/* Tech grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {techCategories.map((tech, index) => (
            <TechItem
              key={tech.name}
              name={tech.name}
              icon={tech.icon}
              proficiency={tech.proficiency}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
