import React, { useState, useEffect } from 'react';
import { Icons } from './Icons.tsx';
import { SiteConfig, PortfolioItem } from '../types.ts';
import { SERVICES } from '../constants.ts';

interface HomeProps {
  config: SiteConfig;
  portfolioItems: PortfolioItem[];
}

export const Home: React.FC<HomeProps> = ({ config, portfolioItems }) => {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/myzrlglq", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('idle');
        alert("메시지 전송에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      setFormStatus('idle');
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
        <div 
          className="absolute inset-0 z-0 opacity-60 transition-transform duration-100 ease-out grayscale"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(1.1) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          }}
        />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/50 via-transparent to-dark-bg" />
        <div className="absolute inset-0 z-0 bg-black/20" /> 
        <div 
          className="absolute z-0 pointer-events-none w-[1000px] h-[1000px] rounded-full mix-blend-screen opacity-15 blur-[120px] transition-transform duration-300 ease-out"
          style={{
            background: `radial-gradient(circle closest-side, #ffffff, transparent)`,
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${mousePos.x * 50}px), calc(-50% + ${mousePos.y * 50}px))`
          }}
        />
        
        <div className="max-w-4xl mx-auto px-6 text-center z-10 relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-black/30 backdrop-blur-md mb-8 hover:bg-white/5 transition-colors cursor-default animate-fade-in-up">
            <span className="w-2 h-2 rounded-full animate-pulse shadow-[0_0_10px_currentColor]" style={{ color: config.accentColor, backgroundColor: config.accentColor }}></span>
            <span className="text-sm font-medium text-gray-200 tracking-wide">Premium Digital Agency</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1] whitespace-pre-wrap text-white animate-fade-in-up delay-100 drop-shadow-2xl">
            {config.heroTitle}
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 drop-shadow-lg">
            {config.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-300">
            <a 
              href="#contact"
              className="group relative px-8 py-4 rounded-full font-semibold text-white transition-all transform hover:-translate-y-1 hover:shadow-2xl flex items-center gap-2 overflow-hidden"
              style={{ backgroundColor: config.accentColor, boxShadow: `0 0 40px -10px ${config.accentColor}60` }}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2">
                {config.heroButtonText}
                <Icons.ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a 
              href="#portfolio"
              className="px-8 py-4 rounded-full font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all backdrop-blur-md hover:border-white/20 hover:shadow-lg"
            >
              포트폴리오 보기
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-24 bg-dark-surface relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-gray-400">비즈니스 성공을 위한 최적의 솔루션을 제공합니다.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              const IconComponent = Icons[service.iconName];
              return (
                <div key={service.id} className="group p-8 rounded-2xl bg-white/5 border border-white/5 hover:border-brand-500/30 hover:bg-white/[0.07] transition-all duration-300">
                  <div 
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300"
                    style={{ backgroundColor: config.accentColor }}
                  >
                    <IconComponent size={24} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-brand-300 transition-colors">{service.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-24 bg-dark-bg">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Selected Works</h2>
              <p className="text-gray-400">우리가 만들어낸 디지털 경험의 결과물입니다.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-2xl bg-dark-surface aspect-[4/3]">
                <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                  <span className="text-brand-400 text-sm font-medium mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.category}</span>
                  <h3 className="text-2xl font-bold text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-24 bg-dark-surface relative overflow-hidden border-t border-white/5">
        <div className="absolute right-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-brand-900/10 to-transparent" />
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">프로젝트를 함께<br/>시작해볼까요?</h2>
              <p className="text-gray-400 mb-8 text-lg">당신의 아이디어가 딩스튜디오를 만나면 현실이 됩니다.<br/>가벼운 문의라도 언제든 환영합니다.</p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-400"><Icons.Mail /></div>
                  <div><p className="text-sm text-gray-400">Email</p><p className="text-lg font-medium">{config.contactEmail}</p></div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-brand-400"><Icons.Smartphone /></div>
                  <div><p className="text-sm text-gray-400">Phone</p><p className="text-lg font-medium">010-1234-5678</p></div>
                </div>
              </div>
            </div>
            <div className="bg-white/[0.02] p-8 rounded-3xl border border-white/5 backdrop-blur-sm">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">이름</label>
                    <input type="text" name="name" required className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" placeholder="홍길동" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400">연락처</label>
                    <input type="text" name="phone" required className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" placeholder="010-0000-0000" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">이메일</label>
                  <input type="email" name="email" required className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors" placeholder="example@email.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-400">프로젝트 내용</label>
                  <textarea name="message" required rows={4} className="w-full bg-dark-bg border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-500 transition-colors resize-none" placeholder="어떤 프로젝트를 구상 중이신가요?"></textarea>
                </div>
                <button 
                  disabled={formStatus === 'submitting' || formStatus === 'success'}
                  type="submit" 
                  className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 ${formStatus === 'success' ? 'bg-green-600' : 'hover:opacity-90'}`}
                  style={{ backgroundColor: formStatus === 'success' ? undefined : config.accentColor }}
                >
                  {formStatus === 'submitting' ? '전송 중...' : formStatus === 'success' ? <><Icons.CheckCircle size={20} /> 전송 완료</> : '문의 보내기'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};