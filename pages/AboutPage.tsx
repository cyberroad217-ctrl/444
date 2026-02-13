
import React from 'react';
import { ICONS } from '../constants.tsx';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-32">
        <div className="inline-flex items-center gap-2 bg-slate-900 text-blue-400 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-blue-900/30">
          Core Protocol Definition
        </div>
        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tighter">
          Faceless <span className="text-blue-600">Productivity.</span>
        </h1>
        <p className="text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-medium">
          The 444 System is a purely logical framework designed to decouple output from identity using AGI.
        </p>
      </div>

      <div className="space-y-32">
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-tight">The End of the Personal Brand.</h2>
            <p className="text-lg text-slate-600 leading-relaxed">
              In a digital landscape obsessed with influencers, 444 prioritizes the architect. We believe that true efficiency is anonymous. Our framework leverages deep learning LLM agents to build automated income and output streams that operate 24/7 without a human face.
            </p>
            <div className="flex gap-6">
              <div className="flex-1 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="text-blue-600 font-black text-3xl mb-2">0%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Publicity Required</div>
              </div>
              <div className="flex-1 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div className="text-blue-600 font-black text-3xl mb-2">100%</div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Logical Autonomy</div>
              </div>
            </div>
          </div>
          <div className="relative aspect-square bg-slate-900 rounded-[4rem] p-12 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 opacity-10 flex items-center justify-center">
              <ICONS.Cpu className="w-[150%] h-[150%] text-blue-500 animate-spin-slow" style={{ animationDuration: '60s' }} />
            </div>
            <div className="relative z-10 h-full flex flex-col justify-center space-y-8">
              {[
                { label: "Data Input", val: "Continuous Feed" },
                { label: "Logic Layer", val: "Gemini 3 Pro Integration" },
                { label: "Output Vector", val: "Autonomous Assets" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6 group">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-black group-hover:scale-110 transition-transform">
                    {i+1}
                  </div>
                  <div>
                    <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{item.label}</div>
                    <div className="text-white font-bold text-xl">{item.val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-900 text-white p-12 lg:p-24 rounded-[4rem] shadow-2xl relative overflow-hidden">
          <div className="absolute bottom-0 right-0 p-12 opacity-5"><ICONS.Zap className="w-96 h-96" /></div>
          <div className="max-w-3xl">
            <h2 className="text-4xl lg:text-5xl font-black mb-10 tracking-tight">System Architecture Pillars</h2>
            <div className="space-y-12">
              {[
                { title: "Iterative Neural Loops", desc: "Every task is optimized through 444 feedback cycles, ensuring peak cognitive ROI.", icon: <ICONS.Layers /> },
                { title: "AGI Agent Hub", desc: "Native hooks into the world's most advanced reasoning models for decision offloading.", icon: <ICONS.Cpu /> },
                { title: "Horizontal Scaling", desc: "Built to expand. Your systems grow exponentially while your manual input decreases.", icon: <ICONS.TrendingUp /> }
              ].map((pillar, i) => (
                <div key={i} className="flex gap-8">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex-shrink-0 flex items-center justify-center text-blue-400">
                    {pillar.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-black mb-3">{pillar.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-lg">{pillar.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="text-center py-12">
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Access the Source Code.</h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join the 44,000+ architects currently running the framework globally. No face. No limits. Just output.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.hash = 'store'}
              className="bg-blue-600 text-white px-12 py-6 rounded-3xl font-black text-xl hover:bg-slate-900 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
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
