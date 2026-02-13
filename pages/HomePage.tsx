
import React, { useEffect, useState, useRef } from 'react';
import { ICONS } from '../constants.tsx';
import { PageType, AuditResult } from '../types.ts';
import { generateProductivityImage, analyzeSchedule } from '../services/geminiService.ts';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [featureImages, setFeatureImages] = useState<(string | null)[]>([null, null, null]);
  const [scheduleInput, setScheduleInput] = useState('');
  const [auditResult, setAuditResult] = useState<AuditResult | null>(null);
  const [isAuditing, setIsAuditing] = useState(false);
  const [logs, setLogs] = useState<string[]>(["Initializing 444 Protocol...", "Loading AGI nodes...", "Awaiting user input..."]);
  const logEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      const hero = await generateProductivityImage("minimalist office space holographic interfaces", "hero");
      if (mounted) setHeroImage(hero);
      
      const prompts = [
        { p: "neural network minimalist", k: "ai" },
        { p: "futuristic clock blue", k: "time" },
        { p: "clean digital nomad workspace", k: "focus" }
      ];
      
      for (let i = 0; i < prompts.length; i++) {
        // High delay to respect free tier
        await new Promise(r => setTimeout(r, 5000));
        const img = await generateProductivityImage(prompts[i].p, prompts[i].k);
        if (mounted) setFeatureImages(prev => {
          const next = [...prev]; next[i] = img; return next;
        });
      }
    };
    loadImages();

    const logInterval = setInterval(() => {
      const isBlocked = !!localStorage.getItem('444_system_quota_blocked_until');
      const newLogs = isBlocked ? [
        "Network Congestion Detected",
        "Switching to Local Cache Protocol",
        "Syncing Offline Assets...",
        "Optimizing Delta Latency",
        "AGI Node in Standby Mode"
      ] : [
        `Processing neural loop ${Math.floor(Math.random()*9999)}...`,
        `Optimizing delta time: ${Math.random().toFixed(4)}ms`,
        `AGI Agent ${Math.floor(Math.random()*9)} active`,
        `Memory sync complete`,
        `Scaling horizontal nodes...`
      ];
      setLogs(prev => [...prev.slice(-8), newLogs[Math.floor(Math.random()*newLogs.length)]]);
    }, 4000);

    return () => { 
      mounted = false; 
      clearInterval(logInterval);
    };
  }, []);

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const handleAudit = async () => {
    if (!scheduleInput.trim()) return;
    setIsAuditing(true);
    setAuditResult(null);
    setLogs(prev => [...prev, ">> Starting deep schedule audit...", ">> Analyzing cognitive load..."]);
    const result = await analyzeSchedule(scheduleInput);
    setAuditResult(result);
    setIsAuditing(false);
    setLogs(prev => [...prev, ">> Audit complete. Calibrating recommendations."]);
  };

  const icons = [
    { icon: <ICONS.Zap className="w-8 h-8" />, label: "Peak Performance", desc: "Unlock flow states" },
    { icon: <ICONS.Cpu className="w-8 h-8" />, label: "AI Integration", desc: "Offload to AGI agents" },
    { icon: <ICONS.Layers className="w-8 h-8" />, label: "Modular Systems", desc: "Scalable stacks" },
    { icon: <ICONS.TrendingUp className="w-8 h-8" />, label: "Growth Engine", desc: "Exponential ROI" },
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              System v2.5.AGI Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
              The <span className="text-blue-600">444</span> Paradigm
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A faceless, high-efficiency framework leveraging deep learning to automate your digital existence and maximize cognitive output.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button onClick={() => onNavigate(PageType.STORE)} className="bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200">
                Get E-Book $29.99
              </button>
              <button onClick={() => onNavigate(PageType.MARKETPLACE)} className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-full text-lg font-bold hover:bg-slate-50 transition-all">
                Browse Marketplace
              </button>
            </div>
          </div>
          <div className="relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative aspect-[4/3] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-100 bg-slate-50 transition-transform group-hover:scale-[1.01] duration-700">
              {heroImage ? (
                <img src={heroImage} className="w-full h-full object-cover" alt="System Hero" />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
                  <ICONS.Cpu className="w-12 h-12 text-blue-200" />
                  <span className="text-slate-300 font-mono text-[10px] uppercase tracking-widest">Synthesizing Visual_Asset...</span>
                </div>
              )}
              {/* Overlay Terminal */}
              <div className="absolute bottom-6 right-6 w-64 bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-2xl overflow-hidden hidden md:block">
                <div className="flex items-center gap-2 mb-2 border-b border-white/10 pb-2">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-[8px] font-mono text-slate-400 ml-auto uppercase tracking-tighter">System Console</span>
                </div>
                <div className="space-y-1 h-32 overflow-hidden font-mono text-[9px] text-blue-400">
                  {logs.map((log, i) => (
                    <div key={i} className="animate-in slide-in-from-left-2 fade-in duration-300">
                      <span className="text-slate-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                      {log}
                    </div>
                  ))}
                  <div ref={logEndRef} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 444 System Audit Interactive Tool */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[4rem] p-8 md:p-20 text-white shadow-2xl relative overflow-hidden border border-blue-900/20">
            <div className="absolute top-0 right-0 p-8 opacity-5"><ICONS.Cpu className="w-96 h-96" /></div>
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-500/20">
                  <ICONS.Zap className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-4xl font-black tracking-tight">System Audit</h2>
                  <p className="text-blue-400 text-xs font-mono uppercase tracking-[0.3em]">AI-Driven Efficiency Calibration</p>
                </div>
              </div>
              
              <p className="text-slate-400 text-lg mb-12 leading-relaxed max-w-2xl">
                Paste your current hourly sequence or daily task list. Our AGI model will detect neural leaks and provide optimization vectors.
              </p>
              
              <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                <div className="space-y-6">
                  <div className="relative group">
                    <div className="absolute -inset-0.5 bg-blue-600/20 rounded-3xl opacity-0 group-focus-within:opacity-100 transition-opacity blur-sm"></div>
                    <textarea 
                      value={scheduleInput}
                      onChange={(e) => setScheduleInput(e.target.value)}
                      placeholder="08:00 - Wake up / Emails&#10;09:30 - Deep work phase A&#10;11:00 - Meeting protocol..."
                      className="relative w-full h-48 bg-slate-800 border border-slate-700 rounded-3xl p-8 text-blue-100 placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm leading-relaxed"
                    />
                  </div>
                  <button 
                    onClick={handleAudit}
                    disabled={isAuditing || !scheduleInput}
                    className="w-full bg-blue-600 py-6 rounded-2xl font-black text-xl hover:bg-blue-700 transition-all disabled:opacity-50 flex items-center justify-center gap-4 shadow-xl shadow-blue-500/10 active:scale-[0.98]"
                  >
                    {isAuditing ? (
                      <>
                        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Neural Data...</span>
                      </>
                    ) : (
                      <>
                        <ICONS.Zap className="w-6 h-6" />
                        <span>Initiate System Audit</span>
                      </>
                    )}
                  </button>
                </div>

                {auditResult && (
                  <div className="mt-12 space-y-8 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-3xl border border-blue-900/30">
                        <div className="flex items-center justify-between mb-6">
                          <div className="text-[10px] text-blue-500 font-black uppercase tracking-[0.2em]">Efficiency Coefficient</div>
                          <div className="px-3 py-1 bg-blue-600/10 text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">Live Score</div>
                        </div>
                        <div className="flex items-baseline gap-2 mb-4">
                          <span className="text-7xl font-black text-white">{auditResult.efficiencyScore}</span>
                          <span className="text-2xl font-bold text-slate-500">/ 100</span>
                        </div>
                        <p className="text-sm text-slate-400 italic leading-relaxed">"{auditResult.optimizingThought}"</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-red-900/20">
                          <h4 className="text-[10px] font-black text-red-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span> Critical Bottlenecks
                          </h4>
                          <ul className="space-y-3">
                            {auditResult.bottlenecks.map((b, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate-300">
                                <span className="text-red-500 font-black opacity-50">#0{i+1}</span> {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-blue-900/20">
                          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> Optimized Vectors
                          </h4>
                          <ul className="space-y-3">
                            {auditResult.recommendations.map((r, i) => (
                              <li key={i} className="flex gap-3 text-sm text-slate-300">
                                <span className="text-blue-500 font-black opacity-50">>>></span> {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-24">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {icons.map((item, i) => (
            <div key={i} className="bg-white p-12 rounded-[3rem] shadow-sm border border-slate-100 hover:shadow-2xl transition-all group cursor-pointer" onClick={() => onNavigate(PageType.ABOUT)}>
              <div className="bg-blue-50 w-20 h-20 rounded-3xl flex items-center justify-center text-blue-600 mb-10 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                {item.icon}
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{item.label}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
