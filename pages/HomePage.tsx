
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
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative pt-10 pb-16 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative z-10">
            <div className="inline-block px-2.5 py-1 bg-blue-50 text-blue-600 rounded-lg text-[8px] font-black uppercase tracking-widest mb-4">
              Official v2.5 Protocol
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-slate-900 leading-tight mb-5 tracking-tighter">
              Productivity <br/><span className="text-blue-600">is Logic.</span>
            </h1>
            <p className="text-base text-slate-500 mb-6 max-w-md leading-relaxed font-medium">
              The 444 Framework is the world's first faceless, AGI-powered system for digital architects.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => onNavigate(PageType.STORE)} 
                className="bg-slate-900 text-white px-6 py-3 rounded-lg text-sm font-black hover:bg-blue-600 transition-all shadow-lg active:scale-95"
              >
                Download Blueprint
              </button>
              <a 
                href="https://productivityprotocol.netlify.app/#/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white border-2 border-slate-100 text-slate-600 px-6 py-3 rounded-lg text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
              >
                Access Hub <ICONS.ChevronRight className="w-4 h-4" />
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-slate-100 rounded-2xl overflow-hidden shadow-lg border border-white relative group">
              {heroImage ? (
                <img src={heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s]" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center animate-pulse"><ICONS.Cpu className="w-8 h-8 text-slate-200" /></div>
              )}
              <div className="absolute bottom-4 left-4 right-4 p-3 bg-slate-900/90 backdrop-blur-xl rounded-xl border border-white/10 hidden md:block">
                <div className="font-mono text-[7px] text-blue-400 space-y-0.5">
                  {logs.map((l, i) => <div key={i}>&gt; {l}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="py-6 border-y border-slate-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-8 opacity-40 grayscale items-center">
           <div className="flex items-center gap-2 font-black text-[9px] tracking-widest uppercase"><ICONS.Zap className="w-3 h-3"/> SSL Encrypted</div>
           <div className="flex items-center gap-2 font-black text-[9px] tracking-widest uppercase"><ICONS.Cpu className="w-3 h-3"/> AGI Verified</div>
           <div className="flex items-center gap-2 font-black text-[9px] tracking-widest uppercase"><ICONS.Layers className="w-3 h-3"/> Node Secure</div>
           <div className="flex items-center gap-2 font-black text-[9px] tracking-widest uppercase"><ICONS.TrendingUp className="w-3 h-3"/> High-Yield</div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black mb-2 tracking-tight">The 444 Syllabus</h2>
            <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest">Architectural Foundation Modules</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {curriculum.map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                <div className="text-blue-600 font-black text-2xl mb-3">0{i+1}</div>
                <h3 className="text-base font-black mb-1.5 tracking-tight">{item.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Book Pitch */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[2rem] p-8 lg:p-12 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <ICONS.BookOpen className="w-48 h-48" />
             </div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-black mb-5 leading-tight tracking-tight">Ready to integrate the <span className="text-blue-500">Source Code?</span></h2>
                  <p className="text-base text-slate-400 mb-8 leading-relaxed">
                    Stop building "personal brands." Start building autonomous logic nodes. The Blueprint is your manual for the new digital economy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => onNavigate(PageType.STORE)} className="bg-blue-600 text-white px-6 py-3.5 rounded-lg text-sm font-black hover:bg-white hover:text-blue-600 transition-all shadow-lg active:scale-95">
                      Get The E-Book — $29.99
                    </button>
                    <a 
                      href="https://productivityprotocol.netlify.app/#/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-500 hover:text-white transition-colors"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-widest">Visit Protocol Hub</span>
                      <ICONS.ChevronRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    {h: "Instant", p: "Access"},
                    {h: "Lifetime", p: "Updates"},
                    {h: "100%", p: "Faceless"},
                    {h: "AGI", p: "Driven"}
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-lg backdrop-blur-sm">
                      <h4 className="text-xl font-black mb-0.5 text-white">{item.h}</h4>
                      <p className="text-[8px] text-slate-400 uppercase tracking-widest font-bold">{item.p}</p>
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
