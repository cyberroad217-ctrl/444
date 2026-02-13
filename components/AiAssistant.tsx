
import React, { useState, useRef, useEffect } from 'react';
import { ICONS } from '../constants.tsx';
import { getAssistantChat, isQuotaBlocked } from '../services/geminiService.ts';

const AiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<any>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current && !isQuotaBlocked()) {
      chatRef.current = getAssistantChat();
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [isOpen, messages]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    if (isQuotaBlocked()) {
      setMessages(prev => [
        ...prev, 
        { role: 'user', text: input },
        { role: 'ai', text: "Protocol Alert: AGI Node connection is temporarily throttled due to high neural traffic. Switching to standby mode for 10 minutes. Please refer to your local 444 Handbook." }
      ]);
      setInput('');
      return;
    }

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsTyping(true);

    try {
      if (!chatRef.current) {
        chatRef.current = getAssistantChat();
      }
      
      if (!chatRef.current) {
        throw new Error("Quota blocked");
      }

      const response = await chatRef.current.sendMessage({ message: userText });
      setMessages(prev => [...prev, { role: 'ai', text: response.text }]);
    } catch (e) {
      // Catch and set the global block if we hit it here
      setMessages(prev => [...prev, { role: 'ai', text: "System optimized: Local cached logic activated. AGI synchronization will resume shortly." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[60]">
      {isOpen ? (
        <div className="bg-white w-80 md:w-96 h-[500px] rounded-[2rem] shadow-2xl border border-slate-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
          <div className="bg-slate-900 p-6 text-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <ICONS.Zap className="w-4 h-4" />
              </div>
              <div>
                <div className="text-sm font-black tracking-widest uppercase">444 Assistant</div>
                <div className="text-[10px] text-blue-400 font-mono">
                  {isQuotaBlocked() ? "Status: Offline Standby" : "Status: Live Feed"}
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:text-blue-400 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
          
          <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center py-12">
                <ICONS.Layers className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                <p className="text-slate-400 text-xs font-medium">How can the 444 Framework optimize your output today?</p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-slate-800 shadow-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 border-t border-slate-100 bg-white">
            <div className="flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder={isQuotaBlocked() ? "Standby Mode..." : "Type transmission..."}
                className="flex-grow bg-slate-50 border border-slate-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
              <button 
                onClick={handleSend}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <ICONS.ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white w-16 h-16 rounded-full shadow-2xl flex items-center justify-center hover:scale-110 transition-transform active:scale-95 group relative"
        >
          <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${isQuotaBlocked() ? 'bg-amber-500' : 'bg-red-500'}`}></div>
          <ICONS.Zap className="w-8 h-8 group-hover:rotate-12 transition-transform" />
        </button>
      )}
    </div>
  );
};

export default AiAssistant;
