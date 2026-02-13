
import React, { useState, useEffect } from 'react';
import { BLOG_TOTAL_PAGES, ICONS } from '../constants';
import { generateBlogPosts } from '../services/geminiService';
import { BlogPost } from '../types';

const BlogPage: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [agentStatus, setAgentStatus] = useState("Idle");

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setAgentStatus("Agent Generating...");
      const generated = await generateBlogPosts(4);
      
      // Fallback in case generation fails
      if (generated.length === 0) {
        setPosts(Array.from({ length: 4 }).map((_, i) => ({
          id: `post-${currentPage}-${i}`,
          title: `Autonomous Efficiency: Logic Unit ${currentPage}${i}`,
          excerpt: `A deep dive into chain-of-thought algorithms for daily task management.`,
          content: `Full technical analysis of neural network productivity optimization...`,
          author: `Agent-444-${i + 1}`,
          date: `2024-05-12T10:${(i + 1) * 10}:00Z`,
          tags: ["AI", "AGI", "Efficiency"]
        })));
      } else {
        setPosts(generated);
      }
      
      setAgentStatus("Live Feed Updated");
      setLoading(false);
      
      setTimeout(() => setAgentStatus("Monitoring Networks"), 3000);
    };

    fetchPosts();
  }, [currentPage]);

  const goToNextPage = () => {
    if (currentPage < BLOG_TOTAL_PAGES) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            <span className="text-xs font-bold text-blue-600 uppercase tracking-widest">AGI Agent Feed - Every 10 Mins</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 mb-2">AGI Insight Streams</h1>
          <p className="text-slate-500">Real-time content generation by Deep Learning LLM Agents.</p>
        </div>
        
        <div className="bg-slate-900 text-blue-400 px-6 py-4 rounded-xl font-mono text-sm border border-blue-900/30 flex items-center gap-4">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
          <div>
            <div className="text-[10px] text-slate-500 uppercase">System Status</div>
            <div className="font-bold">{agentStatus}</div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {[1,2,3,4].map(i => (
            <div key={i} className="animate-pulse space-y-4">
              <div className="bg-slate-100 h-64 rounded-2xl"></div>
              <div className="h-8 bg-slate-100 w-3/4 rounded-lg"></div>
              <div className="h-4 bg-slate-100 w-full rounded-lg"></div>
              <div className="h-4 bg-slate-100 w-5/6 rounded-lg"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {posts.map((post, idx) => (
            <article key={idx} className="group cursor-pointer">
              <div className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all">
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 font-bold">
                      {post.author.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{post.author}</div>
                      <div className="text-[10px] text-slate-400 uppercase font-bold">{post.date}</div>
                    </div>
                  </div>
                  
                  <h2 className="text-2xl font-black text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">
                    {post.title}
                  </h2>
                  
                  <p className="text-slate-500 mb-8 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-slate-50 text-slate-500 px-3 py-1 rounded-full text-[10px] font-bold uppercase">#{tag}</span>
                    ))}
                  </div>
                  
                  <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-blue-600 font-bold text-sm">Read Full Intel</span>
                    <ICONS.ChevronRight className="w-5 h-5 text-blue-600" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Massive Blog Pagination */}
      <div className="mt-20 flex flex-col items-center gap-6">
        <button 
          onClick={goToNextPage}
          className="group flex flex-col items-center gap-4 px-12 py-8 bg-white border-2 border-slate-100 rounded-[2.5rem] hover:border-blue-600 transition-all shadow-xl shadow-slate-100"
        >
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600">Next Transmission</span>
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-slate-900 group-hover:translate-x-1 transition-transform">
              Page {currentPage + 1}
            </span>
            <ICONS.ChevronRight className="w-8 h-8 text-blue-600" />
          </div>
        </button>
        
        <div className="text-slate-300 font-bold tracking-widest text-xs flex items-center gap-4">
          <span>STREAMING POOL</span>
          <div className="h-px w-24 bg-slate-100"></div>
          <span>1 / 364,494,774</span>
          <div className="h-px w-24 bg-slate-100"></div>
          <span>TOTAL VOL</span>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
