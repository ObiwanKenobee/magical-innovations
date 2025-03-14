
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        emerald: {
          DEFAULT: "#0A5F38",
          light: "#12875a",
          dark: "#07422a",
        },
        celestial: {
          DEFAULT: "#3498db",
          light: "#5dade2",
          dark: "#2874a6",
        },
        gold: {
          DEFAULT: "#E6C200",
          light: "#FFD700",
          dark: "#B89000",
        },
        mystical: {
          DEFAULT: "#8A2BE2",
          light: "#9B59B6",
          dark: "#6A1B9A",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        "reveal": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "spell-cast": {
          "0%": { 
            transform: "scale(0.8)", 
            opacity: "0.3" 
          },
          "50%": { 
            transform: "scale(1.1)", 
            opacity: "0.7" 
          },
          "100%": { 
            transform: "scale(1)", 
            opacity: "1" 
          },
        },
        "glow": {
          "0%, 100%": { 
            textShadow: "0 0 5px rgba(255, 255, 255, 0.1), 0 0 10px rgba(255, 255, 255, 0.1)" 
          },
          "50%": { 
            textShadow: "0 0 5px rgba(255, 255, 255, 0.3), 0 0 20px rgba(255, 255, 255, 0.3), 0 0 35px rgba(255, 255, 255, 0.3)" 
          },
        },
        "page-transition-in": {
          "0%": { 
            opacity: "0", 
            transform: "translateY(20px)" 
          },
          "100%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
        },
        "page-transition-out": {
          "0%": { 
            opacity: "1", 
            transform: "translateY(0)" 
          },
          "100%": { 
            opacity: "0", 
            transform: "translateY(-20px)" 
          },
        },
        "shine": {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
        "reveal": "reveal 0.8s ease-out forwards",
        "spell-cast": "spell-cast 0.5s ease-out forwards",
        "glow": "glow 3s ease-in-out infinite",
        "page-in": "page-transition-in 0.5s ease-out forwards",
        "page-out": "page-transition-out 0.5s ease-out forwards",
        "shine": "shine 8s linear infinite",
      },
      backgroundSize: {
        "300%": "300%",
      },
      boxShadow: {
        "glow-sm": "0 0 10px rgba(255, 255, 255, 0.5)",
        "glow-md": "0 0 20px rgba(255, 255, 255, 0.5)",
        "glow-lg": "0 0 30px rgba(255, 255, 255, 0.5)",
        "glow-xl": "0 0 40px rgba(255, 255, 255, 0.5)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
