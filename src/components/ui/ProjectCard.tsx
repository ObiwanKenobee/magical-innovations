
import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  title: string;
  description: string;
  imageSrc: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  className?: string;
  index: number;
}

export default function ProjectCard({
  title,
  description,
  imageSrc,
  technologies,
  demoUrl,
  githubUrl,
  className,
  index,
}: ProjectCardProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  
  // Staggered delay based on card index
  const revealDelay = index * 100;

  return (
    <div 
      className={cn(
        "group relative bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20 shadow-md",
        "transition-all duration-700 ease-out",
        "dark:bg-black/20 dark:border-white/10",
        "hover:shadow-lg hover:shadow-emerald/5 dark:hover:shadow-celestial/5",
        "transform perspective-1000",
        isRevealed ? "opacity-100" : "opacity-0 translate-y-10",
        className
      )}
      style={{ 
        transitionDelay: `${revealDelay}ms`,
        transformStyle: "preserve-3d" 
      }}
      onMouseEnter={() => setIsRevealed(true)}
    >
      {/* Project Image with Overlay */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover transition-all duration-500 ease-out group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70" />
        
        {/* Spell particles effect on hover */}
        <div className="absolute inset-0 bg-emerald/0 dark:bg-celestial/0 transition-colors duration-300 
          group-hover:bg-emerald/10 dark:group-hover:bg-celestial/10 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-white/70 dark:bg-white/90 
                opacity-0 group-hover:opacity-100 transition-opacity duration-100"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite, 
                            pulse-soft ${2 + Math.random() * 3}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-playfair font-bold mb-2 text-emerald dark:text-celestial group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="text-foreground/80 mb-4 text-sm">{description}</p>
        
        {/* Tech tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {technologies.map((tech, i) => (
            <span
              key={tech}
              className="text-xs py-1 px-2 rounded-full bg-primary/10 text-primary-foreground/90 
                dark:bg-secondary/20 dark:text-secondary-foreground/90
                transform transition-all duration-300"
              style={{ 
                transitionDelay: `${i * 50}ms`,
                transform: isRevealed ? "scale(1)" : "scale(0.8)",
                opacity: isRevealed ? 1 : 0
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Links */}
        <div className="flex space-x-3">
          {demoUrl && (
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm py-1.5 px-3 rounded-lg bg-emerald hover:bg-emerald-light 
                dark:bg-celestial dark:hover:bg-celestial-light text-white 
                transition-all duration-300 inline-flex items-center"
            >
              Live Demo
              <svg 
                className="w-3.5 h-3.5 ml-1.5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                />
              </svg>
            </a>
          )}
          
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm py-1.5 px-3 rounded-lg border border-current 
                text-foreground/70 hover:text-emerald dark:hover:text-celestial 
                transition-colors duration-300 inline-flex items-center"
            >
              View Code
              <svg 
                className="w-3.5 h-3.5 ml-1.5" 
                fill="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12" />
              </svg>
            </a>
          )}
        </div>
      </div>
      
      {/* Magical glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 
          transition-opacity duration-700 pointer-events-none -z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-emerald/10 via-transparent to-celestial/10 
          dark:from-mystical/15 dark:to-celestial/15 rounded-xl blur-xl transform scale-105" />
      </div>
    </div>
  );
}
