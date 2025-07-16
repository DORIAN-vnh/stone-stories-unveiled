
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, 
  MapPin, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Eye,
  Edit,
  Trash2,
  Plus,
  Settings,
  Shield,
  Database
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { isAdmin } = useAuth();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState('overview');

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = [
    { title: 'Total Users', value: '12,450', change: '+8.2%', icon: Users, color: 'text-blue-600' },
    { title: 'Heritage Sites', value: '2,450', change: '+12.5%', icon: MapPin, color: 'text-green-600' },
    { title: 'Active Discussions', value: '347', change: '+5.1%', icon: TrendingUp, color: 'text-purple-600' },
    { title: 'Pending Reviews', value: '23', change: '-15.3%', icon: AlertTriangle, color: 'text-orange-600' }
  ];

  const pendingContent = [
    {
      id: 1,
      type: 'Monument',
      title: 'Stonehenge Analysis',
      author: 'Dr. Sarah Mitchell',
      status: 'pending',
      submitted: '2024-01-15'
    },
    {
      id: 2,
      type: 'Quarry',
      title: 'New Granite Quarry - Scotland',
      author: 'James McLeod',
      status: 'under_review',
      submitted: '2024-01-14'
    },
    {
      id: 3,
      type: 'Discussion',
      title: 'Medieval Stone Techniques',
      author: 'Prof. Elena Rodriguez',
      status: 'flagged',
      submitted: '2024-01-13'
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: 'Dr. Maria Santos',
      email: 'maria@university.edu',
      role: 'Expert',
      joined: '2024-01-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john@quarryco.com',
      role: 'Professional',
      joined: '2024-01-14',
      status: 'pending'
    },
    {
      id: 3,
      name: 'Lisa Chen',
      email: 'lisa@heritage.org',
      role: 'Researcher',
      joined: '2024-01-13',
      status: 'active'
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      under_review: 'bg-blue-100 text-blue-800',
      flagged: 'bg-red-100 text-red-800',
      approved: 'bg-green-100 text-green-800',
      active: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Admin Dashboard</h1>
            <p className="text-stone-600">Manage users, content, and system settings</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button onClick={() => window.location.href = '/create-content'}>
              <Plus className="w-4 h-4 mr-2" />
              Add Content
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-stone-800">{stat.value}</p>
                      <p className={`text-sm ${stat.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change} from last month
                      </p>
                    </div>
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Pending Reviews */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    Pending Reviews
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {pendingContent.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800">{item.title}</h4>
                          <p className="text-sm text-stone-500">by {item.author}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{item.type}</Badge>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status.replace('_', ' ')}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => window.location.href = `/post/${item.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Content Approved",
                                description: `${item.title} has been approved and published.`,
                              });
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => {
                              toast({
                                title: "Content Rejected",
                                description: `${item.title} has been rejected.`,
                                variant: "destructive"
                              });
                            }}
                          >
                            <XCircle className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Users */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Recent Users
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 rounded-lg border">
                        <div className="flex-1">
                          <h4 className="font-medium text-stone-800">{user.name}</h4>
                          <p className="text-sm text-stone-500">{user.email}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{user.role}</Badge>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-stone-500">
                  <Users className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>User management interface coming soon.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="content" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Content Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-stone-500">
                  <Database className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>Content management tools coming soon.</p>
                  <Button variant="outline" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Content
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Analytics & Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-stone-500">
                  <TrendingUp className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>Analytics dashboard coming soon.</p>
                  <Button variant="outline" className="mt-4">
                    Generate Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="system" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-stone-500">
                  <Settings className="w-12 h-12 mx-auto mb-4 text-stone-300" />
                  <p>System configuration panel coming soon.</p>
                  <Button variant="outline" className="mt-4">
                    Configure System
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

export default Admin;
