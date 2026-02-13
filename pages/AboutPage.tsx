
import React from 'react';
import { ICONS } from '../constants';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 lg:py-24">
      <div className="text-center mb-20">
        <h1 className="text-5xl font-black text-slate-900 mb-6">About 444</h1>
        <div className="w-24 h-2 bg-blue-600 mx-auto rounded-full mb-8"></div>
        <p className="text-xl text-slate-500 leading-relaxed">
          The world's first faceless productivity collective powered by AGI and deep learning.
        </p>
      </div>

      <div className="space-y-24">
        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-black text-slate-900 mb-6">Our Philosophy</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              In a world obsessed with personal branding, 444 focuses on pure output. We believe that true efficiency is anonymous. Our systems are designed to operate without a "face," leveraging the latest LLM technologies to automate the mundane and amplify the strategic.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We don't build influencers. We build architects of autonomous systems.
            </p>
          </div>
          <div className="bg-slate-50 p-12 rounded-[3rem] flex items-center justify-center">
            <ICONS.Layers className="w-32 h-32 text-blue-600 opacity-20" />
          </div>
        </section>

        <section className="bg-blue-600 text-white p-12 rounded-[3rem] shadow-2xl shadow-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div>
              <div className="text-4xl font-black mb-2">100%</div>
              <div className="text-sm text-blue-100 uppercase font-bold tracking-widest">Autonomous</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">444+</div>
              <div className="text-sm text-blue-100 uppercase font-bold tracking-widest">Logic Modules</div>
            </div>
            <div>
              <div className="text-4xl font-black mb-2">∞</div>
              <div className="text-sm text-blue-100 uppercase font-bold tracking-widest">Scalability</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-black text-slate-900 mb-12 text-center">The Framework Pillars</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Deep Learning", desc: "Every workflow is optimized through iterative neural feedback loops." },
              { title: "AGI Integration", desc: "Direct API hooks into upcoming general intelligence models." },
              { title: "Faceless Growth", desc: "Build massive systems without ever showing your face or identity." }
            ].map((pillar, i) => (
              <div key={i} className="bg-white border border-slate-100 p-8 rounded-3xl shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 font-black">
                  0{i + 1}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{pillar.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center pt-12">
          <h2 className="text-2xl font-black text-slate-900 mb-6">Join the Paradigm</h2>
          <p className="text-slate-500 mb-10 max-w-xl mx-auto">
            Ready to stop working harder and start working autonomously?
          </p>
          <button className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-blue-600 transition-colors shadow-lg">
            Download the Documentation
          </button>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;
