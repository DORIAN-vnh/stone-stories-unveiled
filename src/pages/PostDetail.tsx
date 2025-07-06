
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Heart, Eye, Share2, Bookmark, Calendar, MapPin, User, ArrowLeft } from 'lucide-react';

const PostDetail = () => {
  const { id } = useParams();

  // Mock post data - in a real app, this would be fetched based on the ID
  const post = {
    id: id,
    title: 'Ancient Roman Marble Techniques Discovered',
    content: `New archaeological findings reveal sophisticated marble working techniques used in the construction of the Pantheon. Our team has uncovered evidence of previously unknown methods that allowed Roman craftsmen to achieve such precision in their stonework.

    The discovery was made during recent excavations near the Pantheon in Rome, where we found workshop remains containing specialized tools and marble fragments that show unique cutting patterns. These patterns suggest that Roman stonemasons had developed techniques that were far more advanced than previously understood.

    ## Key Findings

    The most significant discovery is a series of bronze tools that appear to have been designed specifically for precision cutting of marble. These tools show wear patterns that indicate they were used for creating the fine details we see in Roman architectural elements.

    ### Tool Analysis

    Through detailed analysis of the tools, we've been able to reconstruct the likely processes used by Roman craftsmen:

    1. **Precision Measuring**: Evidence of highly accurate measuring devices
    2. **Specialized Cutting**: Tools designed for specific cutting angles
    3. **Surface Finishing**: Techniques for achieving smooth marble surfaces

    ## Historical Context

    This discovery challenges our understanding of Roman stone-working capabilities and suggests that the techniques used in major monuments like the Pantheon were more sophisticated than modern reconstructions have indicated.

    The implications for modern stone conservation are significant, as understanding these historical techniques could inform better preservation methods for Roman monuments worldwide.`,
    author: {
      name: 'Dr. Maria Santos',
      title: 'Stone Archaeologist',
      avatar: '/placeholder.svg',
      organization: 'University of Florence'
    },
    publishDate: '2024-01-20',
    location: 'Rome, Italy',
    category: 'monument',
    tags: ['Roman', 'Marble', 'Archaeology', 'Pantheon'],
    stats: {
      views: 1520,
      likes: 234,
      bookmarks: 67
    },
    images: [
      '/placeholder.svg',
      '/placeholder.svg',
      '/placeholder.svg'
    ]
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      monument: 'bg-blue-100 text-blue-800',
      quarry: 'bg-yellow-100 text-yellow-800',
      marble: 'bg-purple-100 text-purple-800',
      company: 'bg-green-100 text-green-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link to="/community" className="flex items-center gap-2 text-stone-600 hover:text-stone-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Community
          </Link>
        </div>

        {/* Post Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between mb-4">
              <div className="flex gap-2">
                <Badge className={getCategoryColor(post.category)}>
                  {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
                </Badge>
                {post.tags.slice(0, 2).map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <CardTitle className="text-3xl font-bold text-stone-800 mb-4">
              {post.title}
            </CardTitle>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-stone-800">{post.author.name}</div>
                  <div className="text-sm text-stone-600">{post.author.title}</div>
                  <div className="text-xs text-stone-500">{post.author.organization}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-4 text-sm text-stone-500 mb-2">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.publishDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {post.location}
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {post.stats.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {post.stats.likes}
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Post Images */}
        {post.images && post.images.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {post.images.map((image, index) => (
              <div key={index} className="aspect-video bg-stone-200 rounded-lg"></div>
            ))}
          </div>
        )}

        {/* Post Content */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="prose max-w-none">
              {post.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold text-stone-800 mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold text-stone-800 mt-6 mb-3">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                if (paragraph.includes('1. **') || paragraph.includes('2. **') || paragraph.includes('3. **')) {
                  const lines = paragraph.split('\n').filter(line => line.trim());
                  return (
                    <ol key={index} className="list-decimal list-inside space-y-2 mb-6">
                      {lines.map((line, lineIndex) => {
                        const match = line.match(/\d+\. \*\*(.*?)\*\*: (.*)/);
                        if (match) {
                          return (
                            <li key={lineIndex} className="text-stone-700">
                              <strong>{match[1]}</strong>: {match[2]}
                            </li>
                          );
                        }
                        return null;
                      })}
                    </ol>
                  );
                }
                return (
                  <p key={index} className="text-stone-700 mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Engagement Actions */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button variant="outline" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  Like ({post.stats.likes})
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save ({post.stats.bookmarks})
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Eye className="w-4 h-4" />
                {post.stats.views} views
              </div>
            </div>

            <Separator className="my-6" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium text-stone-800">About the Author</div>
                  <div className="text-sm text-stone-600">
                    {post.author.name} • {post.author.title}
                  </div>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <User className="w-4 h-4 mr-2" />
                View Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default PostDetail;
