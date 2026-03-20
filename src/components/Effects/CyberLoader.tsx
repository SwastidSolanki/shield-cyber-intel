"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Terminal } from 'lucide-react';

const CyberLoader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-10">
      <div className="relative">
        <motion.div 
          animate={{ 
            rotate: 360,
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="w-40 h-40 border-t-2 border-r-2 border-cyber-green/40 border-l-transparent border-b-transparent rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
          }}
          transition={{ 
            duration: 12, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className="absolute inset-4 border-b-2 border-l-2 border-white/10 border-t-transparent border-r-transparent rounded-full"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Shield className="text-cyber-green/40" size={32} />
        </div>
      </div>

      <div className="text-center space-y-3">
        <h3 className="font-display font-bold text-white text-xl tracking-widest uppercase">System Diagnosis</h3>
        <div className="flex items-center justify-center gap-3 font-mono text-[10px] text-white/30 uppercase tracking-[0.3em]">
          <Terminal size={14} />
          <span>Analyzing Neural Logs</span>
          <span className="w-1 h-3 bg-cyber-green/40 animate-pulse" />
        </div>
      </div>

      <div className="w-48 h-[2px] bg-white/5 rounded-full overflow-hidden relative">
        <motion.div 
          initial={{ left: "-100%" }}
          animate={{ left: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-cyber-green/40 to-transparent"
        />
      </div>
    </div>
  );
};

export default CyberLoader;
