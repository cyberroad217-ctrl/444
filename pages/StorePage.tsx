
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
      "Securing Session Node...",
      "Encrypting Payment Vector (AES-256)...",
      "Handshaking with checkout.stripe.com...",
      "Stripe API Handshake: 100% Verified.",
      "Finalizing Secure Redirect..."
    ];

    statuses.forEach((status, i) => {
      setTimeout(() => setRedirectStatus(status), i * 600);
    });

    setTimeout(() => {
      setRedirecting(false);
      setShowCheckout(true);
    }, 3200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      {/* Top Banner / Social Proof */}
      <div className="mb-12 overflow-hidden bg-slate-50 border border-slate-100 rounded-2xl p-3 flex items-center gap-6 group">
        <div className="flex-shrink-0 bg-blue-600 text-white px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest">Global Sync Feed</div>
        <div className="flex-grow flex items-center gap-8 overflow-hidden whitespace-nowrap">
          {recentSyncs.length > 0 ? recentSyncs.map((sync, i) => (
            <span key={i} className="text-[10px] font-mono text-slate-400 animate-in slide-in-from-right-4 duration-500">[{new Date().toLocaleTimeString()}] {sync}</span>
          )) : <span className="text-[10px] font-mono text-slate-300">Listening for network transactions...</span>}
        </div>
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl lg:text-5xl font-black mb-3 tracking-tighter">System <span className="text-blue-600">Acquisition</span></h1>
        <p className="text-slate-500 font-medium text-lg max-w-2xl mx-auto leading-relaxed">Select your level of integration. Assets are delivered instantly upon verification.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-20">
        {tiers.map((tier, i) => (
          <div key={i} className={`p-8 rounded-[2rem] border flex flex-col transition-all hover:shadow-xl ${tier.popular ? 'bg-slate-900 text-white border-blue-600 shadow-2xl scale-105 z-10' : 'bg-white border-slate-100 shadow-sm'}`}>
            {tier.popular && <div className="bg-blue-600 text-white text-[9px] font-black px-3 py-1 rounded-full self-center mb-4 uppercase tracking-[0.2em] -mt-10">Recommended</div>}
            <h3 className="text-xl font-black mb-2 tracking-tight">{tier.name}</h3>
            <div className="text-4xl font-black mb-6">${tier.price}<span className="text-base opacity-50">.00</span></div>
            <ul className="space-y-3 mb-8 flex-grow">
              {tier.features.map((f, j) => (
                <li key={j} className="flex items-center gap-2.5 text-xs font-bold opacity-80">
                  <ICONS.Zap className="w-3.5 h-3.5 text-blue-600" /> {f}
                </li>
              ))}
            </ul>
            <button onClick={() => handlePurchase(tier)} className={`w-full py-4 rounded-xl font-black text-sm transition-all active:scale-95 ${tier.popular ? 'bg-blue-600 shadow-lg shadow-blue-500/20' : 'bg-slate-900 text-white hover:bg-blue-600'}`}>
              {tier.button}
            </button>
          </div>
        ))}
      </div>

      {/* Trust Wall */}
      <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale items-center py-8 border-t border-slate-50">
        <div className="flex items-center gap-2 font-black text-xs tracking-widest"><ICONS.Zap className="w-5 h-5"/> SSL SECURE</div>
        <div className="flex items-center gap-2 font-black text-xs tracking-widest"><ICONS.Cpu className="w-5 h-5"/> INSTANT DEPLOY</div>
        <div className="flex items-center gap-2 font-black text-xs tracking-widest"><ICONS.Layers className="w-5 h-5"/> STRIPE VERIFIED</div>
        <div className="flex items-center gap-2 font-black text-xs tracking-widest"><ICONS.TrendingUp className="w-5 h-5"/> LOGIC UPDATES</div>
      </div>

      {/* Redirection Overlay */}
      {redirecting && (
        <div className="fixed inset-0 z-[120] bg-white flex flex-col items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-10 flex justify-center">
              <div className="w-16 h-16 bg-[#635BFF] rounded-2xl flex items-center justify-center animate-pulse shadow-xl shadow-indigo-100">
                <ICONS.Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mb-2 tracking-tight">Redirecting to Stripe</h2>
            <div className="font-mono text-[9px] text-blue-600 uppercase tracking-[0.3em] mb-8 bg-blue-50 py-3 px-6 rounded-xl border border-blue-100">
              {redirectStatus}
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#635BFF] h-full animate-[progress_3s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      {/* Stripe Checkout Mock */}
      {showCheckout && selectedTier && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[580px] animate-in zoom-in-95 duration-500">
            <div className="w-full md:w-5/12 bg-[#635BFF] p-10 text-white flex flex-col relative overflow-hidden">
              <div className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-3 relative z-10">Order Summary</div>
              <div className="text-3xl font-black mb-6 relative z-10">${selectedTier.price}.00</div>
              <div className="flex-grow space-y-3 text-xs font-bold opacity-80 relative z-10">
                <div className="flex justify-between"><span>{selectedTier.name} System License</span><span>${selectedTier.price}.00</span></div>
                <div className="flex justify-between border-t border-white/20 pt-3"><span>Total Due</span><span>${selectedTier.price}.00</span></div>
              </div>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-black opacity-60 uppercase relative z-10">
                <ICONS.Zap className="w-3.5 h-3.5" /> Powered by Stripe
              </div>
            </div>
            <div className="flex-grow p-10 relative overflow-y-auto">
              <button onClick={() => setShowCheckout(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="text-xl font-black mb-8 tracking-tight">Payment Protocol</h3>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Vector</label>
                  <input type="email" placeholder="architect@node.444" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#635BFF] outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Card Details</label>
                  <div className="border border-slate-100 rounded-lg overflow-hidden shadow-sm">
                    <input type="text" placeholder="Card Number" className="w-full bg-slate-50 p-3.5 text-sm border-b border-slate-100 outline-none focus:bg-white transition-colors" />
                    <div className="flex">
                      <input type="text" placeholder="MM / YY" className="w-1/2 bg-slate-50 p-3.5 text-sm border-r border-slate-100 outline-none focus:bg-white transition-colors" />
                      <input type="text" placeholder="CVC" className="w-1/2 bg-slate-50 p-3.5 text-sm outline-none focus:bg-white transition-colors" />
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-black text-base shadow-lg shadow-indigo-100 hover:brightness-110 active:scale-[0.98] transition-all">
                  Pay ${selectedTier.price}.00
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
};

export default StorePage;
