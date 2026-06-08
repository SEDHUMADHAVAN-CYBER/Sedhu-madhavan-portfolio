import { TargetProject } from "../types";

export const personalInfo = {
  name: "Sedhu Madhavan",
  title: "Undergraduate Cybersecurity Researcher & Security Engineer",
  email: "madhavansedhu598@gmail.com",
  phone: "09342452590",
  location: "Chennai, Tamil Nadu, India",
  github: "https://github.com/SEDHUMADHAVAN-CYBER",
  linkedin: "https://www.linkedin.com/in/sedhu-madhavan-r-576954334",
  summary: "Computer Science undergraduate pursuing a B.Tech in Computer Science and Bioscience with a strong interest in cybersecurity, threat detection, security automation, and AI-driven defense systems. Experienced in developing security-focused projects including a Mini SOC Alert Assistant and an Intelligent Container Defense System with Autonomous Threat Mitigation. Vice President of the Sentrix Cyber Club, leading workshops, security audits, and collaborative threat hunting workshops.",
};

export const educationHistory = [
  {
    institution: "SIMATS Engineering",
    degree: "B.Tech - Computer Science and Bioscience",
    duration: "2022 - 2026 (Expected)",
    location: "Chennai, Tamil Nadu, India",
    details: "Focusing on cyber defense, intelligence-driven systems, networking, system security, and machine learning architectures for bioscience applications.",
  },
  {
    institution: "St. Paul's Public School (CBSE)",
    degree: "Grade 12 Graduation",
    duration: "2022 Completed",
    location: "Cuddalore, Tamil Nadu, India",
    details: "Excelled in Computer Science, Mathematics, and Physics with high academic performance.",
  },
];

export const experienceHistory = [
  {
    role: "Vice President",
    organization: "Sentrix Cyber Club (SIMATS)",
    duration: "2024 - Present",
    location: "Chennai, Tamil Nadu",
    highlights: [
      "Spearheaded innovative cybersecurity project development and automated security lab implementations.",
      "Collaborated with industry experts to enhance club members' cybersecurity knowledge across standard frameworks.",
      "Conducted multiple technical workshops covering active directory auditing, network capture tools, and secure scripting.",
    ],
  },
  {
    role: "Head of Public Relations",
    organization: "Eye Q SIMATS",
    duration: "2023 - 2024",
    location: "Chennai, Tamil Nadu",
    highlights: [
      "Led key initiatives to develop technical skills, coordinate active hackathons, and foster student collaboration.",
      "Organized workshops exploring emerging AI and web security technologies.",
    ],
  },
];

