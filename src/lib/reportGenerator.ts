import { IncidentFormData } from '@/components/Report/IncidentForm';

export interface GeneratedReport {
  id: string;
  timestamp: string;
  generationTime: string;
  threatScore: number;
  executiveSummary: string;
  timeline: { time: string; event: string }[];
  technicalAnalysis: string;
  indicatorsOfCompromise: string[];
  recommendations: string[];
  originalData: IncidentFormData;
}

export const generateIncidentReport = async (data: IncidentFormData): Promise<GeneratedReport> => {
  const startTime = performance.now();
  
  // Simulate network delay / processing
  await new Promise(resolve => setTimeout(resolve, 2500));
  
  const id = `REP-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const timestamp = new Date().toLocaleString();
  
  // Heuristic analysis based on keywords and metadata
  const hasAuthFail = data.logs.toLowerCase().includes('auth_failure') || data.logs.toLowerCase().includes('unauthorized');
  const hasIp = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/.test(data.logs);
  const detectedIp = data.logs.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}/)?.[0] || 'Unknown Origin';
  
  let threatScore = 50;
  if (data.severity === 'Critical') threatScore = 95;
  else if (data.severity === 'High') threatScore = 80;
  else if (data.severity === 'Medium') threatScore = 60;
  else threatScore = 30;

  const executiveSummary = `This incident involves a ${data.type} attack targeting internal systems. Preliminary analysis indicates a ${data.severity} level threat with a calculated risk score of ${threatScore}/100. The primary vector appears to be ${data.type.toLowerCase()}, with suspicious activity originates from ${detectedIp}.`;

  const timeline = [
    { time: 'T-05:00', event: 'Initial anomaly detected by edge sensor' },
    { time: 'T-02:30', event: `Escalation to ${data.severity} status` },
    { time: 'T-00:45', event: 'Automated containment protocols initiated' },
    { time: 'T-00:00', event: 'Manual report generation triggered' }
  ];

  const iocs = [
    `IP: ${detectedIp}`,
    `HASH: ${Math.random().toString(16).substr(2, 40)}`,
    `USER_AGENT: MaliciousBot/v2.1`,
    `ENTRY_POINT: /api/v1/auth/internal`
  ];

  const recommendations = [
    `Immediately rotate all credentials associated with the target domain.`,
    `Implement geo-blocking for IP address ${detectedIp}.`,
    `Conduct a full audit of system logs for the past 48 hours.`,
    `Update firewall rules to strictly monitor traffic on affected segments.`
  ];

  const endTime = performance.now();
  const generationTime = ((endTime - startTime) / 1000).toFixed(2) + 's';

  return {
    id,
    timestamp,
    generationTime,
    threatScore,
    executiveSummary,
    timeline,
    technicalAnalysis: data.logs || 'No raw logs provided for technical deep-dive.',
    indicatorsOfCompromise: iocs,
    recommendations,
    originalData: data
  };
};
