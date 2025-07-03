
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import ContributionForm from '@/components/ContributionForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Plus, FileText, MapPin, Clock, CheckCircle, XCircle, Eye } from 'lucide-react';

interface Contribution {
  id: string;
  name: string;
  type: 'monument' | 'quarry' | 'marble' | 'company';
  status: 'pending' | 'approved' | 'rejected';
  submitDate: string;
  location?: string;
}

const mockContributions: Contribution[] = [
  {
    id: '1',
    name: 'Notre-Dame Cathedral Stone Analysis',
    type: 'monument',
    status: 'approved',
    submitDate: '2024-01-15',
    location: 'Paris, France'
  },
  {
    id: '2',
    name: 'Vermont Marble Quarry Documentation',
    type: 'quarry',
    status: 'pending',
    submitDate: '2024-01-10',
    location: 'Vermont, USA'
  },
  {
    id: '3',
    name: 'Rosso Verona Marble Properties',
    type: 'marble',
    status: 'rejected',
    submitDate: '2024-01-05',
    location: 'Verona, Italy'
  }
];

const Profile = () => {
  const [showContributionForm, setShowContributionForm] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Profile Header */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage src="/placeholder.svg" alt="Profile" />
                <AvatarFallback>
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <CardTitle className="text-2xl">Stone Researcher</CardTitle>
                <CardDescription>
                  Historical stone materials enthusiast and contributor since January 2024
                </CardDescription>
                <div className="flex gap-4 text-sm text-stone-600">
                  <span>{mockContributions.length} Contributions</span>
                  <span>{mockContributions.filter(c => c.status === 'approved').length} Approved</span>
                  <span>Member since Jan 2024</span>
                </div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="contributions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="contributions">My Contributions</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="contributions" className="space-y-6">
            {/* Add Contribution Button */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">My Contributions</h2>
                <p className="text-stone-600">Track and manage your submissions to the platform</p>
              </div>
              <Dialog open={showContributionForm} onOpenChange={setShowContributionForm}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    New Contribution
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Submit New Contribution</DialogTitle>
                  </DialogHeader>
                  <ContributionForm onClose={() => setShowContributionForm(false)} />
                </DialogContent>
              </Dialog>
            </div>

            {/* Contributions List */}
            <div className="space-y-4">
              {mockContributions.map(contribution => (
                <Card key={contribution.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4" />
                          <Badge variant="outline" className="capitalize">
                            {contribution.type}
                          </Badge>
                          <Badge className={getStatusColor(contribution.status)}>
                            <div className="flex items-center gap-1">
                              {getStatusIcon(contribution.status)}
                              <span className="capitalize">{contribution.status}</span>
                            </div>
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">{contribution.name}</CardTitle>
                        {contribution.location && (
                          <div className="flex items-center gap-1 text-sm text-stone-600">
                            <MapPin className="w-3 h-3" />
                            {contribution.location}
                          </div>
                        )}
                      </div>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm text-stone-500">
                      <span>Submitted on {new Date(contribution.submitDate).toLocaleDateString()}</span>
                      {contribution.status === 'pending' && (
                        <span className="text-yellow-600">Under review</span>
                      )}
                      {contribution.status === 'rejected' && (
                        <Button variant="ghost" size="sm" className="text-blue-600">
                          View Feedback
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {mockContributions.length === 0 && (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 text-stone-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-stone-600 mb-2">No contributions yet</h3>
                <p className="text-stone-500 mb-4">
                  Start contributing to our stone materials database!
                </p>
                <Dialog open={showContributionForm} onOpenChange={setShowContributionForm}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Submit Your First Contribution
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Submit New Contribution</DialogTitle>
                    </DialogHeader>
                    <ContributionForm onClose={() => setShowContributionForm(false)} />
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </TabsContent>

          <TabsContent value="activity">
            <div className="text-center py-12 text-stone-500">
              <Clock className="w-12 h-12 mx-auto mb-4 text-stone-300" />
              <p>Your activity history will appear here.</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
