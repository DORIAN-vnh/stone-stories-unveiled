
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Gem, MapPin, Palette, Hammer, ArrowLeft, Star } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockMarbles = [
  {
    id: '1',
    name: 'Pentelic Marble',
    description: 'Premium white marble with fine grain structure, quarried from Mount Pentelicus near Athens. Known for its pure white color and exceptional workability.',
    location: 'Mount Pentelicus, Greece',
    origin: 'Ancient Greece',
    color: 'Pure White',
    grain: 'Fine to Medium',
    hardness: '3-4 Mohs',
    density: '2.7 g/cm³',
    properties: [
      'Excellent workability',
      'Weather resistant',
      'Takes fine detail well',
      'Develops golden patina over time'
    ],
    applications: [
      'Sculpture',
      'Architecture',
      'Monuments',
      'Interior decoration'
    ],
    famousWorks: [
      'Parthenon',
      'Acropolis sculptures',
      'British Museum Elgin Marbles',
      'Metropolitan Museum artifacts'
    ],
    characteristics: {
      porosity: 'Low (0.5-1%)',
      absorption: 'Very Low',
      strength: 'High compressive strength',
      workability: 'Excellent'
    },
    price: '€150-300 per m²',
    image: '/placeholder.svg'
  }
];

const MarblePage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const marble = mockMarbles.find(m => m.id === id) || mockMarbles[0];

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                Please sign in to view detailed marble information.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button>Sign In</Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link to="/" className="flex items-center text-stone-600 hover:text-stone-800 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Map
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Gem className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">{marble.name}</h1>
              <p className="text-stone-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {marble.location}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">{marble.description}</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <Palette className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                    <p className="font-medium">Color</p>
                    <p className="text-sm text-stone-600">{marble.color}</p>
                  </div>
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <Gem className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                    <p className="font-medium">Grain</p>
                    <p className="text-sm text-stone-600">{marble.grain}</p>
                  </div>
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <Hammer className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                    <p className="font-medium">Hardness</p>
                    <p className="text-sm text-stone-600">{marble.hardness}</p>
                  </div>
                  <div className="text-center p-3 bg-stone-50 rounded-lg">
                    <Star className="w-6 h-6 mx-auto mb-2 text-stone-600" />
                    <p className="font-medium">Density</p>
                    <p className="text-sm text-stone-600">{marble.density}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Properties & Characteristics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Key Properties</h4>
                    <ul className="space-y-1">
                      {marble.properties.map((property, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-2 h-2 bg-purple-400 rounded-full" />
                          <span>{property}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Technical Data</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>Porosity:</strong> {marble.characteristics.porosity}</div>
                      <div><strong>Water Absorption:</strong> {marble.characteristics.absorption}</div>
                      <div><strong>Strength:</strong> {marble.characteristics.strength}</div>
                      <div><strong>Workability:</strong> {marble.characteristics.workability}</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Famous Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {marble.famousWorks.map((work, index) => (
                    <div key={index} className="p-3 bg-stone-50 rounded-lg">
                      <span className="font-medium">{work}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Origin & History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-medium">Origin Period</p>
                  <p className="text-stone-600">{marble.origin}</p>
                </div>
                <div>
                  <p className="font-medium">Source Location</p>
                  <p className="text-stone-600">{marble.location}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {marble.applications.map((application, index) => (
                    <Badge key={index} variant="outline" className="mr-2 mb-2">
                      {application}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Information</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="font-medium text-lg text-stone-800">{marble.price}</p>
                <p className="text-sm text-stone-600 mt-1">
                  Price varies based on quality, finishing, and quantity
                </p>
                <Button className="w-full mt-4">
                  Request Quote
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MarblePage;
