import { useState, useEffect } from "react";
import { Server, Activity, ShieldAlert, Shield, Zap, RefreshCw, Layers } from "lucide-react";
import { ContainerStatus } from "../types";

export default function ContainerDefenseDemo() {
  const [containers, setContainers] = useState<ContainerStatus[]>([
    {
      id: "cont-01",
      name: "web-portal-nginx",
      ip: "172.18.0.3",
      cpu: "1.2%",
      memory: "42MB",
      status: "Healthy",
      threatScore: 0,
      logs: [
        "[INFO] Starting safe nginx listener on port 80/443",
        "[INFO] Connection pooling established with backend sockets"
      ]
    },
    {
      id: "cont-02",
      name: "auth-gateway-oauth",
      ip: "172.18.0.4",
      cpu: "0.8%",
      memory: "85MB",
      status: "Healthy",
      threatScore: 0,
      logs: [
        "[INFO] Listening for JSON Web Token authorizations",
        "[INFO] Active sync with user credentials collection"
      ]
    },
    {
      id: "cont-03",
      name: "payment-checkout-api",
      ip: "172.18.0.5",
      cpu: "1.5%",
      memory: "115MB",
      status: "Healthy",
      threatScore: 0,
      logs: [
        "[INFO] SSL handshake validation active",
        "[INFO] Safe sandbox banking bridge initialized"
      ]
    },
    {
      id: "cont-04",
      name: "redis-db-buffer",
      ip: "172.18.0.6",
      cpu: "0.4%",
      memory: "250MB",
      status: "Healthy",
      threatScore: 0,
      logs: [
        "[INFO] Redis database listening on state port 6379",
        "[INFO] Cache hydration loop complete. Keys: 22,900"
      ]
    }
  ]);

  const [activeIncidentLog, setActiveIncidentLog] = useState<string[]>([
    "Docker Socket Watchdog: MONITORING SOCKETS...",
    "System firewall bridge: IPtables dynamic chain: OPERATIONAL."
  ]);

  const [autoMitigate, setAutoMitigate] = useState(true);
  const [mitigatingId, setMitigatingId] = useState<string | null>(null);

  const addIncidentLog = (log: string) => {
    setActiveIncidentLog((prev) => [
      `[${new Date().toLocaleTimeString()}] ${log}`,
      ...prev.slice(0, 7)
    ]);
  };

  const triggerAttack = (id: string, attackType: "DDoS" | "RCE Payload" | "Brute Force") => {
    if (mitigatingId) return;

    setContainers((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const updatedLogs = [
            `[ATTACK WARNING] Suspicious traffic anomaly detected: ${attackType}`,
            ...c.logs
          ];
          return {
            ...c,
            status: "Under Attack",
            threatScore: attackType === "DDoS" ? 85 : 95,
            cpu: attackType === "DDoS" ? "98.7%" : "72.4%",
            memory: attackType === "DDoS" ? "210MB" : "198MB",
            logs: updatedLogs
          };
        }
        return c;
      })
    );

    const targeted = containers.find((c) => c.id === id);
    if (targeted) {
      addIncidentLog(`HEURISTICS ALERT: Malicious ${attackType} targeted at container "${targeted.name}"!`);
      if (autoMitigate) {
        setTimeout(() => runAutonomousMitigation(id), 1200);
      }
    }
  };

  const runAutonomousMitigation = (id: string) => {
    const target = containers.find((c) => c.id === id);
    if (!target) return;

    setMitigatingId(id);
    addIncidentLog(`MITIGATION FLOW: Threat score Crossed threshold for "${target.name}". Running defensive isolates...`);

    // Step 1: Isolating
    setContainers((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              status: "Isolating",
              logs: ["[DEFENSE CENTER] Isolating local network namespaces socket bridges...", ...c.logs]
            }
          : c
      )
    );
    addIncidentLog(`DEFENSE LOOP: Isolating namespaces network socket bridge for IP ${target.ip}...`);

    setTimeout(() => {
      // Step 2: Injecting blocklist
      addIncidentLog(`FIREWALL CHAIN: Dynamic iptables payload inject. Rejecting all remote requests...`);

      setTimeout(() => {
        // Step 3: Spinning up backup & restart
        setContainers((prev) =>
          prev.map((c) => {
            if (c.id === id) {
              return {
                ...c,
                status: "Restarted",
                threatScore: 0,
                cpu: "1.0%",
                memory: "45MB",
                logs: [
                  "[HEALTH CHECK] Restarted and decoupled from dirty node database.",
                  "[INFO] Re-instating socket listening configurations...",
                  ...c.logs
                ]
              };
            }
            return c;
          })
        );
        addIncidentLog(`HEALING COMPLETED: Terminated infected container processes. Spun up dynamic proxy node.`);
        setMitigatingId(null);
      }, 1500);
    }, 1200);
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 cyber-glow-green">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Layers className="h-5 w-5 text-cyber-green" />
          <h3 className="font-display font-bold text-lg text-white">Intelligent Container Defense System</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-md border border-slate-800">
            <span className="font-mono text-xs text-slate-400">Autonomous Mitigation Mode:</span>
            <button
              _id="btn-toggle-mitigation"
              onClick={() => setAutoMitigate(!autoMitigate)}
              className={`font-mono text-xs font-bold px-2 py-0.5 rounded transition-all ${
                autoMitigate
                  ? "bg-cyber-green/15 text-cyber-green border border-cyber-green/30"
                  : "bg-slate-800 text-slate-400 border border-slate-700"
              }`}
            >
              {autoMitigate ? "ON (ACTIVE)" : "OFF"}
            </button>
          </div>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 max-w-3xl">
        This simulator models dynamic system defense by monitoring the <strong>Docker daemon socket</strong>. When malicious traffic is injected, the analyzer rates threat loads. In autonomous mode, it injects firewalls, isolates corrupted namespaces, destroys parent processes, and restores safe nodes.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Container Cluster Monitor Grid */}
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {containers.map((container) => {
            const isAtk = container.status === "Under Attack";
            const isIso = container.status === "Isolating";
            return (
              <div
                key={container.id}
                className={`p-4 rounded-lg bg-slate-950/80 border transition-all relative overflow-hidden ${
                  isAtk
                    ? "border-rose-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-rose-950/10"
                    : isIso
                    ? "border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]"
                    : container.status === "Restarted"
                    ? "border-cyber-green/50"
                    : "border-slate-800"
                }`}
              >
                {/* Cyber Scanner Header animation */}
                {isAtk && (
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-rose-500 animate-bounce"></div>
                )}

                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Server className={`h-4 w-4 ${isAtk ? "text-rose-450 text-rose-500" : "text-slate-400"}`} />
                    <span className="font-display font-bold text-sm text-white">{container.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded uppercase font-semibold ${
                      isAtk
                        ? "bg-rose-500/20 text-rose-400"
                        : isIso
                        ? "bg-amber-500/20 text-amber-400 animate-pulse"
                        : container.status === "Restarted"
                        ? "bg-cyber-green/10 text-cyber-green font-bold"
                        : "bg-slate-800 text-slate-400"
                    }`}
                  >
                    {container.status}
                  </span>
                </div>

                <div className="text-xs font-mono text-slate-400 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <span>IP Address:</span>
                    <span className="text-white">{container.ip}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CPU Load:</span>
                    <span className={isAtk ? "text-rose-400 font-bold" : "text-white"}>{container.cpu}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RAM Reserved:</span>
                    <span className="text-white">{container.memory}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1.5 border-t border-slate-900">
                    <span>Anomalous Threat Rating:</span>
                    <span
                      className={`text-[11px] font-bold ${
                        container.threatScore > 75
                          ? "text-rose-500"
                          : container.threatScore > 40
                          ? "text-amber-500"
                          : "text-cyber-green"
                      }`}
                    >
                      {container.threatScore} / 100
                    </span>
                  </div>
                </div>

                {/* Simulated Injection Actions */}
                <div className="flex gap-2">
                  <button
                    _id={`btn-atk-ddos-${container.id}`}
                    onClick={() => triggerAttack(container.id, "DDoS")}
                    disabled={container.status !== "Healthy" || mitigatingId !== null}
                    className="flex-1 bg-slate-900 border border-slate-700 hover:border-rose-500/30 text-slate-300 hover:text-rose-450 hover:bg-rose-950/20 rounded py-1 text-[10px] font-mono transition-colors disabled:opacity-50"
                  >
                    Inject DDoS
                  </button>
                  <button
                    _id={`btn-atk-rce-${container.id}`}
                    onClick={() => triggerAttack(container.id, "RCE Payload")}
                    disabled={container.status !== "Healthy" || mitigatingId !== null}
                    className="flex-1 bg-slate-900 border border-slate-700 hover:border-amber-500/30 text-slate-300 hover:text-amber-500 hover:bg-amber-950/20 rounded py-1 text-[10px] font-mono transition-colors disabled:opacity-50"
                  >
                    Payload RCE
                  </button>
                  {!autoMitigate && container.status === "Under Attack" && (
                    <button
                      _id={`btn-manual-mitigate-${container.id}`}
                      onClick={() => runAutonomousMitigation(container.id)}
                      className="absolute inset-0 bg-rose-500/10 backdrop-blur-[2px] flex items-center justify-center cursor-pointer transition-all hover:bg-rose-500/20"
                    >
                      <span className="bg-rose-600 hover:bg-rose-700 text-white font-mono text-[10px] py-1.5 px-3 rounded-md shadow-lg font-bold flex items-center gap-1">
                        <ShieldAlert className="h-3.5 w-3.5" />
                        Trigger Mitigation Playbook
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Defense Center logs audit */}
        <div className="lg:col-span-4 flex flex-col justify-between bg-cyber-deep rounded-lg border border-slate-800 p-4 shadow-inner">
          <div>
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-800">
              <Activity className="h-4 w-4 text-cyber-green" />
              <h4 className="font-display font-medium text-xs text-white uppercase tracking-wider">
                Autonomous Defense Ledger
              </h4>
            </div>

            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {activeIncidentLog.map((log, index) => {
                let logColor = "text-slate-400";
                if (log.includes("ALERT:")) logColor = "text-rose-400 font-semibold";
                else if (log.includes("MITIGATION FLOW:")) logColor = "text-cyber-green font-medium";
                else if (log.includes("HEALING COMPLETED:")) logColor = "text-cyber-green font-bold";
                else if (log.includes("FIREWALL CHAIN:")) logColor = "text-amber-405 text-amber-500";

                return (
                  <p key={index} className={`font-mono text-[11px] leading-relaxed ${logColor}`}>
                    {log}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-900 mt-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded bg-cyber-green/10">
                <Shield className="h-5 w-5 text-cyber-green" />
              </div>
              <div className="flex-1 font-mono text-[10px]">
                <div className="font-semibold text-white">Docker Daemon Firewall Hook</div>
                <div className="text-slate-500">Iptables system active. Dynamic rate blocking setup.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
