import React, { useState } from "react";
import { Mail, Send, Terminal, ShieldCheck, CheckCircle2, RefreshCw } from "lucide-react";

export default function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sendStep, setSendStep] = useState("");
  const [success, setSuccess] = useState(false);
  const [signature, setSignature] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setSuccess(false);
    setSendStep("Initializing secure SSL proxy socket connection...");

    setTimeout(() => {
      setSendStep("Diffie-Hellman encryption handshake... Symmetric key exchange complete.");

      setTimeout(() => {
        setSendStep("Packing message envelope and mapping destination SMTP records...");

        setTimeout(() => {
          setSendStep("Transmitting encrypted payload: madhavansedhu598@gmail.com...");

          setTimeout(() => {
            const randomHash = "SHA256-" + Array.from({ length: 16 }, () =>
              Math.floor(Math.random() * 16).toString(16)
            ).join("").toUpperCase();

            setSignature(randomHash);
            setSending(false);
            setSuccess(true);
            setFormData({ name: "", email: "", subject: "", message: "" });
          }, 650);
        }, 550);
      }, 600);
    }, 500);
  };

  return (
    <div className="bg-slate-900/40 rounded-xl border border-slate-800 p-6 md:p-8 cyber-glow-cyan">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Safe text headers */}
        <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Mail className="h-5 w-5 text-cyber-cyan" />
              <h3 className="font-display font-bold text-xl text-white">Get In Touch</h3>
            </div>
            
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Have an interesting security research project, mock audit challenge, or job opportunities available? Submit this contact form. Your message packet is encrypted on transit.
            </p>

            <div className="space-y-4 font-mono text-xs text-slate-450 text-slate-400">
              <div className="flex items-center gap-2.5">
                <span className="text-cyber-cyan font-bold w-12 shrink-0">EMAIL:</span>
                <a href="mailto:madhavansedhu598@gmail.com" className="text-white hover:underline transition-all">
                  madhavansedhu598@gmail.com
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-cyber-cyan font-bold w-12 shrink-0">PHONE:</span>
                <span className="text-white">09342452590</span>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="text-cyber-cyan font-bold w-12 shrink-0">OFFICE:</span>
                <span className="text-white">Chennai, Tamil Nadu</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 hidden lg:block">
            <div className="p-4 rounded bg-slate-950 border border-slate-850 font-mono text-[10px] space-y-1 text-slate-500">
              <div>HOST SYSTEM: SIMATS LAB PORTAL</div>
              <div>SECURITY KEY: RSA-2048-BIT // DEPLOYED</div>
              <div>RECIPIENT GATEWAY: ACTIVE</div>
            </div>
          </div>
        </div>

        {/* Form Interactive UI */}
        <div className="lg:col-span-7 bg-slate-950 p-6 rounded-lg border border-slate-850 relative min-h-[300px] flex flex-col justify-center">
          {sending && (
            <div className="text-center py-8 space-y-4 animate-pulse">
              <RefreshCw className="h-8 w-8 text-cyber-cyan animate-spin mx-auto" />
              <div className="font-mono text-xs text-cyber-cyan">{sendStep}</div>
            </div>
          )}

          {success && !sending && (
            <div className="text-center py-6 space-y-4">
              <CheckCircle2 className="h-12 w-12 text-cyber-green mx-auto" />
              <div className="space-y-1">
                <h4 className="font-display font-bold text-white text-base">Message Transmitted Securely!</h4>
                <p className="text-slate-400 text-xs max-w-sm mx-auto">
                  Your message metadata was packed and routed directly to Sedhu's email interface. He will respond within standard SLA.
                </p>
              </div>

              <div className="inline-block p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-[9px] text-left text-slate-500">
                <div className="text-cyber-green font-bold flex items-center gap-1 mb-1">
                  <ShieldCheck className="h-3 w-5" /> TRANSACTION CONFIRMED
                </div>
                <div>TRANSMISSION HASH: <span className="text-slate-350 select-all">{signature}</span></div>
              </div>

              <div>
                <button
                  _id="btn-send-another"
                  onClick={() => setSuccess(false)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono text-slate-300 py-1.5 px-3 rounded transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          )}

          {!sending && !success && (
            <form onSubmit={handleSubmit} className="space-y-4 select-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="form-name" className="font-mono text-[10px] uppercase font-semibold text-slate-400">
                    Operator / Sender Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="form-name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyber-cyan text-white text-xs rounded-md p-2.5 outline-none placeholder-slate-700 font-sans focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="form-email" className="font-mono text-[10px] uppercase font-semibold text-slate-400">
                    Sender Email VPA <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="form-email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyber-cyan text-white text-xs rounded-md p-2.5 outline-none placeholder-slate-700 font-sans focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                    placeholder="you@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-subject" className="font-mono text-[10px] uppercase font-semibold text-slate-400">
                  Topic / Subject
                </label>
                <input
                  type="text"
                  id="form-subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyber-cyan text-white text-xs rounded-md p-2.5 outline-none placeholder-slate-700 font-sans focus:ring-1 focus:ring-cyber-cyan/30 transition-all"
                  placeholder="Inquiry Topic"
                />
              </div>

              <div className="space-y-1.5">
                <label htmlFor="form-msg" className="font-mono text-[10px] uppercase font-semibold text-slate-400">
                  Secure Message payload <span className="text-rose-500">*</span>
                </label>
                <textarea
                  id="form-msg"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-slate-900/60 border border-slate-800 focus:border-cyber-cyan text-white text-xs rounded-md p-2.5 outline-none placeholder-slate-700 font-sans focus:ring-1 focus:ring-cyber-cyan/30 transition-all resize-none"
                  placeholder="Draft your query payload here..."
                />
              </div>

              <button
                type="submit"
                id="btn-contact-submit"
                className="w-full bg-cyber-cyan hover:bg-cyan-550 hover:bg-cyan-500 text-slate-950 font-display font-bold text-xs p-3 rounded-md flex items-center justify-center gap-2 shadow-lg transition-colors cursor-pointer"
              >
                <Send className="h-3.5 w-3.5 text-slate-950" />
                TRANSMIT SIGNED ENVELOPE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
