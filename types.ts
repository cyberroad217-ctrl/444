
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
}

export interface AuditResult {
  efficiencyScore: number;
  bottlenecks: string[];
  recommendations: string[];
  optimizingThought: string;
}

export enum PageType {
  HOME = 'home',
  MARKETPLACE = 'marketplace',
  BLOG = 'blog',
  STORE = 'store',
  ABOUT = 'about'
}
