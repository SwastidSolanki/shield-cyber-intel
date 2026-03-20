"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Terminal, Zap } from 'lucide-react';
import Link from 'next/link';

const Header: React.FC = () => {
    const [text, setText] = useState('');
    const fullText = "CORE_SYSTEM_v4.2: OPERATIONAL // DEFENSE_GRID_SYNCED";

    useEffect(() => {
        let i = 0;
        const interval = setInterval(() => {
            setText(fullText.slice(0, i));
            i++;
            if (i > fullText.length) {
                clearInterval(interval);
            }
        }, 50);
        return () => clearInterval(interval);
    }, []);

    const { scrollY } = useScroll();
    
    // Cool animation transforms: 
    // Fades out and slides up as you scroll down
    const opacity = useTransform(scrollY, [0, 100], [1, 0]);
    const translateY = useTransform(scrollY, [0, 100], [0, -20]);
    const scale = useTransform(scrollY, [0, 100], [1, 0.98]);

    return (
        <motion.header 
            style={{ opacity, y: translateY, scale }}
            className="py-4 md:py-8 px-6 lg:px-12 border-b border-cyber-green/10 bg-cyber-black/80 backdrop-blur-xl fixed top-0 left-0 right-0 z-50 pointer-events-none sm:pointer-events-auto overflow-hidden"
        >
            {/* Scanline Effect */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,255,65,0.5)_50%)] bg-[length:100%_4px] animate-[scanline_10s_linear_infinite]" />
            
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-stretch md:items-center gap-6 relative z-10">
                <Link href="/" className="group block relative">
                    <motion.div
                        whileHover={{ skewX: -5, scale: 1.02 }}
                        className="relative"
                    >
                        <motion.h1 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="text-3xl md:text-5xl font-sans font-bold text-white mb-1 tracking-tighter group-hover:text-cyber-green transition-all duration-300 relative z-10"
                        >
                            SHIELD
                        </motion.h1>
                        {/* Ghost/Glitch effect on hover */}
                        <div className="absolute inset-0 text-cyber-green opacity-0 group-hover:opacity-40 blur-sm translate-x-1 -z-10 transition-opacity">SHIELD</div>
                    </motion.div>
                    <div className="flex items-center text-cyber-green/60 font-mono text-[9px] md:text-[10px] gap-2">
                        <Terminal size={12} className="text-cyber-green animate-pulse" />
                        <span className="tracking-[0.2em] uppercase">{text}</span>
                    </div>
                </Link>

                <div className="flex items-center justify-between md:justify-end gap-3 md:gap-8 flex-1">
                    <div className="flex items-center gap-3 px-4 py-2 bg-cyber-green/5 border border-cyber-green/20 rounded-lg group hover:bg-cyber-green/10 transition-colors">
                        <div className="relative">
                            <Shield size={18} className="text-cyber-green" />
                            <div className="absolute inset-0 bg-cyber-green/20 blur-md animate-pulse rounded-full" />
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[9px] uppercase font-mono text-white/40 leading-none mb-1">Status</p>
                            <p className="text-[10px] md:text-xs font-mono text-cyber-green font-bold">ENCRYPTED</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 px-4 py-2 bg-cyber-accent-amber/5 border border-cyber-accent-amber/20 rounded-lg group hover:bg-cyber-accent-amber/10 transition-colors">
                        <div className="relative">
                            <Zap size={18} className="text-cyber-accent-amber animate-[pulse_1s_infinite]" />
                            <div className="absolute inset-0 bg-cyber-accent-amber/20 blur-md rounded-full" />
                        </div>
                        <div className="text-left md:text-right">
                            <p className="text-[9px] uppercase font-mono text-white/40 leading-none mb-1">Defense_Posture</p>
                            <p className="text-[10px] md:text-xs font-mono text-cyber-accent-amber font-bold">REINFORCED</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.header>
    );
};

export default Header;
