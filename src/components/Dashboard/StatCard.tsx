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
    <div className="cyber-panel p-6 rounded-lg transition-all duration-300">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2.5 bg-cyber-green/5 border border-cyber-green/10 rounded-lg text-cyber-green">
          {icon}
        </div>
        <div className={cn(
          "flex items-center gap-1 text-[10px] font-mono font-medium px-2 py-0.5 rounded-full",
          trend === 'up' ? "bg-red-500/10 text-red-400" : 
          trend === 'down' ? "bg-cyber-green/10 text-cyber-green" : 
          "bg-white/5 text-white/40"
        )}>
          {trend === 'up' ? <ArrowUpRight size={12} /> : 
           trend === 'down' ? <ArrowDownRight size={12} /> : 
           <Minus size={12} />}
          {trend === 'up' ? 'HIGH' : trend === 'down' ? 'LOW' : 'STABLE'}
        </div>
      </div>
      
      <div className="space-y-1">
        <p className="text-[10px] font-display font-semibold text-white/40 uppercase tracking-[0.15em]">{label}</p>
        <div className="flex items-baseline gap-1">
          <span ref={valueRef} className="text-3xl font-mono font-bold text-white tracking-tight">0</span>
        </div>
      </div>

      <div className="mt-4 h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, ease: "circOut" }}
          className={cn(
            "h-full origin-left",
            trend === 'up' ? "bg-red-500/40" : trend === 'down' ? "bg-cyber-green/40" : "bg-white/20"
          )}
        />
      </div>
    </div>
  );
};

export default StatCard;
