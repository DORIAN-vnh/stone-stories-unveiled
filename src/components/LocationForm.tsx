
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Search } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface LocationFormProps {
  onSave: (location: any) => void;
}

const LocationForm = ({ onSave }: LocationFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    address: '',
    latitude: '',
    longitude: '',
    material: '',
    era: ''
  });

  const [addressSuggestions, setAddressSuggestions] = useState<string[]>([]);

  const handleAddressSearch = async (query: string) => {
    if (query.length < 3) {
      setAddressSuggestions([]);
      return;
    }

    // Simulate address suggestions - in production, integrate with Google Places API or similar
    const mockSuggestions = [
      `${query}, Rome, Italy`,
      `${query}, Florence, Italy`,
      `${query}, Paris, France`,
      `${query}, London, UK`,
      `${query}, New York, USA`
    ];
    
    setAddressSuggestions(mockSuggestions.slice(0, 3));
  };

  const handleAddressSelect = async (address: string) => {
    setFormData(prev => ({ ...prev, address }));
    setAddressSuggestions([]);
    
    // Simulate geocoding - in production, use a real geocoding service
    const mockCoordinates = {
      'Rome, Italy': { lat: 41.9028, lng: 12.4964 },
      'Florence, Italy': { lat: 43.7696, lng: 11.2558 },
      'Paris, France': { lat: 48.8566, lng: 2.3522 },
      'London, UK': { lat: 51.5074, lng: -0.1278 },
      'New York, USA': { lat: 40.7128, lng: -74.0060 }
    };

    const coords = Object.entries(mockCoordinates).find(([key]) => 
      address.includes(key.split(',')[0])
    )?.[1];

    if (coords) {
      setFormData(prev => ({
        ...prev,
        latitude: coords.lat.toString(),
        longitude: coords.lng.toString()
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.type || !formData.address) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    onSave({
      ...formData,
      status: 'active',
      createdAt: new Date().toISOString()
    });

    toast({
      title: "Location Added",
      description: "The new location has been successfully added.",
    });

    // Reset form
    setFormData({
      name: '',
      type: '',
      description: '',
      address: '',
      latitude: '',
      longitude: '',
      material: '',
      era: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Location name"
            required
          />
        </div>

        <div>
          <Label htmlFor="type">Type *</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="quarry">Quarry</SelectItem>
              <SelectItem value="monument">Monument</SelectItem>
              <SelectItem value="marble">Marble Variety</SelectItem>
              <SelectItem value="company">Company</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
          placeholder="Detailed description"
          rows={3}
        />
      </div>

      <div className="relative">
        <Label htmlFor="address">Address *</Label>
        <div className="relative">
          <Input
            id="address"
            value={formData.address}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, address: e.target.value }));
              handleAddressSearch(e.target.value);
            }}
            placeholder="Start typing address..."
            required
          />
          <Search className="absolute right-3 top-3 w-4 h-4 text-stone-400" />
        </div>
        
        {addressSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white border border-stone-200 rounded-md shadow-lg">
            {addressSuggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="w-full px-3 py-2 text-left hover:bg-stone-50 first:rounded-t-md last:rounded-b-md"
                onClick={() => handleAddressSelect(suggestion)}
              >
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-stone-400" />
                  {suggestion}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="latitude">Latitude</Label>
          <Input
            id="latitude"
            type="number"
            step="any"
            value={formData.latitude}
            onChange={(e) => setFormData(prev => ({ ...prev, latitude: e.target.value }))}
            placeholder="Auto-filled"
            readOnly
          />
        </div>
        <div>
          <Label htmlFor="longitude">Longitude</Label>
          <Input
            id="longitude"
            type="number"
            step="any"
            value={formData.longitude}
            onChange={(e) => setFormData(prev => ({ ...prev, longitude: e.target.value }))}
            placeholder="Auto-filled"
            readOnly
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="material">Material Type</Label>
          <Input
            id="material"
            value={formData.material}
            onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
            placeholder="e.g., Carrara marble, granite"
          />
        </div>
        <div>
          <Label htmlFor="era">Historical Era</Label>
          <Input
            id="era"
            value={formData.era}
            onChange={(e) => setFormData(prev => ({ ...prev, era: e.target.value }))}
            placeholder="e.g., Roman, Medieval"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Add Location
      </Button>
    </form>
  );
};

export default LocationForm;
