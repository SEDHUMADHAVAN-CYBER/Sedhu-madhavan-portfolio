export interface TargetProject {
  id: string;
  title: string;
  category: "AI Security" | "Application Security" | "Infrastructure Security" | "Fraud Detection";
  techStack: string[];
  summary: string;
  description: string;
  challenge: string;
  solution: string;
  impact: string[];
}

export interface SecurityAlert {
  id: string;
  timestamp: string;
  sourceIp: string;
  targetMachine: string;
  type: "Brute Force" | "SQL Injection" | "Malware Activity" | "DDoS Attack" | "Exfiltration";
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "INVESTIGATING" | "MITIGATED";
  payload: string;
  mitigationLogs: string[];
}

export interface ContainerStatus {
  id: string;
  name: string;
  ip: string;
  cpu: string;
  memory: string;
  status: "Healthy" | "Under Attack" | "Isolating" | "Restarted" | "Offline";
  threatScore: number;
  logs: string[];
}

export interface ApkMalwareReport {
  fileName: string;
  fileSize: string;
  sha256: string;
  package: string;
  threatLevel: "SAFE" | "SUSPICIOUS" | "MALICIOUS";
  threatScore: number;
  permissions: {
    name: string;
    description: string;
    dangerous: boolean;
  }[];
  suspiciousStrings: string[];
  recommendation: string;
  decompiledSnippet: string;
}

export interface UpiTransaction {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  timestamp: string;
  ipAddress: string;
  deviceId: string;
  riskScore: number;
  status: "APPROVED" | "FLAGGED" | "BLOCKED";
  reasons: string[];
}
