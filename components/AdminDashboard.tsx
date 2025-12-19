import React, { useState } from 'react';
import { Icons } from './Icons';
import { SiteConfig, PortfolioItem } from '../types';

interface AdminDashboardProps {
  config: SiteConfig;
  setConfig: React.Dispatch<React.SetStateAction<SiteConfig>>;
  portfolioItems: PortfolioItem[];
  setPortfolioItems: React.Dispatch<React.SetStateAction<PortfolioItem[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  config, 
  setConfig, 
  portfolioItems, 
  setPortfolioItems 
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'portfolio'>('general');
  const [newItem, setNewItem] = useState<Partial<PortfolioItem>>({
    title: '',
    category: '',
    imageUrl: 'https://picsum.photos/800/600'
  });

  const handleConfigChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleAddPortfolio = () => {
    if (newItem.title && newItem.category) {
      const item: PortfolioItem = {
        id: Date.now().toString(),
        title: newItem.title!,
        category: newItem.category!,
        imageUrl: newItem.imageUrl || 'https://picsum.photos/800/600'
      };
      setPortfolioItems(prev => [item, ...prev]);
      setNewItem({ title: '', category: '', imageUrl: 'https://picsum.photos/800/600' });
    }
  };

  const handleDeletePortfolio = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPortfolioItems(prev => prev.filter(item => item.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-black pt-24 px-6 pb-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">관리자 대시보드</h1>
            <p className="text-gray-400">웹사이트 콘텐츠를 실시간으로 관리하세요.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-2">
            <button
              onClick={() => setActiveTab('general')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'general' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Icons.Edit2 size={18} />
              일반 설정
            </button>
            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                activeTab === 'portfolio' ? 'bg-brand-600 text-white' : 'text-gray-400 hover:bg-white/5'
              }`}
            >
              <Icons.Layers size={18} />
              포트폴리오 관리
            </button>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3 bg-dark-surface border border-white/10 rounded-2xl p-6 md:p-8">
            {activeTab === 'general' ? (
              <div className="space-y-8 animate-fade-in">
                <h2 className="text-xl font-bold text-white border-b border-white/10 pb-4">기본 정보 & 히어로 섹션</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">브랜드명</label>
                    <input
                      name="brandName"
                      value={config.brandName}
                      onChange={handleConfigChange}
                      className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">포인트 컬러 (Hex)</label>
                    <div className="flex gap-2">
                      <input
                        type="color"
                        name="accentColor"
                        value={config.accentColor}
                        onChange={handleConfigChange}
                        className="h-10 w-10 rounded cursor-pointer bg-transparent border-none"
                      />
                      <input
                        type="text"
                        name="accentColor"
                        value={config.accentColor}
                        onChange={handleConfigChange}
                        className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none uppercase"
                      />
                    </div>
                  </div>
                  <div className="col-span-full space-y-2">
                    <label className="text-sm font-medium text-gray-400">히어로 메인 타이틀 (줄바꿈 가능)</label>
                    <textarea
                      name="heroTitle"
                      value={config.heroTitle}
                      onChange={handleConfigChange}
                      rows={2}
                      className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div className="col-span-full space-y-2">
                    <label className="text-sm font-medium text-gray-400">히어로 서브 타이틀</label>
                    <textarea
                      name="heroSubtitle"
                      value={config.heroSubtitle}
                      onChange={handleConfigChange}
                      rows={2}
                      className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none resize-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">CTA 버튼 텍스트</label>
                    <input
                      name="heroButtonText"
                      value={config.heroButtonText}
                      onChange={handleConfigChange}
                      className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">대표 이메일</label>
                    <input
                      name="contactEmail"
                      value={config.contactEmail}
                      onChange={handleConfigChange}
                      className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="text-xl font-bold text-white">포트폴리오 관리</h2>
                  <span className="text-sm text-gray-400">총 {portfolioItems.length}개의 작품</span>
                </div>

                {/* Add New Item Form */}
                <div className="bg-white/5 p-6 rounded-xl border border-white/10 space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2">
                    <Icons.Plus size={16} /> 새 작품 등록
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      placeholder="프로젝트 제목"
                      value={newItem.title}
                      onChange={e => setNewItem({...newItem, title: e.target.value})}
                      className="bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                    />
                    <input
                      placeholder="카테고리 (예: Web Design)"
                      value={newItem.category}
                      onChange={e => setNewItem({...newItem, category: e.target.value})}
                      className="bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                    />
                    <div className="md:col-span-2 flex gap-4">
                      <input
                        placeholder="이미지 URL (기본값 자동 적용)"
                        value={newItem.imageUrl}
                        onChange={e => setNewItem({...newItem, imageUrl: e.target.value})}
                        className="flex-1 bg-dark-bg border border-white/10 rounded-lg px-4 py-2 text-white focus:border-brand-500 focus:outline-none"
                      />
                      <button
                        onClick={handleAddPortfolio}
                        disabled={!newItem.title || !newItem.category}
                        className="px-6 py-2 bg-brand-600 text-white rounded-lg font-medium hover:bg-brand-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      >
                        등록
                      </button>
                    </div>
                  </div>
                </div>

                {/* List Items */}
                <div className="space-y-4">
                  {portfolioItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between bg-dark-bg p-4 rounded-xl border border-white/5 hover:border-white/20 transition-colors">
                      <div className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.title} className="w-16 h-12 object-cover rounded-md bg-gray-800" />
                        <div>
                          <h4 className="font-bold text-white">{item.title}</h4>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeletePortfolio(item.id)}
                        className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                        title="삭제"
                      >
                        <Icons.Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};