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
  RadialLinearScale,
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
  Filler,
  RadialLinearScale
);

export const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#00ff41',
        font: {
          family: 'var(--font-jetbrains)',
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: '#00ff41',
      bodyColor: '#e0e0e0',
      borderColor: '#00ff41',
      borderWidth: 1,
    }
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(0, 255, 65, 0.1)',
      },
      ticks: {
        color: '#0d7a1e',
      }
    },
    y: {
      grid: {
        color: 'rgba(0, 255, 65, 0.1)',
      },
      ticks: {
        color: '#0d7a1e',
      }
    }
  }
};
