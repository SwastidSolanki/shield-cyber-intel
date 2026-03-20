"use client";

import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { threatVectorMetrics } from '@/data/realWorldData';

const AttackRadarChart = () => {
  return (
    <div className="cyber-panel p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-white/5 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-white font-bold tracking-tight">Attack Vector Analysis</h4>
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">Cross-Perimeter Vulnerability</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={threatVectorMetrics}>
            <PolarGrid stroke="rgba(255,255,255,0.05)" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10, fontWeight: 'bold' }} 
            />
            <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
            <Radar
              name="Priority Alpha"
              dataKey="A"
              stroke="#00ff41"
              fill="#00ff41"
              fillOpacity={0.2}
            />
            <Radar
              name="Priority Beta"
              dataKey="B"
              stroke="#00ccff"
              fill="#00ccff"
              fillOpacity={0.2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex justify-center gap-6">
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-green" />
            <span className="text-[10px] text-white/60 font-mono">CRITICAL_INFRA</span>
         </div>
         <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-accent-blue" />
            <span className="text-[10px] text-white/60 font-mono">EDGE_SENSORS</span>
         </div>
      </div>
    </div>
  );
};

export default AttackRadarChart;
