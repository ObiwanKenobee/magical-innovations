
import React, { useEffect, useRef, useState } from "react";
import AnimatedText from "../ui/AnimatedText";

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
    const handleScroll = () => {
      if (!sectionRef.current) return;
      
      const sectionTop = sectionRef.current.offsetTop;
      const sectionHeight = sectionRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Calculate how far through the section we've scrolled (0-1)
      const scrollPercentage = Math.min(
        Math.max(
          (scrollY - sectionTop + windowHeight / 2) /
            (sectionHeight - windowHeight / 2),
          0
        ),
        1
      );
      
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Journey milestones
  const milestones = [
    {
      year: "2014",
      title: "First Steps into Technology",
      description: "Began exploring the fundamentals of programming and web development, setting the foundation for a lifelong journey of innovation.",
    },
    {
      year: "2016",
      title: "Bachelor's Degree in Computer Science",
      description: "Graduated with honors, specializing in artificial intelligence and data structures, while exploring the philosophical underpinnings of technology.",
    },
    {
      year: "2018",
      title: "Software Engineer at TechVision",
      description: "Led development on innovative cloud-based solutions, integrating cutting-edge technology with intuitive user experiences.",
    },
    {
      year: "2020",
      title: "Master's in Religious Philosophy & Technology",
      description: "Completed interdisciplinary studies exploring the intersection of faith, ethics, and technological advancement.",
    },
    {
      year: "2022",
      title: "Founded Mystical Innovations",
      description: "Created a startup focused on developing software that brings enchantment to everyday digital experiences through thoughtful design and interaction.",
    },
    {
      year: "Present",
      title: "Innovating the Future",
      description: "Continuing to explore the magical possibilities at the intersection of technology, philosophy, and user experience.",
    },
  ];

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -inset-[100px] opacity-30 dark:opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-gradient-to-br from-emerald/10 via-transparent to-celestial/10 dark:from-mystical/10 dark:to-celestial/10 blur-3xl"></div>
        </div>
      </div>

      <div className="container max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-14">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 rounded-full text-primary dark:bg-primary/20">
            About Me
          </span>
          <AnimatedText
            text="My Enchanted Journey"
            tag="h2"
            className={`text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-foreground transition-all duration-700 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>

        {/* Personal bio */}
        <div className={`mb-16 transition-all duration-1000 delay-300 transform ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}>
          <div className="divine-card p-8 rounded-xl relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-playfair font-semibold mb-4 text-emerald dark:text-celestial">
                Innovator with a Magical Vision
              </h3>
              <div className="space-y-4 text-foreground/80">
                <p>
                  I am a software engineer and innovator who believes in the 
                  transformative power of technology when imbued with philosophical 
                  depth and magical creativity. My journey bridges the realms of 
                  rigorous technical expertise and the enchanting possibilities of 
                  imagination.
                </p>
                <p>
                  With a background spanning computer science, religious philosophy, 
                  and a lifelong fascination with magical narratives, I bring a unique 
                  perspective to software development. I believe that truly 
                  revolutionary technology should feel like magic—intuitive, 
                  delightful, and seemingly impossible until experienced.
                </p>
                <p>
                  My approach combines technical excellence with a deep appreciation 
                  for the user's emotional journey. Every line of code I write aims 
                  to create not just functional software, but experiences that 
                  inspire wonder and revelation.
                </p>
              </div>
            </div>

            {/* Subtle magical embellishments */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald/5 to-celestial/5 dark:from-mystical/5 dark:to-celestial/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/5 to-transparent dark:from-gold/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Journey timeline */}
        <div className="relative">
          {/* Timeline line with animated progress */}
          <div className="absolute left-[15px] md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200/30 dark:bg-gray-700/30 -translate-x-1/2">
            <div 
              className="absolute top-0 left-0 w-full bg-emerald dark:bg-celestial transition-all duration-300 ease-out"
              style={{ height: `${scrollProgress * 100}%` }}
            ></div>
          </div>

          {/* Timeline entries */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              // Calculate if this milestone should be revealed based on scroll progress
              const shouldReveal = scrollProgress >= (index / (milestones.length - 0.5));
              
              return (
                <div 
                  key={index}
                  className={`relative flex flex-col md:flex-row items-start
                    transition-all duration-700 ease-in-out
                    ${shouldReveal ? "opacity-100" : "opacity-20 blur-sm pointer-events-none"}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Year marker */}
                  <div className={`relative z-10 flex items-center justify-center min-w-[100px] md:w-1/2 md:justify-end md:pr-10 mb-4 md:mb-0`}>
                    <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-emerald/10 text-emerald dark:bg-celestial/10 dark:text-celestial">
                      {milestone.year}
                    </span>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-[15px] md:left-1/2 top-1 w-4 h-4 rounded-full bg-white border-2 border-emerald dark:border-celestial -translate-x-1/2 z-10"></div>
                  
                  {/* Content */}
                  <div className={`pl-10 md:pl-10 md:w-1/2`}>
                    <div className="divine-card p-6 rounded-lg">
                      <h4 className="text-lg font-playfair font-semibold mb-2 text-foreground">
                        {milestone.title}
                      </h4>
                      <p className="text-sm text-foreground/70">
                        {milestone.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
