
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  tag?: keyof JSX.IntrinsicElements;
  delay?: number;
  direction?: "top" | "bottom" | "left" | "right";
  animationDuration?: number;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
}

export default function AnimatedText({
  text,
  className = "",
  tag = "h2",
  delay = 0,
  direction = "bottom",
  animationDuration = 0.5,
  staggerDelay = 0.03,
  threshold = 0.1,
  once = true,
}: AnimatedTextProps) {
  // Create a ref that's properly typed for the specified element
  const textRef = useRef<HTMLElement | null>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!textRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!once || !hasAnimated.current)) {
            hasAnimated.current = true;
            animateText();
          }
        });
      },
      { threshold }
    );

    observer.observe(textRef.current);

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
    };
  }, [once, threshold, text]);

  const animateText = () => {
    if (!textRef.current) return;

    const spans = textRef.current.querySelectorAll("span");
    spans.forEach((span, index) => {
      setTimeout(() => {
        span.style.opacity = "1";
        span.style.transform = "translateY(0)";
      }, delay + index * (staggerDelay * 1000));
    });
  };

  // Split the text into individual characters with spans
  const renderText = () => {
    return text.split("").map((char, index) => {
      let initialTransform = "";

      switch (direction) {
        case "top":
          initialTransform = "translateY(-20px)";
          break;
        case "bottom":
          initialTransform = "translateY(20px)";
          break;
        case "left":
          initialTransform = "translateX(-20px)";
          break;
        case "right":
          initialTransform = "translateX(20px)";
          break;
      }

      return (
        <span
          key={`${char}-${index}`}
          style={{
            display: "inline-block",
            opacity: 0,
            transform: initialTransform,
            transition: `opacity ${animationDuration}s ease, transform ${animationDuration}s ease`,
            transitionDelay: `${index * staggerDelay}s`,
          }}
          aria-hidden="true"
        >
          {char === " " ? "\u00A0" : char}
        </span>
      );
    });
  };

  // Use createElement to properly apply the ref to the dynamic element
  return React.createElement(
    tag,
    {
      ref: textRef,
      className: cn("inline-block leading-tight", className),
      "aria-label": text,
    },
    renderText()
  );
}
