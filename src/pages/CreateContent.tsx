import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Save, MapPin, Building, Gem, Factory } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateContent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [contentType, setContentType] = useState('monument');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    coordinates: '',
    category: '',
    historicalPeriod: '',
    materials: '',
    significance: '',
    images: ''
  });

  const contentTypes = [
    { id: 'monument', name: 'Monument', icon: Building },
    { id: 'quarry', name: 'Quarry', icon: MapPin },
    { id: 'marble', name: 'Marble Type', icon: Gem },
    { id: 'company', name: 'Company', icon: Factory }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.location) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate creating content
    toast({
      title: "Content Created!",
      description: `Your ${contentType} entry has been submitted for review.`,
    });

    navigate('/admin');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/admin')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Admin
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Add New Content</h1>
            <p className="text-stone-600 mt-1">Contribute to the stone heritage database</p>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Content Creation</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={contentType} onValueChange={setContentType}>
              <TabsList className="grid w-full grid-cols-4">
                {contentTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <TabsTrigger key={type.id} value={type.id} className="flex items-center gap-2">
                      <Icon className="w-4 h-4" />
                      {type.name}
                    </TabsTrigger>
                  );
                })}
              </TabsList>

              {contentTypes.map((type) => (
                <TabsContent key={type.id} value={type.id}>
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="title">Title *</Label>
                        <Input
                          id="title"
                          placeholder={`Enter ${type.name.toLowerCase()} name`}
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Location *</Label>
                        <Input
                          id="location"
                          placeholder="City, Country"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description">Description *</Label>
                      <Textarea
                        id="description"
                        placeholder={`Describe this ${type.name.toLowerCase()}...`}
                        rows={4}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="coordinates">GPS Coordinates</Label>
                        <Input
                          id="coordinates"
                          placeholder="Latitude, Longitude"
                          value={formData.coordinates}
                          onChange={(e) => setFormData({ ...formData, coordinates: e.target.value })}
                        />
                      </div>

                      {type.id === 'monument' && (
                        <div className="space-y-2">
                          <Label htmlFor="historicalPeriod">Historical Period</Label>
                          <Select value={formData.historicalPeriod} onValueChange={(value) => setFormData({ ...formData, historicalPeriod: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select period" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ancient">Ancient (Before 500 CE)</SelectItem>
                              <SelectItem value="medieval">Medieval (500-1500 CE)</SelectItem>
                              <SelectItem value="renaissance">Renaissance (1400-1650)</SelectItem>
                              <SelectItem value="modern">Modern (1650-1900)</SelectItem>
                              <SelectItem value="contemporary">Contemporary (1900+)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {type.id === 'quarry' && (
                        <div className="space-y-2">
                          <Label htmlFor="materials">Stone Types</Label>
                          <Input
                            id="materials"
                            placeholder="Granite, Marble, Limestone..."
                            value={formData.materials}
                            onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                          />
                        </div>
                      )}

                      {type.id === 'marble' && (
                        <div className="space-y-2">
                          <Label htmlFor="category">Marble Category</Label>
                          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="white">White Marble</SelectItem>
                              <SelectItem value="colored">Colored Marble</SelectItem>
                              <SelectItem value="veined">Veined Marble</SelectItem>
                              <SelectItem value="crystalline">Crystalline Marble</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {type.id === 'company' && (
                        <div className="space-y-2">
                          <Label htmlFor="category">Company Type</Label>
                          <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="quarry">Quarry Operator</SelectItem>
                              <SelectItem value="restoration">Restoration</SelectItem>
                              <SelectItem value="research">Research</SelectItem>
                              <SelectItem value="conservation">Conservation</SelectItem>
                              <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="significance">Historical/Cultural Significance</Label>
                      <Textarea
                        id="significance"
                        placeholder="Describe the importance and significance..."
                        rows={3}
                        value={formData.significance}
                        onChange={(e) => setFormData({ ...formData, significance: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="images">Image URLs</Label>
                      <Input
                        id="images"
                        placeholder="Enter image URLs separated by commas"
                        value={formData.images}
                        onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-1">
                        <Save className="w-4 h-4 mr-2" />
                        Submit for Review
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => navigate('/admin')}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default CreateContent;