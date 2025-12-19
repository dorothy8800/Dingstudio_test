import { PortfolioItem, ServiceItem, SiteConfig } from './types.ts';

export const INITIAL_CONFIG: SiteConfig = {
  brandName: "Ding Studio",
  heroTitle: "브랜드의 본질에\n감각을 더하다",
  heroSubtitle: "딩스튜디오는 본질을 꿰뚫는 디자인과 전략으로 브랜드의 새로운 가능성을 발견하고, 시장의 판도를 바꾸는 최상의 결과물을 선사합니다.",
  heroButtonText: "지금 문의하기",
  accentColor: "#7c3aed",
  contactEmail: "hello@dingstudio.com"
};

export const INITIAL_PORTFOLIO: PortfolioItem[] = [
  {
    id: '1',
    title: '네온 퓨처 리브랜딩',
    category: 'Brand Identity',
    imageUrl: 'https://images.unsplash.com/photo-1634942537034-2531766767d7?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '2',
    title: '에코 파이낸스 앱',
    category: 'UI/UX Design',
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '3',
    title: '모던 아키텍처 웹사이트',
    category: 'Web Development',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '4',
    title: '미니멀리스트 패키지',
    category: 'Product Design',
    imageUrl: 'https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '5',
    title: '테크 스타트업 로고',
    category: 'Logo Design',
    imageUrl: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: '6',
    title: '아트 갤러리 플랫폼',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2000&auto=format&fit=crop'
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 's1',
    title: '브랜드 아이덴티티',
    description: '로고 디자인부터 브랜드 가이드라인까지, 기업의 철학을 시각적 언어로 표현합니다.',
    iconName: 'PenTool'
  },
  {
    id: 's2',
    title: '웹 & 모바일 구축',
    description: '반응형 웹사이트와 직관적인 모바일 앱 인터페이스를 최신 트렌드에 맞춰 제작합니다.',
    iconName: 'Monitor'
  },
  {
    id: 's3',
    title: 'UI/UX 컨설팅',
    description: '사용자 경험을 분석하여 최적의 사용성을 갖춘 디지털 프로덕트를 설계합니다.',
    iconName: 'Smartphone'
  },
  {
    id: 's4',
    title: '마케팅 에셋',
    description: 'SNS 콘텐츠, 배너, 홍보물 등 비즈니스 성장에 필요한 모든 디자인 자산을 제공합니다.',
    iconName: 'Layers'
  }
];