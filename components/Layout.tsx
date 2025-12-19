import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Icons } from './Icons.tsx';
import { SiteConfig } from '../types.ts';

interface LayoutProps {
  children: React.ReactNode;
  config: SiteConfig;
}

export const Layout: React.FC<LayoutProps> = ({ children, config }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isAdmin = location.pathname.includes('/admin');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: '홈', path: '/' },
    { name: '서비스', path: '/#services' },
    { name: '포트폴리오', path: '/#portfolio' },
    { name: '문의하기', path: '/#contact' },
  ];

  const scrollToSection = (path: string) => {
    setIsMobileMenuOpen(false);
    if (path === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (path.includes('#')) {
      const id = path.split('#')[1];
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-dark-bg text-gray-100 font-sans selection:bg-brand-600 selection:text-white">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMobileMenuOpen ? 'bg-dark-bg/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold tracking-tighter hover:text-white transition-colors flex items-center gap-2">
            <span 
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: config.accentColor }}
            >
              D
            </span>
            {config.brandName}
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {!isAdmin && navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
              </button>
            ))}
            
            {isAdmin ? (
               <Link
               to="/"
               className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-all border border-red-500/20"
             >
               <Icons.ExternalLink size={16} />
               나가기
             </Link>
            ) : (
              <Link
                to="/admin"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-all border border-white/10 rounded-full hover:border-white/30"
              >
                <Icons.Lock size={14} />
                Admin
              </Link>
            )}
          </div>

          <button 
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <Icons.X /> : <Icons.Menu />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 bg-dark-surface border-b border-white/10 p-6 flex flex-col gap-4">
             {!isAdmin && navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.path)}
                className="text-left text-lg font-medium text-gray-300 hover:text-white"
              >
                {link.name}
              </button>
            ))}
             <Link
                to={isAdmin ? "/" : "/admin"}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-left text-lg font-medium text-brand-400"
              >
                {isAdmin ? "관리자 나가기" : "관리자 로그인"}
              </Link>
          </div>
        )}
      </nav>

      <main>
        {children}
      </main>

      {!isAdmin && (
        <footer className="bg-dark-surface border-t border-white/5 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-2xl font-bold mb-4">{config.brandName}</h3>
                <p className="text-gray-400 leading-relaxed max-w-sm">
                  우리는 비즈니스의 본질을 꿰뚫는 디자인으로<br/>
                  새로운 가치를 창조합니다.
                </p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Service</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>브랜드 전략</li>
                  <li>웹사이트 제작</li>
                  <li>모바일 앱 디자인</li>
                  <li>마케팅 크리에이티브</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Contact</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li>{config.contactEmail}</li>
                  <li>Seoul, Republic of Korea</li>
                  <li>02-1234-5678</li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
              <p className="text-gray-500 text-sm">
                © {new Date().getFullYear()} {config.brandName}. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Instagram size={20}/></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Twitter size={20}/></a>
                <a href="#" className="text-gray-500 hover:text-white transition-colors"><Icons.Facebook size={20}/></a>
              </div>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};