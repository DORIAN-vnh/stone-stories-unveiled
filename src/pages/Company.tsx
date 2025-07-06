
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Building2, MapPin, Globe, Phone, Mail, Calendar, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const mockCompanies = [
  {
    id: '1',
    name: 'Stone Heritage Ltd',
    description: 'Leading stone restoration and supply company specializing in historical monuments and premium marble installations.',
    location: 'London, United Kingdom',
    established: '1985',
    website: 'www.stoneheritage.com',
    phone: '+44 20 7123 4567',
    email: 'info@stoneheritage.com',
    specialties: ['Restoration', 'Premium Marble', 'Historical Projects'],
    projects: [
      { name: 'Westminster Abbey Restoration', year: '2020' },
      { name: 'British Museum Marble Hall', year: '2019' },
      { name: 'Tower Bridge Stone Repair', year: '2018' }
    ],
    image: '/placeholder.svg'
  }
];

const CompanyPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  
  const company = mockCompanies.find(c => c.id === id) || mockCompanies[0];

  if (!user) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="text-center">
            <CardHeader>
              <CardTitle>Access Restricted</CardTitle>
              <CardDescription>
                Please sign in to view detailed company information.
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
            <Building2 className="w-8 h-8 text-green-600" />
            <div>
              <h1 className="text-3xl font-bold text-stone-800">{company.name}</h1>
              <p className="text-stone-600 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {company.location}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-stone-700 mb-4">{company.description}</p>
                <div className="flex flex-wrap gap-2">
                  {company.specialties.map((specialty, index) => (
                    <Badge key={index} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {company.projects.map((project, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-stone-50 rounded-lg">
                      <span className="font-medium">{project.name}</span>
                      <span className="text-stone-600">{project.year}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Established</p>
                    <p className="text-stone-600">{company.established}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Website</p>
                    <p className="text-blue-600">{company.website}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-stone-600">{company.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-stone-600" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-blue-600">{company.email}</p>
                  </div>
                </div>
                <Button className="w-full mt-4">
                  Contact Company
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyPage;
