export interface AttackData {
  id: string;
  type: string;
  count: number;
  severity: 'Critical' | 'High' | 'Medium' | 'Low';
  trend: 'up' | 'down' | 'stable';
  avgResponseTime: string;
  impactScore: number;
}

export const topAttacks: AttackData[] = [
  { id: '1', type: 'Phishing', count: 1240, severity: 'High', trend: 'up', avgResponseTime: '4.2h', impactScore: 85 },
  { id: '2', type: 'Ransomware', count: 450, severity: 'Critical', trend: 'up', avgResponseTime: '12.5h', impactScore: 98 },
  { id: '3', type: 'DDoS', count: 890, severity: 'High', trend: 'stable', avgResponseTime: '1.5h', impactScore: 75 },
  { id: '4', type: 'SQL Injection', count: 620, severity: 'Medium', trend: 'down', avgResponseTime: '2.8h', impactScore: 60 },
  { id: '5', type: 'XSS', count: 540, severity: 'Medium', trend: 'down', avgResponseTime: '1.2h', impactScore: 45 },
  { id: '6', type: 'Credential Stuffing', count: 710, severity: 'High', trend: 'up', avgResponseTime: '3.5h', impactScore: 70 },
  { id: '7', type: 'Zero-Day Exploit', count: 120, severity: 'Critical', trend: 'up', avgResponseTime: '24h+', impactScore: 100 },
  { id: '8', type: 'MitM', count: 320, severity: 'Medium', trend: 'stable', avgResponseTime: '5.1h', impactScore: 55 },
];

export const monthlyTrends = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Total Incidents',
      data: [650, 780, 720, 890, 950, 1100, 1050, 1200, 1350, 1280, 1450, 1600],
    },
    {
      label: 'Critical Threats',
      data: [120, 150, 140, 180, 210, 240, 220, 260, 310, 290, 340, 380],
    }
  ]
};

export const severitySummary = {
  Critical: 15,
  High: 35,
  Medium: 30,
  Low: 20
};

export const attackVectors = {
  labels: ['Email', 'Web Server', 'Endpoint', 'Cloud Storage', 'Network', 'External Media'],
  data: [45, 25, 15, 8, 5, 2]
};

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchIncidentData = async () => {
  await sleep(1500); // Simulate network latency
  return {
    topAttacks,
    monthlyTrends,
    severitySummary,
    attackVectors
  };
};
