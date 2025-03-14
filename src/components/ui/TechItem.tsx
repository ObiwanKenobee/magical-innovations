
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TechItemProps {
  name: string;
  icon: React.ReactNode;
  proficiency: number; // 1-10
  index: number;
  className?: string;
}

export default function TechItem({
  name,
  icon,
  proficiency,
  index,
  className,
}: TechItemProps) {
  const [isInView, setIsInView] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger the animation based on index
          setTimeout(() => {
            setIsInView(true);
          }, index * 100);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => {
      if (itemRef.current) {
        observer.unobserve(itemRef.current);
      }
    };
  }, [index]);

  // Calculate the color based on proficiency
  const getProficiencyColor = () => {
    if (proficiency >= 8) return "bg-emerald dark:bg-celestial";
    if (proficiency >= 5) return "bg-gold dark:bg-gold-light";
    return "bg-mystical/70 dark:bg-mystical";
  };

  // Create rune particles for the magical effect
  const renderRunes = () => {
    return Array.from({ length: 3 }).map((_, i) => (
      <div
        key={i}
        className={cn(
          "absolute w-2 h-2 rounded-full opacity-0 transition-opacity duration-700",
          isHovered ? "opacity-70" : "opacity-0"
        )}
        style={{
          backgroundColor: isHovered ? "rgba(255, 255, 255, 0.8)" : "transparent",
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          animation: isHovered
            ? `float ${3 + Math.random() * 4}s ease-in-out infinite, pulse-soft ${
                2 + Math.random() * 3
              }s ease-in-out infinite`
            : "none",
        }}
      />
    ));
  };

  return (
    <div
      ref={itemRef}
      className={cn(
        "relative flex flex-col items-center p-6 rounded-xl transition-all duration-500 ease-out",
        "backdrop-blur-sm bg-white/5 border border-white/10",
        "dark:bg-black/10 dark:border-white/5",
        "hover:border-emerald/30 dark:hover:border-celestial/30",
        isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      {/* Icon container with glow effect */}
      <div
        className={cn(
          "relative flex items-center justify-center w-14 h-14 mb-4 rounded-lg",
          "bg-gradient-to-br from-white/20 to-white/5",
          "dark:from-white/10 dark:to-transparent",
          "transition-all duration-500 group-hover:shadow-glow-sm",
          isHovered ? "shadow-glow-sm dark:shadow-glow-md" : ""
        )}
      >
        <div className="text-emerald dark:text-celestial">{icon}</div>
        
        {/* Glow overlay */}
        <div
          className={cn(
            "absolute inset-0 rounded-lg transition-opacity duration-500",
            "bg-gradient-to-r from-emerald/20 to-celestial/20",
            "dark:from-mystical/20 dark:to-celestial/20",
            "opacity-0 blur-md",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Tech name */}
      <h3 className="text-lg font-medium mb-2 text-foreground">{name}</h3>

      {/* Proficiency bar */}
      <div className="w-full h-1.5 bg-gray-200/20 dark:bg-gray-700/20 rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            getProficiencyColor()
          )}
          style={{
            width: isInView ? `${proficiency * 10}%` : "0%",
          }}
        />
      </div>

      {/* Magical rune particles */}
      {renderRunes()}

      {/* Background glow effect */}
      <div
        className={cn(
          "absolute inset-0 rounded-xl transition-opacity duration-500",
          "bg-gradient-to-br from-emerald/5 to-celestial/5",
          "dark:from-mystical/5 dark:to-celestial/5",
          "opacity-0 blur-lg",
          isHovered ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
}
