
import React from 'react';
import Layout from '@/components/Layout';
import RealMap from '@/components/RealMap';
import DiscoveryFeed from '@/components/DiscoveryFeed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Map, Grid3X3 } from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      <div className="h-[calc(100vh-4rem)]">
        <Tabs defaultValue="map" className="h-full">
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1001]">
            <TabsList className="bg-white/90 backdrop-blur-sm">
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="w-4 h-4" />
                Map View
              </TabsTrigger>
              <TabsTrigger value="feed" className="flex items-center gap-2">
                <Grid3X3 className="w-4 h-4" />
                Discovery Feed
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="map" className="h-full mt-0">
            <RealMap />
          </TabsContent>

          <TabsContent value="feed" className="h-full mt-0 overflow-auto">
            <div className="pt-16">
              <DiscoveryFeed />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Index;
