
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, MapPin, FileText, Image as ImageIcon } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface ContributionFormProps {
  onClose?: () => void;
}

const ContributionForm = ({ onClose }: ContributionFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    description: '',
    location: '',
    material: '',
    era: '',
    latitude: '',
    longitude: '',
    images: [] as File[]
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Contribution Submitted",
      description: "Your submission has been received and will be reviewed by our team.",
    });

    // Reset form
    setFormData({
      name: '',
      type: '',
      description: '',
      location: '',
      material: '',
      era: '',
      latitude: '',
      longitude: '',
      images: []
    });

    if (onClose) onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5" />
          Submit New Contribution
        </CardTitle>
        <CardDescription>
          Help expand our database of historical stone materials and locations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Monument, quarry, or location name"
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
                  <SelectItem value="monument">Monument</SelectItem>
                  <SelectItem value="quarry">Quarry</SelectItem>
                  <SelectItem value="marble">Marble Variety</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Detailed description of the location or material"
                required
                rows={4}
              />
            </div>
          </div>

          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Location Details
            </h3>
            
            <div>
              <Label htmlFor="location">Address/Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="City, region, country"
              />
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
                  placeholder="44.0803"
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
                  placeholder="10.097"
                />
              </div>
            </div>
          </div>

          {/* Material Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="material">Stone/Material Type</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => setFormData(prev => ({ ...prev, material: e.target.value }))}
                placeholder="Carrara marble, granite, limestone, etc."
              />
            </div>

            <div>
              <Label htmlFor="era">Historical Era/Period</Label>
              <Input
                id="era"
                value={formData.era}
                onChange={(e) => setFormData(prev => ({ ...prev, era: e.target.value }))}
                placeholder="Roman, Medieval, Renaissance, etc."
              />
            </div>
          </div>

          {/* Image Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              Images
            </h3>
            
            <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
              <p className="text-sm text-stone-600 mb-2">
                Drag and drop images here, or click to select files
              </p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="image-upload"
              />
              <Button type="button" variant="outline" onClick={() => document.getElementById('image-upload')?.click()}>
                Choose Files
              </Button>
            </div>

            {formData.images.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Selected Images:</p>
                <ul className="text-sm text-stone-600">
                  {formData.images.map((file, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4" />
                      {file.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-3 pt-4">
            <Button type="submit" className="flex-1">
              Submit Contribution
            </Button>
            {onClose && (
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ContributionForm;
