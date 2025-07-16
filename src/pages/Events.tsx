
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Clock, Plus, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Events = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const events = [
    {
      id: 1,
      title: 'International Stone Heritage Conference',
      description: 'Join experts from around the world to discuss the latest developments in stone heritage preservation and research.',
      date: '2024-03-15',
      time: '09:00 AM',
      endDate: '2024-03-17',
      location: 'Florence, Italy',
      type: 'Conference',
      category: 'Academic',
      attendees: 234,
      maxAttendees: 500,
      isOnline: false,
      price: 'Paid',
      organizer: 'International Stone Heritage Society',
      image: '/placeholder.svg',
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Carrara Marble Quarry Site Visit',
      description: 'Exclusive guided tour of the famous Carrara marble quarries with expert geologists and quarry masters.',
      date: '2024-03-22',
      time: '08:00 AM',
      endDate: '2024-03-22',
      location: 'Carrara, Italy',
      type: 'Field Trip',
      category: 'Industrial',
      attendees: 45,
      maxAttendees: 50,
      isOnline: false,
      price: 'Paid',
      organizer: 'Carrara Marble Association',
      image: '/placeholder.svg',
      status: 'upcoming'
    },
    {
      id: 3,
      title: 'Stone Conservation Workshop: Digital Documentation',
      description: 'Learn the latest digital techniques for documenting and preserving stone monuments.',
      date: '2024-04-05',
      time: '02:00 PM',
      endDate: '2024-04-07',
      location: 'Online',
      type: 'Workshop',
      category: 'Technical',
      attendees: 156,
      maxAttendees: 200,
      isOnline: true,
      price: 'Free',
      organizer: 'Digital Heritage Foundation',
      image: '/placeholder.svg',
      status: 'upcoming'
    },
    {
      id: 4,
      title: 'Gothic Architecture Stone Analysis Symposium',
      description: 'Deep dive into the stone materials and construction techniques of Gothic cathedrals.',
      date: '2024-04-20',
      time: '10:00 AM',
      endDate: '2024-04-21',
      location: 'Paris, France',
      type: 'Symposium',
      category: 'Academic',
      attendees: 89,
      maxAttendees: 150,
      isOnline: false,
      price: 'Paid',
      organizer: 'European Gothic Research Center',
      image: '/placeholder.svg',
      status: 'upcoming'
    },
    {
      id: 5,
      title: 'Ancient Roman Quarrying Techniques Webinar',
      description: 'Monthly webinar series exploring historical quarrying methods and their modern applications.',
      date: '2024-02-15',
      time: '07:00 PM',
      endDate: '2024-02-15',
      location: 'Online',
      type: 'Webinar',
      category: 'Historical',
      attendees: 312,
      maxAttendees: 500,
      isOnline: true,
      price: 'Free',
      organizer: 'Ancient Quarries Research Group',
      image: '/placeholder.svg',
      status: 'past'
    }
  ];

  const getEventTypeColor = (type: string) => {
    const colors = {
      'Conference': 'bg-blue-100 text-blue-800',
      'Field Trip': 'bg-green-100 text-green-800',
      'Workshop': 'bg-purple-100 text-purple-800',
      'Symposium': 'bg-orange-100 text-orange-800',
      'Webinar': 'bg-indigo-100 text-indigo-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      'upcoming': 'bg-green-100 text-green-800',
      'ongoing': 'bg-yellow-100 text-yellow-800',
      'past': 'bg-gray-100 text-gray-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const upcomingEvents = events.filter(event => event.status === 'upcoming');
  const pastEvents = events.filter(event => event.status === 'past');

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 mb-2">Events</h1>
            <p className="text-stone-600">Discover and join stone heritage events worldwide</p>
          </div>
          <Button 
            className="flex items-center gap-2"
            onClick={() => window.location.href = '/events/create'}
          >
            <Plus className="w-4 h-4" />
            Create Event
          </Button>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="upcoming" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Upcoming
            </TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
            <TabsTrigger value="my-events">My Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <div className="aspect-video bg-stone-200 rounded-t-lg"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getEventTypeColor(event.type)}>
                          {event.type}
                        </Badge>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                      <Badge variant={event.price === 'Free' ? 'secondary' : 'outline'}>
                        {event.price}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                      {event.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-stone-500">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        <span>{event.attendees}/{event.maxAttendees} attending</span>
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-stone-100">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-stone-400">by {event.organizer}</span>
                        <Button size="sm" variant="outline">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0"></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex gap-2">
                          <Badge className={getEventTypeColor(event.type)}>
                            {event.type}
                          </Badge>
                          <Badge className={getStatusColor(event.status)}>
                            Completed
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-stone-800 mb-2">{event.title}</h3>
                      <p className="text-stone-600 text-sm mb-3 line-clamp-2">{event.description}</p>
                      <div className="flex items-center gap-4 text-sm text-stone-500">
                        <span>{formatDate(event.date)}</span>
                        <span>•</span>
                        <span>{event.location}</span>
                        <span>•</span>
                        <span>{event.attendees} attended</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      View Summary
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="my-events">
            <div className="text-center py-12 text-stone-500">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>Your registered events will appear here.</p>
              <Button variant="outline" className="mt-4">
                Browse Events
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Events;
