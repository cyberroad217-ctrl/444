
import React, { useState, useEffect, useMemo } from 'react';
import { ICONS, MARKETPLACE_TOTAL_PAGES } from '../constants.tsx';
import { generateProductivityImage } from '../services/geminiService.ts';

const MarketplacePage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [jumpInput, setJumpInput] = useState('');
  const [productImages, setProductImages] = useState<Record<string, string>>({});
  const [isSyncing, setIsSyncing] = useState(false);
  
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [redirecting, setRedirecting] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [redirectStatus, setRedirectStatus] = useState("Initializing...");

  const categories = ['All', 'Automation', 'Templates', 'Assets', 'Scripts'];

  const products = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => {
      const globalIndex = ((currentPage - 1) * 8) + i + 1;
      const seedChar = String.fromCharCode(65 + ((globalIndex + currentPage) % 26));
      return {
        id: `m-${currentPage}-${i}`,
        name: `Module ${seedChar}-${globalIndex.toLocaleString()}`,
        description: `Autonomous logic unit optimized for vector ${globalIndex.toLocaleString()}.`,
        price: Math.floor(((globalIndex % 400) + 29)),
        category: categories[1 + ((globalIndex + i) % (categories.length - 1))]
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

  const handlePurchase = (product: any) => {
    setSelectedProduct(product);
    setRedirecting(true);
    
    const statuses = [
      "Securing Session Node...",
      "Encrypting Module Metadata...",
      "Handshaking with payment node...",
      "Protocol Verified: 200 OK",
      "Rerouting to encrypted terminal..."
    ];

    statuses.forEach((status, i) => {
      setTimeout(() => setRedirectStatus(status), i * 600);
    });

    setTimeout(() => {
      setRedirecting(false);
      setShowCheckout(true);
    }, 3200);
  };

  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      const themes = ["holographic circuit", "cyber obsidian", "neon silicon", "quantum glass", "liquid chrome", "dark cobalt", "minimal carbon"];
      const modifiers = ["logic core", "neural asset", "system display", "automation node", "encrypted matrix"];

      for (let i = 0; i < products.length; i++) {
        if (!mounted) break;
        const productId = products[i].id;
        if (productImages[productId]) continue;

        const theme = themes[(currentPage + i) % themes.length];
        const modifier = modifiers[(currentPage * i) % modifiers.length];
        const uniqueTheme = `${theme} ${modifier} asset node index ${currentPage}-${i}`;
        
        const img = await generateProductivityImage(uniqueTheme, "asset");
        if (img && mounted) setProductImages(prev => ({ ...prev, [productId]: img }));
        await new Promise(r => setTimeout(r, 4500));
      }
    };
    loadImages();
    return () => { mounted = false; };
  }, [currentPage, products]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div>
          <h1 className="text-4xl font-black mb-1.5 tracking-tighter">Marketplace</h1>
          <p className="text-slate-500 text-sm font-medium">Browsing vector space depth: <span className="text-blue-600 font-bold">{MARKETPLACE_TOTAL_PAGES.toLocaleString()}</span></p>
        </div>
        <div className="bg-slate-900 p-4 rounded-2xl text-white flex gap-3 items-center w-full md:w-auto shadow-lg">
          <input 
            type="text" 
            value={jumpInput} 
            onChange={(e)=>setJumpInput(e.target.value)} 
            placeholder="Sync Vector #" 
            className="bg-slate-800 border-none rounded-lg px-3 py-2.5 font-mono text-[10px] w-full focus:ring-1 focus:ring-blue-500 outline-none" 
          />
          <button onClick={() => handlePageChange(parseInt(jumpInput.replace(/,/g,'')))} className="bg-blue-600 p-2.5 rounded-lg hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-500/20">
            <ICONS.Search className="w-4 h-4"/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {isSyncing ? (
          <div className="col-span-full h-80 flex flex-col items-center justify-center gap-3 text-blue-600">
            <div className="w-10 h-10 border-4 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">Re-indexing Node {currentPage.toLocaleString()}...</span>
          </div>
        ) : (
          products.map(p => (
            <div key={p.id} className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 group flex flex-col hover:shadow-xl transition-all h-full hover:-translate-y-1">
              <div className="h-40 bg-slate-50 relative overflow-hidden">
                {productImages[p.id] ? (
                  <img src={productImages[p.id]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center animate-pulse"><ICONS.Cpu className="w-5 h-5 text-slate-200" /></div>
                )}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full text-[7px] font-black uppercase tracking-widest shadow-sm text-blue-600">{p.category}</div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-base font-black mb-1 tracking-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-[11px] text-slate-400 mb-6 leading-relaxed line-clamp-2">{p.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="text-xl font-black text-slate-900">${p.price}</div>
                  <button onClick={() => handlePurchase(p)} className="bg-slate-900 text-white p-3 rounded-xl hover:bg-blue-600 transition-all shadow-lg active:scale-90">
                    <ICONS.ShoppingCart className="w-4 h-4"/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-12 flex justify-center items-center gap-8">
        <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1 || isSyncing} className="p-5 bg-white border border-slate-200 rounded-2xl disabled:opacity-30 hover:border-blue-600 transition-all shadow-sm"><ICONS.ChevronLeft className="w-5 h-5"/></button>
        <div className="text-center">
          <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-0.5">Vector Index</div>
          <div className="text-2xl font-black text-slate-900">{currentPage.toLocaleString()}</div>
        </div>
        <button onClick={()=>handlePageChange(currentPage+1)} disabled={isSyncing} className="p-5 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-200 hover:bg-slate-900 transition-all"><ICONS.ChevronRight className="w-5 h-5"/></button>
      </div>

      {redirecting && (
        <div className="fixed inset-0 z-[120] bg-white flex flex-col items-center justify-center p-8">
          <div className="max-w-md w-full text-center">
            <div className="mb-8 flex justify-center">
              <div className="w-16 h-16 bg-[#635BFF] rounded-2xl flex items-center justify-center mx-auto animate-pulse shadow-xl shadow-indigo-100">
                <ICONS.Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h2 className="text-2xl font-black mb-2 tracking-tight">Securing Terminal</h2>
            <div className="font-mono text-[9px] text-blue-600 uppercase tracking-[0.3em] mb-8 bg-blue-50 py-3 px-6 rounded-xl border border-blue-100">
              {redirectStatus}
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#635BFF] animate-[progress_3s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 z-[110] bg-slate-900/40 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-4xl rounded-[2rem] shadow-[0_0_100px_rgba(0,0,0,0.1)] overflow-hidden flex flex-col md:row h-[560px] animate-in zoom-in-95 duration-500">
            <div className="w-full md:w-5/12 bg-[#635BFF] p-10 text-white flex flex-col relative overflow-hidden">
              <div className="text-[9px] font-black uppercase tracking-widest opacity-50 mb-3 relative z-10">Marketplace Module</div>
              <div className="text-3xl font-black mb-6 relative z-10">${selectedProduct.price}.00</div>
              <div className="flex-grow space-y-3 text-xs font-bold opacity-80 relative z-10">
                <div className="flex justify-between"><span>Module License</span><span>${selectedProduct.price}.00</span></div>
                <div className="flex justify-between border-t border-white/20 pt-3"><span>Total Due</span><span>${selectedProduct.price}.00</span></div>
              </div>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-black opacity-60 uppercase relative z-10">
                <ICONS.Zap className="w-3.5 h-3.5" /> Secure Logic
              </div>
            </div>
            <div className="flex-grow p-10 relative overflow-y-auto">
              <button onClick={() => setShowCheckout(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="text-xl font-black mb-8 tracking-tight">Module Sync Payment</h3>
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email Vector</label>
                  <input type="email" placeholder="architect@node.444" className="w-full bg-slate-50 border border-slate-100 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#635BFF] transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Payment Data</label>
                  <div className="border border-slate-100 rounded-lg overflow-hidden shadow-sm">
                    <input type="text" placeholder="Card Number" className="w-full bg-slate-50 p-3.5 text-sm border-b border-slate-100 outline-none focus:bg-white" />
                    <div className="flex">
                      <input type="text" placeholder="MM/YY" className="w-1/2 bg-slate-50 p-3.5 text-sm border-r border-slate-100 outline-none focus:bg-white" />
                      <input type="text" placeholder="CVC" className="w-1/2 bg-slate-50 p-3.5 text-sm outline-none focus:bg-white" />
                    </div>
                  </div>
                </div>
                <button className="w-full bg-[#635BFF] text-white py-4 rounded-xl font-black text-base active:scale-[0.98] shadow-lg shadow-indigo-100 transition-all">
                  Submit ${selectedProduct.price}.00
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <style>{`@keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }`}</style>
    </div>
  );
};

export default MarketplacePage;
