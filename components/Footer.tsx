
import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="text-xl font-black tracking-tighter flex items-center gap-1.5">
              <span className="text-blue-600">444</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs leading-relaxed">
              Redefining productivity through the lens of deep learning and AGI architecture. A faceless framework for maximum output.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-3 uppercase tracking-widest">Platform</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate(PageType.MARKETPLACE)} className="text-[11px] text-slate-500 hover:text-blue-600">Marketplace</button></li>
              <li><button onClick={() => onNavigate(PageType.BLOG)} className="text-[11px] text-slate-500 hover:text-blue-600">AI Insights</button></li>
              <li><a href="https://productivityprotocol.netlify.app/#/" target="_blank" rel="noopener noreferrer" className="text-[11px] text-slate-500 hover:text-blue-600">Protocol Hub</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-3 uppercase tracking-widest">Company</h4>
            <ul className="space-y-1.5">
              <li><button onClick={() => onNavigate(PageType.ABOUT)} className="text-[11px] text-slate-500 hover:text-blue-600">About Us</button></li>
              <li><a href="#" className="text-[11px] text-slate-500 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-[11px] text-slate-500 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 text-xs mb-3 uppercase tracking-widest">Newsletter</h4>
            <div className="flex h-9">
              <input type="email" placeholder="Email address" className="bg-white border border-slate-200 px-3 py-1 text-[11px] rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-600" />
              <button className="bg-blue-600 text-white px-3 py-1 text-[11px] font-bold rounded-r-md hover:bg-blue-700">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col md:row items-center justify-between gap-3">
          <p className="text-[10px] text-slate-400">© 2024 444 Productivity Framework. All rights reserved.</p>
          <div className="flex gap-4 text-[10px] text-slate-400">
            <span>Built with Nano Banana 2.5</span>
            <span className="text-blue-500/50">AGI Agent Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
