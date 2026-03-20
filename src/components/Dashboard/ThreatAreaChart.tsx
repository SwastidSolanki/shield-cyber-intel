"use client";

import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { temporalThreatTrajectory } from '@/data/realWorldData';

const ThreatAreaChart = () => {
  return (
    <div className="cyber-panel p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border-white/5 h-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h4 className="text-white font-bold tracking-tight">Threat Trajectory</h4>
          <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">Temporal Volume Analysis</p>
        </div>
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={temporalThreatTrajectory}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorMalware" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#00ff41" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#00ff41" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorDDoS" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffaa00" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ffaa00" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10 }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{ backgroundColor: '#050a06', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff' }}
              itemStyle={{ fontSize: '10px' }}
            />
            <Area 
                type="monotone" 
                dataKey="Malware" 
                stroke="#00ff41" 
                fillOpacity={1} 
                fill="url(#colorMalware)" 
                strokeWidth={2}
            />
            <Area 
                type="monotone" 
                dataKey="DDoS" 
                stroke="#ffaa00" 
                fillOpacity={1} 
                fill="url(#colorDDoS)" 
                strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ThreatAreaChart;
