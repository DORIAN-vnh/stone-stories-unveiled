
import React from 'react';
import { BookOpen } from 'lucide-react';

const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <BookOpen className="w-12 h-12 text-stone-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-stone-600 mb-2">No content found</h3>
      <p className="text-stone-500">
        Try adjusting your search terms or browse different categories.
      </p>
    </div>
  );
};

export default EmptyState;
