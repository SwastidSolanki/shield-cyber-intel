"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
  Filler
);

// Modern Dynamic Theme for Chart.js
export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        color: 'rgba(255, 255, 255, 0.4)',
        font: {
          family: "Space Grotesk, sans-serif",
          size: 11,
          weight: 'bold' as any,
        },
        padding: 20,
        usePointStyle: true,
        pointStyle: 'rectRounded',
      },
    },
    tooltip: {
      backgroundColor: 'rgba(5, 10, 6, 0.95)',
      titleColor: '#00ff41',
      bodyColor: '#ffffff',
      borderColor: 'rgba(0, 255, 65, 0.1)',
      borderWidth: 1,
      padding: 12,
      cornerRadius: 12,
      titleFont: {
        family: "Space Grotesk, sans-serif",
        size: 14,
        weight: 'bold' as any,
      },
      bodyFont: {
        family: "Space Grotesk, sans-serif",
        size: 13,
      },
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 255, 65, 0.04)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.3)',
        font: {
          family: "Space Grotesk, sans-serif",
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(0, 255, 65, 0.04)',
      },
      ticks: {
        color: 'rgba(255, 255, 255, 0.3)',
        font: {
          family: "Space Grotesk, sans-serif",
          size: 11,
        },
      },
    },
  },
};

export const cyberColors = {
  primary: '#00ff41',
  primaryMuted: 'rgba(0, 255, 65, 0.2)',
  accentRed: '#ff3333',
  accentAmber: '#ffaa00',
  surface: '#0a110b',
  textMuted: 'rgba(255, 255, 255, 0.4)',
};
