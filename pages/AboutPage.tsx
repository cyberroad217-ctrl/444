
import React from 'react';
import { ICONS } from '../constants.tsx';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-20">
      <div className="text-center mb-24">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-blue-400 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-blue-900/30">
          Core Protocol Definition
        </div>
        <h1 className="text-5xl lg:text-6xl font-black text-slate-900 mb-6 tracking-tighter">
          Faceless <span className="text-blue-600">Productivity.</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
          The 444 System is a purely logical framework designed to decouple output from identity using AGI.
        </p>
      </div>

      <div className="space-y-24">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">The End of the Personal Brand.</h2>
            <p className="text-base text-slate-600 leading-relaxed">
              In a digital landscape obsessed with influencers, 444 prioritizes the architect. We believe that true efficiency is anonymous. Our framework leverages deep learning LLM agents to build automated income and output streams that operate 24/7 without a human face.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-blue-600 font-black text-2xl mb-1">0%</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Publicity Required</div>
              </div>
              <div className="flex-1 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="text-blue-600 font-black text-2xl mb-1">100%</div>
                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Logical Autonomy</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square bg-slate-900 rounded-[2.5rem] p-10 overflow-hidden shadow-xl">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <ICONS.Cpu className="w-[120%] h-[120%] text-blue-500 animate-spin-slow" style={{ animationDuration: '60s' }} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center space-y-6">
              {[
                { label: "Data Input", val: "Continuous Feed" },
                { label: "Logic Layer", val: "Gemini 3 Pro Integration" },
                { label: "Output Vector", val: "Autonomous Assets" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-5 group">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white text-sm font-black group-hover:scale-110 transition-transform">
                    {i+1}
                  </div>
                  <div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-white font-bold text-lg">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white p-10 lg:p-16 rounded-[3rem] shadow-xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-8 opacity-5"><ICONS.Zap className="w-64 h-64" /></div>
          <div className="max-w-3xl">
            <h2 className="text-3xl lg:text-4xl font-black mb-10 tracking-tight">System Architecture Pillars</h2>
            <div className="space-y-10">
              {[
                { title: "Iterative Neural Loops", desc: "Every task is optimized through 444 feedback cycles, ensuring peak cognitive ROI.", icon: <ICONS.Layers className="w-6 h-6"/> },
                { title: "AGI Agent Hub", desc: "Native hooks into the world's most advanced reasoning models for decision offloading.", icon: <ICONS.Cpu className="w-6 h-6"/> },
                { title: "Horizontal Scaling", desc: "Built to expand. Your systems grow exponentially while your manual input decreases.", icon: <ICONS.TrendingUp className="w-6 h-6"/> }
              ].map((pillar, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 bg-white/10 rounded-xl flex-shrink-0 flex items-center justify-center text-blue-400">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-black mb-2">{pillar.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-base">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center py-12">
          <h2 className="text-3xl font-black text-slate-900 mb-4 tracking-tight">Access the Source Code.</h2>
          <p className="text-lg text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join the 44,000+ architects currently running the framework globally. No face. No limits. Just output.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.hash = 'store'}
              className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-slate-900 transition-all shadow-xl shadow-blue-500/10 active:scale-95"
            >
              Secure Lifetime License
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
