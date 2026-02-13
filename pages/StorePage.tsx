
import React, { useState } from 'react';
import { ICONS } from '../constants.tsx';

const StorePage: React.FC = () => {
  const [processingTier, setProcessingTier] = useState<string | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const tiers = [
    {
      id: "starter",
      name: "Starter",
      price: "29",
      description: "The core 444 framework e-book and basic automation templates.",
      features: ["250-Page PDF Guide", "Basic Task Matrices", "Modular Setup Guide", "Email Support"],
      button: "Buy Starter",
      popular: false
    },
    {
      id: "architect",
      name: "Architect",
      price: "99",
      description: "Complete system blueprints plus the private agent deployment library.",
      features: ["Everything in Starter", "Private Github Repository", "Custom LLM Prompts", "Priority AGI Updates", "Video Masterclass"],
      button: "Buy Architect",
      popular: true
    },
    {
      id: "sovereign",
      name: "Sovereign",
      price: "444",
      description: "Full faceless agency setup with 1-on-1 system calibration.",
      features: ["Everything in Architect", "1:1 Strategy Call", "Custom Agent Tuning", "White-label License", "Lifetime VIP Access"],
      button: "Apply Now",
      popular: false
    }
  ];

  const handlePurchase = (tierName: string) => {
    setProcessingTier(tierName);
    // Simulate Stripe session initialization
    setTimeout(() => {
      setShowCheckout(true);
      setProcessingTier(null);
    }, 1500);
  };

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
            className={`relative p-10 rounded-[3rem] border flex flex-col ${
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
            <button 
              onClick={() => handlePurchase(tier.name)}
              disabled={processingTier !== null}
              className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 ${
              tier.popular 
                ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-500/20' 
                : 'bg-slate-900 hover:bg-blue-600 text-white'
            } disabled:opacity-70 cursor-pointer`}
            >
              {processingTier === tier.name ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Securing Session...</span>
                </>
              ) : (
                tier.button
              )}
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

      {/* Simulated Stripe Checkout Overlay */}
      {showCheckout && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row h-[600px] animate-in slide-in-from-bottom-8 duration-500">
            {/* Stripe Brand Sidebar */}
            <div className="w-full md:w-5/12 bg-[#635BFF] p-12 text-white flex flex-col">
              <div className="flex items-center gap-2 mb-12 opacity-80">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <span className="text-[#635BFF] font-black text-xs">4</span>
                </div>
                <span className="font-bold tracking-tight">444 Productivity</span>
              </div>
              <div className="mb-4 text-white/60 font-bold uppercase tracking-widest text-xs">Subscribe to {processingTier || 'Architect'}</div>
              <div className="text-5xl font-black mb-8">$99.00</div>
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70">444 Framework License</span>
                  <span>$99.00</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-4 border-b border-white/10">
                  <span className="opacity-70">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center font-bold pt-2">
                  <span>Total Due</span>
                  <span>$99.00</span>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 opacity-60 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                <span>Powered by <span className="font-black">Stripe</span></span>
              </div>
            </div>
            {/* Payment Info */}
            <div className="flex-grow p-12 overflow-y-auto">
              <button 
                onClick={() => setShowCheckout(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 18"></path></svg>
              </button>
              <h3 className="text-2xl font-black mb-8 text-slate-900 tracking-tight">Pay with card</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Email address</label>
                  <input type="email" placeholder="architect@444.logic" className="w-full border border-slate-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#635BFF] transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Card information</label>
                  <div className="border border-slate-200 rounded-lg overflow-hidden">
                    <input type="text" placeholder="1234 5678 1234 5678" className="w-full px-4 py-3 border-b border-slate-200 focus:outline-none" />
                    <div className="flex">
                      <input type="text" placeholder="MM / YY" className="w-1/2 px-4 py-3 border-r border-slate-200 focus:outline-none" />
                      <input type="text" placeholder="CVC" className="w-1/2 px-4 py-3 focus:outline-none" />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-500 mb-2">Country or region</label>
                  <select className="w-full border border-slate-200 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-[#635BFF]">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>Japan</option>
                  </select>
                </div>
                <button className="w-full bg-[#635BFF] text-white py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-indigo-200">
                  Pay $99.00
                </button>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  By confirming your payment, you allow 444 Productivity to charge your card for this payment and future payments in accordance with their terms.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StorePage;
