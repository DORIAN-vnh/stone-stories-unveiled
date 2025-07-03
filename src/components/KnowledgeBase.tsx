
import React, { useState } from 'react';
import { mockKnowledgeItems } from '@/data/knowledgeData';
import KnowledgeHeader from './knowledge/KnowledgeHeader';
import KnowledgeFilters from './knowledge/KnowledgeFilters';
import KnowledgeGrid from './knowledge/KnowledgeGrid';
import EmptyState from './knowledge/EmptyState';

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
      <KnowledgeHeader />
      
      <KnowledgeFilters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      <KnowledgeGrid
        items={featuredItems}
        title="Featured Content"
        variant="featured"
      />

      <KnowledgeGrid
        items={regularItems}
        title="All Content"
        variant="regular"
      />

      {filteredItems.length === 0 && <EmptyState />}
    </div>
  );
};

export default KnowledgeBase;
