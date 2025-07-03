
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import AdvancedSearch from '@/components/AdvancedSearch';
import KnowledgeBase from '@/components/KnowledgeBase';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search as SearchIcon, BookOpen } from 'lucide-react';

const Search = () => {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="search" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="search" className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" />
              Search
            </TabsTrigger>
            <TabsTrigger value="knowledge" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Knowledge Base
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search" className="space-y-6">
            <AdvancedSearch />
            
            {/* Search Results would go here */}
            <div className="text-center py-12 text-stone-500">
              <SearchIcon className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>Enter search terms above to find stone materials, monuments, and locations.</p>
            </div>
          </TabsContent>

          <TabsContent value="knowledge">
            <KnowledgeBase />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Search;
