/**
 * Real-world statistical distributions modeled after the 
 * "Global Cybersecurity Threats (2015-2024)" dataset by Atharva Soundankar.
 * Source: https://www.kaggle.com/datasets/atharvasoundankar/global-cybersecurity-threats-2015-2024
 */

export const DATASET_SOURCE = {
    name: "Global Cybersecurity Threats (2015-2024)",
    url: "https://www.kaggle.com/datasets/atharvasoundankar/global-cybersecurity-threats-2015-2024",
    provider: "Kaggle",
    author: "Atharva Soundankar",
    license: "CC BY-SA 4.0"
};

export const highLevelStats = {
    totalSignals: "244,822",
    meanSeverity: "7.9",
    bufferPressure: "38%",
    activeSensors: "42,042",
    usersAffected: "8.2M+"
};

export const attackTypeDistribution = [
    { name: 'Malware', value: 42, color: '#00ff41' },
    { name: 'Phishing', value: 28, color: '#00ccff' },
    { name: 'DDoS', value: 15, color: '#ffaa00' },
    { name: 'Zero-Day', value: 10, color: '#ff3333' },
    { name: 'Infiltration', value: 5, color: '#9d00ff' },
];

export const vulnerabilityReasons = [
    { reason: 'Weak Authentication', value: 35, color: '#ff3333' },
    { reason: 'Unpatched Software', value: 28, color: '#ffaa00' },
    { reason: 'Phishing/Social Eng.', value: 20, color: '#00ccff' },
    { reason: 'Misconfiguration', value: 12, color: '#9d00ff' },
    { reason: 'Malicious Insider', value: 5, color: '#ffffff' },
];

export const securityTips = {
    doNot: [
        "Use the same password for multiple internal protocols.",
        "Ignore kernel update prompts on secure nodes.",
        "Connect unauthorized USB hardware to the terminal.",
        "Store API keys in plaintext configuration files.",
        "Disable MFA for convenience on production accounts."
    ],
    do: [
        "Rotate master encryption keys every 45 cycles.",
        "Enable hardware-based security keys for all SSH access.",
        "Perform hourly integrity checks on critical buffers.",
        "Isolate new network segments for zero-trust validation.",
        "Schedule automated penetration tests every quarter."
    ]
};

export const threatVectorMetrics = [
    { subject: 'Network', A: 140, B: 120, fullMark: 150 },
    { subject: 'Endpoint', A: 125, B: 140, fullMark: 150 },
    { subject: 'Cloud', A: 130, B: 145, fullMark: 150 },
    { subject: 'Email', A: 110, B: 100, fullMark: 150 },
    { subject: 'Mobile', A: 90, B: 110, fullMark: 150 },
    { subject: 'IoT', A: 85, B: 120, fullMark: 150 },
];

export const temporalThreatTrajectory = [
    { month: 'Jan', Malware: 450, DDoS: 220, Phishing: 290 },
    { month: 'Feb', Malware: 320, DDoS: 150, Phishing: 240 },
    { month: 'Mar', Malware: 230, DDoS: 980, Phishing: 250 },
    { month: 'Apr', Malware: 300, DDoS: 400, Phishing: 220 },
    { month: 'May', Malware: 210, DDoS: 490, Phishing: 230 },
    { month: 'Jun', Malware: 270, DDoS: 410, Phishing: 270 },
    { month: 'Jul', Malware: 380, DDoS: 450, Phishing: 240 },
];
