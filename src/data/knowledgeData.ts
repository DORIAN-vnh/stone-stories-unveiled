
import { KnowledgeItem } from '@/types/knowledge';

export const mockKnowledgeItems: KnowledgeItem[] = [
  {
    id: '1',
    title: 'The History of Carrara Marble',
    type: 'article',
    category: 'Materials',
    description: 'Discover the fascinating history of Carrara marble, from Roman times to modern sculptural masterpieces.',
    readTime: '8 min read',
    tags: ['marble', 'history', 'italy', 'carrara'],
    featured: true
  },
  {
    id: '2',
    title: 'Stone Cutting Techniques Through the Ages',
    type: 'tutorial',
    category: 'Techniques',
    description: 'Learn about traditional and modern stone cutting methods used in quarries and workshops.',
    videoLength: '15 min',
    tags: ['techniques', 'tutorial', 'quarrying'],
    featured: true
  },
  {
    id: '3',
    title: 'World Famous Stone Monuments',
    type: 'gallery',
    category: 'Monuments',
    description: 'A visual journey through the most iconic stone monuments around the world.',
    imageCount: 24,
    tags: ['monuments', 'architecture', 'photography'],
    featured: false
  },
  {
    id: '4',
    title: 'Geological Properties of Natural Stones',
    type: 'factsheet',
    category: 'Science',
    description: 'Technical specifications and geological characteristics of various stone materials.',
    downloadUrl: '/factsheet-geological-properties.pdf',
    tags: ['geology', 'technical', 'reference'],
    featured: false
  },
  {
    id: '5',
    title: 'Restoration of Historic Stone Buildings',
    type: 'article',
    category: 'Conservation',
    description: 'Best practices and case studies in historic stone building restoration and preservation.',
    readTime: '12 min read',
    tags: ['restoration', 'conservation', 'buildings'],
    featured: false
  },
  {
    id: '6',
    title: 'Modern Quarrying Equipment',
    type: 'tutorial',
    category: 'Industry',
    description: 'Overview of contemporary machinery and technology used in stone quarrying operations.',
    videoLength: '22 min',
    tags: ['quarrying', 'equipment', 'modern', 'industry'],
    featured: false
  }
];
