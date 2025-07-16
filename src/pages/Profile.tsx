
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Settings,
  Camera,
  Shield,
  Edit
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const Profile = () => {
  const { user, isAdmin } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: 'Stone heritage expert with 15+ years experience in conservation and archaeological research.',
    organization: 'University of Heritage Studies',
    specialization: 'Roman Architecture',
    location: 'Florence, Italy',
    website: 'https://stoneheritage.research.com'
  });

  const contributions = [
    {
      id: 1,
      type: 'Monument',
      title: 'Colosseum Stone Analysis',
      date: '2024-01-10',
      status: 'published',
      views: 1250
    },
    {
      id: 2,
      type: 'Discussion',
      title: 'Medieval Quarrying Techniques',
      date: '2024-01-08',
      status: 'active',
      replies: 23
    },
    {
      id: 3,
      type: 'Quarry',
      title: 'Carrara Marble Documentation',
      date: '2024-01-05',
      status: 'published',
      views: 890
    }
  ];

  const achievements = [
    { icon: Award, title: 'Expert Contributor', description: '100+ contributions', earned: '2024-01-01' },
    { icon: MessageSquare, title: 'Active Discussant', description: '50+ discussions', earned: '2023-12-15' },
    { icon: BookOpen, title: 'Knowledge Sharer', description: '25+ documented sites', earned: '2023-11-20' },
    { icon: Shield, title: 'Trusted Member', description: '1 year membership', earned: '2023-10-10' }
  ];

  const stats = [
    { label: 'Contributions', value: '156', icon: BookOpen },
    { label: 'Discussions', value: '43', icon: MessageSquare },
    { label: 'Total Views', value: '12.5K', icon: Award },
    { label: 'Reputation', value: '2,890', icon: Shield }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // Here you would save the profile data
    console.log('Saving profile data:', profileData);
  };

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-quarry-100 text-quarry-600 text-xl">
                    {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button size="sm" variant="outline" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="text-2xl font-bold text-stone-800 mb-1">{profileData.name}</h1>
                    <p className="text-stone-600 mb-2">{profileData.specialization}</p>
                    <div className="flex items-center gap-4 text-sm text-stone-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined October 2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {isAdmin && (
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        <Shield className="w-3 h-3 mr-1" />
                        Administrator
                      </Badge>
                    )}
                    <Button variant="outline" onClick={() => setIsEditing(!isEditing)}>
                      <Edit className="w-4 h-4 mr-2" />
                      {isEditing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>
                </div>
                
                <p className="text-stone-700 mb-4">{profileData.bio}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center p-3 rounded-lg bg-stone-50">
                        <Icon className="w-5 h-5 mx-auto mb-1 text-quarry-600" />
                        <div className="font-bold text-stone-800">{stat.value}</div>
                        <div className="text-xs text-stone-500">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Content */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="contributions">Contributions</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contributions.slice(0, 3).map((contribution) => (
                      <div key={contribution.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-stone-50">
                        <div className="w-2 h-2 bg-quarry-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800">{contribution.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{contribution.type}</Badge>
                            <span className="text-sm text-stone-500">{contribution.date}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  {isEditing ? (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="organization">Organization</Label>
                        <Input
                          id="organization"
                          value={profileData.organization}
                          onChange={(e) => setProfileData(prev => ({ ...prev, organization: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={profileData.website}
                          onChange={(e) => setProfileData(prev => ({ ...prev, website: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          value={profileData.bio}
                          onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                          rows={3}
                        />
                      </div>
                      <Button onClick={handleSave} className="w-full">
                        Save Changes
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-stone-500" />
                        <span>{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-stone-500" />
                        <span>{profileData.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-stone-500" />
                        <span>{profileData.organization}</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="contributions">
            <Card>
              <CardHeader>
                <CardTitle>My Contributions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contributions.map((contribution) => (
                    <div key={contribution.id} className="flex items-center justify-between p-4 rounded-lg border hover:shadow-sm">
                      <div className="flex-1">
                        <h4 className="font-medium text-stone-800 mb-1">{contribution.title}</h4>
                        <div className="flex items-center gap-3 text-sm text-stone-500">
                          <Badge variant="outline">{contribution.type}</Badge>
                          <span>{contribution.date}</span>
                          {contribution.views && <span>{contribution.views} views</span>}
                          {contribution.replies && <span>{contribution.replies} replies</span>}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">View</Button>
                        <Button size="sm" variant="outline">Edit</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {achievements.map((achievement, index) => {
                const Icon = achievement.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-quarry-100 rounded-lg flex items-center justify-center">
                          <Icon className="w-6 h-6 text-quarry-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-stone-800 mb-1">{achievement.title}</h3>
                          <p className="text-stone-600 text-sm mb-2">{achievement.description}</p>
                          <p className="text-xs text-stone-500">Earned on {achievement.earned}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-stone-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>Account settings panel coming soon.</p>
                  <Button variant="outline" className="mt-4">
                    Configure Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
