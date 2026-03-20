"use client";

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { topAttacks } from '@/data/cyberAttackData';
import { chartDefaults, cyberColors } from '@/lib/ChartsConfig';

const AttackBarChart: React.FC = () => {
    const data = {
        labels: topAttacks.map(a => a.type),
        datasets: [
            {
                label: 'Signal Intensity',
                data: topAttacks.map(a => a.count),
                backgroundColor: topAttacks.map(a => 
                    a.severity === 'Critical' ? 'rgba(255, 51, 51, 0.3)' : 
                    a.severity === 'High' ? 'rgba(255, 170, 0, 0.3)' : 
                    'rgba(0, 255, 65, 0.2)'
                ),
                borderColor: topAttacks.map(a => 
                    a.severity === 'Critical' ? '#ff3333' : 
                    a.severity === 'High' ? '#ffaa00' : 
                    '#00ff41'
                ),
                borderWidth: 1,
                borderRadius: 6,
                hoverBackgroundColor: cyberColors.primary,
            },
        ],
    };

    const options = {
        ...chartDefaults,
        indexAxis: 'y' as const,
        plugins: {
            ...chartDefaults.plugins,
            title: {
                display: true,
                text: 'CRITICAL ATTACK VECTORS',
                color: '#fff',
                font: { size: 14, family: 'Space Grotesk', weight: 'bold' as any },
                padding: { bottom: 20 },
                align: 'start' as const,
            },
        },
    };

    return (
        <div className="cyber-panel p-8 rounded-2xl h-80">
            <Bar data={data} options={options} />
        </div>
    );
};

export default AttackBarChart;
