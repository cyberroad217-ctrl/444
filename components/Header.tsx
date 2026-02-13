
import React from 'react';
import { PageType } from '../types';
import { COLORS } from '../constants';

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
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div 
          className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2" 
          onClick={() => onNavigate(PageType.HOME)}
        >
          <span className="text-blue-600">444</span>
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                window.location.hash = item.id;
              }}
              className={`text-sm font-medium transition-colors ${
                currentPage === item.id 
                  ? 'text-blue-600' 
                  : 'text-slate-500 hover:text-blue-600'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate(PageType.STORE)}
            className="bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
          >
            Get E-Book
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
