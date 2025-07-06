
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Plus, Search, TrendingUp, Users, Clock, Heart, Eye } from 'lucide-react';

const Discussions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Topics', count: 347 },
    { id: 'conservation', name: 'Conservation', count: 89 },
    { id: 'architecture', name: 'Architecture', count: 124 },
    { id: 'industry', name: 'Industry', count: 67 },
    { id: 'research', name: 'Research', count: 45 },
    { id: 'general', name: 'General', count: 22 }
  ];

  const discussions = [
    {
      id: 1,
      title: 'Best practices for marble restoration in humid climates',
      author: 'Dr. Maria Santos',
      avatar: '/placeholder.svg',
      category: 'conservation',
      replies: 23,
      views: 1248,
      likes: 45,
      lastActivity: '2 hours ago',
      lastUser: 'John Smith',
      isPinned: true,
      excerpt: 'I\'ve been working on a 15th-century marble facade in a coastal environment...'
    },
    {
      id: 2,
      title: 'Identifying stone types in Gothic cathedrals',
      author: 'Prof. James Wilson',
      avatar: '/placeholder.svg',
      category: 'architecture',
      replies: 41,
      views: 2156,
      likes: 78,
      lastActivity: '4 hours ago',
      lastUser: 'Sarah Chen',
      isPinned: false,
      excerpt: 'Can anyone help identify the limestone variety used in Notre-Dame\'s construction?'
    },
    {
      id: 3,
      title: 'Modern quarrying techniques vs traditional methods',
      author: 'Mike Rodriguez',
      avatar: '/placeholder.svg',
      category: 'industry',
      replies: 17,
      views: 834,
      likes: 32,
      lastActivity: '6 hours ago',
      lastUser: 'Anna Mueller',
      isPinned: false,
      excerpt: 'Comparing environmental impact and stone quality between old and new methods...'
    },
    {
      id: 4,
      title: 'New archaeological findings in Pompeii stone analysis',
      author: 'Dr. Alessandro Bianchi',
      avatar: '/placeholder.svg',
      category: 'research',
      replies: 56,
      views: 3421,
      likes: 127,
      lastActivity: '1 day ago',
      lastUser: 'Emma Thompson',
      isPinned: true,
      excerpt: 'Recent analysis reveals previously unknown volcanic stone compositions...'
    }
  ];

  const filteredDiscussions = discussions.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         discussion.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || discussion.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryColor = (category: string) => {
    const colors = {
      conservation: 'bg-green-100 text-green-800',
      architecture: 'bg-blue-100 text-blue-800',
      industry: 'bg-orange-100 text-orange-800',
      research: 'bg-purple-100 text-purple-800',
      general: 'bg-gray-100 text-gray-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Discussions</h1>
            <p className="text-stone-600">Join conversations with the stone heritage community</p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Discussion
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                <Input
                  placeholder="Search discussions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Discussion Tabs */}
            <Tabs defaultValue="latest" className="w-full">
              <TabsList>
                <TabsTrigger value="latest" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Latest
                </TabsTrigger>
                <TabsTrigger value="popular" className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popular
                </TabsTrigger>
                <TabsTrigger value="unanswered" className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Unanswered
                </TabsTrigger>
              </TabsList>

              <TabsContent value="latest" className="space-y-4 mt-6">
                {filteredDiscussions.map((discussion) => (
                  <Card key={discussion.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={discussion.avatar} />
                          <AvatarFallback>{discussion.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-2">
                            {discussion.isPinned && (
                              <Badge variant="secondary" className="text-xs">Pinned</Badge>
                            )}
                            <Badge className={getCategoryColor(discussion.category)}>
                              {categories.find(c => c.id === discussion.category)?.name}
                            </Badge>
                          </div>
                          
                          <h3 className="text-lg font-semibold text-stone-800 hover:text-quarry-600 transition-colors">
                            {discussion.title}
                          </h3>
                          
                          <p className="text-stone-600 text-sm line-clamp-2">
                            {discussion.excerpt}
                          </p>
                          
                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center space-x-4 text-sm text-stone-500">
                              <span>by {discussion.author}</span>
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="w-4 h-4" />
                                  {discussion.replies}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  {discussion.views}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4" />
                                  {discussion.likes}
                                </div>
                              </div>
                            </div>
                            <div className="text-xs text-stone-400">
                              Last reply {discussion.lastActivity} by {discussion.lastUser}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="popular">
                <div className="text-center py-12 text-stone-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>Popular discussions will appear here.</p>
                </div>
              </TabsContent>

              <TabsContent value="unanswered">
                <div className="text-center py-12 text-stone-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>Unanswered discussions will appear here.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {categories.slice(1).map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-stone-50 cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <span className="text-sm">{category.name}</span>
                      <Badge variant="outline" className="text-xs">{category.count}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="w-5 h-5 mr-2" />
                  Community Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Online Now</span>
                    <span className="font-bold text-quarry-600">127</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">New Posts Today</span>
                    <span className="font-bold text-stone-800">23</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Total Members</span>
                    <span className="font-bold text-stone-800">12,450</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Discussions;
