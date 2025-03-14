
import React, { useEffect, useState } from "react";
import AnimatedText from "../ui/AnimatedText";

export default function Hero() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [sparkleElements, setSparkleElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 300);

    // Generate random sparkle elements
    const numSparkles = 15;
    const newSparkles = Array.from({ length: numSparkles }).map((_, i) => {
      const size = Math.random() * 4 + 2;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 5;
      const animationDuration = Math.random() * 3 + 2;

      return (
        <div
          key={i}
          className="absolute rounded-full bg-white opacity-0 animate-pulse-soft"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            animationDelay: `${animationDelay}s`,
            animationDuration: `${animationDuration}s`,
            boxShadow: "0 0 8px 2px rgba(255, 255, 255, 0.3)",
          }}
        />
      );
    });

    setSparkleElements(newSparkles);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-20 pb-32">
      {/* Background gradient and effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-background opacity-80" />
        
        {/* Magical orbs/light effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald/10 dark:bg-celestial/10 blur-3xl transform -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-gold/10 dark:bg-mystical/10 blur-3xl transform translate-x-1/2 translate-y-1/2" />
        
        {/* Sparkles */}
        <div className="absolute inset-0 overflow-hidden">
          {sparkleElements}
        </div>
      </div>
      
      <div className="container max-w-5xl mx-auto z-10">
        <div className="flex flex-col items-center text-center">
          {/* Subtle badge/flourish */}
          <div 
            className={`inline-flex items-center px-3 py-1 mb-6 rounded-full 
              text-xs font-medium bg-white/10 backdrop-blur-md border border-white/20 
              text-foreground/80 dark:bg-black/20 dark:border-white/10
              transition-all duration-700 transform
              ${hasLoaded ? "opacity-100" : "opacity-0 -translate-y-4"}`}
          >
            <span className="relative inline-flex h-2 w-2 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald/70 dark:bg-celestial/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald dark:bg-celestial"></span>
            </span>
            Innovator & Software Engineer
          </div>
          
          {/* Main heading */}
          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight 
              tracking-tight transition-all duration-1000 
              ${hasLoaded ? "opacity-100" : "opacity-0 -translate-y-8"}`}
          >
            <AnimatedText 
              text="Eugene Ochako" 
              className="text-emerald dark:text-celestial" 
              delay={500}
            />
          </h1>
          
          {/* Subheading */}
          <h2 
            className={`text-lg md:text-xl font-medium max-w-3xl mb-8 text-foreground/80 
              transition-all duration-1000 delay-300 
              ${hasLoaded ? "opacity-100" : "opacity-0 -translate-y-8"}`}
          >
            Merging technology, religious philosophy, and the enchanting aesthetics
            of magical innovation to create extraordinary digital experiences.
          </h2>
          
          {/* CTA buttons */}
          <div 
            className={`flex flex-wrap items-center justify-center gap-4 transition-all duration-1000 delay-500
              ${hasLoaded ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <a 
              href="#projects" 
              className="relative overflow-hidden group px-6 py-3 rounded-lg bg-emerald hover:bg-emerald-light dark:bg-celestial dark:hover:bg-celestial-light text-white font-medium transition-all duration-300 hover:scale-[1.03]"
            >
              <span className="relative z-10">View My Work</span>
              <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              
              {/* Sparkles on hover */}
              {Array.from({ length: 5 }).map((_, i) => (
                <span 
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-70 group-hover:animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${3 + Math.random() * 4}s`
                  }}
                ></span>
              ))}
            </a>
            <a 
              href="#contact" 
              className="group px-6 py-3 rounded-lg border border-current text-emerald hover:text-emerald-light dark:text-celestial dark:hover:text-celestial-light font-medium transition-all duration-300 hover:scale-[1.03]"
            >
              Contact Me
              <span className="inline-block ml-2 transform group-hover:translate-x-1 transition-transform duration-300">
                →
              </span>
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div 
            className={`absolute bottom-12 left-1/2 transform -translate-x-1/2 
              transition-all duration-1000 delay-700 
              ${hasLoaded ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <div className="flex flex-col items-center">
              <span className="text-xs text-foreground/60 mb-2">Scroll to explore</span>
              <div className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center">
                <div className="w-1.5 h-1.5 bg-emerald dark:bg-celestial rounded-full animate-[bounce_2s_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
