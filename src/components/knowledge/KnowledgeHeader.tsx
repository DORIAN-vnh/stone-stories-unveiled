
import React from 'react';
import { BookOpen } from 'lucide-react';

const KnowledgeHeader = () => {
  return (
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
  );
};

export default KnowledgeHeader;
