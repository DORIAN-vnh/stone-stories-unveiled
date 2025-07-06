
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileText, MessageSquare, TrendingUp, Building2, Package } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Business = () => {
  const [calculatorValues, setCalculatorValues] = useState({
    length: '',
    width: '',
    thickness: '',
    material: 'marble'
  });

  const [quoteForm, setQuoteForm] = useState({
    projectType: '',
    material: '',
    quantity: '',
    location: '',
    description: ''
  });

  const materials = [
    { name: 'Marble', price: 150, unit: 'sq ft' },
    { name: 'Granite', price: 120, unit: 'sq ft' },
    { name: 'Limestone', price: 80, unit: 'sq ft' },
    { name: 'Sandstone', price: 70, unit: 'sq ft' }
  ];

  const calculateCost = () => {
    const length = parseFloat(calculatorValues.length);
    const width = parseFloat(calculatorValues.width);
    const material = materials.find(m => m.name.toLowerCase() === calculatorValues.material);
    
    if (length && width && material) {
      const area = length * width;
      const cost = area * material.price;
      return { area, cost, material };
    }
    return null;
  };

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll get back to you within 24 hours with a detailed quote.",
    });
    setQuoteForm({
      projectType: '',
      material: '',
      quantity: '',
      location: '',
      description: ''
    });
  };

  const calculation = calculateCost();

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-stone-800 mb-4">Business Center</h1>
          <p className="text-xl text-stone-600">Professional tools for stone industry professionals</p>
        </div>

        <Tabs defaultValue="calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Stone Cost Calculator
                </CardTitle>
                <CardDescription>
                  Calculate material costs for your stone projects
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="length">Length (ft)</Label>
                    <Input
                      id="length"
                      type="number"
                      value={calculatorValues.length}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, length: e.target.value }))}
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (ft)</Label>
                    <Input
                      id="width"
                      type="number"
                      value={calculatorValues.width}
                      onChange={(e) => setCalculatorValues(prev => ({ ...prev, width: e.target.value }))}
                      placeholder="8"
                    />
                  </div>
                  <div>
                    <Label htmlFor="material">Material</Label>
                    <Select value={calculatorValues.material} onValueChange={(value) => setCalculatorValues(prev => ({ ...prev, material: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {materials.map((material) => (
                          <SelectItem key={material.name.toLowerCase()} value={material.name.toLowerCase()}>
                            {material.name} - ${material.price}/{material.unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {calculation && (
                  <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                    <h3 className="font-semibold text-stone-800 mb-2">Calculation Results</h3>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-stone-600">Total Area</p>
                        <p className="font-semibold">{calculation.area} sq ft</p>
                      </div>
                      <div>
                        <p className="text-stone-600">Material</p>
                        <p className="font-semibold">{calculation.material.name}</p>
                      </div>
                      <div>
                        <p className="text-stone-600">Estimated Cost</p>
                        <p className="font-semibold text-green-600">${calculation.cost.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="quotes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Request Quote</CardTitle>
                <CardDescription>Get professional quotes for your stone projects</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="projectType">Project Type</Label>
                      <Select value={quoteForm.projectType} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, projectType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="construction">Construction</SelectItem>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="restoration">Restoration</SelectItem>
                          <SelectItem value="landscaping">Landscaping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="material">Material Needed</Label>
                      <Select value={quoteForm.material} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, material: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marble">Marble</SelectItem>
                          <SelectItem value="granite">Granite</SelectItem>
                          <SelectItem value="limestone">Limestone</SelectItem>
                          <SelectItem value="sandstone">Sandstone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity</Label>
                      <Input
                        id="quantity"
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="e.g., 100 sq ft"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Project Location</Label>
                      <Input
                        id="location"
                        value={quoteForm.location}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, State"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description">Project Description</Label>
                    <Textarea
                      id="description"
                      value={quoteForm.description}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe your project requirements..."
                      rows={4}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Quote
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { id: 1, type: 'Quote', material: 'Marble', status: 'Pending', date: '2024-01-15' },
                    { id: 2, type: 'Consultation', material: 'Granite', status: 'Completed', date: '2024-01-14' },
                    { id: 3, type: 'Quote', material: 'Limestone', status: 'In Progress', date: '2024-01-13' }
                  ].map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{inquiry.type} - {inquiry.material}</p>
                        <p className="text-sm text-stone-600">{inquiry.date}</p>
                      </div>
                      <Badge variant={inquiry.status === 'Completed' ? 'default' : 'secondary'}>
                        {inquiry.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Building2 className="w-4 h-4 mr-2" />
                    Find Suppliers
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Package className="w-4 h-4 mr-2" />
                    Track Orders
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Total Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-stone-800">24</div>
                  <p className="text-sm text-stone-600">+12% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Active Quotes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-stone-800">8</div>
                  <p className="text-sm text-stone-600">3 pending responses</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-600">$45,200</div>
                  <p className="text-sm text-stone-600">This quarter</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Business;
