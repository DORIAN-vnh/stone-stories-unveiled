
export interface KnowledgeItem {
  id: string;
  title: string;
  type: 'article' | 'gallery' | 'tutorial' | 'factsheet';
  category: string;
  description: string;
  readTime?: string;
  downloadUrl?: string;
  imageCount?: number;
  videoLength?: string;
  tags: string[];
  featured?: boolean;
}
