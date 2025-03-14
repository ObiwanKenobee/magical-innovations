
import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme | null;
    
    // Check for stored theme or user preference
    if (storedTheme) {
      setTheme(storedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    // Update the data-theme attribute on the documentElement
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem("theme", theme);
    
    // Add a transition animation when changing themes
    const transitionElement = document.createElement("div");
    transitionElement.className = 
      "fixed inset-0 z-[9999] bg-background transition-opacity duration-1000 pointer-events-none";
    
    if (theme === "dark") {
      transitionElement.style.opacity = "0";
      document.body.appendChild(transitionElement);
      
      // Fade in transition
      setTimeout(() => {
        transitionElement.style.opacity = "0.7";
        setTimeout(() => {
          transitionElement.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(transitionElement);
          }, 1000);
        }, 200);
      }, 0);
    } else {
      transitionElement.style.opacity = "0";
      document.body.appendChild(transitionElement);
      
      // Fade in transition
      setTimeout(() => {
        transitionElement.style.opacity = "0.5";
        setTimeout(() => {
          transitionElement.style.opacity = "0";
          setTimeout(() => {
            document.body.removeChild(transitionElement);
          }, 1000);
        }, 200);
      }, 0);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
