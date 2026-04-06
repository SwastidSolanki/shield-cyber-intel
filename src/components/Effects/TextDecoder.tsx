"use client";

import React, { useState, useEffect } from "react";

interface TextDecoderProps {
  text: string;
  className?: string;
  delay?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";

export default function TextDecoder({ text, className = "", delay = 0 }: TextDecoderProps) {
  const [displayText, setDisplayText] = useState("");
  const [iteration, setIteration] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText((prev) => {
          return text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return characters[Math.floor(Math.random() * characters.length)];
            })
            .join("");
        });

        if (iteration >= text.length) {
          clearInterval(interval);
        }

        setIteration((prev) => prev + 1 / 3);
      }, 30);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, iteration, delay]);

  return <span className={className}>{displayText || text.split("").map(() => " ").join("")}</span>;
}
