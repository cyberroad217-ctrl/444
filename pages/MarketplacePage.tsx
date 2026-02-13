
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
    return Array.from({ length: 12 }).map((_, i) => {
      const globalIndex = ((currentPage - 1) * 12) + i + 1;
      const seedChar = String.fromCharCode(65 + ((globalIndex + currentPage) % 26));
      return {
        id: `m-${currentPage}-${i}`,
        name: `Node ${seedChar}-${globalIndex}`,
        description: `Logic unit vector ${globalIndex}.`,
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
      "Encrypting Metadata...",
      "Protocol Verified: 200 OK",
      "Rerouting to terminal..."
    ];

    statuses.forEach((status, i) => {
      setTimeout(() => setRedirectStatus(status), i * 600);
    });

    setTimeout(() => {
      setRedirecting(false);
      setShowCheckout(true);
    }, 2400);
  };

  useEffect(() => {
    let mounted = true;
    const loadImages = async () => {
      for (let i = 0; i < products.length; i++) {
        if (!mounted) break;
        const productId = products[i].id;
        if (productImages[productId]) continue;
        const img = await generateProductivityImage(`minimal tech logic asset node ${productId}`, "asset");
        if (img && mounted) setProductImages(prev => ({ ...prev, [productId]: img }));
        await new Promise(r => setTimeout(r, 4500));
      }
    };
    loadImages();
    return () => { mounted = false; };
  }, [currentPage, products]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl font-black mb-1 tracking-tighter">Marketplace</h1>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Vector Index: {MARKETPLACE_TOTAL_PAGES.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 p-2 rounded-lg text-white flex gap-2 items-center w-full md:w-auto">
          <input 
            type="text" 
            value={jumpInput} 
            onChange={(e)=>setJumpInput(e.target.value)} 
            placeholder="Go to Vector #" 
            className="bg-slate-800 border-none rounded-md px-3 py-1.5 font-mono text-[9px] w-full md:w-32 outline-none" 
          />
          <button onClick={() => handlePageChange(parseInt(jumpInput.replace(/,/g,'')))} className="bg-blue-600 p-2 rounded-md hover:bg-blue-700 transition-all">
            <ICONS.Search className="w-3.5 h-3.5"/>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-10">
        {isSyncing ? (
          <div className="col-span-full h-64 flex flex-col items-center justify-center gap-2 text-blue-600">
            <div className="w-8 h-8 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
            <span className="text-[8px] font-black uppercase tracking-widest">Indexing Node...</span>
          </div>
        ) : (
          products.map(p => (
            <div key={p.id} className="bg-white rounded-lg overflow-hidden border border-slate-100 group flex flex-col hover:shadow-md transition-all h-full">
              <div className="h-24 bg-slate-50 relative overflow-hidden">
                {productImages[p.id] ? (
                  <img src={productImages[p.id]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s]" alt="" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center animate-pulse"><ICONS.Cpu className="w-4 h-4 text-slate-200" /></div>
                )}
                <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[6px] font-black uppercase tracking-widest text-blue-600">{p.category}</div>
              </div>
              <div className="p-4 flex flex-col flex-grow">
                <h3 className="text-[12px] font-black mb-0.5 tracking-tight group-hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-[10px] text-slate-400 mb-3 line-clamp-1">{p.description}</p>
                <div className="mt-auto flex items-center justify-between pt-2 border-t border-slate-50">
                  <div className="text-sm font-black text-slate-900">${p.price}</div>
                  <button onClick={() => handlePurchase(p)} className="bg-slate-900 text-white p-2 rounded hover:bg-blue-600 transition-all active:scale-90">
                    <ICONS.ShoppingCart className="w-3.5 h-3.5"/>
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-8 flex justify-center items-center gap-4">
        <button onClick={()=>handlePageChange(currentPage-1)} disabled={currentPage===1 || isSyncing} className="p-3 bg-white border border-slate-200 rounded-md disabled:opacity-30 hover:border-blue-600 transition-all shadow-sm"><ICONS.ChevronLeft className="w-4 h-4"/></button>
        <div className="text-center">
          <div className="text-[8px] font-black text-slate-400 uppercase mb-0.5">Page</div>
          <div className="text-lg font-black text-slate-900">{currentPage.toLocaleString()}</div>
        </div>
        <button onClick={()=>handlePageChange(currentPage+1)} disabled={isSyncing} className="p-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-slate-900 transition-all"><ICONS.ChevronRight className="w-4 h-4"/></button>
      </div>

      {redirecting && (
        <div className="fixed inset-0 z-[120] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-8 animate-in fade-in duration-300">
          <div className="max-w-xs w-full text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center animate-pulse">
                <ICONS.Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="font-mono text-[8px] text-blue-600 uppercase tracking-widest mb-6">
              {redirectStatus}
            </div>
            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 animate-[progress_2s_linear]"></div>
            </div>
          </div>
        </div>
      )}

      {showCheckout && selectedProduct && (
        <div className="fixed inset-0 z-[110] bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-96 animate-in zoom-in-95 duration-300">
            <div className="w-full md:w-5/12 bg-blue-600 p-8 text-white flex flex-col">
              <div className="text-[8px] font-black uppercase tracking-widest opacity-50 mb-2">Module Synch</div>
              <div className="text-2xl font-black mb-4">${selectedProduct.price}.00</div>
              <div className="text-[10px] opacity-80 mb-1">{selectedProduct.name}</div>
              <div className="mt-auto flex items-center gap-1.5 text-[8px] font-black opacity-60 uppercase">
                <ICONS.Zap className="w-3 h-3" /> Secure Node
              </div>
            </div>
            <div className="flex-grow p-8 relative overflow-y-auto">
              <button onClick={() => setShowCheckout(false)} className="absolute top-4 right-4 text-slate-300 hover:text-slate-900 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
              <h3 className="text-sm font-black mb-6 uppercase tracking-widest">Payment Vector</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Email</label>
                  <input type="email" placeholder="arch@node.444" className="w-full bg-slate-50 border border-slate-100 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-blue-600 outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Card</label>
                  <div className="border border-slate-100 rounded overflow-hidden">
                    <input type="text" placeholder="XXXX XXXX XXXX XXXX" className="w-full bg-slate-50 p-2.5 text-xs outline-none focus:bg-white" />
                  </div>
                </div>
                <button className="w-full bg-blue-600 text-white py-3 rounded-md font-black text-xs active:scale-[0.98] transition-all">
                  AUTHORIZE ${selectedProduct.price}.00
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
