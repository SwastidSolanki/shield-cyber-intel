"use client";

import React from 'react';
import { securityTips } from '@/data/realWorldData';
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react';

const DefenseTips = () => {
    return (
        <div className="cyber-panel p-6 rounded-2xl border-cyber-green/20 bg-cyber-green/5 h-full">
            <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-cyber-green" size={20} />
                <h4 className="text-white font-bold tracking-tight">System Safety Protocols</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* DO NOT */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-red-500/80 mb-2">
                        <XCircle size={14} />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Critical Failures</span>
                    </div>
                    {securityTips.doNot.map((tip, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-relaxed group">
                            <span className="text-red-500/40 font-mono mt-1 group-hover:text-red-500 transition-colors">ERR_{idx+1}</span>
                            <span className="text-white/70 group-hover:text-white transition-colors">{tip}</span>
                        </div>
                    ))}
                </div>

                {/* DO */}
                <div className="space-y-4">
                    <div className="flex items-center gap-2 text-cyber-green/80 mb-2">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-mono font-bold tracking-[0.2em] uppercase">Security Protocol</span>
                    </div>
                    {securityTips.do.map((tip, idx) => (
                        <div key={idx} className="flex gap-3 text-xs leading-relaxed group">
                            <span className="text-cyber-green/40 font-mono mt-1 group-hover:text-cyber-green transition-colors">SAFE_{idx+1}</span>
                            <span className="text-white/70 group-hover:text-white transition-colors">{tip}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DefenseTips;
