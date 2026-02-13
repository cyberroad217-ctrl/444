
import React, { useState, useEffect } from 'react';
import { PageType } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MarketplacePage from './pages/MarketplacePage';
import BlogPage from './pages/BlogPage';
import StorePage from './pages/StorePage';
import AboutPage from './pages/AboutPage';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<PageType>(PageType.HOME);
  
  // Sync page from hash for basic routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      if (Object.values(PageType).includes(hash)) {
        setCurrentPage(hash);
        window.scrollTo(0, 0);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case PageType.HOME:
        return <HomePage onNavigate={setCurrentPage} />;
      case PageType.MARKETPLACE:
        return <MarketplacePage />;
      case PageType.BLOG:
        return <BlogPage />;
      case PageType.STORE:
        return <StorePage />;
      case PageType.ABOUT:
        return <AboutPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-grow pt-16">
        {renderPage()}
      </main>
      <Footer onNavigate={setCurrentPage} />
    </div>
  );
};

export default App;
