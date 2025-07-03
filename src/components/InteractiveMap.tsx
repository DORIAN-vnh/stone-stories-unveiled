
import React, { useEffect, useRef, useState } from 'react';
import { MapPin } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface MapLocation {
  id: string;
  name: string;
  type: 'monument' | 'quarry' | 'marble' | 'company';
  lat: number;
  lng: number;
  description: string;
  era?: string;
  material?: string;
}

const InteractiveMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null);

  // Sample data - in a real implementation, this would come from your backend
  const locations: MapLocation[] = [
    {
      id: '1',
      name: 'Carrara Marble Quarry',
      type: 'quarry',
      lat: 44.0803,
      lng: 10.0970,
      description: 'Famous marble quarry used since Roman times',
      material: 'White Carrara Marble'
    },
    {
      id: '2',
      name: 'Pantheon',
      type: 'monument',
      lat: 41.8986,
      lng: 12.4769,
      description: 'Ancient Roman temple with magnificent stone architecture',
      era: 'Roman (126 AD)',
      material: 'Granite, Marble'
    },
    {
      id: '3',
      name: 'Pentelic Marble',
      type: 'marble',
      lat: 38.0833,
      lng: 23.8833,
      description: 'Premium marble variety from Mount Pentelicus',
      material: 'Pentelic White Marble'
    }
  ];

  useEffect(() => {
    // Placeholder for map initialization
    // In a real implementation, you would initialize Leaflet here
    console.log('Map would be initialized here with locations:', locations);
  }, []);

  const getLocationColor = (type: MapLocation['type']) => {
    switch (type) {
      case 'monument': return 'bg-stone-600';
      case 'quarry': return 'bg-quarry-600';
      case 'marble': return 'bg-marble-400';
      case 'company': return 'bg-stone-500';
      default: return 'bg-stone-400';
    }
  };

  const getLocationIcon = (type: MapLocation['type']) => {
    return <MapPin className="w-4 h-4 text-white" />;
  };

  return (
    <div className="relative h-full">
      {/* Map Container - Placeholder for actual map */}
      <div 
        ref={mapRef} 
        className="w-full h-full bg-gradient-to-br from-stone-100 to-stone-200 rounded-lg flex items-center justify-center relative overflow-hidden"
      >
        <div className="text-center space-y-4">
          <div className="text-6xl text-stone-300">🗺️</div>
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-stone-700">Interactive Map Coming Soon</h3>
            <p className="text-stone-600 max-w-md">
              This will display an interactive map with historical stone monuments, quarries, and marble locations worldwide.
            </p>
          </div>
        </div>

        {/* Sample Location Markers */}
        <div className="absolute inset-0">
          {locations.map((location, index) => (
            <div
              key={location.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-110`}
              style={{
                left: `${30 + index * 20}%`,
                top: `${40 + index * 15}%`
              }}
              onClick={() => setSelectedLocation(location)}
            >
              <div className={`w-8 h-8 rounded-full ${getLocationColor(location.type)} flex items-center justify-center shadow-lg`}>
                {getLocationIcon(location.type)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Location Details Popup */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 z-10">
          <Card className="animate-slide-up">
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg text-stone-800">{selectedLocation.name}</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                  className="p-1 h-auto"
                >
                  ✕
                </Button>
              </div>
              <p className="text-stone-600 text-sm mb-3">{selectedLocation.description}</p>
              <div className="space-y-1 text-xs">
                {selectedLocation.era && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-stone-700">Era:</span>
                    <span className="text-stone-600">{selectedLocation.era}</span>
                  </div>
                )}
                {selectedLocation.material && (
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-stone-700">Material:</span>
                    <span className="text-stone-600">{selectedLocation.material}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
