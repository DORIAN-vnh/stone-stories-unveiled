
import React from 'react';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/InteractiveMap';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Users, Calendar, TrendingUp, Search, Bot, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: MapPin,
      title: 'Interactive Map',
      description: 'Explore stone heritage sites, quarries, and monuments worldwide',
      link: '/',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Search,
      title: 'Advanced Search',
      description: 'Find specific stone types, locations, and heritage sites',
      link: '/search',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Bot,
      title: 'AI Assistant',
      description: 'Get expert advice on stone identification and conservation',
      link: '/ai-chat',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with stone heritage experts and enthusiasts',
      link: '/community',
      color: 'bg-orange-100 text-orange-600'
    }
  ];

  const stats = [
    { label: 'Heritage Sites', value: '2,450+', icon: Building2 },
    { label: 'Active Members', value: '12,450', icon: Users },
    { label: 'Countries', value: '89', icon: MapPin },
    { label: 'Discussions', value: '347', icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-stone-50">
        {/* Hero Section with Map */}
        <div className="relative h-screen">
          <InteractiveMap />
          
          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                Discover Stone Heritage
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                Explore the world's most precious stone monuments, quarries, and heritage sites
              </p>
              {!user ? (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="bg-quarry-600 hover:bg-quarry-700 text-white px-8 py-4 text-lg">
                      Join Our Community
                    </Button>
                  </Link>
                  <Link to="/search">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg">
                      Explore Now
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/search">
                    <Button size="lg" className="bg-quarry-600 hover:bg-quarry-700 text-white px-8 py-4 text-lg">
                      Start Exploring
                    </Button>
                  </Link>
                  <Link to="/ai-chat">
                    <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 px-8 py-4 text-lg">
                      Ask AI Assistant
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">
                Powerful Tools for Stone Heritage
              </h2>
              <p className="text-xl text-stone-600 max-w-3xl mx-auto">
                Our platform combines cutting-edge technology with expert knowledge to help you explore, 
                learn, and contribute to stone heritage preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Link key={index} to={feature.link}>
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                      <CardHeader>
                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <CardTitle className="text-lg">{feature.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-stone-600">{feature.description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16 bg-quarry-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-stone-800 mb-4">
                Global Stone Heritage Network
              </h2>
              <p className="text-xl text-stone-600">
                Join thousands of experts and enthusiasts preserving our stone heritage
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-quarry-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-quarry-600" />
                    </div>
                    <div className="text-3xl font-bold text-stone-800 mb-2">{stat.value}</div>
                    <div className="text-stone-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        {!user && (
          <div className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <Card className="quarry-gradient p-8">
                <h2 className="text-3xl font-bold text-stone-800 mb-4">
                  Ready to Join Our Community?
                </h2>
                <p className="text-xl text-stone-600 mb-8">
                  Connect with stone heritage experts, access exclusive resources, 
                  and contribute to preserving our cultural heritage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/register">
                    <Button size="lg" className="bg-quarry-600 hover:bg-quarry-700 text-white px-8 py-4">
                      Create Free Account
                    </Button>
                  </Link>
                  <Link to="/community">
                    <Button size="lg" variant="outline" className="px-8 py-4">
                      Explore Community
                    </Button>
                  </Link>
                </div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Index;
