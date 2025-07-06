
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { MapPin, Upload, X } from 'lucide-react';

interface ContributionFormProps {
  onClose: () => void;
}

const ContributionForm: React.FC<ContributionFormProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    description: '',
    materials: '',
    era: '',
    architect: '',
    images: [] as string[]
  });

  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitting contribution:', formData, tags);
    // Here you would normally send the data to your backend
    onClose();
  };

  const addTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the fundamental details about your contribution
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="e.g., Notre-Dame Cathedral"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type *</Label>
              <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monument">Monument</SelectItem>
                  <SelectItem value="quarry">Quarry</SelectItem>
                  <SelectItem value="marble">Marble Type</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="location">Location *</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="e.g., Paris, France"
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Provide a detailed description..."
              rows={4}
              required
            />
          </div>
        </CardContent>
      </Card>

      {/* Detailed Information */}
      <Card>
        <CardHeader>
          <CardTitle>Detailed Information</CardTitle>
          <CardDescription>
            Additional details specific to your contribution type
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="materials">Materials Used</Label>
              <Input
                id="materials"
                value={formData.materials}
                onChange={(e) => handleInputChange('materials', e.target.value)}
                placeholder="e.g., Limestone, Marble, Granite"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="era">Era/Period</Label>
              <Input
                id="era"
                value={formData.era}
                onChange={(e) => handleInputChange('era', e.target.value)}
                placeholder="e.g., Medieval (12th century)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="architect">Architect/Builder</Label>
            <Input
              id="architect"
              value={formData.architect}
              onChange={(e) => handleInputChange('architect', e.target.value)}
              placeholder="e.g., Unknown, Emperor Hadrian, Christopher Wren"
            />
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2">
              <Input
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                placeholder="Add a tag..."
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              />
              <Button type="button" onClick={addTag} variant="outline">
                Add
              </Button>
            </div>
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X 
                      className="w-3 h-3 cursor-pointer" 
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Images */}
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
          <CardDescription>
            Upload images to support your contribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="border-2 border-dashed border-stone-300 rounded-lg p-6 text-center">
            <Upload className="w-8 h-8 text-stone-400 mx-auto mb-2" />
            <p className="text-stone-600 mb-2">Drop images here or click to upload</p>
            <p className="text-sm text-stone-500">PNG, JPG up to 10MB each</p>
            <Button type="button" variant="outline" className="mt-2">
              Choose Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Contribution
        </Button>
      </div>
    </form>
  );
};

export default ContributionForm;
