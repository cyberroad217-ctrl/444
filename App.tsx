
import React, { useState, useEffect } from 'react';
import { PageType } from './types.ts';
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import HomePage from './pages/HomePage.tsx';
import MarketplacePage from './pages/MarketplacePage.tsx';
import BlogPage from './pages/BlogPage.tsx';
import StorePage from './pages/StorePage.tsx';
import AboutPage from './pages/AboutPage.tsx';
import AiAssistant from './components/AiAssistant.tsx';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      if (Object.values(PageType).includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case PageType.HOME: return <HomePage onNavigate={setCurrentPage} />;
      case PageType.MARKETPLACE: return <MarketplacePage />;
      case PageType.BLOG: return <BlogPage />;
      case PageType.STORE: return <StorePage />;
      case PageType.ABOUT: return <AboutPage />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white relative">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
      <AiAssistant />
    </div>
  );
};

export default App;
