
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Calendar, Ruler, ArrowLeft, Clock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockMonuments = [
  {
    id: '1',
    name: 'Pantheon',
    description: 'Ancient Roman temple with magnificent stone architecture, featuring one of the largest unreinforced concrete domes in the world.',
    location: 'Rome, Italy',
    era: 'Roman (126 AD)',
    materials: ['Granite', 'Marble', 'Concrete'],
    architect: 'Emperor Hadrian',
    height: '43.3 meters',
    features: [
      'Coffered concrete dome',
      'Granite columns from Egypt',
      'Carrara marble interior',
      'Oculus opening (9m diameter)'
    ],
    history: 'Originally built as a temple to all Roman gods, later converted to a Christian church. The building has been in continuous use throughout its history.',
    visitInfo: {
      hours: '9:00 AM - 7:30 PM',
      admission: 'Free',
      bestTime: 'Early morning or late afternoon'
    },
    image: '/placeholder.svg'
  }
];

const MonumentPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const monument = mockMonuments.find(m => m.id === id) || mockMonuments[0];

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                Please sign in to view detailed monument information.
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
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">{monument.name}</h1>
              <p className="text-stone-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {monument.location}
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
                <p className="text-stone-700 mb-4">{monument.description}</p>
                <div className="flex flex-wrap gap-2">
                  {monument.materials.map((material, index) => (
                    <Badge key={index} variant="secondary">{material}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Context</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700">{monument.history}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Architectural Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {monument.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-stone-400 rounded-full" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Monument Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Era</p>
                    <p className="text-stone-600">{monument.era}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Architect</p>
                    <p className="text-stone-600">{monument.architect}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Ruler className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Height</p>
                    <p className="text-stone-600">{monument.height}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Visit Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Hours</p>
                    <p className="text-stone-600">{monument.visitInfo.hours}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Admission</p>
                  <p className="text-stone-600">{monument.visitInfo.admission}</p>
                </div>
                <div>
                  <p className="font-medium">Best Time to Visit</p>
                  <p className="text-stone-600">{monument.visitInfo.bestTime}</p>
                </div>
                <Button className="w-full mt-4">
                  Plan Visit
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MonumentPage;
