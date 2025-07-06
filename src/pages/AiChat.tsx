
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Bot, User, Sparkles } from 'lucide-react';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! I\'m your Stone Expert AI assistant. I can help you with questions about stone materials, quarries, monuments, restoration techniques, and more. What would you like to know?',
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickQuestions = [
    'What is Carrara marble?',
    'How to identify granite quality?',
    'Best stones for construction?',
    'Stone restoration techniques',
    'Marble vs limestone differences'
  ];

  const simulateResponse = (question: string): string => {
    const responses: { [key: string]: string } = {
      'carrara': 'Carrara marble is a high-quality white marble quarried from the Carrara region of Tuscany, Italy. It has been prized since Roman times for its pure white color and fine grain structure, making it ideal for sculpture and architecture.',
      'granite': 'To identify granite quality, look for: uniform color distribution, fine to medium grain size, minimal visible cracks, high density, and consistent patterns. High-quality granite should have a polished surface that reflects light evenly.',
      'construction': 'Best stones for construction include: Granite (durability), Limestone (workability), Sandstone (weather resistance), Marble (aesthetics), and Slate (roofing). Choice depends on climate, load requirements, and aesthetic preferences.',
      'restoration': 'Stone restoration techniques include: cleaning with appropriate methods, repointing mortar joints, crack repair with compatible materials, surface consolidation, and protective treatments. Always match original materials.',
      default: 'That\'s an interesting question about stone materials. Stone properties vary greatly depending on geological formation, mineral composition, and intended use. Could you be more specific about what aspect interests you most?'
    };

    const key = Object.keys(responses).find(k => question.toLowerCase().includes(k));
    return responses[key || 'default'];
  };

  const handleSend = async (message?: string) => {
    const messageToSend = message || inputValue.trim();
    if (!messageToSend) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: messageToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: simulateResponse(messageToSend),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Bot className="w-8 h-8 text-stone-600" />
            <h1 className="text-3xl font-bold text-stone-800">Stone Expert AI</h1>
            <Sparkles className="w-6 h-6 text-yellow-500" />
          </div>
          <p className="text-stone-600">Get expert answers about stone materials, quarries, and restoration</p>
        </div>

        {/* Quick Questions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-stone-800 mb-3">Quick Questions</h3>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleSend(question)}
                className="text-sm"
              >
                {question}
              </Button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <Card className="mb-6">
          <CardContent className="p-0">
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!message.isUser && (
                    <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-stone-600" />
                    </div>
                  )}
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.isUser
                        ? 'bg-stone-600 text-white'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  {message.isUser && (
                    <div className="w-8 h-8 bg-stone-600 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  )}
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-stone-100 rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-stone-600" />
                  </div>
                  <div className="bg-stone-100 text-stone-800 px-4 py-2 rounded-lg">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-stone-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Input Area */}
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask anything about stones, quarries, or materials..."
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
          />
          <Button onClick={() => handleSend()} disabled={!inputValue.trim() || isLoading}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default AiChat;
