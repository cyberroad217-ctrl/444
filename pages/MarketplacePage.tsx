
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS, MARKETPLACE_TOTAL_PAGES } from '../constants.tsx';
import { generateProductivityImage } from '../services/geminiService.ts';

const MarketplacePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [productImages, setProductImages] = useState<Record<string, string>>({});

  const categories = ['All', 'Automation', 'Templates', 'Assets', 'Scripts'];

  const products = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      id: `p-${currentPage}-${i}`,
      name: `Module ${String.fromCharCode(65 + (i % 26))}-${(currentPage * 8) + i}`,
      description: `High-efficiency digital asset optimized for performance at scale using 444 AGI logic.`,
      price: Math.floor(Math.random() * 200) + 49,
      category: categories[1 + (i % (categories.length - 1))]
    }));
  }, [currentPage]);

  useEffect(() => {
    let mounted = true;
    
    const loadImages = async () => {
      // Define unique, diverse prompts for each of the 8 product slots
      const themes = [
        "futuristic holographic 3d interface blue",
        "minimalist sleek carbon fiber hardware",
        "abstract neural network glowing connections",
        "clean high-tech server room aesthetic",
        "digital automation data stream neon",
        "modern workspace with transparent displays",
        "cyber security encrypted matrix background",
        "advanced software code visualization nodes"
      ];

      for (let i = 0; i < products.length; i++) {
        if (!mounted) break;
        
        const productId = products[i].id;
        // Skip if we already have an image for this specific ID (rare due to ID structure)
        if (productImages[productId]) continue;

        const img = await generateProductivityImage(themes[i], "asset");
        if (img && mounted) {
          setProductImages(prev => ({
            ...prev,
            [productId]: img
          }));
        }
        
        // Safety stagger to respect the free-tier quota (6 seconds between unique generations)
        await new Promise(r => setTimeout(r, 6000));
      }
    };

    loadImages();
    return () => { mounted = false; };
  }, [currentPage, products]);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'All' || p.category === activeCategory) &&
    (p.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in slide-in-from-bottom-4 duration-700">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Marketplace</h1>
          <p className="text-slate-500 text-lg">Download unique, pre-optimized logic nodes for your system.</p>
        </div>
        
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-grow md:w-80">
            <input 
              type="text" 
              placeholder="Search module index..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 px-12 py-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all font-medium"
            />
            <ICONS.Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Categories</h4>
              <div className="space-y-2">
                {categories.map(c => (
                  <button 
                    key={c}
                    onClick={() => setActiveCategory(c)}
                    className={`w-full text-left px-6 py-3 rounded-xl font-bold transition-all ${activeCategory === c ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-500 hover:bg-slate-50'}`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-slate-900 rounded-[2rem] p-8 text-white border border-blue-900/30">
              <h5 className="font-black mb-4 tracking-tight">Bulk Node Access?</h5>
              <p className="text-xs text-slate-400 mb-6 leading-relaxed">Institutions can license the entire 54B+ unique module index for localized hosting.</p>
              <button className="text-blue-400 text-[10px] font-black uppercase tracking-widest border-b border-blue-400 hover:text-white hover:border-white transition-all">Request Protocol</button>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-grow">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                <div className="h-64 bg-slate-50 relative overflow-hidden">
                  {productImages[product.id] ? (
                    <img 
                      src={productImages[product.id]} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" 
                      alt={product.name} 
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center space-y-3 animate-pulse">
                      <ICONS.Cpu className="w-10 h-10 text-slate-200" />
                      <span className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">Generating_Asset...</span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-blue-600 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-sm">
                    {product.category}
                  </div>
                </div>
                <div className="p-10 flex flex-col flex-grow">
                  <h3 className="text-2xl font-black text-slate-900 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">{product.name}</h3>
                  <p className="text-sm text-slate-500 mb-8 leading-relaxed line-clamp-2">{product.description}</p>
                  <div className="mt-auto flex items-center justify-between">
                    <div>
                      <span className="text-[10px] block font-bold text-slate-400 uppercase tracking-widest mb-1">Value Unit</span>
                      <span className="text-3xl font-black text-slate-900">${product.price}</span>
                    </div>
                    <button className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200">
                      <ICONS.ShoppingCart className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-20 flex justify-center items-center gap-10">
            <button 
              onClick={() => {
                setCurrentPage(p => Math.max(1, p - 1));
                setProductImages({});
              }} 
              disabled={currentPage === 1}
              className="p-6 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 transition-all shadow-sm disabled:opacity-30"
            >
              <ICONS.ChevronLeft />
            </button>
            <div className="text-center">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vector Index</div>
              <div className="text-2xl font-black">{currentPage.toLocaleString()}</div>
            </div>
            <button 
              onClick={() => {
                setCurrentPage(p => p + 1);
                setProductImages({});
              }} 
              className="p-6 bg-blue-600 text-white rounded-2xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-200"
            >
              <ICONS.ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
