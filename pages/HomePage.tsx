
import React, { useEffect, useState, useRef } from 'react';
import { ICONS } from '../constants.tsx';
import { PageType, AuditResult } from '../types.ts';
import { generateProductivityImage, analyzeSchedule } from '../services/geminiService.ts';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [scheduleInput, setScheduleInput] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [logs, setLogs] = useState<string[]>(["Initializing 444 Protocol...", "Awaiting user input..."]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const loadHero = async () => {
      const hero = await generateProductivityImage("ultra-minimalist futuristic white workspace holographic interface", "hero");
      if (mounted) setHeroImage(hero);
    };
    loadHero();

    const logInterval = setInterval(() => {
      const msgs = ["Optimizing delta...", "Neural sync active", "Caching vector data", "Syncing AGI node", "Encryption verified"];
      setLogs(prev => [...prev.slice(-5), msgs[Math.floor(Math.random()*msgs.length)]]);
    }, 3000);

    return () => { mounted = false; clearInterval(logInterval); };
  }, []);

  const handleAudit = async () => {
    if (!scheduleInput.trim()) return;
    setIsAuditing(true);
    setAuditResult(null);
    const result = await analyzeSchedule(scheduleInput);
    setAuditResult(result);
    setIsAuditing(false);
  };

  const curriculum = [
    { title: "Phase 01: The Logic Layer", desc: "Setting up your digital node and faceless identity." },
    { title: "Phase 02: Neural Automation", desc: "Using AGI to offload 90% of cognitive bandwidth." },
    { title: "Phase 03: The 444 Matrix", desc: "Our proprietary daily task scheduling algorithm." },
    { title: "Phase 04: Horizontal Expansion", desc: "Scaling systems to multiple passive streams." }
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative pt-12 pb-20 overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative z-10">
            <div className="inline-block px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[9px] font-black uppercase tracking-widest mb-4">
              Official v2.5 Protocol
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
              Productivity <br/><span className="text-blue-600">is Logic.</span>
            </h1>
            <p className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed font-medium">
              The 444 Framework is the world's first faceless, AGI-powered system for digital architects.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => onNavigate(PageType.STORE)} className="bg-slate-900 text-white px-8 py-4 rounded-xl text-base font-black hover:bg-blue-600 transition-all shadow-xl shadow-blue-200/10 active:scale-95">
                Download The Blueprint
              </button>
              <button onClick={() => onNavigate(PageType.MARKETPLACE)} className="bg-white border-2 border-slate-100 text-slate-600 px-8 py-4 rounded-xl text-base font-bold hover:bg-slate-50 transition-all">
                Access Modules
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/3] bg-slate-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-white relative group">
              {heroImage ? (
                <img src={heroImage} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[20s]" alt="" />
              ) : (
                <div className="w-full h-full flex items-center justify-center animate-pulse"><ICONS.Cpu className="w-10 h-10 text-slate-200" /></div>
              )}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-slate-900/90 backdrop-blur-xl rounded-2xl border border-white/10 hidden md:block">
                <div className="font-mono text-[8px] text-blue-400 space-y-1">
                  {logs.map((l, i) => <div key={i}>> {l}</div>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Verification Strip */}
      <section className="py-8 border-y border-slate-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-10 opacity-40 grayscale items-center">
           <div className="flex items-center gap-2 font-black text-[10px] tracking-widest"><ICONS.Zap className="w-3.5 h-3.5"/> SSL ENCRYPTED</div>
           <div className="flex items-center gap-2 font-black text-[10px] tracking-widest"><ICONS.Cpu className="w-3.5 h-3.5"/> AGI VERIFIED</div>
           <div className="flex items-center gap-2 font-black text-[10px] tracking-widest"><ICONS.Layers className="w-3.5 h-3.5"/> NODE SECURE</div>
           <div className="flex items-center gap-2 font-black text-[10px] tracking-widest"><ICONS.TrendingUp className="w-3.5 h-3.5"/> HIGH-YIELD LOGIC</div>
        </div>
      </section>

      {/* Curriculum Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black mb-3 tracking-tight">The 444 Syllabus</h2>
            <p className="text-slate-500 text-sm">Inside the 250-page digital architect handbook.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {curriculum.map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all">
                <div className="text-blue-600 font-black text-3xl mb-4">0{i+1}</div>
                <h3 className="text-lg font-black mb-2 tracking-tight">{item.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Conversion Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
                <ICONS.TrendingUp className="w-64 h-64" />
             </div>
             <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl lg:text-5xl font-black mb-6 leading-tight tracking-tight">Ready to integrate the <span className="text-blue-500">Source Code?</span></h2>
                  <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                    Stop building "personal brands." Start building autonomous logic nodes. The Blueprint is your manual for the new digital economy.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button onClick={() => onNavigate(PageType.STORE)} className="bg-blue-600 text-white px-8 py-5 rounded-xl text-lg font-black hover:bg-white hover:text-blue-600 transition-all shadow-xl">
                      Access Blueprint — $29.99
                    </button>
                    <div className="flex items-center gap-3 text-slate-500">
                      <div className="flex -space-x-1.5">
                        {[1,2,3].map(i => <div key={i} className="w-7 h-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[9px] font-bold">A{i}</div>)}
                      </div>
                      <span className="text-xs font-bold">+44k Architects</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    {h: "Instant", p: "Deployment"},
                    {h: "Lifetime", p: "Logic Updates"},
                    {h: "100%", p: "Faceless Path"},
                    {h: "AGI", p: "Native Hook"}
                  ].map((item, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-2xl backdrop-blur-sm">
                      <h4 className="text-2xl font-black mb-1 text-white">{item.h}</h4>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">{item.p}</p>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Social Proof Wall */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-black mb-6 leading-tight">Deployed by over <span className="text-blue-600">44,000</span> Architects worldwide.</h2>
              <div className="space-y-4">
                {[
                  { name: "Agent X", quote: "Removed 12 hours of manual labor per week using the Neural Sync scripts." },
                  { name: "Architect 09", quote: "The only framework that actually understands faceless automation." }
                ].map((t, i) => (
                  <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl border-l-4 border-blue-600 shadow-sm">
                    <p className="text-base text-slate-700 italic">"{t.quote}"</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white relative group">
              <ICONS.Zap className="w-10 h-10 text-blue-500 mb-6" />
              <h3 className="text-2xl font-black mb-4">Is your node ready?</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">Stop operating on legacy human habits. Switch to the logical protocol today.</p>
              <button onClick={() => onNavigate(PageType.STORE)} className="w-full bg-blue-600 py-5 rounded-xl font-black text-lg hover:bg-white hover:text-blue-600 transition-all">
                Download Now — $29.99
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
