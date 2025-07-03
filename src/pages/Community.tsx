
import React from 'react';
import Layout from '@/components/Layout';
import { Users, Award, MessageCircle, Calendar, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Community = () => {
  const topContributors = [
    {
      name: 'Dr. Maria Rossi',
      title: 'Stone Archaeologist',
      contributions: 234,
      speciality: 'Roman Architecture',
      avatar: '/placeholder-avatar-1.jpg'
    },
    {
      name: 'Jean-Pierre Dubois',
      title: 'Quarry Master',
      contributions: 187,
      speciality: 'Limestone Extraction',
      avatar: '/placeholder-avatar-2.jpg'
    },
    {
      name: 'Emma Thompson',
      title: 'Stone Conservator',
      contributions: 156,
      speciality: 'Medieval Restoration',
      avatar: '/placeholder-avatar-3.jpg'
    }
  ];

  const discussions = [
    {
      title: 'Best practices for marble restoration in humid climates',
      author: 'Dr. Sarah Chen',
      replies: 23,
      lastActivity: '2 hours ago',
      category: 'Conservation'
    },
    {
      title: 'Identifying stone types in Gothic cathedrals',
      author: 'Prof. Antonio Vecchi',
      replies: 41,
      lastActivity: '4 hours ago',
      category: 'Architecture'
    },
    {
      title: 'Modern quarrying techniques vs traditional methods',
      author: 'Mike Johnson',
      replies: 17,
      lastActivity: '6 hours ago',
      category: 'Industry'
    }
  ];

  const upcomingEvents = [
    {
      title: 'International Stone Heritage Conference',
      date: '2024-03-15',
      location: 'Florence, Italy',
      type: 'Conference'
    },
    {
      title: 'Quarry Site Visit - Carrara',
      date: '2024-03-22',
      location: 'Carrara, Italy',
      type: 'Field Trip'
    },
    {
      title: 'Stone Conservation Workshop',
      date: '2024-04-05',
      location: 'Online',
      type: 'Workshop'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">
            Community Hub
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Connect with stone heritage experts, share knowledge, and participate in discussions 
            about historical stone materials and conservation techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Discussions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MessageCircle className="w-6 h-6 mr-2" />
                  Active Discussions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {discussions.map((discussion, index) => (
                    <div key={index} className="border-b border-stone-100 last:border-b-0 pb-4 last:pb-0">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-stone-800 flex-1 cursor-pointer hover:text-quarry-600 transition-colors">
                          {discussion.title}
                        </h3>
                        <Badge variant="outline" className="ml-2">
                          {discussion.category}
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-stone-500 space-x-4">
                        <span>by {discussion.author}</span>
                        <span>•</span>
                        <span>{discussion.replies} replies</span>
                        <span>•</span>
                        <span>{discussion.lastActivity}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button className="w-full">View All Discussions</Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Calendar className="w-6 h-6 mr-2" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {upcomingEvents.map((event, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 rounded-lg hover:bg-stone-50 transition-colors">
                      <div className="bg-quarry-100 p-2 rounded-lg">
                        <Calendar className="w-5 h-5 text-quarry-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-stone-800">{event.title}</h3>
                        <p className="text-sm text-stone-500">{event.location}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary" className="text-xs">
                            {event.type}
                          </Badge>
                          <span className="text-xs text-stone-400">{event.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">See All Events</Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Community Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Community Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Total Members</span>
                    <span className="font-bold text-stone-800">12,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Active Discussions</span>
                    <span className="font-bold text-stone-800">347</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Countries</span>
                    <span className="font-bold text-stone-800">89</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-stone-600">Experts Online</span>
                    <span className="font-bold text-quarry-600">127</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Contributors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Award className="w-5 h-5 mr-2" />
                  Top Contributors
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {topContributors.map((contributor, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={contributor.avatar} />
                          <AvatarFallback className="bg-stone-200 text-stone-700">
                            {contributor.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                          index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-yellow-600'
                        }`}>
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-stone-800 truncate">{contributor.name}</h3>
                        <p className="text-sm text-stone-500 truncate">{contributor.title}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {contributor.speciality}
                          </Badge>
                          <span className="text-xs text-stone-400">
                            {contributor.contributions} contributions
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button variant="outline" className="w-full">View All Contributors</Button>
                </div>
              </CardContent>
            </Card>

            {/* Join Community CTA */}
            <Card className="quarry-gradient">
              <CardContent className="p-6 text-center">
                <Users className="w-12 h-12 text-quarry-600 mx-auto mb-4" />
                <h3 className="font-bold text-stone-800 mb-2">Join Our Community</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Connect with experts, share your knowledge, and learn from the global stone heritage community.
                </p>
                <Button className="w-full bg-quarry-600 hover:bg-quarry-700">
                  Become a Member
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Community;
