
import React from 'react';
import KnowledgeCard from './KnowledgeCard';
import { KnowledgeItem } from '@/types/knowledge';

interface KnowledgeGridProps {
  items: KnowledgeItem[];
  title: string;
  variant?: 'featured' | 'regular';
}

const KnowledgeGrid = ({ items, title, variant = 'regular' }: KnowledgeGridProps) => {
  if (items.length === 0) return null;

  const gridClass = variant === 'featured' 
    ? 'grid grid-cols-1 md:grid-cols-2 gap-6'
    : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4';

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-stone-800">{title}</h2>
      <div className={gridClass}>
        {items.map(item => (
          <KnowledgeCard 
            key={item.id} 
            item={item} 
            variant={variant}
          />
        ))}
      </div>
    </div>
  );
};

export default KnowledgeGrid;
