
import React, { useState, useMemo } from 'react';
import { ICONS, MARKETPLACE_TOTAL_PAGES } from '../constants';
import { Product } from '../types';

const MarketplacePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');

  // Mock products based on current page to simulate massive variety
  const products = useMemo(() => {
    return Array.from({ length: 12 }).map((_, i) => ({
      id: `p-${currentPage}-${i}`,
      name: `Product Alpha-${(currentPage * 12) + i}`,
      description: `High-efficiency digital asset optimized for performance at scale.`,
      price: Math.floor(Math.random() * 200) + 19,
      category: ['Templates', 'Automation', 'Assets', 'Scripts'][i % 4],
      image: `https://picsum.photos/seed/${currentPage + i}/400/300`
    }));
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < MARKETPLACE_TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900">Marketplace</h1>
          <p className="text-slate-500">Access millions of productivity-enhancing digital assets.</p>
        </div>
        
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Search digital assets..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 px-12 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all"
          />
          <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group">
            <div className="h-48 overflow-hidden relative">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                {product.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">{product.name}</h3>
              <p className="text-xs text-slate-500 mb-4 line-clamp-2">{product.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-black text-slate-900">${product.price}</span>
                <button className="bg-slate-900 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors">
                  <ICONS.ShoppingCart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Massive Pagination UI */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-semibold hover:border-blue-600 hover:text-blue-600 disabled:opacity-50 disabled:hover:border-slate-200 disabled:hover:text-slate-600 transition-all"
          >
            <ICONS.ChevronLeft className="w-5 h-5" />
            Previous
          </button>
          
          <div className="flex flex-col items-center px-8">
            <span className="text-xs text-slate-400 uppercase tracking-widest font-bold mb-1">Page</span>
            <div className="flex items-center gap-2">
              <input 
                type="text" 
                value={currentPage.toLocaleString()} 
                readOnly
                className="w-32 text-center font-black text-xl text-blue-600 bg-transparent border-none focus:outline-none"
              />
              <span className="text-slate-300 font-bold text-lg">/</span>
              <span className="text-slate-400 font-medium">54,883,237,565</span>
            </div>
          </div>

          <button 
            onClick={goToNextPage}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all shadow-lg shadow-blue-100"
          >
            Next
            <ICONS.ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-slate-400 italic">
          Marketplace Memory Active: {products.length} assets indexed on this page.
        </p>
      </div>
    </div>
  );
};

export default MarketplacePage;
