
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Mountain, Building2, Gem } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface Location {
  id: string;
  name: string;
  type: 'quarry' | 'monument' | 'marble' | 'company';
  lat: number;
  lng: number;
  description: string;
  material?: string;
  era?: string;
  company?: string;
  image?: string;
}

const mockLocations: Location[] = [
  {
    id: '1',
    name: 'Carrara Marble Quarry',
    type: 'quarry',
    lat: 44.0803,
    lng: 10.097,
    description: 'Famous marble quarry used since Roman times',
    material: 'White Carrara Marble',
    image: '/placeholder.svg'
  },
  {
    id: '2',
    name: 'Pantheon',
    type: 'monument',
    lat: 41.8986,
    lng: 12.4769,
    description: 'Ancient Roman temple with magnificent stone architecture',
    era: 'Roman (126 AD)',
    material: 'Granite, Marble',
    image: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Pentelic Marble',
    type: 'marble',
    lat: 38.0833,
    lng: 23.8833,
    description: 'Premium marble variety from Mount Pentelicus',
    material: 'Pentelic White Marble',
    image: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'Stone Heritage Ltd',
    type: 'company',
    lat: 51.5074,
    lng: -0.1278,
    description: 'Leading stone restoration and supply company',
    company: 'Established 1985',
    image: '/placeholder.svg'
  }
];

const getIconForType = (type: string) => {
  const iconMap = {
    quarry: Mountain,
    monument: Building2,
    marble: Gem,
    company: Building2
  };
  return iconMap[type as keyof typeof iconMap] || MapPin;
};

const getColorForType = (type: string) => {
  const colorMap = {
    quarry: 'bg-yellow-500',
    monument: 'bg-blue-500',
    marble: 'bg-purple-500',
    company: 'bg-green-500'
  };
  return colorMap[type as keyof typeof colorMap] || 'bg-gray-500';
};

const InteractiveMap = () => {
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredLocations = mockLocations.filter(location => 
    filter === 'all' || location.type === filter
  );

  return (
    <div className="relative w-full h-full">
      {/* Filter Controls */}
      <div className="absolute top-4 left-4 z-[1000] flex gap-2 flex-wrap">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('all')}
          className="bg-white/90 backdrop-blur-sm"
        >
          All
        </Button>
        <Button
          variant={filter === 'quarry' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('quarry')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Mountain className="w-4 h-4 mr-1" />
          Quarries
        </Button>
        <Button
          variant={filter === 'monument' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('monument')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Building2 className="w-4 h-4 mr-1" />
          Monuments
        </Button>
        <Button
          variant={filter === 'marble' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('marble')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Gem className="w-4 h-4 mr-1" />
          Marbles
        </Button>
        <Button
          variant={filter === 'company' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setFilter('company')}
          className="bg-white/90 backdrop-blur-sm"
        >
          <Building2 className="w-4 h-4 mr-1" />
          Companies
        </Button>
      </div>

      {/* Real Map */}
      <MapContainer
        center={[45.0, 10.0]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        className="rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredLocations.map((location) => (
          <Marker
            key={location.id}
            position={[location.lat, location.lng]}
            eventHandlers={{
              click: () => setSelectedLocation(location),
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold">{location.name}</h3>
                <p className="text-sm text-gray-600">{location.description}</p>
                {location.material && (
                  <p className="text-sm mt-1"><strong>Material:</strong> {location.material}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="absolute bottom-4 left-4 right-4 z-[1000]">
          <Card className="bg-white/95 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(getIconForType(selectedLocation.type), { className: "w-5 h-5" })}
                  {selectedLocation.name}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                >
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-stone-600">{selectedLocation.description}</p>
              {selectedLocation.material && (
                <p className="text-sm mt-2"><strong>Material:</strong> {selectedLocation.material}</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
