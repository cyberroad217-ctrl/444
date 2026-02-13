
import React, { useEffect, useState, useRef } from 'react';
import { ICONS } from '../constants.tsx';
import { PageType, AuditResult } from '../types.ts';
import { generateProductivityImage, analyzeSchedule } from '../services/geminiService.ts';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>(["Initializing 444 Protocol...", "Awaiting user input..."]);

  useEffect(() => {
    let mounted = true;
    const loadHero = async () => {
      const hero = await generateProductivityImage("ultra-minimalist futuristic white workspace holographic interface", "hero");
      if (mounted) setHeroImage(hero);
    };
    loadHero();

    const logInterval = setInterval(() => {
      const msgs = ["Optimizing delta...", "Neural sync active", "Caching vector data", "Syncing AGI node", "Encryption verified"];
      setLogs(prev => [...prev.slice(-4), msgs[Math.floor(Math.random()*msgs.length)]]);
    }, 3000);

    return () => { mounted = false; clearInterval(logInterval); };
  }, []);

  const curriculum = [
    { title: "The Logic Layer", desc: "Setting up your digital node and faceless identity." },
    { title: "Neural Automation", desc: "Using AGI to offload 90% of cognitive bandwidth." },
    { title: "The 444 Matrix", desc: "Our proprietary daily task scheduling algorithm." },
    { title: "Horizontal Expansion", desc: "Scaling systems to multiple passive streams." }
  ];

  return (
    <div className="animate-in fade-in duration-1000 max-w-6xl mx-auto">
      {/* Hero Section */}
      <section className="relative pt-8 pb-12 overflow-hidden bg-white">
        <div className="px-4 grid lg:grid-cols-2 gap-8 items-center">
          <div className="relative z-10">
            <div className="inline-block px-2 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[7px] font-black uppercase tracking-[0.2em] mb-3">
              SYSTEM V2.5
            </div>
            <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-4 tracking-tighter">
              Productivity <br/><span className="text-blue-600">is Pure Logic.</span>
            </h1>
            <p className="text-sm text-slate-500 mb-6 max-w-sm leading-relaxed">
              The 444 Framework is the world's first faceless, AGI-powered system for digital architects.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5">
              <button 
                onClick={() => onNavigate(PageType.STORE)} 
                className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-[11px] font-black hover:bg-blue-600 transition-all shadow-md active:scale-95"
              >
                DOWNLOAD BLUEPRINT
              </button>
              <a 
                href="https://productivityprotocol.netlify.app/#/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border border-slate-200 text-slate-600 px-5 py-2.5 rounded-md text-[11px] font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-1.5"
              >
                ACCESS HUB <ICONS.ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-slate-50 rounded-xl overflow-hidden border border-slate-100 relative group shadow-sm">
              {heroImage ? (
                <img src={heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[15s]" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center animate-pulse"><ICONS.Cpu className="w-6 h-6 text-slate-200" /></div>
              )}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 bg-slate-900/80 backdrop-blur-md rounded-lg border border-white/5 hidden md:block">
                <div className="font-mono text-[6px] text-blue-400 space-y-0.5 opacity-80">
                  {logs.map((l, i) => <div key={i}>&gt; {l}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-4 border-y border-slate-50 bg-white">
        <div className="px-4 flex flex-wrap justify-center gap-6 opacity-40 grayscale items-center">
           <div className="flex items-center gap-1.5 font-black text-[7px] tracking-widest uppercase"><ICONS.Zap className="w-2.5 h-2.5"/> SSL</div>
           <div className="flex items-center gap-1.5 font-black text-[7px] tracking-widest uppercase"><ICONS.Cpu className="w-2.5 h-2.5"/> AGI VERIFIED</div>
           <div className="flex items-center gap-1.5 font-black text-[7px] tracking-widest uppercase"><ICONS.Layers className="w-2.5 h-2.5"/> NODE SECURE</div>
           <div className="flex items-center gap-1.5 font-black text-[7px] tracking-widest uppercase"><ICONS.TrendingUp className="w-2.5 h-2.5"/> HIGH-YIELD</div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-12 bg-slate-50">
        <div className="px-4">
          <div className="text-center mb-8">
            <h2 className="text-xl font-black mb-1.5 tracking-tight">The 444 Syllabus</h2>
            <p className="text-slate-400 text-[9px] font-bold uppercase tracking-[0.2em]">Logic Layer Modules</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {curriculum.map((item, i) => (
              <div key={i} className="bg-white p-5 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="text-blue-600 font-black text-xl mb-2">0{i+1}</div>
                <h3 className="text-[13px] font-black mb-1 tracking-tight">{item.title}</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Book Pitch */}
      <section className="py-12 bg-white">
        <div className="px-4">
          <div className="bg-slate-900 rounded-2xl p-6 lg:p-10 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <ICONS.BookOpen className="w-32 h-32" />
             </div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl lg:text-3xl font-black mb-4 leading-tight tracking-tight">Integrate the <span className="text-blue-500">Source Code.</span></h2>
                  <p className="text-xs text-slate-400 mb-6 leading-relaxed max-w-sm">
                    Stop building "personal brands." Build autonomous logic nodes. The Blueprint is your manual for the new digital economy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 items-center">
                    <button onClick={() => onNavigate(PageType.STORE)} className="bg-blue-600 text-white px-5 py-2.5 rounded-md text-[11px] font-black hover:bg-white hover:text-blue-600 transition-all shadow-lg active:scale-95">
                      GET E-BOOK — $29.99
                    </button>
                    <a 
                      href="https://productivityprotocol.netlify.app/#/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors"
                    >
                      <span className="text-[9px] font-bold uppercase tracking-widest">Protocol Hub</span>
                      <ICONS.ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    {h: "Instant", p: "Access"},
                    {h: "Lifetime", p: "Updates"},
                    {h: "100%", p: "Faceless"},
                    {h: "AGI", p: "Driven"}
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-md backdrop-blur-sm">
                      <h4 className="text-lg font-black text-white">{item.h}</h4>
                      <p className="text-[7px] text-slate-500 uppercase tracking-widest font-bold">{item.p}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
