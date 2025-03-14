
import React, { useState, useEffect, useRef } from "react";
import AnimatedText from "../ui/AnimatedText";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission with a delay
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
      
      // Reset submitted state after showing success message
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  // Generate magical particles for the submit button
  const renderMagicalParticles = () => {
    return Array.from({ length: 15 }).map((_, i) => (
      <span
        key={i}
        className="absolute w-1 h-1 rounded-full bg-white opacity-0 transform scale-0"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: isSubmitting
            ? `float ${3 + Math.random() * 4}s ease-in-out infinite, 
               pulse-soft ${2 + Math.random() * 3}s ease-in-out infinite,
               scale-in 0.5s forwards`
            : "none",
          animationDelay: `${Math.random() * 0.5}s`,
        }}
      />
    ));
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 px-6 overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -inset-[100px] opacity-30 dark:opacity-20">
          <div className="absolute bottom-1/3 left-1/4 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-emerald/10 via-transparent to-gold/10 dark:from-celestial/10 dark:to-mystical/10 blur-3xl"></div>
          <div className="absolute top-1/4 right-1/3 w-[35%] h-[35%] rounded-full bg-gradient-to-tr from-celestial/10 via-transparent to-emerald/10 dark:from-gold/10 dark:to-transparent blur-3xl"></div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium bg-primary/10 rounded-full text-primary dark:bg-primary/20">
            Get In Touch
          </span>
          <AnimatedText
            text="Contact the Innovator"
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
            Have a project in mind or want to discuss innovative possibilities?
            Send me a message and let's create something magical together.
          </p>
        </div>

        {/* Contact form */}
        <div
          className={`relative transition-all duration-1000 delay-300 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="divine-card p-8 rounded-xl relative overflow-hidden">
            {isSubmitted ? (
              <div className="text-center py-10 px-6">
                <div className="w-16 h-16 rounded-full bg-emerald/10 dark:bg-celestial/10 flex items-center justify-center mx-auto mb-6 animate-reveal">
                  <svg
                    className="w-8 h-8 text-emerald dark:text-celestial"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-playfair font-semibold mb-3 text-emerald dark:text-celestial animate-reveal">
                  Message Sent Successfully!
                </h3>
                <p className="text-foreground/80 animate-reveal">
                  Thank you for reaching out. I'll respond to your inquiry as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground/90 mb-1"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 focus:border-emerald/30 dark:focus:border-celestial/30 text-foreground/90 transition-colors duration-300 focus:outline-none"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground/90 mb-1"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 focus:border-emerald/30 dark:focus:border-celestial/30 text-foreground/90 transition-colors duration-300 focus:outline-none"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-foreground/90 mb-1"
                    >
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 focus:border-emerald/30 dark:focus:border-celestial/30 text-foreground/90 transition-colors duration-300 focus:outline-none resize-none"
                      placeholder="I'd like to discuss a project..."
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={cn(
                        "relative w-full overflow-hidden group py-3 px-6 rounded-lg font-medium transition-all duration-300",
                        "bg-gradient-to-r from-emerald to-emerald-light dark:from-celestial dark:to-celestial-light text-white",
                        "hover:shadow-lg hover:shadow-emerald/20 dark:hover:shadow-celestial/20",
                        "disabled:opacity-70 disabled:cursor-not-allowed"
                      )}
                    >
                      <span className="relative z-10 flex items-center justify-center">
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Sending Message...
                          </>
                        ) : (
                          <>Send Message</>
                        )}
                      </span>

                      {/* Magical particles */}
                      {isSubmitting && renderMagicalParticles()}

                      {/* Hover effect */}
                      <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                </div>
              </form>
            )}

            {/* Subtle magical embellishments */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald/5 to-celestial/5 dark:from-mystical/5 dark:to-celestial/5 rounded-full blur-xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-gold/5 to-transparent dark:from-gold/5 rounded-full blur-xl translate-y-1/2 -translate-x-1/2"></div>
          </div>
        </div>

        {/* Alternative contact methods */}
        <div
          className={`mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 delay-500 transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="divine-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 rounded-full bg-emerald/10 dark:bg-celestial/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald dark:text-celestial"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Email</h3>
            <a
              href="mailto:eugene@example.com"
              className="text-emerald hover:text-emerald-light dark:text-celestial dark:hover:text-celestial-light transition-colors duration-300"
            >
              eugene@example.com
            </a>
          </div>

          <div className="divine-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 rounded-full bg-emerald/10 dark:bg-celestial/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald dark:text-celestial"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Social Media</h3>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald dark:hover:text-celestial transition-colors duration-300"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.457 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 14-7.503 14-14v-.617c.961-.689 1.8-1.56 2.46-2.548z"></path>
                </svg>
              </a>
              <a
                href="https://github.com/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald dark:hover:text-celestial transition-colors duration-300"
                aria-label="GitHub"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.083-.73.083-.73 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12"></path>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/example"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/70 hover:text-emerald dark:hover:text-celestial transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"></path>
                </svg>
              </a>
            </div>
          </div>

          <div className="divine-card p-6 rounded-xl flex flex-col items-center text-center">
            <div className="w-12 h-12 mb-4 rounded-full bg-emerald/10 dark:bg-celestial/10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-emerald dark:text-celestial"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium mb-2">Location</h3>
            <p className="text-foreground/80">
              Mountain View, California, USA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
