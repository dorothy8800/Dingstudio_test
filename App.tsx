import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout.tsx';
import { Home } from './components/Home.tsx';
import { AdminDashboard } from './components/AdminDashboard.tsx';
import { INITIAL_CONFIG, INITIAL_PORTFOLIO } from './constants.ts';
import { SiteConfig, PortfolioItem } from './types.ts';

const App: React.FC = () => {
  const [config, setConfig] = useState<SiteConfig>(INITIAL_CONFIG);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>(INITIAL_PORTFOLIO);

  useEffect(() => {
    document.title = `${config.brandName} | Creative Studio`;
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