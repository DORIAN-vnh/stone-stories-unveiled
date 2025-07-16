import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, Share2, Send, MapPin, Calendar, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialPost {
  id: string;
  author: string;
  authorAvatar: string;
  location: string;
  date: string;
  image: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  views: number;
  tags: string[];
  isLiked: boolean;
}

const SocialFeed = () => {
  const { toast } = useToast();
  const [posts, setPosts] = useState<SocialPost[]>([
    {
      id: '1',
      author: 'Dr. Maria Santos',
      authorAvatar: '/placeholder.svg',
      location: 'Carrara, Italy',
      date: '2 hours ago',
      image: '/placeholder.svg',
      title: 'Incredible Carrara Marble Extraction',
      description: 'Witnessed the most beautiful marble extraction today at the historic Carrara quarries. The precision and care these artisans put into their work is truly remarkable. #CarraraMarble #StoneHeritage',
      likes: 234,
      comments: 45,
      views: 1200,
      tags: ['Marble', 'Quarry', 'Heritage'],
      isLiked: false
    },
    {
      id: '2',
      author: 'James McLeod',
      authorAvatar: '/placeholder.svg',
      location: 'Edinburgh, Scotland',
      date: '4 hours ago',
      image: '/placeholder.svg',
      title: 'Medieval Stone Church Restoration',
      description: 'Amazing progress on the 12th-century church restoration project. Working with original limestone blocks to maintain historical authenticity. Each stone tells a story! 🏰',
      likes: 156,
      comments: 23,
      views: 890,
      tags: ['Restoration', 'Medieval', 'Limestone'],
      isLiked: true
    },
    {
      id: '3',
      author: 'Prof. Elena Rodriguez',
      authorAvatar: '/placeholder.svg',
      location: 'Athens, Greece',
      date: '6 hours ago',
      image: '/placeholder.svg',
      title: 'Pentelic Marble Discovery',
      description: 'Exciting day at the Pentelic marble quarries! Found evidence of ancient extraction techniques that date back to the construction of the Parthenon. History lives in stone! ⚱️',
      likes: 298,
      comments: 67,
      views: 1500,
      tags: ['Ancient', 'Pentelic', 'Discovery'],
      isLiked: false
    }
  ]);

  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState<string | null>(null);

  const handleLike = (postId: string) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked, 
            likes: post.isLiked ? post.likes - 1 : post.likes + 1 
          }
        : post
    ));
  };

  const handleComment = (postId: string) => {
    if (!newComment.trim()) return;
    
    toast({
      title: "Comment Added!",
      description: "Your comment has been posted successfully.",
    });
    
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, comments: post.comments + 1 }
        : post
    ));
    
    setNewComment('');
    setShowComments(null);
  };

  const handleShare = (post: SocialPost) => {
    toast({
      title: "Shared!",
      description: `"${post.title}" has been shared to your network.`,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Stone Heritage Feed</h2>
        <p className="text-stone-600">Discover daily stories from the stone heritage community</p>
      </div>

      {posts.map((post) => (
        <Card key={post.id} className="overflow-hidden animate-fade-in">
          {/* Post Header */}
          <div className="p-4 border-b border-stone-100">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={post.authorAvatar} />
                <AvatarFallback>{post.author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-800">{post.author}</h4>
                <div className="flex items-center gap-2 text-sm text-stone-500">
                  <MapPin className="w-3 h-3" />
                  <span>{post.location}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Post Image */}
          <div className="aspect-square bg-stone-200">
            <img 
              src={post.image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Post Content */}
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="font-semibold text-stone-800">{post.title}</h3>
              <p className="text-stone-600 text-sm">{post.description}</p>
              
              {/* Tags */}
              <div className="flex gap-2 flex-wrap">
                {post.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-stone-500 pt-2">
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  {post.likes}
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments}
                </div>
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-stone-100">
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className={`hover-scale ${post.isLiked ? 'text-red-500' : 'text-stone-500'}`}
                  >
                    <Heart className={`w-4 h-4 mr-1 ${post.isLiked ? 'fill-current' : ''}`} />
                    {post.isLiked ? 'Liked' : 'Like'}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowComments(showComments === post.id ? null : post.id)}
                    className="text-stone-500 hover-scale"
                  >
                    <MessageCircle className="w-4 h-4 mr-1" />
                    Comment
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post)}
                    className="text-stone-500 hover-scale"
                  >
                    <Share2 className="w-4 h-4 mr-1" />
                    Share
                  </Button>
                </div>
              </div>

              {/* Comment Section */}
              {showComments === post.id && (
                <div className="space-y-3 pt-3 border-t border-stone-100 animate-fade-in">
                  <div className="flex gap-2">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>YU</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleComment(post.id)}
                        className="text-sm"
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleComment(post.id)}
                        disabled={!newComment.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Sample Comments */}
                  <div className="space-y-2 ml-10">
                    <div className="text-sm">
                      <span className="font-medium text-stone-800">john_stone_expert</span>
                      <span className="text-stone-600 ml-2">Absolutely fascinating work! 💪</span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-stone-800">heritage_lover</span>
                      <span className="text-stone-600 ml-2">This is why I love this community ❤️</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="text-center py-8">
        <Button variant="outline" className="hover-scale">
          Load More Posts
        </Button>
      </div>
    </div>
  );
};

export default SocialFeed;