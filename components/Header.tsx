
import React from 'react';
import { PageType } from '../types';

interface HeaderProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: PageType.HOME, label: 'Home' },
    { id: PageType.MARKETPLACE, label: 'Marketplace' },
    { id: PageType.BLOG, label: 'AI Blog' },
    { id: PageType.STORE, label: 'Store' },
    { id: PageType.ABOUT, label: 'About' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 h-12 flex items-center justify-between">
        <div 
          className="text-lg font-black tracking-tighter cursor-pointer flex items-center gap-1" 
          onClick={() => onNavigate(PageType.HOME)}
        >
          <span className="text-blue-600">444</span>
          <span className="w-1 h-1 rounded-full bg-blue-600"></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                window.location.hash = item.id;
              }}
              className={`text-[11px] font-bold tracking-tight transition-colors uppercase ${
                currentPage === item.id 
                  ? 'text-blue-600' 
                  : 'text-slate-400 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
          <a 
            href="https://productivityprotocol.netlify.app/#/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[11px] font-bold tracking-tight text-slate-400 hover:text-blue-600 flex items-center gap-1 group uppercase"
          >
            Hub
            <svg className="w-2.5 h-2.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => onNavigate(PageType.STORE)}
            className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-[10px] font-black hover:bg-blue-700 transition-all shadow-sm active:scale-95"
          >
            GET E-BOOK
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
