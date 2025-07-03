
import React from 'react';
import Layout from '@/components/Layout';
import { MapPin, Camera, BookOpen, Award, Settings } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  // Sample user data
  const user = {
    name: 'Dr. Elena Marchetti',
    title: 'Stone Heritage Archaeologist',
    location: 'Florence, Italy',
    bio: 'Passionate about preserving our stone heritage. Specializing in Renaissance marble work and Roman construction techniques. Contributing to the global understanding of historical stone craftsmanship.',
    joinDate: 'March 2023',
    stats: {
      discoveries: 47,
      articles: 23,
      contributions: 156,
      followers: 892
    },
    expertise: ['Roman Architecture', 'Marble Analysis', 'Stone Conservation', 'Archaeological Documentation'],
    recentActivity: [
      {
        type: 'discovery',
        title: 'Byzantine Capital Fragment',
        location: 'Ravenna, Italy',
        date: '2 days ago'
      },
      {
        type: 'article',
        title: 'Techniques for Marble Patina Analysis',
        date: '1 week ago'
      },
      {
        type: 'contribution',
        title: 'Updated Carrara Quarry Records',
        date: '2 weeks ago'
      }
    ]
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'discovery': return <MapPin className="w-4 h-4" />;
      case 'article': return <BookOpen className="w-4 h-4" />;
      case 'contribution': return <Camera className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <Card>
              <CardContent className="p-6 text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-stone-200 text-stone-700 text-2xl">
                    EM
                  </AvatarFallback>
                </Avatar>
                
                <h1 className="text-2xl font-bold text-stone-800 mb-1">{user.name}</h1>
                <p className="text-stone-600 mb-2">{user.title}</p>
                <div className="flex items-center justify-center space-x-1 text-stone-500 mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{user.location}</span>
                </div>
                
                <p className="text-sm text-stone-600 leading-relaxed mb-4">{user.bio}</p>
                
                <div className="text-xs text-stone-500 mb-4">
                  Member since {user.joinDate}
                </div>

                <Button className="w-full mb-2">
                  <Settings className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Stats Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Statistics</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-quarry-600">{user.stats.discoveries}</div>
                    <div className="text-xs text-stone-500">Discoveries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-600">{user.stats.articles}</div>
                    <div className="text-xs text-stone-500">Articles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-700">{user.stats.contributions}</div>
                    <div className="text-xs text-stone-500">Contributions</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-stone-800">{user.stats.followers}</div>
                    <div className="text-xs text-stone-500">Followers</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expertise Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Expertise
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-2">
                  {user.expertise.map((skill, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                  {user.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 rounded-lg hover:bg-stone-50 transition-colors">
                      <div className={`p-2 rounded-full ${
                        activity.type === 'discovery' ? 'bg-quarry-100 text-quarry-600' :
                        activity.type === 'article' ? 'bg-stone-100 text-stone-600' :
                        'bg-marble-100 text-stone-600'
                      }`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-stone-800">{activity.title}</h3>
                        {activity.location && (
                          <p className="text-sm text-stone-500 flex items-center mt-1">
                            <MapPin className="w-3 h-3 mr-1" />
                            {activity.location}
                          </p>
                        )}
                        <p className="text-xs text-stone-400 mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Placeholder for future content */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Contributions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="text-center py-12">
                  <div className="text-4xl text-stone-300 mb-4">📚</div>
                  <h3 className="text-lg font-medium text-stone-700 mb-2">Your contributions will appear here</h3>
                  <p className="text-stone-500 mb-4">Share discoveries, write articles, and upload photos to build your portfolio.</p>
                  <Button>Start Contributing</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
