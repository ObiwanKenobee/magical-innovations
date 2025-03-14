
import React, { useState, useEffect, useRef } from "react";
import AnimatedText from "../ui/AnimatedText";
import ProjectCard from "../ui/ProjectCard";
import { Project, fetchProjects } from "@/services/projectService";
import { toast } from "sonner";

export default function Projects() {
  const [isVisible, setIsVisible] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
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

  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Error loading projects:", error);
        toast.error("Failed to load projects");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, []);

  // Fallback projects (will be used if no data is available from the API)
  const fallbackProjects = [
    {
      id: "1",
      title: "Divine Insights Dashboard",
      description: "AI-powered analytics platform providing insights through enchanting data visualization with real-time updates.",
      image_url: "/placeholder.svg",
      technologies: ["React", "TensorFlow.js", "D3.js", "WebGL"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Spellbound Commerce",
      description: "E-commerce platform with magical user interactions and immersive product exploration experiences.",
      image_url: "/placeholder.svg",
      technologies: ["Next.js", "GraphQL", "Framer Motion", "Stripe"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Sacred Code Editor",
      description: "Collaborative code editor with philosophical inspirations and mystical syntax highlighting themes.",
      image_url: "/placeholder.svg",
      technologies: ["TypeScript", "WebSockets", "Monaco Editor", "Node.js"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Ethereal Cloud Platform",
      description: "Cloud infrastructure management tool with intuitive visual programming and automated scaling.",
      image_url: "/placeholder.svg",
      technologies: ["Python", "AWS", "Docker", "Kubernetes"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Mystic Messenger",
      description: "Secure messaging application with enchanting animations and thoughtful interaction design.",
      image_url: "/placeholder.svg",
      technologies: ["Flutter", "Firebase", "End-to-End Encryption", "WebRTC"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Arcane Analytics",
      description: "Machine learning platform that reveals hidden patterns in data through innovative visualizations.",
      image_url: "/placeholder.svg",
      technologies: ["PyTorch", "React", "Three.js", "Scikit-learn"],
      demo_url: "https://example.com",
      github_url: "https://github.com",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ];

  // Display fallback projects if no data is available from the API
  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

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

        {/* Loading state */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
          </div>
        )}

        {/* Projects grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                index={index}
                title={project.title}
                description={project.description}
                imageSrc={project.image_url || "/placeholder.svg"}
                technologies={project.technologies}
                demoUrl={project.demo_url || undefined}
                githubUrl={project.github_url || undefined}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
