import { useState, useEffect, useRef } from "react";
import { Terminal as TermIcon, ShieldAlert, Play, CheckCircle, ChevronRight, RefreshCw, Cpu } from "lucide-react";
import { SecurityAlert } from "../types";

export default function TerminalDemo() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([
    {
      id: "ALRT-409",
      timestamp: "08:02:11 UTC",
      sourceIp: "185.220.101.44",
      targetMachine: "db-srv-main.internal",
      type: "SQL Injection",
      severity: "CRITICAL",
      status: "OPEN",
      payload: "admin' OR '1'='1' --",
      mitigationLogs: [
        "Detecting single-quote nesting query validation escape...",
        "Identifying DB user role mapping: elevated-root-privileges",
        "Applying pre-compiled statement mitigation rules...",
        "Database firewall rule set: restricted inbound command sanitization.",
        "Compromised connection killed. DB system returned safety codes."
      ]
    },
    {
      id: "ALRT-112",
      timestamp: "08:03:45 UTC",
      sourceIp: "94.156.65.10",
      targetMachine: "web-staging-01.internal",
      type: "Brute Force",
      severity: "HIGH",
      status: "OPEN",
      payload: "SSH root login attempt failure #45 on port 22",
      mitigationLogs: [
        "Scanning audit.log for rapid sequence SSH authentication failures...",
        "Threshold reached: 30 attempts per minute exceeded from single source.",
        "Injecting dynamic IP block into standard iptables firewall configuration...",
        "Closing socket on remote interface. Threat mitigated."
      ]
    },
    {
      id: "ALRT-203",
      timestamp: "07:55:00 UTC",
      sourceIp: "10.0.4.15",
      targetMachine: "user-endpoint-corp.internal",
      type: "Malware Activity",
      severity: "CRITICAL",
      status: "OPEN",
      payload: "Executing background process in /tmp/sh.updater.py",
      mitigationLogs: [
        "Analyzing script hashes: MD5 checksum matches Ransomware family LockBit...",
        "Memory signature scanning detects encrypted file extensions looping...",
        "Isolating network adapter card remotely via internal VLAN configuration.",
        "Terminating parent PID 4410 and wiping malicious temporary assemblies.",
        "Incident fully resolved. VLAN network state reset."
      ]
    },
    {
      id: "ALRT-089",
      timestamp: "08:04:02 UTC",
      sourceIp: "135.18.29.98",
      targetMachine: "api-gateway.internal",
      type: "DDoS Attack",
      severity: "HIGH",
      status: "OPEN",
      payload: "Inbound SYN packet storm of 45,000 req/sec",
      mitigationLogs: [
        "HTTP connections limit exceeded threshold on API gateway load-balancer...",
        "Triggering rate-limiting rules: dropping packets with TTL < 54.",
        "Directing surplus traffic to Cloudflare server scrubbing centers...",
        "Inbound packet traffic rates returned to nominal levels (220 req/sec)."
      ]
    }
  ]);

  const [selectedAlert, setSelectedAlert] = useState<SecurityAlert>(alerts[0]);
  const [terminalLines, setTerminalLines] = useState<string[]>([
    "Sedhu's Mini SOC Alert Assistant [v1.4.2]",
    "Initializing secure local container...",
    "Telemetry parsing pipelines OPERATIONAL.",
    "Type 'help' to see active terminal commands, or select an alert to run playbooks.",
    ""
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollToBottom();
  }, [terminalLines]);

  const scrollToBottom = () => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const addTerminalLine = (line: string) => {
    setTerminalLines((prev) => [...prev, line]);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    addTerminalLine(`visitor@soc-helper:~$ ${cmd}`);

    if (trimmed === "help") {
      addTerminalLine("Available Commands:");
      addTerminalLine("  list            List all open telemetry security alerts");
      addTerminalLine("  analyze [id]    Audit and parse specific alert payload (e.g. analyze ALRT-409)");
      addTerminalLine("  mitigate [id]   Trigger autonomous response rules for selected threat");
      addTerminalLine("  clear           Wipe history terminals logs");
      addTerminalLine("  whoami          Display information about the system manager");
    } else if (trimmed === "clear") {
      setTerminalLines([]);
    } else if (trimmed === "whoami") {
      addTerminalLine(`Operator: Sedhu Madhavan`);
      addTerminalLine(`Role: Sentrix Cyber Club Vice President`);
      addTerminalLine(`Access: Level 5 Administrator // Security Incident Responder`);
    } else if (trimmed === "list") {
      addTerminalLine("SYSTEM REPORT: Active Unresolved Security Incidents:");
      alerts.forEach((a) => {
        addTerminalLine(`  [${a.id}] - ${a.type} - Severity: ${a.severity} (Status: ${a.status})`);
      });
    } else if (trimmed.startsWith("analyze ")) {
      const targetId = cmd.substring(8).trim().toUpperCase();
      const target = alerts.find((a) => a.id === targetId);
      if (target) {
        startAlertAnalysis(target);
      } else {
        addTerminalLine(`ERROR: Incident registry token matches no record: "${targetId}". Type 'list' for valid tokens.`);
      }
    } else if (trimmed.startsWith("mitigate ")) {
      const targetId = cmd.substring(9).trim().toUpperCase();
      const target = alerts.find((a) => a.id === targetId);
      if (target) {
        startMitigation(target);
      } else {
        addTerminalLine(`ERROR: Incident registry token matches no record: "${targetId}"`);
      }
    } else if (trimmed === "") {
      // do nothing
    } else {
      addTerminalLine(`soc-shell: command not found: "${cmd}". Type 'help' to review supported playbooks.`);
    }

    setInputValue("");
  };

  const startAlertAnalysis = (alert: SecurityAlert) => {
    if (isTyping) return;
    setIsTyping(true);
    setSelectedAlert(alert);

    let progressLines = [
      `[SOC DECODER] Initiating forensics review on token: ${alert.id}`,
      `[SOC DECODER] ISO Timestamp: ${alert.timestamp}`,
      `[SOC DECODER] Malicious payload extracted: "${alert.payload}"`,
      `[SOC DECODER] Source IP catalogued: ${alert.sourceIp} | Mapping geo-location data...`,
      `[SOC DECODER] Targeting local service element: ${alert.targetMachine}`,
      `[SOC DECODER] Evaluating CVSS Vector risk index: Severity set to ${alert.severity}`,
      `[SOC DECODER] MITRE ATT&CK Mapping confirmed. System state ready for mitigation.`,
      `>> Select alert and tap [DEPLOY PLAYBOOK] or command 'mitigate ${alert.id}'`
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < progressLines.length) {
        addTerminalLine(progressLines[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 150);
  };

  const startMitigation = (alert: SecurityAlert) => {
    if (isTyping) return;
    setIsTyping(true);

    const updatedAlerts = alerts.map((a) =>
      a.id === alert.id ? { ...a, status: "MITIGATED" as const } : a
    );
    setAlerts(updatedAlerts);

    let progressLines = [
      `[MITIGATION ENGINE] Launching containment scripts for ${alert.id}...`,
      `[MITIGATION ENGINE] Target Node Identified: ${alert.targetMachine}`,
      ...alert.mitigationLogs.map((log) => `[REMEDIATION] ${log}`),
      `[MITIGATION ENGINE] Flushing connections pools...`,
      `[MITIGATION ENGINE] Success. Security state returned to nominal levels (0.00% threats residual).`,
      `[MITIGATION ENGINE] Alert registry ${alert.id} set to STATUS: MITIGATED.`
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < progressLines.length) {
        addTerminalLine(progressLines[index]);
        index++;
      } else {
        clearInterval(interval);
        setIsTyping(false);
      }
    }, 180);
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 cyber-glow-cyan">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <TermIcon className="h-5 w-5 text-cyber-cyan" />
          <h3 className="font-display font-bold text-lg text-white">Mini SOC Alert Assistant</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-cyber-green animate-ping"></span>
          <span className="font-mono text-xs text-slate-400">SIEM FEED STREAMING ACTIVE</span>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 max-w-3xl">
        This interactive simulator models an automated Security Operations Center parser built using FastAPI. It maps inbound payloads directly to the <strong>MITRE ATT&CK framework</strong> and triggers custom remediation scripts dynamically. Select an alert from the SIEM feed to run incident response workflows.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Alerts Feed */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400 mb-2 px-1">
            <span>Inbound SIEM Telemetry</span>
            <span>{alerts.filter(a => a.status === "OPEN").length} Open Event(s)</span>
          </div>

          <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div
                key={alert.id}
                onClick={() => {
                  setSelectedAlert(alert);
                  startAlertAnalysis(alert);
                }}
                className={`p-4 rounded-lg border transition-all cursor-pointer ${
                  selectedAlert.id === alert.id
                    ? "bg-slate-800/80 border-cyber-cyan/50 shadow-md"
                    : "bg-slate-950/70 border-slate-800 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">{alert.id}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                        alert.severity === "CRITICAL"
                          ? "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                          : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                      }`}
                    >
                      {alert.severity}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] uppercase font-mono tracking-tight flex items-center gap-1 ${
                      alert.status === "MITIGATED"
                        ? "text-cyber-green"
                        : "text-amber-500 animate-pulse"
                    }`}
                  >
                    {alert.status === "MITIGATED" && <CheckCircle className="h-3 w-3" />}
                    {alert.status}
                  </span>
                </div>

                <div className="font-display font-medium text-white text-sm mb-1">{alert.type}</div>
                <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 mt-2">
                  <span>Src: {alert.sourceIp}</span>
                  <span>{alert.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard Interactive Terminal */}
        <div className="lg:col-span-7 flex flex-col h-[380px] bg-cyber-deep rounded-lg border border-slate-800 overflow-hidden shadow-inner">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between bg-slate-950 px-4 py-2 border-b border-slate-900">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">analyst@sentrix-soc:~</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                _id="btn-analyze-alert"
                onClick={() => startAlertAnalysis(selectedAlert)}
                disabled={isTyping}
                className="flex items-center gap-1 font-mono text-[10px] text-cyber-cyan bg-cyber-cyan/10 hover:bg-cyber-cyan/20 px-2 py-0.5 rounded border border-cyber-cyan/20 disabled:opacity-50"
              >
                <Cpu className="h-2.5 w-2.5 animate-spin" />
                Analyze AI
              </button>
              <button
                _id="btn-mitigate-alert"
                onClick={() => startMitigation(selectedAlert)}
                disabled={isTyping || selectedAlert.status === "MITIGATED"}
                className="flex items-center gap-1 font-mono text-[10px] text-cyber-green bg-cyber-green/10 hover:bg-cyber-green/20 px-2 py-0.5 rounded border border-cyber-green/20 disabled:opacity-50"
              >
                <Play className="h-2.5 w-2.5" />
                Deploy Playbook
              </button>
            </div>
          </div>

          {/* Terminal Logs Output */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-350 space-y-1.5">
            {terminalLines.map((line, i) => {
              let color = "text-slate-300";
              if (line.includes(" visitor@soc-helper:~$")) color = "text-cyber-cyan font-semibold";
              else if (line.includes("[ERROR]")) color = "text-rose-450";
              else if (line.includes("[MITIGATION ENGINE]")) color = "text-cyber-green font-bold";
              else if (line.includes("[REMEDIATION]")) color = "text-slate-400";
              else if (line.includes("[SOC DECODER]")) color = "text-cyber-cyan";
              else if (line.includes("ERROR:")) color = "text-rose-500 font-bold";
              else if (line.includes("Success.")) color = "text-cyber-green font-semibold";
              else if (line.includes("Operator:")) color = "text-emerald-400 font-semibold";

              return (
                <div key={i} className={`whitespace-pre-wrap ${color}`}>
                  {line}
                </div>
              );
            })}
            {isTyping && (
              <div className="flex items-center gap-1.5 text-cyber-cyan text-xs">
                <RefreshCw className="h-3 w-3 animate-spin text-cyber-cyan" />
                <span>Assistant reasoning pipeline executing...</span>
              </div>
            )}
            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Command Input */}
          <form
            id="form-terminal-command"
            onSubmit={(e) => {
              e.preventDefault();
              handleCommand(inputValue);
            }}
            className="flex items-center bg-slate-950 border-t border-slate-900 px-3 py-2"
          >
            <ChevronRight className="h-4 w-4 text-cyber-cyan flex-shrink-0" />
            <input
              type="text"
              id="input-terminal"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
              className="flex-1 ml-1 bg-transparent border-none outline-none font-mono text-xs text-white focus:ring-0 placeholder-slate-600 disabled:opacity-50"
              placeholder="Type security command (e.g., help, list, whoami)..."
              autoComplete="off"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
