import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { ArrowLeft, Calendar, Clock, MapPin, Users, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
    category: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    isOnline: false,
    maxAttendees: '',
    price: '',
    organizer: '',
    requirements: '',
    agenda: ''
  });

  const eventTypes = [
    { id: 'conference', name: 'Conference' },
    { id: 'workshop', name: 'Workshop' },
    { id: 'symposium', name: 'Symposium' },
    { id: 'field-trip', name: 'Field Trip' },
    { id: 'webinar', name: 'Webinar' },
    { id: 'exhibition', name: 'Exhibition' },
    { id: 'networking', name: 'Networking Event' }
  ];

  const categories = [
    { id: 'academic', name: 'Academic' },
    { id: 'industrial', name: 'Industrial' },
    { id: 'technical', name: 'Technical' },
    { id: 'historical', name: 'Historical' },
    { id: 'conservation', name: 'Conservation' },
    { id: 'cultural', name: 'Cultural' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.type || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Simulate creating event
    toast({
      title: "Event Created!",
      description: "Your event has been submitted for review and will be published soon.",
    });

    navigate('/events');
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => navigate('/events')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-stone-800">Create New Event</h1>
            <p className="text-stone-600 mt-1">Share your stone heritage event with the community</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Event Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Event Type *</Label>
                      <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {eventTypes.map((type) => (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe your event..."
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Start Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time">Start Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={formData.endDate}
                        onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="Enter venue or 'Online' for virtual events"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees">Max Attendees</Label>
                      <Input
                        id="maxAttendees"
                        type="number"
                        placeholder="0 for unlimited"
                        value={formData.maxAttendees}
                        onChange={(e) => setFormData({ ...formData, maxAttendees: e.target.value })}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="price">Price</Label>
                      <Select value={formData.price} onValueChange={(value) => setFormData({ ...formData, price: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select pricing" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="free">Free</SelectItem>
                          <SelectItem value="paid">Paid</SelectItem>
                          <SelectItem value="donation">Donation Based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizer">Organizer</Label>
                    <Input
                      id="organizer"
                      placeholder="Organization or individual name"
                      value={formData.organizer}
                      onChange={(e) => setFormData({ ...formData, organizer: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">Requirements/Prerequisites</Label>
                    <Textarea
                      id="requirements"
                      placeholder="Any special requirements or prerequisites for attendees..."
                      rows={3}
                      value={formData.requirements}
                      onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="agenda">Agenda/Program</Label>
                    <Textarea
                      id="agenda"
                      placeholder="Detailed agenda or program schedule..."
                      rows={4}
                      value={formData.agenda}
                      onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button type="submit" className="flex-1">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Event
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => navigate('/events')}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Preview/Guidelines */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Event Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-800">Planning Ahead</h4>
                    <p className="text-stone-600">Create events at least 2 weeks in advance for better visibility.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-800">Location Details</h4>
                    <p className="text-stone-600">Provide clear venue information and accessibility details.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-800">Audience</h4>
                    <p className="text-stone-600">Specify target audience and expertise level required.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-stone-800">Duration</h4>
                    <p className="text-stone-600">Include estimated duration and break times if applicable.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="quarry-gradient">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-stone-800 mb-2">Need Help?</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Contact our events team for assistance with planning and promotion.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateEvent;