
import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="text-xl font-black tracking-tighter flex items-center gap-1.5">
              <span className="text-blue-600">444</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed font-medium">
              Redefining productivity through the lens of deep learning and AGI architecture. A faceless framework for maximum output.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-[10px] mb-4 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate(PageType.HOME)} className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate(PageType.MARKETPLACE)} className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors">Marketplace</button></li>
              <li><button onClick={() => onNavigate(PageType.STORE)} className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors">Digital Store</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-[10px] mb-4 uppercase tracking-widest">External</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://productivityprotocol.netlify.app/#/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                >
                  Protocol Hub
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
              <li><button onClick={() => onNavigate(PageType.BLOG)} className="text-[11px] text-slate-500 hover:text-blue-600 transition-colors">AI Insights Blog</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-[10px] mb-4 uppercase tracking-widest">Newsletter</h4>
            <div className="flex h-9 shadow-sm rounded-lg overflow-hidden">
              <input 
                type="email" 
                placeholder="architect@node.444" 
                className="bg-white border border-slate-200 px-3 py-1 text-[11px] w-full focus:outline-none focus:ring-1 focus:ring-blue-600" 
              />
              <button className="bg-blue-600 text-white px-3 py-1 text-[11px] font-black hover:bg-blue-700 transition-colors">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">© 2024 444 Framework. Logic Over Identity.</p>
          <div className="flex gap-4 text-[10px] text-slate-400 font-bold">
            <span className="opacity-50">GEMINI-POWERED</span>
            <span className="text-blue-500/50 uppercase tracking-widest">Verified Logic Node</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
