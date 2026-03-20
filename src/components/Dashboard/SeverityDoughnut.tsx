"use client";

import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { severitySummary } from '@/data/cyberAttackData';
import { chartDefaults } from '@/lib/ChartsConfig';

const SeverityDoughnut: React.FC = () => {
    const data = {
        labels: Object.keys(severitySummary),
        datasets: [
            {
                data: Object.values(severitySummary),
                backgroundColor: [
                    'rgba(255, 170, 0, 0.2)', // Medium
                    'rgba(0, 255, 65, 0.2)',   // Low
                    'rgba(255, 51, 51, 0.3)', // Critical
                    'rgba(255, 170, 0, 0.5)', // High (accented)
                ],
                borderColor: [
                    '#ffaa00',
                    '#00ff41',
                    '#ff3333',
                    '#ffaa00',
                ],
                borderWidth: 1,
                offset: 5,
                hoverOffset: 15,
            },
        ],
    };

    const options = {
        ...chartDefaults,
        cutout: '75%',
        plugins: {
            ...chartDefaults.plugins,
            title: {
                display: false, // Moved title to outer container for pure centering
            },
        },
    };

    const total = Object.values(severitySummary).reduce((a, b) => a + b, 0);

    return (
        <div className="cyber-panel p-6 rounded-2xl h-80 relative flex flex-col">
            <h3 className="text-sm font-sans font-bold text-white tracking-widest uppercase mb-2">Threat Distribution</h3>
            
            <div className="flex-grow relative flex items-center justify-center">
                <div className="w-full h-full max-w-[210px] max-h-[210px] relative">
                    <Doughnut data={data} options={options} />
                </div>
            </div>
        </div>
    );
};

export default SeverityDoughnut;
