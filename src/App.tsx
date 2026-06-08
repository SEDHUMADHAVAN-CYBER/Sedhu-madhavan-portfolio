import { useState, useEffect } from "react";
import {
  Shield, Mail, Phone, MapPin, Github, Linkedin, Award, Terminal,
  BookOpen, Cpu, Layers, User, Calendar, ChevronRight, GraduationCap,
  Globe, Briefcase, FileText, CheckCircle, ExternalLink, ArrowUpRight
} from "lucide-react";

import Navbar from "./components/Navbar";
import TerminalDemo from "./components/TerminalDemo";
import ContainerDefenseDemo from "./components/ContainerDefenseDemo";
import ApkScannerDemo from "./components/ApkScannerDemo";
import FraudDetectionDemo from "./components/FraudDetectionDemo";
import Certificates from "./components/Certificates";
import ContactForm from "./components/ContactForm";
import ParticleNetwork from "./components/ParticleNetwork";

import {
  personalInfo,
  educationHistory,
  experienceHistory,
  coreProjects
} from "./data/portfolioData";

export default function App() {
  const [activeTab, setActiveTab] = useState("about");
  const [activeLabTab, setActiveLabTab] = useState("soc");
  const [expandedCase, setExpandedCase] = useState<string | null>("soc-assistant");
  const [hoveredAvatar, setHoveredAvatar] = useState(false);

  // Auto-scroll-spy link updates
  useEffect(() => {
    const sections = ["about", "simulator-lab", "case-studies", "certifications", "contact"];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveTab(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cyber-dark text-slate-300 font-sans selection:bg-cyber-cyan/30 selection:text-white">
      {/* Sticky Glass Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Hero Header Section */}
      <section id="about" className="cyber-grid py-12 md:py-20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Texts info */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyber-cyan/10 border border-cyber-cyan/20 rounded-full">
                <span className="h-1.5 w-1.5 rounded-full bg-cyber-cyan animate-pulse"></span>
                <span className="font-mono text-[10px] text-cyber-cyan font-semibold uppercase tracking-wider">
                  Verified Security Operative // CHENNAI
                </span>
              </div>

              <div className="space-y-2">
                <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-none">
                  {personalInfo.name}
                </h1>
                <p className="font-display text-lg sm:text-xl font-medium text-cyber-cyan">
                  {personalInfo.title}
                </p>
              </div>

              <p className="text-slate-355 text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
                {personalInfo.summary}
              </p>

              {/* Badges metadata list */}
              <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-450 text-slate-400">
                <div className="flex items-center gap-1.5">
                  <GraduationCap className="h-4 w-4 text-slate-500" />
                  <span>SIMATS University (B.Tech CSB)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-slate-500" />
                  <span>Chennai, Tamil Nadu</span>
                </div>
              </div>

              {/* Direct links grid */}
              <div className="flex flex-wrap gap-3 pt-2">
                <a
                  href={`mailto:${personalInfo.email}`}
                  id="link-hero-email"
                  className="bg-cyber-cyan hover:bg-cyan-550 hover:bg-cyan-500 text-slate-950 font-display font-bold text-xs px-4 py-2.5 rounded-md flex items-center gap-2 shadow-lg hover:shadow-cyan-500/15 transition-all cursor-pointer"
                >
                  <Mail className="h-3.5 w-3.5 text-slate-950" />
                  Email Secure
                </a>
                
                <a
                  href={personalInfo.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  id="link-hero-linkedin"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-display text-xs px-4 py-2.5 rounded-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Linkedin className="h-3.5 w-3.5 text-slate-400" />
                  LinkedIn
                </a>

                <a
                  href={personalInfo.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  id="link-hero-github"
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-white font-display text-xs px-4 py-2.5 rounded-md flex items-center gap-2 transition-all cursor-pointer"
                >
                  <Github className="h-3.5 w-3.5 text-slate-400" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Right Scanning profile picture with mouse effect */}
            <div className="lg:col-span-5 flex justify-center relative py-6 px-4 overflow-visible">
              {/* Interactive particle field animation behind the portrait */}
              <div className="absolute inset-0 z-0 pointer-events-none">
                <ParticleNetwork />
              </div>

              <div
                className="relative z-10 cursor-crosshair group h-72 w-72 sm:h-80 sm:w-80 rounded-2xl overflow-hidden bg-cyber-deep border-2 border-slate-800 hover:border-cyber-cyan/50 mt-6 shadow-2xl transition-all duration-500"
                onMouseEnter={() => setHoveredAvatar(true)}
                onMouseLeave={() => setHoveredAvatar(false)}
                id="interactive-avatar-frame"
              >
                {/* Custom Avatar Placeholder from Picsum loaded with high contrast profile parameters */}
                <img
                  src="https://picsum.photos/seed/cyberheadshot/500/500"
                  alt="Sedhu Madhavan Portrait"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                />

                {/* Laser scan lines overlay sweeping down */}
                <div className="absolute inset-x-0 top-0 h-[2px] bg-cyan-500/80 shadow-[0_0_8px_#06b6d4] animate-bounce pointer-events-none"></div>

                {/* Cyber HUD lock overlay elements on hover */}
                <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-cyan-950/10 transition-colors pointer-events-none"></div>

                <div className={`absolute inset-0 p-4 flex flex-col justify-between font-mono text-[9px] text-cyber-cyan transition-opacity duration-300 pointer-events-none ${hoveredAvatar ? "opacity-100" : "opacity-0"}`}>
                  <div className="flex justify-between">
                    <span>SEC_SCAN_ACTIVE</span>
                    <span>X_COORD: 11.02</span>
                  </div>
                  
                  {/* Coordinate grid crosshair in center on hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-70">
                    <div className="h-10 w-10 border border-dashed border-cyber-cyan rounded-full animate-spin"></div>
                    <div className="absolute h-4 w-[1px] bg-cyber-cyan"></div>
                    <div className="absolute w-4 h-[1px] bg-cyber-cyan"></div>
                  </div>

                  <div className="flex justify-between items-end">
                    <span>CONFIDENCE: 99.8%</span>
                    <span>LOG_COGNITIVE_READY</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Experiential Technical skills inventory bento */}
      <section className="py-16 bg-slate-950/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 space-y-3">
              <div className="p-2 w-10 rounded bg-cyber-cyan/10 text-cyber-cyan">
                <Cpu className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Automation & Threat Detection</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Skilled in Python scripting for security operations. Built self-mitigating containers and parsed system audit parameters using FastAPI pipelines mapped to MITRE ATT&CK guidelines.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 space-y-3">
              <div className="p-2 w-10 rounded bg-cyber-green/10 text-cyber-green">
                <Layers className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Microservices & Sandbox Security</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Experienced in Docker orchestration, building dynamic namespaces constraints, static decompiling (AndroidManifest.xml parsing, smali string filters), and YARA malware heuristics.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-slate-950 border border-slate-850 space-y-3">
              <div className="p-2 w-10 rounded bg-amber-505 bg-amber-500/10 text-amber-400">
                <Award className="h-5 w-5" />
              </div>
              <h4 className="font-display font-bold text-white text-base">Cyber Leadership & Workshops</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Serving as VP of the Sentrix Cyber Club at SIMATS. Organizing collaborative cybersecurity bootcamps, CTF training trails, and active security compliance reviews for undergrads.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Response simulator lab block */}
      <section id="simulator-lab" className="py-16 scroll-mt-16 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
              Incident Response Interactive labs
            </h2>
            <p className="text-slate-400 text-sm">
              Explore live functional simulations of Sedhu's core security applications. Click on any lab node below to boot its interactive console and trigger autonomous cyber remediation routines.
            </p>
          </div>

          {/* Interactive lab switch buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8 bg-slate-950/80 p-1.5 rounded-lg border border-slate-850 max-w-3xl mx-auto">
            <button
              id="tab-btn-soc"
              onClick={() => setActiveLabTab("soc")}
              className={`flex-1 min-w-[140px] px-3 py-2 text-center rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeLabTab === "soc"
                  ? "bg-slate-800 text-cyber-cyan border border-slate-705 border-slate-700"
                  : "text-slate-450 text-slate-400 hover:text-white"
              }`}
            >
              SOC Alert Assistant
            </button>
            <button
              id="tab-btn-container"
              onClick={() => setActiveLabTab("container")}
              className={`flex-1 min-w-[140px] px-3 py-2 text-center rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeLabTab === "container"
                  ? "bg-slate-800 text-cyber-green border border-slate-705 border-slate-700"
                  : "text-slate-450 text-slate-400 hover:text-white"
              }`}
            >
              Docker Firewall
            </button>
            <button
              id="tab-btn-apk"
              onClick={() => setActiveLabTab("apk")}
              className={`flex-1 min-w-[140px] px-3 py-2 text-center rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeLabTab === "apk"
                  ? "bg-slate-800 text-cyber-cyan border border-slate-705 border-slate-700"
                  : "text-slate-450 text-slate-400 hover:text-white"
              }`}
            >
              Suraksha Scanner
            </button>
            <button
              id="tab-btn-upi"
              onClick={() => setActiveLabTab("upi")}
              className={`flex-1 min-w-[140px] px-3 py-2 text-center rounded-md font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                activeLabTab === "upi"
                  ? "bg-slate-800 text-rose-450 text-rose-400 border border-slate-705 border-slate-700"
                  : "text-slate-450 text-slate-400 hover:text-white"
              }`}
            >
              UPI Fraud Network
            </button>
          </div>

          {/* Render target labs strictly */}
          <div className="animate-fade-in">
            {activeLabTab === "soc" && <TerminalDemo />}
            {activeLabTab === "container" && <ContainerDefenseDemo />}
            {activeLabTab === "apk" && <ApkScannerDemo />}
            {activeLabTab === "upi" && <FraudDetectionDemo />}
          </div>
        </div>
      </section>

      {/* Case studies documentation section */}
      <section id="case-studies" className="py-16 scroll-mt-16 bg-slate-955 bg-slate-950/20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight uppercase">
                Detailed Case Studies Index
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Deconstruct the structural design, challenging barriers, and measured impacts for each primary project.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* List triggers on left */}
            <div className="lg:col-span-4 space-y-2">
              {coreProjects.map((p) => (
                <button
                  key={p.id}
                  id={`btn-case-expand-${p.id}`}
                  onClick={() => setExpandedCase(p.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-all flex items-center justify-between ${
                    expandedCase === p.id
                      ? "bg-slate-800 border-cyber-cyan text-white shadow-md"
                      : "bg-slate-950/70 border-slate-850 hover:border-slate-800 text-slate-400 hover:bg-slate-900/10"
                  }`}
                >
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-cyber-cyan font-bold">
                      {p.category}
                    </span>
                    <h4 className="font-display font-bold text-sm mt-0.5">{p.title}</h4>
                  </div>
                  <ChevronRight className={`h-4 w-4 transition-transform ${expandedCase === p.id ? "rotate-90 text-cyber-cyan" : "text-slate-655 text-slate-500"}`} />
                </button>
              ))}
            </div>

            {/* Display Case Details board on right */}
            <div className="lg:col-span-8 bg-slate-950/90 rounded-xl border border-slate-850 p-6 min-h-[400px] flex flex-col justify-between">
              {(() => {
                const activeProject = coreProjects.find((p) => p.id === expandedCase);
                if (!activeProject) return null;

                return (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-900 pb-4">
                      <div>
                        <span className="font-mono text-xs text-cyber-cyan font-bold uppercase">
                          {activeProject.category} Case Assessment
                        </span>
                        <h3 className="font-display font-bold text-white text-xl sm:text-2xl mt-1">
                          {activeProject.title}
                        </h3>
                      </div>

                      {/* Tech Stacks list */}
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="font-mono text-[10px] bg-slate-800 text-slate-300 px-2.0 py-1 rounded-md border border-slate-700/50"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-slate-350 text-xs sm:text-sm">
                      <div className="space-y-2">
                        <div className="font-mono text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                          CORE INCIDENT CHALLENGE:
                        </div>
                        <p className="leading-relaxed text-slate-400">{activeProject.challenge}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="font-mono text-[11px] text-cyber-cyan font-bold uppercase tracking-wider">
                          AUTOMATED ARCHITECTURE SOLUTION:
                        </div>
                        <p className="leading-relaxed text-slate-300">{activeProject.solution}</p>
                      </div>
                    </div>

                    {/* Measured performance outputs */}
                    <div className="pt-4 border-t border-slate-900/40 space-y-3">
                      <div className="font-mono text-[11px] text-slate-505 text-slate-500 font-bold uppercase tracking-wider">
                        MEASURED SECURITY IMPACT GUIDELINES:
                      </div>
                      <ul className="space-y-2 text-xs text-slate-400">
                        {activeProject.impact.map((imp, idx) => (
                          <li key={idx} className="flex gap-2">
                            <CheckCircle className="h-4 w-4 text-cyber-cyan shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{imp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* Experiential History Timelines layout */}
      <section className="py-16 bg-slate-950/20 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Academic Education milestones */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 mb-2">
                <GraduationCap className="h-5 w-5 text-cyber-cyan" />
                <h3 className="font-display font-bold text-xl text-white">Academic Milestones</h3>
              </div>
              
              <div className="space-y-6 border-l-2 border-slate-900 pl-4 relative ml-1">
                {educationHistory.map((edu, idx) => (
                  <div key={idx} className="space-y-1.5 relative">
                    {/* Ring timeline nodes */}
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-cyber-cyan ring-4 ring-slate-900"></span>
                    
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-bold text-white text-base leading-tight">
                        {edu.degree}
                      </h4>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{edu.duration}</span>
                    </div>
                    <div className="font-mono text-xs text-cyber-cyan select-none">{edu.institution}</div>
                    <p className="text-slate-400 text-xs leading-relaxed mt-1">{edu.details}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership Position histories */}
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 mb-2">
                <Briefcase className="h-4 w-4 text-cyber-green" />
                <h3 className="font-display font-bold text-xl text-white">Leadership Roles & Clubs</h3>
              </div>

              <div className="space-y-6 border-l-2 border-slate-900 pl-4 relative ml-1">
                {experienceHistory.map((exp, idx) => (
                  <div key={idx} className="space-y-1.5 relative">
                    <span className="absolute -left-[21px] top-1.5 h-2 w-2 rounded-full bg-cyber-green ring-4 ring-slate-900"></span>

                    <div className="flex justify-between items-start gap-2">
                      <h4 className="font-display font-bold text-white text-base leading-tight">
                        {exp.role}
                      </h4>
                      <span className="font-mono text-[10px] text-slate-400 shrink-0">{exp.duration}</span>
                    </div>
                    <div className="font-mono text-xs text-cyber-green select-none">{exp.organization}</div>
                    
                    <ul className="space-y-1 text-slate-400 text-xs mt-2 leading-relaxed">
                      {exp.highlights.map((h, i) => (
                        <li key={i} className="list-disc ml-3.5">{h}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications and Manuals component wrapper */}
      <section id="certifications" className="py-16 scroll-mt-16 bg-slate-950/40 border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Certificates />
        </div>
      </section>

      {/* Contact form block */}
      <section id="contact" className="py-16 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>

      {/* Secure Command Center Footer block */}
      <footer className="py-10 bg-cyber-deep border-t border-slate-900 text-center font-mono text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex items-center justify-center gap-2 text-slate-350 text-slate-305">
            <Shield className="h-4 w-4 text-cyber-cyan" />
            <span className="font-display font-bold tracking-tight text-white">
              SEDHU MADHAVAN <span className="text-cyber-cyan font-mono text-xs">// PORTFOLIO</span>
            </span>
          </div>

          <p>
            Designed with Inter, Space Grotesk and JetBrains Mono. All simulators compile safe native JS states sandbox inputs.
          </p>

          <div className="text-[10px] text-slate-600">
            SECURE AUDIT TOKEN COMPLIANT: UTC {new Date().toISOString().substring(0, 10)} // PORT 3000
          </div>
        </div>
      </footer>
    </div>
  );
}
