import { useState, useEffect } from "react";
import { ShieldAlert, Check, X, ShieldAlert as AlertIcon, RefreshCw, SlidersHorizontal, PlusCircle } from "lucide-react";
import { UpiTransaction } from "../types";

export default function FraudDetectionDemo() {
  const [transactions, setTransactions] = useState<UpiTransaction[]>([
    { id: "TX-40121", sender: "madhan@okicici", receiver: "mule.young.vpa", amount: 85000, timestamp: "08:04:02 UTC", ipAddress: "192.168.12.82", deviceId: "DEV-iPhoneX-881", riskScore: 84, status: "BLOCKED", reasons: ["New Beneficiary (<2 hours old)", "Large Midnight Amount Alert"] },
    { id: "TX-40120", sender: "priya@okicici", receiver: "bazaar-shop@okaxis", amount: 1200, timestamp: "08:03:55 UTC", ipAddress: "103.45.201.2", deviceId: "DEV-[Android]-219", riskScore: 12, status: "APPROVED", reasons: [] },
    { id: "TX-40119", sender: "ramesh@okaxis", receiver: "geetha@oksbi", amount: 4500, timestamp: "08:03:41 UTC", ipAddress: "115.111.45.22", deviceId: "DEV-iPhone13-556", riskScore: 8, status: "APPROVED", reasons: [] },
    { id: "TX-40118", sender: "shiva@okicici", receiver: "fast-mule-node", amount: 45000, timestamp: "08:03:10 UTC", ipAddress: "192.34.101.55", deviceId: "DEV-[Android]-901", riskScore: 78, status: "BLOCKED", reasons: ["Suspicious Device ID Hopping", "Rapid Transaction Velocity"] },
    { id: "TX-40117", sender: "kumar@oksbi", receiver: "zomato@okhdfc", amount: 650, timestamp: "08:03:02 UTC", ipAddress: "182.203.111.5", deviceId: "DEV-[Android]-044", riskScore: 3, status: "APPROVED", reasons: [] }
  ]);

  const [threshold, setThreshold] = useState(70);
  const [stats, setStats] = useState({ approved: 3, blocked: 2, flagged: 0 });

  useEffect(() => {
    // Recalculate transaction status when threshold updates
    const updated = transactions.map((tx) => {
      let status: "APPROVED" | "FLAGGED" | "BLOCKED" = "APPROVED";
      if (tx.riskScore >= threshold) {
        status = "BLOCKED";
      } else if (tx.riskScore >= threshold - 20) {
        status = "FLAGGED";
      }
      return { ...tx, status };
    });

    setTransactions(updated);

    const approvedCount = updated.filter((t) => t.status === "APPROVED").length;
    const blockedCount = updated.filter((t) => t.status === "BLOCKED").length;
    const flaggedCount = updated.filter((t) => t.status === "FLAGGED").length;
    setStats({ approved: approvedCount, blocked: blockedCount, flagged: flaggedCount });
  }, [threshold]);

  const injectFraudTransaction = (type: "Mule Account" | "SIM Swap" | "Phishing Spill") => {
    let newTx: UpiTransaction;
    const randomId = "TX-" + Math.floor(10000 + Math.random() * 90000);

    if (type === "Mule Account") {
      newTx = {
        id: randomId,
        sender: "rajesh@oksbi",
        receiver: "new-mule-vpa-6a",
        amount: 98000,
        timestamp: "08:04:10 UTC",
        ipAddress: "103.220.101.44",
        deviceId: "DEV-[NewDevice]-409",
        riskScore: 89,
        status: 89 >= threshold ? "BLOCKED" : 89 >= threshold - 20 ? "FLAGGED" : "APPROVED",
        reasons: ["Beneficiary VPA age < 15 minutes", "Out of pattern cash movement"]
      };
    } else if (type === "SIM Swap") {
      newTx = {
        id: randomId,
        sender: "venkat@okaxis",
        receiver: "safe-retail@oksbi",
        amount: 32000,
        timestamp: "08:04:15 UTC",
        ipAddress: "185.12.98.22",
        deviceId: "DEV-UnknownIMEI-882",
        riskScore: 65,
        status: 65 >= threshold ? "BLOCKED" : 65 >= threshold - 20 ? "FLAGGED" : "APPROVED",
        reasons: ["Abrupt Device ID Swap", "Recent Sim Registration Alert"]
      };
    } else {
      newTx = {
        id: randomId,
        sender: "anand@okicici",
        receiver: "unknown.store.vpa",
        amount: 55000,
        timestamp: "08:04:22 UTC",
        ipAddress: "94.130.40.77",
        deviceId: "DEV-[Android]-411",
        riskScore: 72,
        status: 72 >= threshold ? "BLOCKED" : 72 >= threshold - 20 ? "FLAGGED" : "APPROVED",
        reasons: ["Irregular High-value flow", "Unusual IP Access Session"]
      };
    }

    setTransactions((prev) => [newTx, ...prev.slice(0, 9)]);
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 cyber-glow-cyan">
      {/* Selector Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-slate-800 gap-4">
        <div className="flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-500 animate-pulse" />
          <h3 className="font-display font-bold text-lg text-white">Nationwide UPI Fraud Network Monitor</h3>
        </div>

        {/* Dashboard Counter stats */}
        <div className="flex items-center gap-3 font-mono text-[11px]">
          <span className="bg-cyber-green/10 text-cyber-green px-2 py-1 border border-cyber-green/20 rounded">
            APPROVED: {stats.approved}
          </span>
          <span className="bg-amber-500/10 text-amber-505 text-amber-550 px-2 py-1 border border-amber-500/20 rounded">
            FLAGGED: {stats.flagged}
          </span>
          <span className="bg-rose-500/10 text-rose-400 px-2 py-1 border border-rose-500/20 rounded">
            BLOCKED: {stats.blocked}
          </span>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 max-w-3xl">
        This simulator represents the Machine Learning framework monitoring nationwide Unified Payments Interface (UPI) flows. The model weights transaction volumes, geographic location variables, device identifier signatures, and target beneficiary registry ages to score and act on rapid financial laundering paths.
      </p>

      {/* Controller Controls Slider and Injectors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          {/* Threshold Sliders */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850">
            <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <SlidersHorizontal className="h-4 w-4 text-cyber-cyan" />
              <span>Block Threshold Adjuster</span>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between font-mono text-xs">
                <span className="text-slate-400">Current Cutoff:</span>
                <span className="text-cyber-cyan font-bold">{threshold} / 100 Risk</span>
              </div>

              <input
                type="range"
                min="30"
                max="90"
                value={threshold}
                onChange={(e) => setThreshold(Number(e.target.value))}
                className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyber-cyan"
              />

              <div className="font-mono text-[10px] text-slate-500 leading-relaxed pt-2 border-t border-slate-900">
                Lowering cutoff blocks higher quantities of mule assets but is prone to flagging normal consumer transfers. Elevating cutoff optimizes user transaction speeds but increases vulnerability to high-speed cash schemes.
              </div>
            </div>
          </div>

          {/* Transaction Generator Injection buttons */}
          <div className="bg-slate-950 p-4 rounded-lg border border-slate-850 space-y-3">
            <div className="text-xs uppercase font-semibold text-slate-400">
              Inject Simulated Fraud Event
            </div>

            <div className="grid grid-cols-1 gap-2">
              <button
                _id="btn-inject-mule"
                onClick={() => injectFraudTransaction("Mule Account")}
                className="flex items-center gap-2 text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-rose-500/30 text-xs px-3 py-2 rounded transition-colors group"
              >
                <PlusCircle className="h-4 w-4 text-slate-500 group-hover:text-rose-400" />
                <div>
                  <span className="font-display font-medium text-white block">Rapid Cash Mule Node</span>
                  <span className="font-mono text-[9px] text-slate-500">Newly provisioned dummy account</span>
                </div>
              </button>

              <button
                _id="btn-inject-sim"
                onClick={() => injectFraudTransaction("SIM Swap")}
                className="flex items-center gap-2 text-left bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/30 text-xs px-3 py-2 rounded transition-colors group"
              >
                <PlusCircle className="h-4 w-4 text-slate-500 group-hover:text-amber-400" />
                <div>
                  <span className="font-display font-medium text-white block">Suspect SIM Swap Swap</span>
                  <span className="font-mono text-[9px] text-slate-500">Device fingerprint mismatch</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Live Ledger Streams list */}
        <div className="lg:col-span-8 flex flex-col justify-between">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 px-1">
            Real-Time Network Ledger Feed (Streams downwards)
          </div>

          <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
            {transactions.map((tx) => {
              let scoreColor = "text-cyber-green";
              let badgeColor = "bg-cyber-green/10 text-cyber-green border-cyber-green/20";
              let cardBorder = "border-slate-800 hover:border-slate-700";

              if (tx.status === "BLOCKED") {
                scoreColor = "text-rose-450 text-rose-500";
                badgeColor = "bg-rose-500/10 text-rose-400 border-rose-500/20";
                cardBorder = "border-rose-900/40 bg-rose-950/10";
              } else if (tx.status === "FLAGGED") {
                scoreColor = "text-amber-505 text-amber-500";
                badgeColor = "bg-amber-500/10 text-amber-400 border-amber-505/20";
                cardBorder = "border-amber-900/40 bg-amber-950/10";
              }

              return (
                <div
                  key={tx.id}
                  className={`p-4 rounded-lg bg-slate-950/70 border transition-all ${cardBorder}`}
                >
                  <div className="flex items-center justify-between mb-3 border-b border-slate-900 pb-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-xs text-white">{tx.id}</span>
                      <span className="font-mono text-[10px] text-slate-500">{tx.timestamp}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="font-mono text-[10px]">
                        <span className="text-slate-500 mr-1.5">Anomaly Score:</span>
                        <span className={`font-extrabold ${scoreColor}`}>{tx.riskScore}%</span>
                      </div>
                      <span className={`text-[9px] uppercase font-mono px-2 py-0.5 rounded border font-bold ${badgeColor}`}>
                        {tx.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-xs font-mono text-slate-400 mb-2">
                    <div>
                      <span className="text-slate-500">Host:</span> <span className="text-slate-300">{tx.sender}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Target Node:</span> <span className="text-slate-350 text-slate-300">{tx.receiver}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Value transferred:</span> <span className="text-white font-bold">Rs. {tx.amount.toLocaleString()}</span>
                    </div>
                  </div>

                  {tx.reasons.length > 0 && (
                    <div className="mt-2.5 pt-2.5 border-t border-slate-900/40 flex flex-wrap gap-2 items-center">
                      <span className="text-[10px] font-mono text-rose-450 text-rose-500 flex items-center gap-1">
                        <AlertIcon className="h-3 w-3" /> Indicator Triggers:
                      </span>
                      {tx.reasons.map((r, i) => (
                        <span
                          key={i}
                          className="text-[9px] font-mono bg-rose-500/5 text-rose-350 px-1.5 py-0.5 rounded border border-rose-500/10"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
