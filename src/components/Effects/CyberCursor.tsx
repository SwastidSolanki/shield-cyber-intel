"use client";

import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function CyberCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs for that "trailing" effect
  const springConfig = { damping: 28, stiffness: 180 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      document.body.addEventListener("mouseenter", handleMouseEnter);
      document.body.addEventListener("mouseleave", handleMouseLeave);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
    };
  }, [mouseX, mouseY, isVisible, isMobile]);

  if (isMobile || !isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Ring */}
      <motion.div
        className="absolute w-12 h-12 border border-cyber-green/30 rounded-full flex items-center justify-center backdrop-blur-[2px]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <div className="absolute inset-0 rounded-full border border-cyber-green/10 animate-ping opacity-20" />
        {/* Scanning Reticle Lines */}
        <div className="w-1 h-[1px] bg-cyber-green absolute left-0" />
        <div className="w-1 h-[1px] bg-cyber-green absolute right-0" />
        <div className="h-1 w-[1px] bg-cyber-green absolute top-0" />
        <div className="h-1 w-[1px] bg-cyber-green absolute bottom-0" />
      </motion.div>

      {/* Inner Dot with Glow */}
      <motion.div
        className="absolute w-1.5 h-1.5 bg-cyber-green rounded-full"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          boxShadow: "0 0 10px #00ff41",
        }}
      />
    </div>
  );
}
