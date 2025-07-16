
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Image, FileText, MapPin, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  suggestions?: string[];
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your Stone Heritage AI Assistant. I can help you identify stone types, provide conservation advice, analyze quarry locations, and answer questions about historical stone usage. How can I assist you today?',
      timestamp: new Date(),
      suggestions: [
        'Identify this stone type',
        'Conservation techniques for marble',
        'Roman quarrying methods',
        'Best practices for restoration'
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('marble') || lowerMessage.includes('carrara')) {
      return 'Marble is a metamorphic rock formed from limestone or dolomite. Carrara marble, specifically, is renowned for its pure white color and fine grain structure. It has been quarried since Roman times and was famously used by Michelangelo. For conservation, avoid acidic cleaners and use pH-neutral products. Regular sealing every 6-12 months is recommended for exterior applications.';
    } else if (lowerMessage.includes('granite')) {
      return 'Granite is an igneous rock composed primarily of quartz, feldspar, and mica. It\'s extremely durable and weather-resistant, making it ideal for monuments and building facades. Egyptian obelisks and Mount Rushmore are famous granite works. For maintenance, granite requires minimal care - periodic cleaning with mild soap and water is usually sufficient.';
    } else if (lowerMessage.includes('limestone')) {
      return 'Limestone is a sedimentary rock primarily composed of calcium carbonate. It\'s been used extensively in construction throughout history, from the pyramids of Giza to Gothic cathedrals. Portland limestone and Indiana limestone are particularly prized. Conservation requires careful attention to weathering and acid rain damage. Use lime-based mortars for repairs to ensure compatibility.';
    } else if (lowerMessage.includes('quarry') || lowerMessage.includes('extraction')) {
      return 'Stone quarrying has evolved from ancient hand-cutting techniques to modern machinery. Roman quarries used wedges and chisels, while today we use diamond wire saws and hydraulic splitters. Sustainable quarrying practices include minimizing waste, land rehabilitation, and water management. Would you like specific information about a particular quarry or extraction method?';
    } else if (lowerMessage.includes('conservation') || lowerMessage.includes('restoration')) {
      return 'Stone conservation involves assessment, documentation, cleaning, repair, and protection. Key principles include: 1) Minimal intervention, 2) Compatibility of materials, 3) Reversibility of treatments, 4) Documentation of all work. Different stones require specific approaches - for example, sandstone may need consolidation while marble might require desalination. What specific conservation challenge are you facing?';
    } else {
      return 'That\'s an interesting question about stone heritage! I can help you with stone identification, conservation techniques, historical quarrying methods, architectural analysis, and much more. Could you provide more specific details about what you\'d like to know? You can also share images of stones or monuments for identification and analysis.';
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: simulateAIResponse(input),
        timestamp: new Date(),
        suggestions: [
          'Tell me more about this',
          'Show similar examples',
          'Conservation methods',
          'Historical context'
        ]
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
  };

  const quickActions = [
    { icon: Image, label: 'Upload Image', description: 'Identify stone from photo' },
    { icon: MapPin, label: 'Find Nearby', description: 'Locate stone sites' },
    { icon: FileText, label: 'Documentation', description: 'Conservation reports' },
    { icon: Sparkles, label: 'AI Analysis', description: 'Deep stone analysis' }
  ];

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 h-[calc(100vh-12rem)]">
          {/* Chat Interface */}
          <div className="lg:col-span-3 flex flex-col">
            <Card className="flex-1 flex flex-col">
              <CardHeader className="border-b">
                <CardTitle className="flex items-center">
                  <Bot className="w-6 h-6 mr-2 text-blue-600" />
                  Stone Heritage AI Assistant
                  <Badge variant="secondary" className="ml-2">Online</Badge>
                </CardTitle>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {message.type === 'bot' && (
                      <Avatar className="w-8 h-8 bg-blue-100">
                        <AvatarFallback>
                          <Bot className="w-4 h-4 text-blue-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    
                    <div className={`max-w-2xl ${message.type === 'user' ? 'order-first' : ''}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.type === 'user'
                            ? 'bg-blue-600 text-white'
                            : 'bg-stone-100 text-stone-800'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      
                      {message.suggestions && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="text-xs"
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      )}
                    </div>

                    {message.type === 'user' && (
                      <Avatar className="w-8 h-8 bg-stone-100">
                        <AvatarFallback>
                          <User className="w-4 h-4 text-stone-600" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8 bg-blue-100">
                      <AvatarFallback>
                        <Bot className="w-4 h-4 text-blue-600" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="bg-stone-100 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>
              
              {/* Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about stone identification, conservation, history..."
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1"
                  />
                  <Button onClick={handleSend} disabled={!input.trim()}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto p-3"
                      onClick={() => handleSuggestionClick(action.label)}
                    >
                      <Icon className="w-4 h-4 mr-3" />
                      <div className="text-left">
                        <div className="font-medium">{action.label}</div>
                        <div className="text-xs text-stone-500">{action.description}</div>
                      </div>
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            {/* AI Capabilities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">AI Capabilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Stone identification</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Conservation advice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Historical context</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Quarry analysis</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Material properties</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="quarry-gradient">
              <CardContent className="p-4">
                <h3 className="font-bold text-stone-800 mb-2">💡 Pro Tip</h3>
                <p className="text-stone-600 text-sm">
                  Upload clear, well-lit photos of stones for the most accurate identification results.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AiChat;
