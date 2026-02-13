
import React from 'react';
import { ICONS } from '../constants';

const StorePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 lg:py-24 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <div className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            Featured Release
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-slate-900 leading-tight mb-8">
            The <span className="text-blue-600">444</span> Productivity Framework
          </h1>
          <p className="text-xl text-slate-600 mb-8 leading-relaxed">
            A 250-page digital manual detailing the exact methodology for building an autonomous productivity system that requires zero personal branding.
          </p>
          
          <div className="space-y-4 mb-10">
            {[
              "LLM-Powered Workflow Automation",
              "Chain-of-Thought Decision Matrices",
              "Faceless Branding Architectures",
              "AGI Agent Deployment Guides",
              "Exponential Output Calibration"
            ].map(item => (
              <div key={item} className="flex items-center gap-3 text-slate-700">
                <div className="bg-blue-600 rounded-full p-1 text-white">
                  <ICONS.ChevronRight className="w-3 h-3" />
                </div>
                <span className="font-medium">{item}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-8 bg-slate-50 p-8 rounded-3xl border border-slate-100">
            <div>
              <div className="text-sm text-slate-400 font-bold uppercase mb-1">Price</div>
              <div className="text-4xl font-black text-slate-900">$29.99</div>
            </div>
            <button className="flex-grow bg-blue-600 text-white py-5 rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-200">
              Instant Download
            </button>
          </div>
          <p className="mt-4 text-center text-xs text-slate-400 italic">
            Secure payment powered by encrypted deep learning protocols.
          </p>
        </div>

        <div className="order-1 lg:order-2 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-8 bg-blue-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
            <div className="relative bg-white p-4 rounded-[2rem] shadow-2xl border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-700">
              <div className="w-80 h-[480px] bg-slate-900 rounded-[1.5rem] overflow-hidden flex flex-col p-8 text-white">
                <div className="mb-12">
                  <div className="text-4xl font-black mb-2 text-blue-500">444</div>
                  <div className="h-1 w-12 bg-blue-500 rounded-full"></div>
                </div>
                
                <div className="flex-grow flex flex-col justify-center">
                  <h2 className="text-3xl font-black leading-tight mb-4 uppercase tracking-tighter">
                    Productivity <br/>Framework
                  </h2>
                  <p className="text-xs text-slate-400 font-mono">V.2.5.AGI - AUTONOMOUS EDITION</p>
                </div>
                
                <div className="flex items-end justify-between border-t border-slate-800 pt-8">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Digital Intelligence</div>
                  <ICONS.Zap className="w-8 h-8 text-blue-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StorePage;
