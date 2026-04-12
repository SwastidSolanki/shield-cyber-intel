"use client";

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';

interface StatCardProps {
  label: string;
  value: string;
  trend: 'up' | 'down' | 'stable';
  icon: React.ReactNode;
}

/**
 * StatCard component for displaying high-level security metrics with 
 * interactive hover effects, trend indicators, and animated progress bars.
 * 
 * @param label - The label for the metric
 * @param value - The numeric value to display
 * @param trend - 'up', 'down', or 'stable' to dictate styling and context
 * @param icon - Lucide icon component to display
 */
const StatCard: React.FC<StatCardProps> = ({ label, value, trend, icon }) => {
  const valueRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''));
  const suffix = value.replace(/[0-9., ]/g, '');

  useEffect(() => {
    if (valueRef.current && !isNaN(numericValue)) {
      gsap.to(valueRef.current, {
        innerText: numericValue,
        duration: 2,
        snap: { innerText: 1 },
        ease: "power2.out",
        onUpdate: function() {
           if (valueRef.current) {
             const val = Math.floor(parseFloat(this.targets()[0].innerText));
             valueRef.current.innerText = val.toLocaleString() + suffix;
           }
        }
      });
    }
  }, [numericValue, suffix]);

  return (
    <div 
      title={`Security telemetry for ${label}`}
      className="cyber-panel p-6 rounded-xl transition-all duration-300 group relative overflow-hidden"
    >
      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 w-8 h-8 opacity-20 group-hover:opacity-100 transition-opacity pointer-events-none">
        <div className="absolute top-0 right-0 w-px h-4 bg-cyber-green" />
        <div className="absolute top-0 right-0 w-4 h-px bg-cyber-green" />
      </div>

      <div className="flex justify-between items-start mb-4 relative z-10">
        <div className="p-3 bg-cyber-green/5 border border-cyber-green/10 rounded-xl text-cyber-green group-hover:shadow-[0_0_15px_rgba(0,255,65,0.2)] group-hover:rotate-[360deg] transition-all duration-700">
          {icon}
        </div>
        <div 
          aria-label={`Security trend: ${trend === 'up' ? 'Critical increase' : trend === 'down' ? 'Controlled reduction' : 'Nominal stable'}`}
          className={cn(
          "flex items-center gap-1.5 text-[10px] font-mono font-bold px-2.5 py-1 rounded-md border",
          trend === 'up' ? "bg-red-500/10 text-red-400 border-red-500/20" : 
          trend === 'down' ? "bg-cyber-green/10 text-cyber-green border-cyber-green/20" : 
          "bg-white/5 text-white/40 border-white/10"
        )}>
          {trend === 'up' ? <ArrowUpRight size={12} className="animate-pulse" /> : 
           trend === 'down' ? <ArrowDownRight size={12} className="animate-pulse" /> : 
           <Minus size={12} />}
          {trend === 'up' ? 'CRITICAL' : trend === 'down' ? 'REDUCED' : 'NOMINAL'}
        </div>
      </div>
      
      <div className="space-y-1 relative z-10">
        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.2em]">{label}</p>
        <div className="flex items-baseline gap-1">
          <span ref={valueRef} className="text-4xl font-mono font-bold text-white tracking-tighter group-hover:glow-text-green transition-all duration-500">0</span>
        </div>
      </div>

      <div className="mt-6 h-1 w-full bg-white/5 rounded-full overflow-hidden relative z-10">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.8, ease: "circOut" }}
          className={cn(
            "h-full origin-left relative",
            trend === 'up' ? "bg-red-500/40" : trend === 'down' ? "bg-cyber-green/40" : "bg-white/20"
          )}
        >
          {/* Scanning light effect on the progress bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-20 animate-[scanline_2s_linear_infinite]" />
        </motion.div>
      </div>
      
      {/* Subtle bottom-right label */}
      <div className="absolute bottom-2 right-3 opacity-[0.03] font-mono text-[8px] uppercase tracking-widest pointer-events-none group-hover:opacity-10 transition-opacity">
        Shield_Intel_v2.0
      </div>
    </div>
  );
};

export default StatCard;