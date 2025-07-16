
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search as SearchIcon, Filter, MapPin, Calendar, Building2, Mountain, Gem } from 'lucide-react';
import { Link } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    type: 'all',
    location: '',
    era: '',
    material: ''
  });

  const searchResults = [
    {
      id: '1',
      title: 'Carrara Marble Quarry',
      type: 'quarry',
      location: 'Carrara, Italy',
      description: 'Famous marble quarry used since Roman times, producing the finest white marble.',
      era: 'Ancient Roman',
      material: 'White Carrara Marble',
      image: '/placeholder.svg',
      verified: true
    },
    {
      id: '2',
      title: 'Pantheon',
      type: 'monument',
      location: 'Rome, Italy',
      description: 'Ancient Roman temple featuring magnificent stone architecture and engineering.',
      era: 'Roman (126 AD)',
      material: 'Granite, Marble',
      image: '/placeholder.svg',
      verified: true
    },
    {
      id: '3',
      title: 'Pentelic Marble',
      type: 'marble',
      location: 'Mount Pentelicus, Greece',
      description: 'Premium marble variety used in the construction of the Parthenon.',
      era: 'Ancient Greek',
      material: 'Pentelic White Marble',
      image: '/placeholder.svg',
      verified: true
    },
    {
      id: '4',
      title: 'Stone Heritage Ltd',
      type: 'company',
      location: 'London, UK',
      description: 'Leading stone restoration and conservation company with 40+ years experience.',
      era: 'Modern',
      material: 'Various',
      image: '/placeholder.svg',
      verified: false
    }
  ];

  const getTypeIcon = (type: string) => {
    const icons = {
      quarry: Mountain,
      monument: Building2,
      marble: Gem,
      company: Building2
    };
    return icons[type as keyof typeof icons] || Building2;
  };

  const getTypeColor = (type: string) => {
    const colors = {
      quarry: 'bg-green-100 text-green-800',
      monument: 'bg-blue-100 text-blue-800',
      marble: 'bg-purple-100 text-purple-800',
      company: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const filteredResults = searchResults.filter(result => {
    const matchesSearch = result.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         result.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filters.type === 'all' || result.type === filters.type;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Search Stone Heritage</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover stone heritage sites, quarries, monuments, and marble varieties from around the world
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
                  <Input
                    placeholder="Search sites, quarries, monuments..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select value={filters.type} onValueChange={(value) => setFilters(prev => ({ ...prev, type: value }))}>
                  <SelectTrigger className="w-full sm:w-40">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quarry">Quarries</SelectItem>
                    <SelectItem value="monument">Monuments</SelectItem>
                    <SelectItem value="marble">Marbles</SelectItem>
                    <SelectItem value="company">Companies</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="w-full sm:w-auto">
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-stone-800">
            {filteredResults.length} Results Found
          </h2>
          <Select defaultValue="relevance">
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="location">Location</SelectItem>
              <SelectItem value="era">Era</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResults.map((result) => {
            const Icon = getTypeIcon(result.type);
            return (
              <Link key={result.id} to={`/${result.type}/${result.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="aspect-video bg-stone-200 rounded-t-lg"></div>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getTypeColor(result.type)}>
                          <Icon className="w-3 h-3 mr-1" />
                          {result.type}
                        </Badge>
                        {result.verified && (
                          <Badge variant="secondary" className="bg-green-100 text-green-800">
                            Verified
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2">{result.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-stone-600 text-sm mb-4 line-clamp-3">
                      {result.description}
                    </p>
                    
                    <div className="space-y-2 text-sm text-stone-500">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>{result.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{result.era}</span>
                      </div>
                      {result.material && (
                        <div className="flex items-center gap-2">
                          <Gem className="w-4 h-4" />
                          <span>{result.material}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Load More Results
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
