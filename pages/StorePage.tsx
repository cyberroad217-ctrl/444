
import React, { useState, useEffect } from 'react';
import { ICONS } from '../constants.tsx';

const StorePage: React.FC = () => {
  const [redirecting, setRedirecting] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState("Initializing...");
  const [selectedTier, setSelectedTier] = useState<any>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [recentSyncs, setRecentSyncs] = useState<string[]>([]);

  useEffect(() => {
    const architects = ["Agent-44", "Architect_09", "Node_Master", "Ghost_Logic", "Neural_Path", "Protocol_X"];
    const actions = ["Synced Starter", "Secured Architect", "Deployed Sovereign", "Integrated Node"];
    
    const interval = setInterval(() => {
      const arch = architects[Math.floor(Math.random() * architects.length)];
      const act = actions[Math.floor(Math.random() * actions.length)];
      setRecentSyncs(prev => [ `${arch} just ${act}...`, ...prev.slice(0, 4) ].filter(Boolean));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const tiers = [
    { name: "Starter", price: "29", features: ["250-Page PDF Guide", "Task Matrices", "Modular Setup"], button: "Buy Starter" },
    { name: "Architect", price: "99", features: ["Everything in Starter", "Private Github Repo", "Video Masterclass"], button: "Buy Architect", popular: true },
    { name: "Sovereign", price: "444", features: ["1:1 Strategy Call", "Custom Agent Tuning", "White-label License"], button: "Apply Now" }
  ];

  const handlePurchase = (tier: any) => {
    setSelectedTier(tier);
    setRedirecting(true);
    
    const statuses = [
      "Securing Session...",
      "Encrypting Vector...",
      "Handshaking...",
      "Verified."
    ];

    statuses.forEach((status, i) => {
      setTimeout(() => setRedirectStatus(status), i * 500);
    });

    setTimeout(() => {
      setRedirecting(false);
      setShowCheckout(true);
    }, 2200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Top Banner */}
      <div className="mb-10 overflow-hidden bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-center gap-4">
        <div className="flex-shrink-0 bg-blue-600 text-white px-2 py-1 rounded text-[7px] font-black uppercase tracking-widest">LIVE SYNC</div>
        <div className="flex-grow flex items-center gap-6 overflow-hidden whitespace-nowrap">
          {recentSyncs.length > 0 ? recentSyncs.map((sync, i) => (
            <span key={i} className="text-[9px] font-mono text-slate-400 animate-in slide-in-from-right-4 duration-500">[{new Date().toLocaleTimeString()}] {sync}</span>
          )) : <span className="text-[9px] font-mono text-slate-300">Listening for network transactions...</span>}
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-2xl font-black mb-2 tracking-tighter uppercase">System <span className="text-blue-600">Acquisition</span></h1>
        <p className="text-slate-400 text-xs max-w-lg mx-auto leading-relaxed">Select integration level. Digital assets delivered upon node verification.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-16">
        {tiers.map((tier, i) => (
          <div key={i} className={`p-6 rounded-xl border flex flex-col transition-all hover:translate-y-[-2px] ${tier.popular ? 'bg-slate-900 text-white border-blue-600 shadow-xl z-10' : 'bg-white border-slate-100'}`}>
            {tier.popular && <div className="bg-blue-600 text-white text-[7px] font-black px-2 py-0.5 rounded-full self-start mb-3 uppercase tracking-widest">Recommended</div>}
            <h3 className="text-base font-black mb-1 tracking-tight">{tier.name}</h3>
            <div className="text-3xl font-black mb-4">${tier.price}<span className="text-xs opacity-50">.00</span></div>
            <ul className="space-y-2 mb-6 flex-grow">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2 text-[10px] font-bold opacity-80">
                  <ICONS.Zap className="w-3 h-3 text-blue-600 flex-shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handlePurchase(tier)} className={`w-full py-3 rounded-md font-black text-[10px] transition-all active:scale-95 ${tier.popular ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>
              {tier.button.toUpperCase()}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Strip */}
      <div className="flex flex-wrap justify-center gap-8 opacity-30 grayscale items-center py-6 border-t border-slate-100">
        <div className="flex items-center gap-1.5 font-black text-[8px] tracking-widest uppercase"><ICONS.Zap className="w-3.5 h-3.5"/> SSL SECURE</div>
        <div className="flex items-center gap-1.5 font-black text-[8px] tracking-widest uppercase"><ICONS.Layers className="w-3.5 h-3.5"/> STRIPE VERIFIED</div>
      </div>
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
};

export default StorePage;
