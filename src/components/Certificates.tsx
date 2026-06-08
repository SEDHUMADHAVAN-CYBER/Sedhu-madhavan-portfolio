import { Award, BookOpen, ExternalLink, Calendar, FileText, CheckCircle } from "lucide-react";
import { certificatesList, techDocs } from "../data/portfolioData";

export default function Certificates() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Certifications Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <Award className="h-5 w-5 text-cyber-cyan" />
          <h3 className="font-display font-bold text-xl text-white">Security Certifications</h3>
        </div>

        <p className="text-slate-450 text-sm text-slate-400">
          Professional security accreditations validating hands-on training with incident response, network auditing, forensic telemetry analyses, and continuous automation.
        </p>

        <div className="space-y-4">
          {certificatesList.map((cert, index) => (
            <div
              key={index}
              className="p-5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/10 transition-all flex flex-col md:flex-row gap-4 items-start"
            >
              <div className="p-3 rounded-lg bg-cyber-cyan/10 flex-shrink-0">
                <Award className="h-6 w-6 text-cyber-cyan" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-white text-base leading-tight">
                      {cert.title}
                    </h4>
                    <span className="font-mono text-xs text-slate-500 block mt-1">
                      Issuer: {cert.issuer}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    {cert.date}
                  </span>
                </div>

                {/* Badged verified skill keys */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skills.map((s, i) => (
                    <span
                      key={i}
                      className="font-mono text-[9px] bg-slate-900 text-slate-350 px-2 py-0.5 rounded border border-slate-850"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-900/50 flex justify-between items-center text-[11px]">
                  <span className="text-cyber-green font-mono flex items-center gap-1">
                    <CheckCircle className="h-3.5 w-3.5" /> Verified Ledger Profile
                  </span>
                  <a
                    href={cert.link}
                    className="text-cyber-cyan hover:underline hover:text-white flex items-center gap-1 font-mono transition-colors"
                  >
                    View validation <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technical Documentation Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-5 w-5 text-cyber-green" />
          <h3 className="font-display font-bold text-xl text-white">Research & Tech Documentation</h3>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed">
          In-depth technical papers, sandbox write-ups, and defensive configuration guides developed during continuous analysis of modern software vulnerability sets.
        </p>

        <div className="space-y-4">
          {techDocs.map((doc, index) => (
            <div
              key={index}
              className="p-5 rounded-lg bg-slate-950/70 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/10 transition-all flex flex-col md:flex-row gap-4 items-start"
            >
              <div className="p-3 rounded-lg bg-cyber-green/10 flex-shrink-0">
                <FileText className="h-6 w-6 text-cyber-green" />
              </div>

              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-display font-bold text-white text-base leading-tight">
                      {doc.title}
                    </h4>
                    <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-cyber-green mt-1 block">
                      {doc.category}
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                    <Calendar className="h-3 w-3 text-slate-500" />
                    {doc.date}
                  </span>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed">{doc.summary}</p>

                <div className="pt-2 border-t border-slate-900/50 flex justify-between items-center text-[11px] font-mono">
                  <span className="text-slate-500">FORMAT: MARKDOWN MANUAL (.MD)</span>
                  <button
                    _id={`btn-view-doc-${doc.id}`}
                    onClick={() => {
                      alert(`Opening static documentation preview for: "${doc.title}". Interactive case studies are also featured above in the primary lab cards!`);
                    }}
                    className="text-cyber-green hover:underline hover:text-white flex items-center gap-1 transition-colors capitalize cursor-pointer focus:outline-none"
                  >
                    Load documentation <ExternalLink className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
