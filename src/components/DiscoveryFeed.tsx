
import React from 'react';
import { MapPin, Clock, Heart, MessageCircle, Share } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface FeedItem {
  id: string;
  user: {
    name: string;
    avatar?: string;
    expertise: string;
  };
  type: 'discovery' | 'article' | 'photo';
  title: string;
  description: string;
  image: string;
  location?: string;
  timestamp: string;
  likes: number;
  comments: number;
  tags: string[];
}

const DiscoveryFeed = () => {
  // Sample feed data - in real implementation, this would come from your backend
  const feedItems: FeedItem[] = [
    {
      id: '1',
      user: {
        name: 'Dr. Maria Rossi',
        expertise: 'Stone Archaeologist'
      },
      type: 'discovery',
      title: 'Rare Roman Inscription Found',
      description: 'Just discovered this fascinating inscription on a marble fragment near Pompeii. The craftsmanship suggests it dates back to the 1st century AD.',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      location: 'Pompeii, Italy',
      timestamp: '2 hours ago',
      likes: 127,
      comments: 23,
      tags: ['Roman', 'Marble', 'Inscription', 'Archaeology']
    },
    {
      id: '2',
      user: {
        name: 'Jean-Pierre Dubois',
        expertise: 'Quarry Master'
      },
      type: 'photo',
      title: 'Morning at the Quarry',
      description: 'Beautiful sunrise over our limestone quarry in Provence. This particular stone has been used in cathedrals across France.',
      image: 'https://images.unsplash.com/photo-1578924436294-9c1f9e4b8f48?w=400&h=300&fit=crop',
      location: 'Provence, France',
      timestamp: '5 hours ago',
      likes: 89,
      comments: 12,
      tags: ['Limestone', 'Quarry', 'France', 'Cathedral Stone']
    },
    {
      id: '3',
      user: {
        name: 'Emma Thompson',
        expertise: 'Stone Conservator'
      },
      type: 'article',
      title: 'Restoring 12th Century Stonework',
      description: 'Sharing techniques we used to restore the weathered limestone facade of this medieval church. The key is understanding the original mortar composition.',
      image: 'https://images.unsplash.com/photo-1580654712603-eb43273aff33?w=400&h=300&fit=crop',
      location: 'Canterbury, UK',
      timestamp: '1 day ago',
      likes: 203,
      comments: 45,
      tags: ['Conservation', 'Medieval', 'Limestone', 'Restoration']
    }
  ];

  const formatTimestamp = (timestamp: string) => {
    return timestamp;
  };

  return (
    <div className="space-y-6">
      {feedItems.map((item) => (
        <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
          {/* User Header */}
          <div className="p-4 pb-2">
            <div className="flex items-center space-x-3">
              <Avatar className="w-10 h-10">
                <AvatarImage src={item.user.avatar} />
                <AvatarFallback className="bg-stone-200 text-stone-700">
                  {item.user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-stone-800 text-sm">{item.user.name}</h3>
                  <span className="text-xs text-stone-500">•</span>
                  <span className="text-xs text-stone-500">{item.user.expertise}</span>
                </div>
                {item.location && (
                  <div className="flex items-center space-x-1 mt-1">
                    <MapPin className="w-3 h-3 text-stone-400" />
                    <span className="text-xs text-stone-500">{item.location}</span>
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-1 text-stone-400">
                <Clock className="w-4 h-4" />
                <span className="text-xs">{formatTimestamp(item.timestamp)}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-0">
            {/* Image */}
            <div className="relative">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-64 object-cover"
              />
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  item.type === 'discovery' ? 'bg-quarry-100 text-quarry-800' :
                  item.type === 'article' ? 'bg-stone-100 text-stone-700' :
                  'bg-marble-100 text-stone-700'
                }`}>
                  {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </span>
              </div>
            </div>

            {/* Text Content */}
            <div className="p-4">
              <h2 className="font-semibold text-lg text-stone-800 mb-2">{item.title}</h2>
              <p className="text-stone-600 text-sm mb-3 leading-relaxed">{item.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-stone-100 text-stone-600 px-2 py-1 rounded-md text-xs font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{item.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">{item.comments}</span>
                  </Button>
                </div>
                <Button variant="ghost" size="sm" className="p-2">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DiscoveryFeed;
