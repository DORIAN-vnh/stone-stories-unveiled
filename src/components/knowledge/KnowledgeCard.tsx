
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Image, Play, Download } from 'lucide-react';
import { KnowledgeItem } from '@/types/knowledge';

interface KnowledgeCardProps {
  item: KnowledgeItem;
  variant?: 'featured' | 'regular';
}

const getIconForType = (type: string) => {
  const iconMap = {
    article: FileText,
    gallery: Image,
    tutorial: Play,
    factsheet: Download
  };
  return iconMap[type as keyof typeof iconMap] || FileText;
};

const getColorForType = (type: string) => {
  const colorMap = {
    article: 'bg-blue-500',
    gallery: 'bg-purple-500',
    tutorial: 'bg-green-500',
    factsheet: 'bg-orange-500'
  };
  return colorMap[type as keyof typeof colorMap] || 'bg-gray-500';
};

const KnowledgeCard = ({ item, variant = 'regular' }: KnowledgeCardProps) => {
  const IconComponent = getIconForType(item.type);
  const isFeatured = variant === 'featured';

  if (isFeatured) {
    return (
      <Card className="hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <IconComponent className="w-5 h-5" />
                <Badge variant="secondary" className={`${getColorForType(item.type)} text-white`}>
                  {item.type}
                </Badge>
                <Badge variant="outline">{item.category}</Badge>
              </div>
              <CardTitle className="text-lg">{item.title}</CardTitle>
            </div>
          </div>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {item.readTime && (
              <p className="text-sm text-stone-500">{item.readTime}</p>
            )}
            {item.videoLength && (
              <p className="text-sm text-stone-500">Video: {item.videoLength}</p>
            )}
            {item.imageCount && (
              <p className="text-sm text-stone-500">{item.imageCount} images</p>
            )}
            <div className="flex flex-wrap gap-1">
              {item.tags.map(tag => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 mb-2">
          <IconComponent className="w-4 h-4" />
          <Badge variant="secondary" className={`${getColorForType(item.type)} text-white text-xs`}>
            {item.type}
          </Badge>
        </div>
        <CardTitle className="text-base line-clamp-2">{item.title}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{item.description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-2">
          {(item.readTime || item.videoLength || item.imageCount) && (
            <p className="text-xs text-stone-500">
              {item.readTime || `Video: ${item.videoLength}` || `${item.imageCount} images`}
            </p>
          )}
          <div className="flex flex-wrap gap-1">
            {item.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {item.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{item.tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default KnowledgeCard;
