
import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full transition-all duration-500 
      bg-background/20 backdrop-blur-md border border-white/10 hover:border-white/30
      dark:border-white/5 dark:hover:border-white/20 group"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
        <Sun
          className={`transition-all duration-500 absolute ${
            theme === "dark"
              ? "opacity-0 translate-y-6 rotate-90"
              : "opacity-100 rotate-0"
          } text-gold`}
          size={18}
        />
        <Moon
          className={`transition-all duration-500 absolute ${
            theme === "light"
              ? "opacity-0 -translate-y-6 -rotate-90"
              : "opacity-100 rotate-0"
          } text-celestial`}
          size={18}
        />
      </div>
      <span className="sr-only">
        {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
      </span>

      {/* Illuminating glow effect on hover */}
      <span
        className={`absolute inset-0 rounded-full transition-opacity duration-300 
        ${theme === "light" ? "bg-gold" : "bg-celestial"} opacity-0 
        group-hover:opacity-20 blur-md -z-10`}
      ></span>
    </button>
  );
}