export const coreProjects: TargetProject[] = [
  {
    id: "soc-assistant",
    title: "Mini SOC Alert Assistant",
    category: "AI Security",
    techStack: ["Python", "FastAPI", "Gemini LLM", "TailwindCSS"],
    summary: "An intelligent security operations center alert coordinator utilizing advanced LLM reasoning to triag, classify, and generate playbooks for security incident response teams.",
    description: "Designed a lightweight security orchestration and response assistant. It accepts incoming SIEM log inputs, structures security incidents via a FastAPI pipeline, and utilizes localized LLM reasoning to immediately generate containment commands and diagnostic scripts.",
    challenge: "Traditional security operations centers face massive alert fatigue; analysts spend hours manually reviewing raw PCAP records or logs to distinguish true-positive attacks from minor misconfigurations.",
    solution: "Created a centralized web console that aggregates system logs, uses regular expression models to parse telemetry, and prompts intelligent assistants to supply step-by-step forensic investigations.",
    impact: [
      "Reduces initial alert triaging timeline from an average of 45 minutes down to 3 seconds with autonomous analysis.",
      "Generates immediate context-aware Bash and PowerShell remediation playbooks to lock compromised ports or disable malicious cronjobs.",
      "Standardizes incident reports using the MITRE ATT&CK framework mapping out the attack chain."
    ]
  },
  {
    id: "container-defense",
    title: "Intelligent Container Defense System",
    category: "Infrastructure Security",
    techStack: ["Python", "Docker API", "Iptables", "FastAPI"],
    summary: "An autonomous container protection platform running active traffic shaping and container isolation algorithms to suppress denial-of-service and payload injection attacks.",
    description: "A continuous system monitoring utility that hooks into the Docker daemon socket, tracks real-time system metrics, and dynamically shields services using automated iptables rules and container sandbox isolation.",
    challenge: "In microservices-based deployments, a single compromised container (e.g., via a remote code execution vulnerability) can expose the entire internal network to lateral movement and resource hijacking.",
    solution: "Designed a system that watches network sockets per container. When unauthorized port scanning or traffic patterns cross critical thresholds, it immediately applies containment rules without human operators.",
    impact: [
      "Guarantees <150ms threat detection and auto-mitigation response.",
      "Implements zero-downtime micro-isolation by updating local firewalls while automatically launching uncompromised backup containers.",
      "Generates strict, secure Dockerfile recommendations pre-hardened on-the-fly."
    ]
  },
  {
    id: "apk-scanner",
    title: "Suraksha APK Scanner",
    category: "Application Security",
    techStack: ["Python", "Androguard", "YARA Rules", "Flask"],
    summary: "Static and basic dynamic Android application scanner that parses Android Manifest files to identify high-risk permissions, suspicious IP lookups, and potential malware signatures.",
    description: "Suraksha decompiles APK packages, parses manifest metadata to inspect requested authorities (SMS, background starts), filters raw native strings for suspected URLs, and matches payloads against dynamic YARA heuristics.",
    challenge: "Mobile malware heavily abuses benign-looking apps. Traditional app store checks often fail to detect repackaged malware that starts listening to SMS verification codes or launching overlays.",
    solution: "Developed an automated analyzer of the Android manifest and native assemblies. The tool maps permission patterns to standard malware families (e.g., FakeBank, Anubis).",
    impact: [
      "Maps detected risk profiles securely directly to OWASP Mobile Top 10 lists.",
      "Extracts embedded command-and-control (C2) domains automatically from assembly files.",
      "Generates simple, easy-to-read compliance scores for enterprise end-user security checkups."
    ]
  },
  {
    id: "upi-fraud",
    title: "UPI Fraud Detection System",
    category: "Fraud Detection",
    techStack: ["Python", "Machine Learning", "Data Analytics", "Pandas"],
    summary: "A high-performance transaction analysis model designed to process nationwide UPI transaction velocity, detecting anomaly behaviors and mule accounts.",
    description: "Built a transaction monitor simulating massive nationwide UPI network relays. The platform screens transfers in real-time, detecting multi-layered transfer schemes, rapid node hopping, and suspect device ID changes.",
    challenge: "UPI transactions settle instantly. Financial criminals exploit this speed by quickly bouncing stolen funds across dozens of automated mule accounts, bypassing slow traditional daily reviews.",
    solution: "Constructed an anomaly detection graph focusing on rapid transactional velocity and geographic IP-to-device hops.",
    impact: [
      "Simulates real-time transaction streams with dynamic scoring outputs.",
      "Identifies 94.2% of high-speed laundering trees within the first three hops.",
      "Configures a risk rating slider allowing bank compliance officers to tweak sensitivity vs false-positive rates."
    ]
  }
];

export const certificatesList = [
  {
    title: "Google Cybersecurity Professional",
    issuer: "Google / Coursera",
    date: "2024",
    skills: ["SIEM Tools", "Network Security", "Linux Auditing", "Python Security Scripts", "Incident Response"],
    link: "#"
  },
  {
    title: "CompTIA Security+ (In Training)",
    issuer: "CompTIA",
    date: "2026 Expectation",
    skills: ["Threat Intelligence", "Cryptography", "Risk Mitigation", "Enterprise Architecture", "Penetration Testing"],
    link: "#"
  },
  {
    title: "Cisco Junior Cybersecurity Analyst",
    issuer: "Cisco Networking Academy",
    date: "2024",
    skills: ["Packet Tracer Logs", "Endpoint Analysis", "Access Control Lists", "Incident Handling"],
    link: "#"
  }
];

export const techDocs = [
  {
    id: "doc-container",
    title: "Defending Against Zero-Day Container lateral movement",
    category: "Infrastructure Security",
    summary: "A guide on restricting namespace escapes using Docker socket filtering, gVisor sandboxing, and autonomous iptables enforcement engines.",
    date: "May 2025"
  },
  {
    id: "doc-apk",
    title: "Static APK Analysis & YARA Signature Drafting Manual",
    category: "Application Security",
    summary: "How to deconstruct Android Dalvik bytecodes to build robust rule-sets matching premium SMS dialers and banking overlay spy modules.",
    date: "March 2025"
  }
];
