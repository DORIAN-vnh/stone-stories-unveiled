
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Calendar, Eye, Heart } from 'lucide-react';

interface FeedItem {
  id: string;
  title: string;
  description: string;
  type: 'monument' | 'quarry' | 'marble' | 'company';
  location: string;
  date: string;
  image: string;
  likes: number;
  views: number;
}

const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    title: 'Ancient Roman Marble Techniques Discovered',
    description: 'New archaeological findings reveal sophisticated marble working techniques used in the construction of the Pantheon.',
    type: 'monument',
    location: 'Rome, Italy',
    date: '2024-01-20',
    image: '/placeholder.svg',
    likes: 234,
    views: 1520
  },
  {
    id: '2',
    title: 'Carrara Quarry Sustainability Initiative',
    description: 'The famous Carrara marble quarry introduces new eco-friendly extraction methods to preserve the mountain.',
    type: 'quarry',
    location: 'Carrara, Italy',
    date: '2024-01-18',
    image: '/placeholder.svg',
    likes: 156,
    views: 980
  },
  {
    id: '3',
    title: 'Rare Pentelic Marble Found in Greece',
    description: 'Archaeologists discover a new vein of the precious Pentelic marble used in the Parthenon construction.',
    type: 'marble',
    location: 'Athens, Greece',
    date: '2024-01-15',
    image: '/placeholder.svg',
    likes: 89,
    views: 654
  },
  {
    id: '4',
    title: 'Stone Heritage Ltd Restores Medieval Cathedral',
    description: 'Leading restoration company completes 5-year project bringing 12th century cathedral back to its original glory.',
    type: 'company',
    location: 'Canterbury, UK',
    date: '2024-01-12',
    image: '/placeholder.svg',
    likes: 312,
    views: 2100
  }
];

const getTypeColor = (type: string) => {
  const colorMap = {
    monument: 'bg-blue-100 text-blue-800',
    quarry: 'bg-yellow-100 text-yellow-800',
    marble: 'bg-purple-100 text-purple-800',
    company: 'bg-green-100 text-green-800'
  };
  return colorMap[type as keyof typeof colorMap] || 'bg-gray-100 text-gray-800';
};

const DiscoveryFeed = () => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-stone-800 mb-2">Latest Discoveries</h2>
        <p className="text-stone-600">Stay updated with the latest findings in historic stone materials</p>
      </div>

      <div className="space-y-4">
        {mockFeedItems.map((item) => (
          <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge className={getTypeColor(item.type)}>
                      {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-stone-500">
                      <MapPin className="w-3 h-3" />
                      {item.location}
                    </div>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <CardDescription className="text-stone-600">
                    {item.description}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-stone-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {item.views}
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {item.likes}
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = `/post/${item.id}`}
                >
                  Read More
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        <Button variant="outline">
          Load More Stories
        </Button>
      </div>
    </div>
  );
};

export default DiscoveryFeed;
