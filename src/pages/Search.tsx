
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Search as SearchIcon, Filter, MapPin, Calendar, Gem } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('all');

  // Sample search results
  const searchResults = [
    {
      id: '1',
      type: 'monument',
      name: 'Colosseum',
      description: 'Ancient Roman amphitheater built with travertine limestone and volcanic rock.',
      location: 'Rome, Italy',
      period: 'Roman (72-80 AD)',
      material: 'Travertine, Volcanic Rock',
      image: 'https://images.unsplash.com/photo-1539650116574-75c0c6831d89?w=300&h=200&fit=crop'
    },
    {
      id: '2',
      type: 'quarry',
      name: 'Carrara Marble Quarries',
      description: 'World-famous marble quarries producing high-quality white marble since Roman times.',
      location: 'Carrara, Italy',
      period: 'Ancient to Present',
      material: 'White Carrara Marble',
      image: 'https://images.unsplash.com/photo-1578924436294-9c1f9e4b8f48?w=300&h=200&fit=crop'
    },
    {
      id: '3',
      type: 'marble',
      name: 'Pentelic Marble',
      description: 'Fine-grained white marble with subtle golden veining, used in the Parthenon.',
      location: 'Mount Pentelicus, Greece',
      period: 'Classical Antiquity',
      material: 'White Marble with Golden Veins',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'monument': return '🏛️';
      case 'quarry': return '🏔️';
      case 'marble': return '💎';
      case 'company': return '🏢';
      default: return '📍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'monument': return 'bg-stone-100 text-stone-700';
      case 'quarry': return 'bg-quarry-100 text-quarry-700';
      case 'marble': return 'bg-marble-100 text-stone-600';
      case 'company': return 'bg-stone-50 text-stone-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">
            Search Stone Heritage
          </h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Discover monuments, quarries, marble varieties, and industry experts from around the world.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="relative">
            <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
            <Input
              placeholder="Search for monuments, quarries, marble types, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-3 text-lg border-stone-200 focus:border-stone-400"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="w-5 h-5 text-stone-600" />
                <h3 className="font-semibold text-stone-800">Filters</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="monument">Monuments</SelectItem>
                      <SelectItem value="quarry">Quarries</SelectItem>
                      <SelectItem value="marble">Marble Varieties</SelectItem>
                      <SelectItem value="company">Companies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Location</label>
                  <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                    <SelectTrigger>
                      <SelectValue placeholder="All locations" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Locations</SelectItem>
                      <SelectItem value="europe">Europe</SelectItem>
                      <SelectItem value="asia">Asia</SelectItem>
                      <SelectItem value="americas">Americas</SelectItem>
                      <SelectItem value="africa">Africa</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-2">Period</label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue placeholder="All periods" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Periods</SelectItem>
                      <SelectItem value="ancient">Ancient</SelectItem>
                      <SelectItem value="medieval">Medieval</SelectItem>
                      <SelectItem value="renaissance">Renaissance</SelectItem>
                      <SelectItem value="modern">Modern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search Results */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-stone-800">
              Search Results ({searchResults.length})
            </h2>
            <Select defaultValue="relevance">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Most Relevant</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
                <SelectItem value="date">Date</SelectItem>
                <SelectItem value="location">Location</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-6">
            {searchResults.map((result) => (
              <Card key={result.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-0">
                  <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3">
                      <img
                        src={result.image}
                        alt={result.name}
                        className="w-full h-48 md:h-full object-cover rounded-l-lg"
                      />
                    </div>
                    <div className="md:w-2/3 p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span className="text-2xl">{getTypeIcon(result.type)}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </span>
                          </div>
                          <h3 className="text-xl font-bold text-stone-800 mb-2">{result.name}</h3>
                        </div>
                      </div>

                      <p className="text-stone-600 mb-4 leading-relaxed">{result.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center space-x-2">
                          <MapPin className="w-4 h-4 text-stone-400" />
                          <span className="text-stone-600">{result.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-stone-400" />
                          <span className="text-stone-600">{result.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 md:col-span-2">
                          <Gem className="w-4 h-4 text-stone-400" />
                          <span className="text-stone-600">{result.material}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Results
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
