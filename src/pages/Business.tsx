
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calculator, TrendingUp, Package, DollarSign, Truck, BarChart3, Building2, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const Business = () => {
  const [volumeCalc, setVolumeCalc] = useState({
    length: '',
    width: '',
    height: '',
    unit: 'meters',
    result: 0
  });

  const [costCalc, setCostCalc] = useState({
    volume: '',
    pricePerUnit: '',
    unit: 'cubic_meter',
    result: 0
  });

  const calculateVolume = () => {
    const volume = parseFloat(volumeCalc.length) * parseFloat(volumeCalc.width) * parseFloat(volumeCalc.height);
    setVolumeCalc(prev => ({ ...prev, result: volume || 0 }));
  };

  const calculateCost = () => {
    const total = parseFloat(costCalc.volume) * parseFloat(costCalc.pricePerUnit);
    setCostCalc(prev => ({ ...prev, result: total || 0 }));
  };

  const tools = [
    {
      icon: Calculator,
      title: 'Volume Calculator',
      description: 'Calculate stone block volumes for quarrying and construction',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: DollarSign,
      title: 'Cost Estimator',
      description: 'Estimate project costs based on stone type and quantity',
      color: 'bg-green-100 text-green-600'
    },
    {
      icon: Truck,
      title: 'Shipping Calculator',
      description: 'Calculate transportation costs and logistics',
      color: 'bg-orange-100 text-orange-600'
    },
    {
      icon: BarChart3,
      title: 'Market Analysis',
      description: 'Track stone prices and market trends',
      color: 'bg-purple-100 text-purple-600'
    },
    {
      icon: Building2,
      title: 'Business Directory',
      description: 'Find trusted partners and service providers',
      color: 'bg-indigo-100 text-indigo-600',
      link: '/business-directory'
    },
    {
      icon: Users,
      title: 'Professional Network',
      description: 'Connect with industry professionals',
      color: 'bg-teal-100 text-teal-600'
    }
  ];

  const marketData = [
    { stone: 'Carrara Marble', price: '$450/m³', trend: '+5.2%', color: 'text-green-600' },
    { stone: 'Granite', price: '$280/m³', trend: '+2.1%', color: 'text-green-600' },
    { stone: 'Limestone', price: '$180/m³', trend: '-1.5%', color: 'text-red-600' },
    { stone: 'Travertine', price: '$320/m³', trend: '+3.8%', color: 'text-green-600' },
    { stone: 'Slate', price: '$220/m³', trend: '+0.9%', color: 'text-green-600' }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-stone-800 mb-4">Business Tools</h1>
          <p className="text-stone-600 max-w-2xl mx-auto">
            Professional tools for stone industry professionals, quarry masters, and construction companies
          </p>
        </div>

        {/* Tools Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div key={index}>
                {tool.link ? (
                <Link to={tool.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader className="text-center">
                      <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mx-auto mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <CardTitle className="text-lg">{tool.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                      <p className="text-stone-600 text-sm">{tool.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ) : (
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader className="text-center">
                  <div className={`w-12 h-12 rounded-lg ${tool.color} flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-stone-600 text-sm">{tool.description}</p>
                </CardContent>
              </Card>
              )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculators */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="volume" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="volume">Volume</TabsTrigger>
                <TabsTrigger value="cost">Cost</TabsTrigger>
                <TabsTrigger value="shipping">Shipping</TabsTrigger>
                <TabsTrigger value="weight">Weight</TabsTrigger>
              </TabsList>

              <TabsContent value="volume">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Calculator className="w-5 h-5 mr-2" />
                      Volume Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="length">Length</Label>
                        <Input
                          id="length"
                          type="number"
                          value={volumeCalc.length}
                          onChange={(e) => setVolumeCalc(prev => ({ ...prev, length: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="width">Width</Label>
                        <Input
                          id="width"
                          type="number"
                          value={volumeCalc.width}
                          onChange={(e) => setVolumeCalc(prev => ({ ...prev, width: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="height">Height</Label>
                        <Input
                          id="height"
                          type="number"
                          value={volumeCalc.height}
                          onChange={(e) => setVolumeCalc(prev => ({ ...prev, height: e.target.value }))}
                          placeholder="0"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Select value={volumeCalc.unit} onValueChange={(value) => setVolumeCalc(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="meters">Meters</SelectItem>
                          <SelectItem value="feet">Feet</SelectItem>
                          <SelectItem value="inches">Inches</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateVolume} className="w-full">
                      Calculate Volume
                    </Button>
                    {volumeCalc.result > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-lg font-semibold text-green-800">
                          Volume: {volumeCalc.result.toFixed(2)} {volumeCalc.unit === 'meters' ? 'm³' : volumeCalc.unit === 'feet' ? 'ft³' : 'in³'}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="cost">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <DollarSign className="w-5 h-5 mr-2" />
                      Cost Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="volume">Volume</Label>
                      <Input
                        id="volume"
                        type="number"
                        value={costCalc.volume}
                        onChange={(e) => setCostCalc(prev => ({ ...prev, volume: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price per Unit</Label>
                      <Input
                        id="price"
                        type="number"
                        value={costCalc.pricePerUnit}
                        onChange={(e) => setCostCalc(prev => ({ ...prev, pricePerUnit: e.target.value }))}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <Label>Unit</Label>
                      <Select value={costCalc.unit} onValueChange={(value) => setCostCalc(prev => ({ ...prev, unit: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="cubic_meter">Per Cubic Meter</SelectItem>
                          <SelectItem value="cubic_foot">Per Cubic Foot</SelectItem>
                          <SelectItem value="ton">Per Ton</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCost} className="w-full">
                      Calculate Cost
                    </Button>
                    {costCalc.result > 0 && (
                      <div className="p-4 bg-green-50 rounded-lg">
                        <p className="text-lg font-semibold text-green-800">
                          Total Cost: ${costCalc.result.toFixed(2)}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="shipping">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      Shipping Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 text-center py-8">
                      Shipping calculator coming soon. Contact our logistics team for quotes.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="weight">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Package className="w-5 h-5 mr-2" />
                      Weight Calculator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-stone-600 text-center py-8">
                      Weight calculator based on stone density coming soon.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Market Data */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Market Prices
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {marketData.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 rounded-lg hover:bg-stone-50">
                      <div>
                        <h4 className="font-medium text-stone-800">{item.stone}</h4>
                        <p className="text-sm text-stone-500">{item.price}</p>
                      </div>
                      <div className={`text-sm font-medium ${item.color}`}>
                        {item.trend}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="quarry-gradient">
              <CardContent className="p-6 text-center">
                <h3 className="font-bold text-stone-800 mb-2">Need Custom Quotes?</h3>
                <p className="text-stone-600 text-sm mb-4">
                  Get personalized pricing for your stone projects from verified suppliers.
                </p>
                <Button className="w-full bg-quarry-600 hover:bg-quarry-700">
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

export default Business;
