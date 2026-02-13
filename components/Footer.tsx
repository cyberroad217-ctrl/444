
import React from 'react';
import { PageType } from '../types';

interface FooterProps {
  onNavigate: (page: PageType) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-50 border-t border-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="text-2xl font-black tracking-tighter flex items-center gap-2">
              <span className="text-blue-600">444</span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
            </div>
            <p className="text-sm text-slate-500 max-w-xs">
              Redefining productivity through the lens of deep learning and AGI architecture. A faceless framework for maximum output.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Platform</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate(PageType.MARKETPLACE)} className="text-sm text-slate-500 hover:text-blue-600">Marketplace</button></li>
              <li><button onClick={() => onNavigate(PageType.BLOG)} className="text-sm text-slate-500 hover:text-blue-600">AI Insights</button></li>
              <li><button onClick={() => onNavigate(PageType.STORE)} className="text-sm text-slate-500 hover:text-blue-600">Resources</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-2">
              <li><button onClick={() => onNavigate(PageType.ABOUT)} className="text-sm text-slate-500 hover:text-blue-600">About Us</button></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-slate-500 hover:text-blue-600">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-slate-900 mb-4">Newsletter</h4>
            <p className="text-sm text-slate-500 mb-4">Subscribe for AI-generated productivity hacks.</p>
            <div className="flex">
              <input type="email" placeholder="Email address" className="bg-white border border-slate-200 px-4 py-2 rounded-l-md w-full focus:outline-none focus:ring-1 focus:ring-blue-600" />
              <button className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700">Join</button>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">© 2024 444 Productivity Framework. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-slate-400">
            <span>Built with Nano Banana 2.5</span>
            <span>AGI Agent Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
