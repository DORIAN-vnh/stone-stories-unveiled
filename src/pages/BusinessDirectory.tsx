import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Truck, 
  Anchor, 
  Building2, 
  Plane, 
  MapPin, 
  Star, 
  Phone, 
  Mail, 
  Globe,
  Users,
  Package,
  Calendar,
  TrendingUp
} from 'lucide-react';
import { Link } from 'react-router-dom';

const BusinessDirectory = () => {
  const [activeTab, setActiveTab] = useState('transporters');

  const transporters = [
    {
      id: 1,
      name: 'StoneLogistics International',
      type: 'Heavy Transport',
      location: 'Milan, Italy',
      specialties: ['Marble Blocks', 'Sculpture Transport', 'International Shipping'],
      rating: 4.8,
      reviews: 234,
      contact: { phone: '+39 02 1234567', email: 'info@stonelogistics.it', website: 'stonelogistics.it' },
      description: 'Specialized in transporting delicate stone materials worldwide with over 20 years of experience.',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Heritage Stone Carriers',
      type: 'Specialized Carrier',
      location: 'London, UK',
      specialties: ['Monument Parts', 'Archaeological Artifacts', 'Climate-Controlled Transport'],
      rating: 4.9,
      reviews: 187,
      contact: { phone: '+44 20 7123456', email: 'contact@heritagecarriers.co.uk', website: 'heritagecarriers.co.uk' },
      description: 'Expert handlers of precious stone heritage items with insurance coverage up to £5M.',
      image: '/placeholder.svg'
    }
  ];

  const museums = [
    {
      id: 1,
      name: 'International Stone Heritage Museum',
      type: 'Specialized Museum',
      location: 'Florence, Italy',
      specialties: ['Ancient Tools', 'Quarry History', 'Stone Samples', 'Interactive Exhibits'],
      rating: 4.7,
      reviews: 892,
      contact: { phone: '+39 055 987654', email: 'info@stonemuseum.it', website: 'stonemuseum.it' },
      description: 'World largest collection of stone heritage artifacts and quarrying history.',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Marble Masters Gallery',
      type: 'Art Museum',
      location: 'Carrara, Italy',
      specialties: ['Marble Sculptures', 'Carving Techniques', 'Artist Workshops', 'Restoration Lab'],
      rating: 4.6,
      reviews: 456,
      contact: { phone: '+39 0585 123456', email: 'visit@marblemastes.it', website: 'marblemasters.it' },
      description: 'Showcasing the finest marble artistry from Michelangelo to contemporary masters.',
      image: '/placeholder.svg'
    }
  ];

  const travelAgencies = [
    {
      id: 1,
      name: 'Stone Heritage Tours',
      type: 'Heritage Tourism',
      location: 'Rome, Italy',
      specialties: ['Quarry Tours', 'Monument Visits', 'Expert Guides', 'Educational Programs'],
      rating: 4.8,
      reviews: 1234,
      contact: { phone: '+39 06 555123', email: 'tours@stoneheritage.it', website: 'stoneheritage-tours.it' },
      description: 'Curated stone heritage experiences across Europe with expert archaeologists and geologists.',
      image: '/placeholder.svg'
    },
    {
      id: 2,
      name: 'Ancient Paths Travel',
      type: 'Cultural Tours',
      location: 'Athens, Greece',
      specialties: ['Archaeological Sites', 'Stone Monuments', 'Cultural Immersion', 'Private Tours'],
      rating: 4.7,
      reviews: 567,
      contact: { phone: '+30 210 987654', email: 'info@ancientpaths.gr', website: 'ancientpaths.gr' },
      description: 'Discover the stone heritage of ancient civilizations with our expert-led tours.',
      image: '/placeholder.svg'
    }
  ];

  const companies = [
    {
      id: 1,
      name: 'Restoration Masters Ltd',
      type: 'Stone Restoration',
      location: 'Edinburgh, Scotland',
      specialties: ['Monument Restoration', 'Stone Cleaning', 'Structural Repair', 'Heritage Consulting'],
      rating: 4.9,
      reviews: 145,
      contact: { phone: '+44 131 789456', email: 'projects@restorationmasters.co.uk', website: 'restorationmasters.co.uk' },
      description: 'Award-winning stone restoration company with UNESCO heritage site experience.',
      image: '/placeholder.svg',
      customerProfile: 'Heritage Organizations, Government Bodies, Private Collectors'
    },
    {
      id: 2,
      name: 'StoneGuard Technologies',
      type: 'Conservation Tech',
      location: 'Munich, Germany',
      specialties: ['Digital Documentation', '3D Scanning', 'Preventive Conservation', 'Monitoring Systems'],
      rating: 4.8,
      reviews: 298,
      contact: { phone: '+49 89 654321', email: 'tech@stoneguard.de', website: 'stoneguard.de' },
      description: 'Cutting-edge technology solutions for stone heritage preservation and monitoring.',
      image: '/placeholder.svg',
      customerProfile: 'Museums, Research Institutions, Conservation Professionals'
    }
  ];

  const renderBusinessCard = (business: any, showCustomerProfile = false) => (
    <Card key={business.id} className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <div className="w-16 h-16 bg-stone-200 rounded-lg flex-shrink-0"></div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold text-stone-800">{business.name}</h3>
              <div className="flex items-center gap-2 text-sm text-stone-500">
                <Badge variant="outline">{business.type}</Badge>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {business.location}
                </div>
              </div>
            </div>

            <p className="text-stone-600 text-sm">{business.description}</p>

            <div className="flex gap-2 flex-wrap">
              {business.specialties.map((specialty: string, index: number) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {specialty}
                </Badge>
              ))}
            </div>

            {showCustomerProfile && business.customerProfile && (
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-stone-800">Target Customers:</h4>
                <p className="text-sm text-stone-600">{business.customerProfile}</p>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{business.rating}</span>
                  <span className="text-stone-500">({business.reviews} reviews)</span>
                </div>
              </div>
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-stone-500 pt-2 border-t">
              <div className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {business.contact.phone}
              </div>
              <div className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {business.contact.email}
              </div>
              <div className="flex items-center gap-1">
                <Globe className="w-3 h-3" />
                {business.contact.website}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const stats = [
    { label: 'Certified Transporters', value: '156', icon: Truck },
    { label: 'Partner Museums', value: '89', icon: Building2 },
    { label: 'Tour Operators', value: '67', icon: Plane },
    { label: 'Service Companies', value: '234', icon: Users }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Business Directory</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Connect with trusted partners in the stone heritage industry - from specialized transporters to expert restoration companies
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className="w-8 h-8 text-quarry-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-stone-800">{stat.value}</div>
                  <div className="text-sm text-stone-600">{stat.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Business Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto mb-8">
            <TabsTrigger value="transporters" className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              Transport
            </TabsTrigger>
            <TabsTrigger value="museums" className="flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Museums
            </TabsTrigger>
            <TabsTrigger value="travel" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Travel
            </TabsTrigger>
            <TabsTrigger value="companies" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="transporters" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Stone Transportation Specialists</h2>
              <p className="text-stone-600">Certified carriers for delicate stone materials and heritage artifacts</p>
            </div>
            <div className="space-y-4">
              {transporters.map(business => renderBusinessCard(business))}
            </div>
          </TabsContent>

          <TabsContent value="museums" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Stone Heritage Museums</h2>
              <p className="text-stone-600">World-class institutions preserving and showcasing stone heritage</p>
            </div>
            <div className="space-y-4">
              {museums.map(business => renderBusinessCard(business))}
            </div>
          </TabsContent>

          <TabsContent value="travel" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Heritage Travel Agencies</h2>
              <p className="text-stone-600">Expert-guided tours to the world's most significant stone heritage sites</p>
            </div>
            <div className="space-y-4">
              {travelAgencies.map(business => renderBusinessCard(business))}
            </div>
          </TabsContent>

          <TabsContent value="companies" className="space-y-6">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-stone-800 mb-2">Professional Services</h2>
              <p className="text-stone-600">Specialized companies serving the stone heritage industry</p>
            </div>
            <div className="space-y-4">
              {companies.map(business => renderBusinessCard(business, true))}
            </div>
          </TabsContent>
        </Tabs>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="quarry-gradient">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-stone-800 mb-4">
                List Your Business
              </h2>
              <p className="text-stone-600 mb-6 max-w-2xl mx-auto">
                Join our directory of trusted stone heritage professionals and connect with clients worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-quarry-600 hover:bg-quarry-700">
                  Add Your Business
                </Button>
                <Button size="lg" variant="outline">
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

export default BusinessDirectory;