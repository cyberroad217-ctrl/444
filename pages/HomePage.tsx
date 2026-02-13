
import React, { useEffect, useState } from 'react';
import { ICONS } from '../constants.tsx';
import { PageType } from '../types.ts';
import { generateProductivityImage } from '../services/geminiService.ts';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [featureImages, setFeatureImages] = useState<(string | null)[]>([null, null, null]);

  useEffect(() => {
    let mounted = true;

    const loadImagesSequentially = async () => {
      // 1. Hero Image - Highest priority
      const hero = await generateProductivityImage(
        "ultra-modern minimalist executive office space with glowing blue holographic interfaces",
        "hero"
      );
      if (mounted) setHeroImage(hero);

      // 2. Feature Images - Staggered with significant delay to respect 429 limits
      const featurePrompts = [
        { prompt: "neural network nodes connecting in a brain shape minimalist", key: "ai" },
        { prompt: "abstract futuristic clock showing time dilation blue", key: "time" },
        { prompt: "top down view of a clean digital nomad workspace professional", key: "focus" }
      ];

      for (let i = 0; i < featurePrompts.length; i++) {
        // Wait 1.5 seconds between calls to avoid burst 429s on the free tier
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        const img = await generateProductivityImage(featurePrompts[i].prompt, featurePrompts[i].key);
        
        if (mounted) {
          setFeatureImages(prev => {
            const next = [...prev];
            next[i] = img;
            return next;
          });
        }
      }
    };

    loadImagesSequentially();

    return () => {
      mounted = false;
    };
  }, []);

  const icons = [
    { icon: <ICONS.Zap className="w-8 h-8" />, label: "Peak Performance", desc: "Unlock cognitive flow states" },
    { icon: <ICONS.Cpu className="w-8 h-8" />, label: "AI Integration", desc: "Offload tasks to LLM agents" },
    { icon: <ICONS.Layers className="w-8 h-8" />, label: "Modular Systems", desc: "Scalable productivity stacks" },
    { icon: <ICONS.TrendingUp className="w-8 h-8" />, label: "Growth Engine", desc: "Exponential personal ROI" },
  ];

  return (
    <div className="animate-in fade-in duration-1000">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-24 lg:pb-32">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              System Version 2.5.AGI
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-6 tracking-tighter">
              The <span className="text-blue-600">444</span> Paradigm for High-Output
            </h1>
            <p className="text-xl text-slate-600 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              A faceless, high-efficiency framework leveraging deep learning and AGI agents to automate your digital existence.
            </p>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button 
                onClick={() => onNavigate(PageType.STORE)}
                className="bg-blue-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-200 active:scale-95"
              >
                Buy E-Book $29.99
              </button>
              <button 
                onClick={() => onNavigate(PageType.MARKETPLACE)}
                className="bg-white text-blue-600 border-2 border-blue-600 px-10 py-5 rounded-full text-lg font-bold hover:bg-blue-50 transition-all active:scale-95"
              >
                Explore Marketplace
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-100 rounded-full blur-[100px] opacity-40 animate-pulse"></div>
            <div className="relative rounded-3xl overflow-hidden shadow-[0_32px_64px_-16px_rgba(59,130,246,0.3)] border border-slate-100 aspect-[4/3] bg-slate-50">
              {heroImage ? (
                <img 
                  src={heroImage} 
                  alt="444 Framework Hero" 
                  className="w-full h-full object-cover animate-in fade-in duration-1000" 
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center space-y-4">
                  <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">Synthesizing Visuals...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Icon Grid */}
      <section className="bg-slate-50 py-24 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Core Infrastructure</h2>
            <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {icons.map((item, i) => (
              <div 
                key={i} 
                className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all cursor-pointer group"
                onClick={() => onNavigate(PageType.ABOUT)}
              >
                <div className="bg-blue-50 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.label}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Showcase */}
      <section className="py-24 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {featureImages.map((img, idx) => (
            <div key={idx} className="space-y-6 group">
              <div className="rounded-[2rem] overflow-hidden aspect-video bg-slate-50 border border-slate-100 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                {img ? (
                  <img src={img} alt={`Feature ${idx}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center animate-pulse space-y-2">
                    <ICONS.Layers className="text-slate-200 w-10 h-10" />
                    <span className="text-[10px] text-slate-300 font-bold uppercase tracking-tighter">Module Initialization</span>
                  </div>
                )}
              </div>
              <div className="px-2">
                <div className="text-blue-600 font-mono text-[10px] font-bold tracking-[0.2em] mb-2 uppercase">Sub-System {idx + 444}</div>
                <h4 className="text-2xl font-black text-slate-900 mb-3">Architectural Scalability</h4>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Deep-learning optimized systems designed to scale horizontally without human intervention. 100% faceless, 100% results.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-slate-900 rounded-[3rem] p-12 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute -top-20 -right-20 p-8 opacity-10">
              <ICONS.Zap className="w-96 h-96 text-blue-500" />
            </div>
            <div className="relative z-10">
              <h2 className="text-4xl lg:text-6xl font-black mb-8 tracking-tighter">Exit the Noise.<br/><span className="text-blue-500">Enter the Framework.</span></h2>
              <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                The only guide you need to dominate the digital age using the latest LLM and AGI breakthroughs. Tomorrow is already automated.
              </p>
              <button 
                onClick={() => onNavigate(PageType.STORE)}
                className="bg-blue-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20 active:scale-95"
              >
                Secure Instant Access
              </button>
              <div className="mt-8 flex items-center justify-center gap-6 text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                <span>Direct Download</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>Lifetime Updates</span>
                <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                <span>AGI Readiness</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
