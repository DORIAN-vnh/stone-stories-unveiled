
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Users, FileText, Settings, Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import LocationForm from './LocationForm';
import PostEditor from './PostEditor';

interface Post {
  id: string;
  title: string;
  content: string;
  author: string;
  status: 'published' | 'draft';
  createdAt: string;
}

interface Location {
  id: string;
  name: string;
  type: string;
  address: string;
  status: 'active' | 'pending';
}

const AdminDashboard = () => {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Ancient Roman Quarries Discovery',
      content: 'Recent archaeological findings...',
      author: 'Dr. Smith',
      status: 'published',
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      title: 'Marble Restoration Techniques',
      content: 'Traditional methods for...',
      author: 'Prof. Johnson',
      status: 'draft',
      createdAt: '2024-01-10'
    }
  ]);

  const [locations, setLocations] = useState<Location[]>([
    {
      id: '1',
      name: 'Carrara Marble Quarry',
      type: 'quarry',
      address: 'Carrara, Tuscany, Italy',
      status: 'active'
    },
    {
      id: '2',
      name: 'Pantheon Rome',
      type: 'monument',
      address: 'Piazza della Rotonda, Rome, Italy',
      status: 'active'
    }
  ]);

  const stats = [
    { icon: FileText, label: 'Total Posts', value: posts.length, color: 'text-blue-600' },
    { icon: MapPin, label: 'Locations', value: locations.length, color: 'text-green-600' },
    { icon: Users, label: 'Active Users', value: '1,247', color: 'text-purple-600' },
    { icon: Settings, label: 'Pending Reviews', value: '23', color: 'text-orange-600' }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-stone-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                  </div>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Management Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="posts">Posts Management</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Posts</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Create New Post</DialogTitle>
                  <DialogDescription>
                    Create a new article or announcement for the community
                  </DialogDescription>
                </DialogHeader>
                <PostEditor onSave={(post) => {
                  setPosts(prev => [...prev, { ...post, id: Date.now().toString() }]);
                }} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{post.title}</h4>
                      <p className="text-sm text-stone-600">By {post.author} • {post.createdAt}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="locations" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Manage Locations</h3>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Location</DialogTitle>
                  <DialogDescription>
                    Add a new quarry, monument, or stone-related location
                  </DialogDescription>
                </DialogHeader>
                <LocationForm onSave={(location) => {
                  setLocations(prev => [...prev, { ...location, id: Date.now().toString() }]);
                }} />
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-3">
            {locations.map((location) => (
              <Card key={location.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{location.name}</h4>
                      <p className="text-sm text-stone-600">{location.address}</p>
                      <Badge variant="outline" className="mt-1">
                        {location.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={location.status === 'active' ? 'default' : 'secondary'}>
                        {location.status}
                      </Badge>
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure application settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">
                  <Settings className="w-4 h-4 mr-2" />
                  General Settings
                </Button>
                <Button variant="outline">
                  <Users className="w-4 h-4 mr-2" />
                  User Management
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
