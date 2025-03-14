
import React, { useState, useEffect, useRef } from "react";
import AnimatedText from "../ui/AnimatedText";
import ProjectCard from "../ui/ProjectCard";

export default function Projects() {
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

  // Project data
  const projects = [
    {
      title: "Divine Insights Dashboard",
      description: "AI-powered analytics platform providing insights through enchanting data visualization with real-time updates.",
      imageSrc: "/placeholder.svg",
      technologies: ["React", "TensorFlow.js", "D3.js", "WebGL"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Spellbound Commerce",
      description: "E-commerce platform with magical user interactions and immersive product exploration experiences.",
      imageSrc: "/placeholder.svg",
      technologies: ["Next.js", "GraphQL", "Framer Motion", "Stripe"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Sacred Code Editor",
      description: "Collaborative code editor with philosophical inspirations and mystical syntax highlighting themes.",
      imageSrc: "/placeholder.svg",
      technologies: ["TypeScript", "WebSockets", "Monaco Editor", "Node.js"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Ethereal Cloud Platform",
      description: "Cloud infrastructure management tool with intuitive visual programming and automated scaling.",
      imageSrc: "/placeholder.svg",
      technologies: ["Python", "AWS", "Docker", "Kubernetes"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Mystic Messenger",
      description: "Secure messaging application with enchanting animations and thoughtful interaction design.",
      imageSrc: "/placeholder.svg",
      technologies: ["Flutter", "Firebase", "End-to-End Encryption", "WebRTC"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
    {
      title: "Arcane Analytics",
      description: "Machine learning platform that reveals hidden patterns in data through innovative visualizations.",
      imageSrc: "/placeholder.svg",
      technologies: ["PyTorch", "React", "Three.js", "Scikit-learn"],
      demoUrl: "https://example.com",
      githubUrl: "https://github.com",
    },
  ];

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -inset-[100px] opacity-30 dark:opacity-20">
          <div className="absolute top-1/3 right-1/4 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-celestial/10 via-transparent to-emerald/10 dark:from-celestial/10 dark:to-mystical/10 blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/3 w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-gold/10 via-transparent to-emerald/10 dark:from-gold/10 dark:to-transparent blur-3xl"></div>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 rounded-full text-primary dark:bg-primary/20">
            My Work
          </span>
          <AnimatedText
            text="Magical Creations"
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
            Discover my portfolio of innovative projects that blend technology with enchanting user experiences. 
            Each creation is crafted with care, combining technical excellence with magical interaction design.
          </p>
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              index={index}
              title={project.title}
              description={project.description}
              imageSrc={project.imageSrc}
              technologies={project.technologies}
              demoUrl={project.demoUrl}
              githubUrl={project.githubUrl}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
