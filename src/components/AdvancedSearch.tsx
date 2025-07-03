
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Filter, MapPin, Calendar, Gem } from 'lucide-react';

interface SearchFilters {
  query: string;
  type: string[];
  material: string;
  era: string;
  region: string;
  dateRange: string;
}

const AdvancedSearch = () => {
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    type: [],
    material: '',
    era: '',
    region: '',
    dateRange: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleTypeChange = (type: string, checked: boolean) => {
    setFilters(prev => ({
      ...prev,
      type: checked 
        ? [...prev.type, type]
        : prev.type.filter(t => t !== type)
    }));
  };

  const handleSearch = () => {
    console.log('Searching with filters:', filters);
    // Implement search logic here
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      type: [],
      material: '',
      era: '',
      region: '',
      dateRange: ''
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Search className="w-5 h-5" />
          Advanced Search
        </CardTitle>
        <CardDescription>
          Find specific stone materials, monuments, quarries, and companies
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main Search Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
            <Input
              placeholder="Search monuments, quarries, materials..."
              value={filters.query}
              onChange={(e) => setFilters(prev => ({ ...prev, query: e.target.value }))}
              className="pl-10"
            />
          </div>
          <Button onClick={() => setIsExpanded(!isExpanded)} variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button onClick={handleSearch}>
            Search
          </Button>
        </div>

        {/* Expanded Filters */}
        {isExpanded && (
          <div className="space-y-6 border-t pt-6">
            {/* Type Filters */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">Content Type</Label>
              <div className="flex flex-wrap gap-4">
                {[
                  { id: 'monument', label: 'Monuments' },
                  { id: 'quarry', label: 'Quarries' },
                  { id: 'marble', label: 'Marble Varieties' },
                  { id: 'company', label: 'Companies' }
                ].map((type) => (
                  <div key={type.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={type.id}
                      checked={filters.type.includes(type.id)}
                      onCheckedChange={(checked) => handleTypeChange(type.id, checked as boolean)}
                    />
                    <Label htmlFor={type.id}>{type.label}</Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Material Filter */}
            <div className="space-y-3">
              <Label htmlFor="material" className="text-base font-semibold flex items-center gap-2">
                <Gem className="w-4 h-4" />
                Stone/Material Type
              </Label>
              <Select value={filters.material} onValueChange={(value) => setFilters(prev => ({ ...prev, material: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select material type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="marble">Marble</SelectItem>
                  <SelectItem value="granite">Granite</SelectItem>
                  <SelectItem value="limestone">Limestone</SelectItem>
                  <SelectItem value="sandstone">Sandstone</SelectItem>
                  <SelectItem value="travertine">Travertine</SelectItem>
                  <SelectItem value="slate">Slate</SelectItem>
                  <SelectItem value="basalt">Basalt</SelectItem>
                  <SelectItem value="quartzite">Quartzite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Era Filter */}
            <div className="space-y-3">
              <Label htmlFor="era" className="text-base font-semibold flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Historical Era
              </Label>
              <Select value={filters.era} onValueChange={(value) => setFilters(prev => ({ ...prev, era: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select historical period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ancient">Ancient (Before 500 AD)</SelectItem>
                  <SelectItem value="medieval">Medieval (500-1500 AD)</SelectItem>
                  <SelectItem value="renaissance">Renaissance (1400-1600 AD)</SelectItem>
                  <SelectItem value="baroque">Baroque (1600-1750 AD)</SelectItem>
                  <SelectItem value="neoclassical">Neoclassical (1750-1850 AD)</SelectItem>
                  <SelectItem value="modern">Modern (1850-1950 AD)</SelectItem>
                  <SelectItem value="contemporary">Contemporary (1950-Present)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Region Filter */}
            <div className="space-y-3">
              <Label htmlFor="region" className="text-base font-semibold flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Geographic Region
              </Label>
              <Select value={filters.region} onValueChange={(value) => setFilters(prev => ({ ...prev, region: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="europe">Europe</SelectItem>
                  <SelectItem value="mediterranean">Mediterranean</SelectItem>
                  <SelectItem value="asia">Asia</SelectItem>
                  <SelectItem value="americas">Americas</SelectItem>
                  <SelectItem value="africa">Africa</SelectItem>
                  <SelectItem value="oceania">Oceania</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t">
              <Button onClick={handleSearch} className="flex-1">
                Apply Filters
              </Button>
              <Button variant="outline" onClick={clearFilters}>
                Clear All
              </Button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {(filters.type.length > 0 || filters.material || filters.era || filters.region) && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {filters.type.map(type => (
                <span key={type} className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full">
                  {type}
                </span>
              ))}
              {filters.material && (
                <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full">
                  {filters.material}
                </span>
              )}
              {filters.era && (
                <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full">
                  {filters.era}
                </span>
              )}
              {filters.region && (
                <span className="px-2 py-1 bg-stone-100 text-stone-700 text-xs rounded-full">
                  {filters.region}
                </span>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AdvancedSearch;
