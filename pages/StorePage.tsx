
import React from 'react';
import { ICONS } from '../constants.tsx';

const StorePage: React.FC = () => {
  const tiers = [
    {
      name: "Starter",
      price: "29",
      description: "The core 444 framework e-book and basic automation templates.",
      features: ["250-Page PDF Guide", "Basic Task Matrices", "Modular Setup Guide", "Email Support"],
      button: "Buy Starter",
      popular: false
    },
    {
      name: "Architect",
      price: "99",
      description: "Complete system blueprints plus the private agent deployment library.",
      features: ["Everything in Starter", "Private Github Repository", "Custom LLM Prompts", "Priority AGI Updates", "Video Masterclass"],
      button: "Buy Architect",
      popular: true
    },
    {
      name: "Sovereign",
      price: "444",
      description: "Full faceless agency setup with 1-on-1 system calibration.",
      features: ["Everything in Architect", "1:1 Strategy Call", "Custom Agent Tuning", "White-label License", "Lifetime VIP Access"],
      button: "Apply Now",
      popular: false
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24 animate-in fade-in duration-1000">
      <div className="text-center mb-20">
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 mb-6 tracking-tighter">
          Secure the <span className="text-blue-600">Framework</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          Select your level of integration. All assets are digital and delivered instantly via encrypted transmission.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {tiers.map((tier, idx) => (
          <div 
            key={idx} 
            className={`relative p-10 rounded-[3rem] border ${
              tier.popular 
                ? 'bg-slate-900 text-white border-blue-600 shadow-2xl scale-105 z-10' 
                : 'bg-white text-slate-900 border-slate-100 shadow-xl'
            } transition-all hover:-translate-y-2`}
          >
            {tier.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Most Optimized
              </div>
            )}
            <div className="mb-8">
              <h3 className="text-2xl font-black mb-2 tracking-tight">{tier.name}</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-sm font-bold opacity-50">$</span>
                <span className="text-5xl font-black">{tier.price}</span>
                <span className="text-sm font-bold opacity-50">.00</span>
              </div>
            </div>
            <p className={`text-sm mb-8 leading-relaxed ${tier.popular ? 'text-slate-400' : 'text-slate-500'}`}>
              {tier.description}
            </p>
            <ul className="space-y-4 mb-10 flex-grow">
              {tier.features.map((feat, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <ICONS.Zap className={`w-4 h-4 ${tier.popular ? 'text-blue-500' : 'text-blue-600'}`} />
                  {feat}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-2xl font-black transition-all ${
              tier.popular 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20' 
                : 'bg-slate-900 hover:bg-blue-600 text-white'
            }`}>
              {tier.button}
            </button>
          </div>
        ))}
      </div>

      <div className="bg-slate-50 rounded-[3rem] p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-grow">
          <h2 className="text-3xl font-black mb-4">Institutional Inquiries</h2>
          <p className="text-slate-500 max-w-xl">
            For venture funds or large-scale digital agencies requiring bulk 444 licensing and dedicated AGI node hosting.
          </p>
        </div>
        <button className="bg-white border-2 border-slate-900 text-slate-900 px-10 py-5 rounded-2xl font-black hover:bg-slate-900 hover:text-white transition-all">
          Contact Protocol
        </button>
      </div>
    </div>
  );
};

export default StorePage;
