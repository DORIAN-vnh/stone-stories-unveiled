
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import InteractiveMap from '@/components/InteractiveMap';
import DiscoveryFeed from '@/components/DiscoveryFeed';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Image, BookOpen, Users } from 'lucide-react';

const Index = () => {
  const [activeView, setActiveView] = useState<'map' | 'feed'>('map');

  const stats = [
    { icon: MapPin, label: 'Historic Sites', value: '2,847', color: 'text-stone-600' },
    { icon: Image, label: 'Quarries', value: '1,203', color: 'text-quarry-600' },
    { icon: BookOpen, label: 'Articles', value: '856', color: 'text-stone-500' },
    { icon: Users, label: 'Contributors', value: '12,450', color: 'text-stone-700' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-stone-800 mb-4">
            Discover the World of 
            <span className="block text-quarry-600">Historic Stone</span>
          </h1>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto mb-8">
            Explore monuments, quarries, and marble varieties from around the globe. 
            Connect with experts and contribute to our growing knowledge base.
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <Icon className={`w-8 h-8 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                    <div className="text-sm text-stone-600">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg p-1 shadow-sm border border-stone-200">
            <Button
              variant={activeView === 'map' ? 'default' : 'ghost'}
              onClick={() => setActiveView('map')}
              className="px-6"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Map View
            </Button>
            <Button
              variant={activeView === 'feed' ? 'default' : 'ghost'}
              onClick={() => setActiveView('feed')}
              className="px-6"
            >
              <Image className="w-4 h-4 mr-2" />
              Discovery Feed
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="min-h-[600px]">
          {activeView === 'map' ? (
            <div className="h-[600px] rounded-lg overflow-hidden shadow-lg">
              <InteractiveMap />
            </div>
          ) : (
            <div className="max-w-2xl mx-auto">
              <DiscoveryFeed />
            </div>
          )}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <Card className="stone-gradient border-stone-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">
                Join Our Community of Stone Enthusiasts
              </h2>
              <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
                Share your discoveries, connect with experts, and help preserve the knowledge 
                of historical stone materials for future generations.
              </p>
              <div className="space-x-4">
                <Button size="lg" className="bg-stone-700 hover:bg-stone-800">
                  Create Account
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
