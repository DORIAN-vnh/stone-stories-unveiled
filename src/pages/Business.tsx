
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Building2, Calculator, FileText, Send, TrendingUp, DollarSign } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Business = () => {
  const [quoteForm, setQuoteForm] = useState({
    projectType: '',
    material: '',
    quantity: '',
    location: '',
    description: '',
    contactInfo: ''
  });

  const [calculatorData, setCalculatorData] = useState({
    length: '',
    width: '',
    thickness: '',
    material: '',
    finish: ''
  });

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Quote Request Submitted",
      description: "We'll contact you within 24 hours with a detailed quote.",
    });
  };

  const calculateEstimate = () => {
    const volume = parseFloat(calculatorData.length) * parseFloat(calculatorData.width) * parseFloat(calculatorData.thickness);
    if (volume > 0) {
      const basePrice = 150; // Base price per cubic meter
      const estimate = volume * basePrice;
      toast({
        title: "Estimate Calculated",
        description: `Estimated cost: $${estimate.toFixed(2)} for ${volume} cubic meters`,
      });
    }
  };

  const mockInquiries = [
    { id: 1, client: "Villa Renovation Project", status: "pending", value: "$15,000", date: "2024-01-15" },
    { id: 2, client: "Museum Restoration", status: "in-progress", value: "$85,000", date: "2024-01-10" },
    { id: 3, client: "Garden Sculpture", status: "completed", value: "$3,500", date: "2024-01-05" },
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-2">Business Center</h1>
          <p className="text-stone-600">Manage quotes, calculations, and business inquiries</p>
        </div>

        <Tabs defaultValue="quotes" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quotes" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Quotes
            </TabsTrigger>
            <TabsTrigger value="calculator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Calculator
            </TabsTrigger>
            <TabsTrigger value="inquiries" className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              Inquiries
            </TabsTrigger>
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          <TabsContent value="quotes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Request Quote
                </CardTitle>
                <CardDescription>
                  Get a detailed quote for your stone material project
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleQuoteSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project-type">Project Type</Label>
                      <Select value={quoteForm.projectType} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, projectType: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="renovation">Renovation</SelectItem>
                          <SelectItem value="construction">New Construction</SelectItem>
                          <SelectItem value="restoration">Restoration</SelectItem>
                          <SelectItem value="landscaping">Landscaping</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="material">Material Type</Label>
                      <Select value={quoteForm.material} onValueChange={(value) => setQuoteForm(prev => ({ ...prev, material: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="marble">Marble</SelectItem>
                          <SelectItem value="granite">Granite</SelectItem>
                          <SelectItem value="limestone">Limestone</SelectItem>
                          <SelectItem value="travertine">Travertine</SelectItem>
                          <SelectItem value="sandstone">Sandstone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="quantity">Quantity (sq/m or cubic/m)</Label>
                      <Input
                        id="quantity"
                        value={quoteForm.quantity}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, quantity: e.target.value }))}
                        placeholder="Enter quantity"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Project Location</Label>
                      <Input
                        id="location"
                        value={quoteForm.location}
                        onChange={(e) => setQuoteForm(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
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

                  <div>
                    <Label htmlFor="contact">Contact Information</Label>
                    <Input
                      id="contact"
                      value={quoteForm.contactInfo}
                      onChange={(e) => setQuoteForm(prev => ({ ...prev, contactInfo: e.target.value }))}
                      placeholder="Email or phone number"
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Submit Quote Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="calculator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="w-5 h-5" />
                  Stone Calculator
                </CardTitle>
                <CardDescription>
                  Calculate material quantities and cost estimates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <Label htmlFor="length">Length (m)</Label>
                    <Input
                      id="length"
                      type="number"
                      step="0.1"
                      value={calculatorData.length}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, length: e.target.value }))}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="width">Width (m)</Label>
                    <Input
                      id="width"
                      type="number"
                      step="0.1"
                      value={calculatorData.width}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, width: e.target.value }))}
                      placeholder="0.0"
                    />
                  </div>
                  <div>
                    <Label htmlFor="thickness">Thickness (m)</Label>
                    <Input
                      id="thickness"
                      type="number"
                      step="0.01"
                      value={calculatorData.thickness}
                      onChange={(e) => setCalculatorData(prev => ({ ...prev, thickness: e.target.value }))}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label htmlFor="calc-material">Material</Label>
                    <Select value={calculatorData.material} onValueChange={(value) => setCalculatorData(prev => ({ ...prev, material: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="carrara">Carrara Marble</SelectItem>
                        <SelectItem value="granite">Granite</SelectItem>
                        <SelectItem value="limestone">Limestone</SelectItem>
                        <SelectItem value="travertine">Travertine</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="finish">Finish</Label>
                    <Select value={calculatorData.finish} onValueChange={(value) => setCalculatorData(prev => ({ ...prev, finish: value }))}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select finish" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="polished">Polished</SelectItem>
                        <SelectItem value="honed">Honed</SelectItem>
                        <SelectItem value="brushed">Brushed</SelectItem>
                        <SelectItem value="natural">Natural</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={calculateEstimate} className="w-full">
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate Estimate
                </Button>

                <div className="mt-6 p-4 bg-stone-50 rounded-lg">
                  <h3 className="font-semibold mb-2">Calculation Results</h3>
                  <div className="text-sm text-stone-600">
                    <p>Volume: {calculatorData.length && calculatorData.width && calculatorData.thickness ? 
                      (parseFloat(calculatorData.length) * parseFloat(calculatorData.width) * parseFloat(calculatorData.thickness)).toFixed(2) : '0.00'} m³</p>
                    <p>Surface Area: {calculatorData.length && calculatorData.width ? 
                      (parseFloat(calculatorData.length) * parseFloat(calculatorData.width)).toFixed(2) : '0.00'} m²</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inquiries" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  Recent Inquiries
                </CardTitle>
                <CardDescription>
                  Track and manage your business inquiries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{inquiry.client}</h4>
                        <p className="text-sm text-stone-600">Date: {inquiry.date}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={inquiry.status === 'completed' ? 'default' : inquiry.status === 'in-progress' ? 'secondary' : 'outline'}>
                          {inquiry.status}
                        </Badge>
                        <span className="font-medium text-green-600">{inquiry.value}</span>
                        <Button size="sm" variant="outline">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$103,500</div>
                  <p className="text-xs text-muted-foreground">
                    +12% from last month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <Building2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">
                    3 new this week
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Quotes</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8</div>
                  <p className="text-xs text-muted-foreground">
                    Response needed
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">New quote request received</p>
                      <p className="text-xs text-stone-600">Villa renovation project - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Project completed</p>
                      <p className="text-xs text-stone-600">Garden sculpture installation - 1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-sm font-medium">Payment pending</p>
                      <p className="text-xs text-stone-600">Museum restoration project - 2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Business;
