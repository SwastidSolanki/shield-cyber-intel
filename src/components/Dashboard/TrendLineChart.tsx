"use client";

import React from 'react';
import { Line } from 'react-chartjs-2';
import { monthlyTrends } from '@/data/cyberAttackData';
import { chartDefaults, cyberColors } from '@/lib/ChartsConfig';

const TrendLineChart: React.FC = () => {
    const data = {
        labels: monthlyTrends.labels,
        datasets: [
            {
                label: 'Incursion Velocity',
                data: monthlyTrends.datasets[0].data,
                borderColor: '#00ff41',
                backgroundColor: 'rgba(0, 255, 65, 0.05)',
                borderWidth: 2,
                pointBackgroundColor: '#00ff41',
                pointBorderColor: '#fff',
                pointHoverRadius: 6,
                tension: 0.4,
                fill: true,
            },
        ],
    };

    const options = {
        ...chartDefaults,
        plugins: {
            ...chartDefaults.plugins,
            title: {
                display: true,
                text: 'SYSTEM THREAT TREND (LTM)',
                color: '#fff',
                font: { size: 14, family: 'Space Grotesk', weight: 'bold' as any },
                padding: { bottom: 20 },
                align: 'start' as const,
            },
        },
    };

    return (
        <div className="cyber-panel p-8 rounded-2xl h-80">
            <Line data={data} options={options} />
        </div>
    );
};

export default TrendLineChart;
