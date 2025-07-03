
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BookOpen, Search, FileText, Image, Play, Download } from 'lucide-react';

interface KnowledgeItem {
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

const mockKnowledgeItems: KnowledgeItem[] = [
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

const getIconForType = (type: string) => {
  const iconMap = {
    article: FileText,
    gallery: Image,
    tutorial: Play,
    factsheet: Download
  };
  return iconMap[type as keyof typeof iconMap] || FileText;
};

const getColorForType = (type: string) => {
  const colorMap = {
    article: 'bg-blue-500',
    gallery: 'bg-purple-500',
    tutorial: 'bg-green-500',
    factsheet: 'bg-orange-500'
  };
  return colorMap[type as keyof typeof colorMap] || 'bg-gray-500';
};

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...Array.from(new Set(mockKnowledgeItems.map(item => item.category)))];
  
  const filteredItems = mockKnowledgeItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const featuredItems = filteredItems.filter(item => item.featured);
  const regularItems = filteredItems.filter(item => !item.featured);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-2">
          <BookOpen className="w-8 h-8 text-stone-600" />
          <h1 className="text-3xl font-bold text-stone-800">Knowledge Base</h1>
        </div>
        <p className="text-stone-600 max-w-2xl mx-auto">
          Explore our comprehensive collection of articles, tutorials, galleries, and reference materials 
          about historical stone materials and industry practices.
        </p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
          <Input
            placeholder="Search knowledge base..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="capitalize"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Items */}
      {featuredItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-800">Featured Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredItems.map(item => {
              const IconComponent = getIconForType(item.type);
              return (
                <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <IconComponent className="w-5 h-5" />
                          <Badge variant="secondary" className={`${getColorForType(item.type)} text-white`}>
                            {item.type}
                          </Badge>
                          <Badge variant="outline">{item.category}</Badge>
                        </div>
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </div>
                    </div>
                    <CardDescription>{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {item.readTime && (
                        <p className="text-sm text-stone-500">{item.readTime}</p>
                      )}
                      {item.videoLength && (
                        <p className="text-sm text-stone-500">Video: {item.videoLength}</p>
                      )}
                      {item.imageCount && (
                        <p className="text-sm text-stone-500">{item.imageCount} images</p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Items */}
      {regularItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-stone-800">All Content</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {regularItems.map(item => {
              const IconComponent = getIconForType(item.type);
              return (
                <Card key={item.id} className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="w-4 h-4" />
                      <Badge variant="secondary" className={`${getColorForType(item.type)} text-white text-xs`}>
                        {item.type}
                      </Badge>
                    </div>
                    <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-2">
                      {(item.readTime || item.videoLength || item.imageCount) && (
                        <p className="text-xs text-stone-500">
                          {item.readTime || `Video: ${item.videoLength}` || `${item.imageCount} images`}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-stone-600 mb-2">No content found</h3>
          <p className="text-stone-500">
            Try adjusting your search terms or browse different categories.
          </p>
        </div>
      )}
    </div>
  );
};

export default KnowledgeBase;
