import { Shield, Menu, X, Terminal, Briefcase, Award, Mail, BookOpen } from "lucide-react";
import { useState } from "react";

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Navbar({ activeTab, setActiveTab }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "about", name: "About Me", icon: Briefcase },
    { id: "simulator-lab", name: "Incident Response Lab", icon: Terminal },
    { id: "case-studies", name: "Case Studies", icon: BookOpen },
    { id: "certifications", name: "Certifications", icon: Award },
    { id: "contact", name: "Contact Secure", icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-cyber-deep/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavClick("about")}>
            <Shield className="h-6 w-6 text-cyber-cyan animate-pulse" />
            <span className="font-display font-bold tracking-tight text-lg text-white">
              SEDHU <span className="text-cyber-cyan font-mono text-sm font-medium">// SECURE</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-sans text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-slate-800/80 text-cyber-cyan shadow-sm border border-slate-700"
                      : "text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className={`h-4 w-4 ${isActive ? "text-cyber-cyan" : "text-slate-500"}`} />
                  {item.name}
                </button>
              );
            })}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              id="mobile-menu-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cyber-dark/95 border-b border-slate-800 absolute w-full left-0 px-2 pt-2 pb-4 space-y-1 sm:px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-mob-btn-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-md font-sans text-base font-medium transition-colors ${
                  isActive
                    ? "bg-slate-800 text-cyber-cyan border-l-2 border-cyber-cyan"
                    : "text-slate-400 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "text-cyber-cyan" : "text-slate-500"}`} />
                {item.name}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
