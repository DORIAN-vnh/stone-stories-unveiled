
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Mountain, MapPin, Pickaxe, Truck, ArrowLeft, Calendar } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockQuarries = [
  {
    id: '1',
    name: 'Carrara Marble Quarry',
    description: 'World-famous marble quarry that has been in operation since Roman times, producing the finest white marble used in sculptures and architecture.',
    location: 'Carrara, Tuscany, Italy',
    established: 'Roman Era (200 BC)',
    materials: ['White Carrara Marble', 'Statuario Marble', 'Calacatta Marble'],
    production: '1 million tons/year',
    depth: '400 meters',
    techniques: [
      'Diamond wire cutting',
      'Controlled blasting',
      'Hydraulic splitting',
      'Traditional hand extraction'
    ],
    famousUses: [
      'Michelangelo\'s David',
      'Pantheon in Rome',
      'Marble Arch in London',
      'Taj Mahal details'
    ],
    operator: 'Carrara Marble Consortium',
    tours: {
      available: true,
      duration: '2 hours',
      price: '€25 per person'
    },
    image: '/placeholder.svg'
  }
];

const QuarryPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const quarry = mockQuarries.find(q => q.id === id) || mockQuarries[0];

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                Please sign in to view detailed quarry information.
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
            <Mountain className="w-8 h-8 text-yellow-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">{quarry.name}</h1>
              <p className="text-stone-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {quarry.location}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About the Quarry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">{quarry.description}</p>
                <div className="flex flex-wrap gap-2">
                  {quarry.materials.map((material, index) => (
                    <Badge key={index} variant="secondary">{material}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Extraction Techniques</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {quarry.techniques.map((technique, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Pickaxe className="w-4 h-4 text-stone-600" />
                      <span>{technique}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Famous Applications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {quarry.famousUses.map((use, index) => (
                    <div key={index} className="p-3 bg-stone-50 rounded-lg">
                      <span className="font-medium">{use}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quarry Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Established</p>
                    <p className="text-stone-600">{quarry.established}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Annual Production</p>
                    <p className="text-stone-600">{quarry.production}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mountain className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Maximum Depth</p>
                    <p className="text-stone-600">{quarry.depth}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium">Operator</p>
                  <p className="text-stone-600">{quarry.operator}</p>
                </div>
              </CardContent>
            </Card>

            {quarry.tours.available && (
              <Card>
                <CardHeader>
                  <CardTitle>Quarry Tours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="font-medium">Duration</p>
                    <p className="text-stone-600">{quarry.tours.duration}</p>
                  </div>
                  <div>
                    <p className="font-medium">Price</p>
                    <p className="text-stone-600">{quarry.tours.price}</p>
                  </div>
                  <Button className="w-full">
                    Book Tour
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default QuarryPage;
