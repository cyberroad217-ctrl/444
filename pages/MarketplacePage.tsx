
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS, MARKETPLACE_TOTAL_PAGES } from '../constants.tsx';
import { generateProductivityImage } from '../services/geminiService.ts';

const MarketplacePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpInput, setJumpInput] = useState('');
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  
  // Purchase states
  const [processingItem, setProcessingItem] = useState<any | null>(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  const categories = ['All', 'Automation', 'Templates', 'Assets', 'Scripts'];

  // Algorithmically generate unique products based on the page seed
  const products = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const globalIndex = ((currentPage - 1) * 8) + i + 1;
      const seedChar = String.fromCharCode(65 + ((globalIndex + currentPage) % 26));
      return {
        id: `p-${currentPage}-${i}`,
        name: `Module ${seedChar}-${globalIndex.toLocaleString()}`,
        description: `High-efficiency digital asset optimized for performance at vector ${globalIndex}. Built with 444 AGI logic.`,
        price: Math.floor(((globalIndex % 500) + 49) * 1),
        category: categories[1 + ((globalIndex + currentPage) % (categories.length - 1))]
      };
    });
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > MARKETPLACE_TOTAL_PAGES) return;
    setIsSyncing(true);
    setProductImages({});
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => setIsSyncing(false), 800);
  };

  const handleJump = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseInt(jumpInput.replace(/,/g, ''));
    if (!isNaN(val) && val >= 1 && val <= MARKETPLACE_TOTAL_PAGES) {
      handlePageChange(val);
      setJumpInput('');
    }
  };

  const handlePurchase = (product: any) => {
    setProcessingItem(product.id);
    setSelectedProduct(product);
    // Simulate Stripe session initialization
    setTimeout(() => {
      setShowCheckout(true);
      setProcessingItem(null);
    }, 1200);
  };

  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      const baseThemes = [
        "futuristic holographic blue interface",
        "minimalist carbon fiber node",
        "abstract neural glowing network",
        "clean high-tech server room",
        "digital data stream neon",
        "modern display workspace",
        "cyber security encrypted matrix",
        "advanced software visualization"
      ];

      for (let i = 0; i < products.length; i++) {
        if (!mounted) break;
        const productId = products[i].id;
        if (productImages[productId]) continue;
        const uniqueTheme = `${baseThemes[i]} variation seed ${currentPage}`;
        const img = await generateProductivityImage(uniqueTheme, "asset");
        if (img && mounted) {
          setProductImages(prev => ({ ...prev, [productId]: img }));
        }
        await new Promise(r => setTimeout(r, 4500));
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
    <div className={`max-w-7xl mx-auto px-4 py-12 transition-opacity duration-500 ${isSyncing ? 'opacity-30' : 'opacity-100'}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-5xl font-black text-slate-900 tracking-tight mb-2">Marketplace</h1>
          <p className="text-slate-500 text-lg">Browsing <span className="text-blue-600 font-bold">{MARKETPLACE_TOTAL_PAGES.toLocaleString()}</span> unique logic vectors.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
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
              <h5 className="font-black mb-4 tracking-tight">Direct Vector Jump</h5>
              <form onSubmit={handleJump} className="space-y-4">
                <input 
                  type="text" 
                  value={jumpInput}
                  onChange={(e) => setJumpInput(e.target.value)}
                  placeholder="Enter page #"
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all">
                  Sync Vector
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="flex-grow">
          {isSyncing ? (
            <div className="flex flex-col items-center justify-center h-96 gap-4">
              <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-black uppercase tracking-widest text-blue-600">Re-indexing Node {currentPage}...</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-in fade-in duration-500">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-[3.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full">
                  <div className="h-64 bg-slate-50 relative overflow-hidden">
                    {productImages[product.id] ? (
                      <img src={productImages[product.id]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={product.name} />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center space-y-3 animate-pulse">
                        <ICONS.Cpu className="w-10 h-10 text-slate-200" />
                        <span className="text-[8px] font-mono text-slate-300 uppercase tracking-widest">Synthesizing...</span>
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
                      <button 
                        onClick={() => handlePurchase(product)}
                        disabled={processingItem === product.id}
                        className="bg-slate-900 text-white p-5 rounded-2xl hover:bg-blue-600 transition-all shadow-lg hover:shadow-blue-200 flex items-center justify-center disabled:opacity-50"
                      >
                        {processingItem === product.id ? (
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : (
                          <ICONS.ShoppingCart className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-20 flex flex-col items-center gap-8">
            <div className="flex items-center gap-6">
              <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1 || isSyncing} className="p-6 bg-white border border-slate-200 rounded-3xl hover:border-blue-600 transition-all shadow-sm disabled:opacity-30 group">
                <ICONS.ChevronLeft className="group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="text-center px-12 py-6 bg-slate-50 rounded-[2.5rem] border border-slate-100 min-w-[240px]">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Vector Index</div>
                <div className="text-3xl font-black text-slate-900">{currentPage.toLocaleString()}</div>
              </div>
              <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage >= MARKETPLACE_TOTAL_PAGES || isSyncing} className="p-6 bg-blue-600 text-white rounded-3xl hover:bg-slate-900 transition-all shadow-xl shadow-blue-200 disabled:opacity-30 group">
                <ICONS.ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            <div className="flex items-center gap-4 text-slate-300 font-mono text-[10px] uppercase tracking-[0.4em]">
              <div className="h-px w-20 bg-slate-100"></div>
              <span>Protocol Depth: {MARKETPLACE_TOTAL_PAGES.toLocaleString()}</span>
              <div className="h-px w-20 bg-slate-100"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Simulated Stripe Checkout Overlay */}
      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-[0_0_100px_rgba(0,0,0,0.2)] overflow-hidden flex flex-col md:flex-row h-[600px] animate-in slide-in-from-bottom-8 duration-500">
            <div className="w-full md:w-5/12 bg-[#635BFF] p-12 text-white flex flex-col">
              <div className="flex items-center gap-2 mb-12 opacity-80">
                <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center">
                  <span className="text-[#635BFF] font-black text-xs">4</span>
                </div>
                <span className="font-bold tracking-tight">444 Marketplace</span>
              </div>
              <div className="mb-4 text-white/60 font-bold uppercase tracking-widest text-xs">Purchase {selectedProduct.name}</div>
              <div className="text-5xl font-black mb-8">${selectedProduct.price}.00</div>
              <div className="space-y-4 flex-grow">
                <div className="flex justify-between items-center text-sm">
                  <span className="opacity-70">{selectedProduct.name} License</span>
                  <span>${selectedProduct.price}.00</span>
                </div>
                <div className="flex justify-between items-center text-sm pb-4 border-b border-white/10">
                  <span className="opacity-70">Tax</span>
                  <span>$0.00</span>
                </div>
                <div className="flex justify-between items-center font-bold pt-2">
                  <span>Total Due</span>
                  <span>${selectedProduct.price}.00</span>
                </div>
              </div>
              <div className="mt-auto flex items-center gap-2 opacity-60 text-xs">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                <span>Powered by <span className="font-black">Stripe</span></span>
              </div>
            </div>
            <div className="flex-grow p-12 overflow-y-auto relative">
              <button onClick={() => setShowCheckout(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
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
                  </select>
                </div>
                <button className="w-full bg-[#635BFF] text-white py-4 rounded-lg font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-indigo-200">
                  Pay ${selectedProduct.price}.00
                </button>
                <p className="text-[10px] text-slate-400 text-center leading-relaxed">
                  Secure transmission. Module {selectedProduct.id} will be deployed to your primary node instantly after verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplacePage;
