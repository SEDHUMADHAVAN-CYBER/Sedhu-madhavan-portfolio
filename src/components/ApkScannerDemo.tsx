import { useState } from "react";
import { Upload, ShieldCheck, ShieldAlert, FileCode, CheckCircle, RefreshCw, AlertTriangle } from "lucide-react";
import { ApkMalwareReport } from "../types";

export default function ApkScannerDemo() {
  const [reports] = useState<ApkMalwareReport[]>([
    {
      fileName: "Trojan.Android.FakeBank.apk",
      fileSize: "8.4 MB",
      sha256: "b2f679a785d9c2e0b5220c845fec5e9a4128f6a9cde9927918a994efcfbc9fca",
      package: "com.sec.android.fakebanking.app",
      threatLevel: "MALICIOUS",
      threatScore: 94,
      permissions: [
        { name: "android.permission.SEND_SMS", description: "Allows the app to send SMS messages. This may result in unexpected charges.", dangerous: true },
        { name: "android.permission.READ_SMS", description: "Allows the app to read SMS messages stored on your device, potentially compromising OTP login codes.", dangerous: true },
        { name: "android.permission.RECEIVE_BOOT_COMPLETED", description: "Allows the app to start itself as soon as the system has finished booting, maintaining persistent background loops.", dangerous: true },
        { name: "android.permission.SYSTEM_ALERT_WINDOW", description: "Allows the app to show overlay screens over other applications. Frequently abused to fish user banking pins.", dangerous: true }
      ],
      suspiciousStrings: [
        "const-string v0, \"http://94.156.102.44/api/intercept_sms.php\"",
        "invoke-static {v0}, Ljava/net/URL;->openConnection()",
        "const-string v1, \"Locking user out... Database values decrypted.\""
      ],
      recommendation: "CRITICAL: WRECK DETECTED. This package declared dynamic SMS capture handlers mapped to a known malicious C2 IP. Do NOT install on standard client endpoints.",
      decompiledSnippet: `.method public onReceive(Landroid/content/Context;Landroid/content/Intent;)V
    .registers 8
    const-string v0, "android.provider.Telephony.SMS_RECEIVED"
    invoke-virtual {p2}, Landroid/content/Intent;->getAction()Ljava/lang/String;
    move-result-object v1
    invoke-virtual {v0, v1}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z
    move-result v0
    if-eqz v0, :get_otp
    return-void
    :get_otp
    invoke-static {p2}, Landroid/provider/Telephony$Sms$Intents;->getMessagesFromIntent(Landroid/content/Intent;)[Landroid/telephony/SmsMessage;
    move-result-object p2
    const-string v2, "http://94.156.102.44/api/intercept_sms.php"
    # Intercepting banking OTP secrets
    `
    },
    {
      fileName: "Spyware.Android.TrackWats.apk",
      fileSize: "14.1 MB",
      sha256: "df6c41b80d0d1e569cde4795bc9e7e1e694ef1a2c918a99a80e1a12903b417bb0",
      package: "com.whatsapp.extension.tracker",
      threatLevel: "SUSPICIOUS",
      threatScore: 68,
      permissions: [
        { name: "android.permission.RECORD_AUDIO", description: "Allows the app to access the microphone path to record sound at any moment.", dangerous: true },
        { name: "android.permission.ACCESS_FINE_LOCATION", description: "Allows the app to fetch precise GPS Coordinates of the device.", dangerous: true },
        { name: "android.permission.READ_CONTACTS", description: "Allows the app to harvest the user's personal contacts list.", dangerous: true }
      ],
      suspiciousStrings: [
        "Landroid/media/MediaRecorder;->start()V",
        "const-string v2, \"Uploading coordinates: \"",
        "https://secret-tracker.host/gather"
      ],
      recommendation: "WARNING: High-risk spyware triggers. It logs live location telemetry and recording microphone feeds without standard active user warnings.",
      decompiledSnippet: `.method private uploadAudioTrack()V
    .registers 4
    new-instance v0, Landroid/media/MediaRecorder;
    invoke-direct {v0}, Landroid/media/MediaRecorder;-><init>()V
    const/4 v1, 0x1
    invoke-virtual {v0, v1}, Landroid/media/MediaRecorder;->setAudioSource(I)V
    const-string v2, "https://secret-tracker.host/gather"
    # Harvesting hidden voice recorders
    `
    },
    {
      fileName: "Clean.Android.CalculatorGrid.apk",
      fileSize: "3.2 MB",
      sha256: "a1b2c3d4e5f607182930a0d0e0f09a1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e",
      package: "com.app.purecalculator",
      threatLevel: "SAFE",
      threatScore: 0,
      permissions: [
        { name: "android.permission.VIBRATE", description: "Allows the app to vibrate tactile feedback triggers on click.", dangerous: false }
      ],
      suspiciousStrings: [],
      recommendation: "SUCCESS: Standard package parameters. No malware signatures, suspicious network socket lookups, or dangerous authority declarations matched.",
      decompiledSnippet: `.method public calculateAddition(II)I
    .registers 4
    add-int p1, p1, p2
    return p1
    `
    }
  ]);

  const [selectedReport, setSelectedReport] = useState<ApkMalwareReport | null>(null);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState("");
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = (report: ApkMalwareReport) => {
    setScanning(true);
    setSelectedReport(null);
    setScanProgress(5);
    setScanStep("Unpacking Android application package files (APK)...");

    setTimeout(() => {
      setScanProgress(30);
      setScanStep("Reading and decompressing XML manifest files...");
      
      setTimeout(() => {
        setScanProgress(60);
        setScanStep("Inspecting dex bytecode blocks for suspicious domain addresses...");

        setTimeout(() => {
          setScanProgress(85);
          setScanStep("Evaluating heuristics templates with active YARA rules-sets...");

          setTimeout(() => {
            setScanProgress(100);
            setScanning(false);
            setSelectedReport(report);
          }, 600);
        }, 600);
      }, 700);
    }, 600);
  };

  return (
    <div className="bg-slate-900/50 rounded-xl border border-slate-800 p-6 cyber-glow-cyan">
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-cyber-cyan" />
          <h3 className="font-display font-bold text-lg text-white">Suraksha APK Scanner</h3>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-mono text-[10px] text-slate-500">STATIC DISASSEMBLER PIPELINE</span>
        </div>
      </div>

      <p className="text-slate-300 text-sm mb-6 max-w-3xl">
        This simulator models Suraksha, an automated static scanner designed to audit mobile packages. By dissecting compiled DEX assemblies, parsing Android Manifest files, and applying custom <strong>YARA malware criteria</strong>, it uncovers embedded malicious payload domains and dangerous permissions.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Upload Selection Zone */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
              Select Package to Decompile & Parse
            </div>

            <div className="space-y-2">
              {reports.map((r, i) => (
                <button
                  key={i}
                  id={`btn-select-apk-${i}`}
                  onClick={() => startScan(r)}
                  disabled={scanning}
                  className="w-full p-4 flex items-center justify-between bg-slate-950/70 hover:bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-lg text-left transition-all group disabled:opacity-50"
                >
                  <div className="flex items-center gap-3">
                    <FileCode className="h-8 w-8 text-slate-500 group-hover:text-cyber-cyan transition-colors" />
                    <div>
                      <div className="font-display font-medium text-white text-sm">{r.fileName}</div>
                      <div className="font-mono text-[10px] text-slate-500">{r.fileSize}</div>
                    </div>
                  </div>
                  <Upload className="h-4 w-4 text-slate-600 group-hover:text-cyber-cyan transition-colors" />
                </button>
              ))}
            </div>
          </div>

          {/* Core Upload Zone graphics */}
          <div className="mt-6 border-2 border-dashed border-slate-800 hover:border-cyber-cyan/30 rounded-lg p-6 bg-slate-950/30 text-center cursor-pointer transition-colors hidden sm:block">
            <Upload className="h-8 w-8 text-slate-600 mx-auto mb-2" />
            <div className="font-display font-medium text-sm text-slate-300 mb-1">
              Drag & Drop APK Binaries Here
            </div>
            <p className="font-mono text-[10px] text-slate-500">Supports standard compiled DEX hashes up to 250MB</p>
          </div>
        </div>

        {/* Scan Status OR Report Outputs */}
        <div className="lg:col-span-7 flex flex-col min-h-[350px] bg-slate-950/90 rounded-lg border border-slate-800 overflow-hidden shadow-inner p-6 justify-center">
          {/* Scanning Progress Graphic */}
          {scanning && (
            <div className="text-center py-10 space-y-6">
              <RefreshCw className="h-10 w-10 text-cyber-cyan animate-spin mx-auto" />
              <div className="space-y-2">
                <div className="font-display font-medium text-white text-sm">{scanStep}</div>
                <div className="w-48 h-1.5 bg-slate-900 rounded-full mx-auto overflow-hidden">
                  <div
                    className="h-full bg-cyber-cyan transition-all duration-300"
                    style={{ width: `${scanProgress}%` }}
                  ></div>
                </div>
                <span className="font-mono text-[11px] text-slate-500">{scanProgress}% completed</span>
              </div>
            </div>
          )}

          {/* Default Start View */}
          {!scanning && !selectedReport && (
            <div className="text-center py-12 text-slate-500 font-mono text-xs">
              <Upload className="h-12 w-12 text-slate-700 mx-auto mb-4" />
              <span>Select an APK file on the left to initiate decompiling audit pipelines</span>
            </div>
          )}

          {/* Secure Audit Report Output */}
          {selectedReport && !scanning && (
            <div className="space-y-5 animate-fade-in text-slate-300 text-sm">
              <div className="flex items-start justify-between border-b border-slate-800 pb-3">
                <div>
                  <h4 className="font-display font-bold text-white text-base">SCAN REPORT RESULT</h4>
                  <div className="font-mono text-[11px] text-slate-500 mt-1">Package: {selectedReport.package}</div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-slate-500">Security Score:</span>
                  <span
                    className={`font-mono text-lg font-black px-2.5 py-1 rounded inline-flex items-center gap-1.5 ${
                      selectedReport.threatLevel === "MALICIOUS"
                        ? "bg-rose-500/15 text-rose-400 border border-rose-500/30"
                        : selectedReport.threatLevel === "SUSPICIOUS"
                        ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                        : "bg-cyber-green/15 text-cyber-green border border-cyber-green/30"
                    }`}
                  >
                    {selectedReport.threatLevel === "MALICIOUS" ? <ShieldAlert className="h-5 w-5" /> : selectedReport.threatLevel === "SUSPICIOUS" ? <AlertTriangle className="h-5 w-5" /> : <ShieldCheck className="h-5 w-5" />}
                    {selectedReport.threatScore} / 100
                  </span>
                </div>
              </div>

              {/* SHA Hash Metadata */}
              <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800 font-mono text-[10px] break-all">
                <span className="text-slate-500">SHA256 CHECKSUM:</span> {selectedReport.sha256}
              </div>

              {/* Dangerous Permissions declared */}
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                  AndroidManifest.xml Authority Audit ({selectedReport.permissions.length} total)
                </div>
                <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
                  {selectedReport.permissions.map((p, i) => (
                    <div
                      key={i}
                      className={`p-2.5 rounded text-xs leading-relaxed border ${
                        p.dangerous
                          ? "bg-rose-950/10 border-rose-900/40 text-rose-350 text-rose-300"
                          : "bg-slate-900/40 border-slate-800 text-slate-300"
                      }`}
                    >
                      <span className="font-mono font-bold text-[11px]">{p.name}</span>
                      <p className="text-slate-400 text-[10px] mt-0.5">{p.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* YARA Signature static hits decompiled snippet */}
              {selectedReport.suspiciousStrings.length > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-slate-400 mb-2">
                    Dedecompilation (smali) static signature hits
                  </div>
                  <pre className="p-3 bg-slate-900/95 border border-slate-800 rounded font-mono text-[10px] text-amber-200 overflow-x-auto max-h-[130px]">
                    <code>{selectedReport.decompiledSnippet}</code>
                  </pre>
                </div>
              )}

              {/* Defense action list recommendation */}
              <div
                className={`p-3 rounded text-xs ${
                  selectedReport.threatLevel === "MALICIOUS"
                    ? "bg-rose-950/20 text-rose-200 border-l-4 border-rose-500"
                    : selectedReport.threatLevel === "SUSPICIOUS"
                    ? "bg-amber-950/20 text-amber-200 border-l-4 border-amber-500"
                    : "bg-cyber-green/10 text-emerald-250 border-l-4 border-cyber-green"
                }`}
              >
                <div className="font-display font-medium mb-1 flex items-center gap-1">
                  {selectedReport.threatLevel === "MALICIOUS" ? <ShieldAlert className="h-4 w-4" /> : selectedReport.threatLevel === "SUSPICIOUS" ? <AlertTriangle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                  Mitigation Action Advice:
                </div>
                {selectedReport.recommendation}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
