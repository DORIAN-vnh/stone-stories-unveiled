
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Award, TrendingUp, Calendar, MapPin, MessageCircle, Heart, Eye } from 'lucide-react';

const Contributors = () => {
  const topContributors = [
    {
      id: 1,
      name: 'Dr. Elena Rodriguez',
      title: 'Stone Archaeologist',
      organization: 'University of Florence',
      location: 'Florence, Italy',
      avatar: '/placeholder.svg',
      speciality: 'Roman Architecture',
      contributions: 234,
      posts: 45,
      discussions: 67,
      likes: 1892,
      joinedDate: '2023-03-15',
      badges: ['Expert', 'Top Contributor', 'Mentor'],
      bio: 'Specialized in Roman stone construction techniques with 15 years of field experience.',
      recentActivity: [
        { type: 'post', title: 'New findings at Pompeii stone workshop', date: '2 days ago' },
        { type: 'discussion', title: 'Marble restoration techniques', date: '5 days ago' }
      ]
    },
    {
      id: 2,
      name: 'Prof. James Mitchell',
      title: 'Quarry Master',
      organization: 'Yorkshire Stone Ltd',
      location: 'Yorkshire, UK',
      avatar: '/placeholder.svg',
      speciality: 'Limestone Extraction',
      contributions: 187,
      posts: 32,
      discussions: 89,
      likes: 1543,
      joinedDate: '2023-01-22',
      badges: ['Industry Expert', 'Verified'],
      bio: 'Third-generation quarry master with expertise in sustainable extraction methods.',
      recentActivity: [
        { type: 'post', title: 'Sustainable quarrying practices', date: '1 day ago' },
        { type: 'discussion', title: 'Modern vs traditional methods', date: '3 days ago' }
      ]
    },
    {
      id: 3,
      name: 'Dr. Sophia Chen',
      title: 'Stone Conservator',
      organization: 'Getty Conservation Institute',
      location: 'Los Angeles, USA',
      avatar: '/placeholder.svg',
      speciality: 'Medieval Restoration',
      contributions: 156,
      posts: 28,
      discussions: 72,
      likes: 1287,
      joinedDate: '2023-05-10',
      badges: ['Conservation Expert', 'Published Author'],
      bio: 'Leading expert in medieval stone conservation with focus on Gothic architecture.',
      recentActivity: [
        { type: 'post', title: 'Digital documentation methods', date: '4 days ago' },
        { type: 'discussion', title: 'Climate impact on stone', date: '1 week ago' }
      ]
    }
  ];

  const monthlyRising = [
    {
      name: 'Marco Alberti',
      title: 'Graduate Student',
      contributions: 23,
      growth: '+45%',
      speciality: 'Volcanic Stone'
    },
    {
      name: 'Sarah Thompson',
      title: 'Museum Curator',
      contributions: 18,
      growth: '+38%',
      speciality: 'Ancient Techniques'
    },
    {
      name: 'Ahmed Hassan',
      title: 'Stone Mason',
      contributions: 15,
      growth: '+32%',
      speciality: 'Traditional Crafts'
    }
  ];

  const getBadgeColor = (badge: string) => {
    const colors = {
      'Expert': 'bg-blue-100 text-blue-800',
      'Top Contributor': 'bg-yellow-100 text-yellow-800',
      'Mentor': 'bg-green-100 text-green-800',
      'Industry Expert': 'bg-purple-100 text-purple-800',
      'Verified': 'bg-emerald-100 text-emerald-800',
      'Conservation Expert': 'bg-orange-100 text-orange-800',
      'Published Author': 'bg-indigo-100 text-indigo-800'
    };
    return colors[badge as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Top Contributors</h1>
          <p className="text-stone-600">
            Recognizing the experts who make our community thrive
          </p>
        </div>

        <Tabs defaultValue="all-time" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
            <TabsTrigger value="all-time" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              All Time
            </TabsTrigger>
            <TabsTrigger value="monthly" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This Month
            </TabsTrigger>
            <TabsTrigger value="rising" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Rising Stars
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all-time" className="space-y-8">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {topContributors.slice(0, 3).map((contributor, index) => (
                <Card key={contributor.id} className={`relative ${index === 0 ? 'md:order-2 ring-2 ring-yellow-200' : index === 1 ? 'md:order-1' : 'md:order-3'}`}>
                  {index === 0 && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                        <Award className="w-5 h-5 text-white" />
                      </div>
                    </div>
                  )}
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <Avatar className="w-20 h-20 mx-auto">
                        <AvatarImage src={contributor.avatar} />
                        <AvatarFallback className="text-xl">
                          {contributor.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                      }`}>
                        {index + 1}
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-stone-800 mb-1">{contributor.name}</h3>
                    <p className="text-stone-600 text-sm mb-2">{contributor.title}</p>
                    <p className="text-stone-500 text-xs mb-3">{contributor.organization}</p>
                    
                    <div className="flex flex-wrap gap-1 justify-center mb-4">
                      {contributor.badges.slice(0, 2).map((badge, idx) => (
                        <Badge key={idx} className={`text-xs ${getBadgeColor(badge)}`}>
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="font-bold text-lg text-quarry-600">{contributor.contributions}</div>
                        <div className="text-xs text-stone-500">Contributions</div>
                      </div>
                      <div>
                        <div className="font-bold text-lg text-stone-800">{contributor.likes}</div>
                        <div className="text-xs text-stone-500">Likes</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Detailed Profiles */}
            <div className="space-y-6">
              {topContributors.map((contributor, index) => (
                <Card key={contributor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-6">
                      <div className="relative flex-shrink-0">
                        <Avatar className="w-16 h-16">
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback className="text-lg">
                            {contributor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-stone-800">{contributor.name}</h3>
                            <p className="text-stone-600">{contributor.title}</p>
                            <div className="flex items-center gap-2 mt-1 text-sm text-stone-500">
                              <MapPin className="w-3 h-3" />
                              {contributor.location}
                            </div>
                          </div>
                          <Button variant="outline" size="sm">
                            Follow
                          </Button>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {contributor.badges.map((badge, idx) => (
                            <Badge key={idx} className={getBadgeColor(badge)}>
                              {badge}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-stone-600 mb-4">{contributor.bio}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <div className="font-bold text-lg text-quarry-600">{contributor.contributions}</div>
                            <div className="text-xs text-stone-500">Total Contributions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg text-stone-800">{contributor.posts}</div>
                            <div className="text-xs text-stone-500">Posts</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg text-stone-800">{contributor.discussions}</div>
                            <div className="text-xs text-stone-500">Discussions</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-lg text-red-500">{contributor.likes}</div>
                            <div className="text-xs text-stone-500">Likes Received</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-stone-800 mb-2">Recent Activity</h4>
                          <div className="space-y-1">
                            {contributor.recentActivity.map((activity, idx) => (
                              <div key={idx} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  {activity.type === 'post' ? (
                                    <Eye className="w-3 h-3 text-blue-500" />
                                  ) : (
                                    <MessageCircle className="w-3 h-3 text-green-500" />
                                  )}
                                  <span className="text-stone-700">{activity.title}</span>
                                </div>
                                <span className="text-stone-400">{activity.date}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <div className="text-center py-12 text-stone-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>Monthly top contributors will be displayed here.</p>
            </div>
          </TabsContent>

          <TabsContent value="rising">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monthlyRising.map((contributor, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4">
                      <TrendingUp className="w-12 h-12 text-green-500 mx-auto mb-2" />
                      <Badge className="bg-green-100 text-green-800">
                        {contributor.growth}
                      </Badge>
                    </div>
                    <h3 className="font-bold text-lg text-stone-800 mb-1">{contributor.name}</h3>
                    <p className="text-stone-600 text-sm mb-2">{contributor.title}</p>
                    <p className="text-stone-500 text-xs mb-4">{contributor.speciality}</p>
                    <div className="text-center">
                      <div className="font-bold text-lg text-quarry-600">{contributor.contributions}</div>
                      <div className="text-xs text-stone-500">This Month</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Contributors;
