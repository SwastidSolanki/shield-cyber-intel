"use client";

import React, { useState, useEffect } from "react";

interface TextDecoderProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&*<>?/[]{}|~_";

/**
 * TextDecoder component: A high-tech 'hacker' style text reveal effect 
 * that progressively decrypts random characters into the final string.
 * 
 * @param text - The final string to reveal
 * @param className - Optional Tailwind CSS class names
 * @param delay - Milliseconds to wait before starting the animation
 */
export default function TextDecoder({ text, className = "", delay = 0 }: TextDecoderProps) {
  const [displayText, setDisplayText] = useState("");
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        let res = "";
        for (let i = 0; i < text.length; i++) {
          if (i < iteration) {
            res += text[i];
          } else {
            // Early phase (lower iteration) uses more symbols
            const currentSymbolSet = iteration < text.length / 2 
              ? characters.slice(text.length / 2) // favor symbols
              : characters;
            res += currentSymbolSet[Math.floor(Math.random() * currentSymbolSet.length)];
          }
        }
        setDisplayText(res);

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        setIteration((prev) => prev + 0.5);
      }, 15);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, iteration, delay]);

  return <span className={className}>{displayText || text.split("").map(() => " ").join("")}</span>;
}
