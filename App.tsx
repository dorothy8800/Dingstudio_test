import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { AdminDashboard } from './components/AdminDashboard';
import { INITIAL_CONFIG, INITIAL_PORTFOLIO } from './constants';
import { SiteConfig, PortfolioItem } from './types';

const App: React.FC = () => {
  // Global State for the Application
  // In a larger app, this would be in Context or Redux
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);

  // Update document title and primary color variable when config changes
  useEffect(() => {
    document.title = `${config.brandName} | Creative Studio`;
    // We could dynamically set CSS variables here if needed
  }, [config]);

  return (
    <HashRouter>
      <Layout config={config}>
        <Routes>
          <Route 
            path="/" 
            element={
              <Home 
                config={config} 
                portfolioItems={portfolioItems} 
              />
            } 
          />
          <Route 
            path="/admin" 
            element={
              <AdminDashboard 
                config={config} 
                setConfig={setConfig}
                portfolioItems={portfolioItems}
                setPortfolioItems={setPortfolioItems}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;