
import React, { useState, useRef, useEffect } from 'react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Bot, User, Send, Loader2, MessageSquare, Lightbulb, Book, Hammer } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

const AiChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your stone industry AI assistant. I can help you with questions about stone materials, quarrying techniques, historical monuments, marble types, restoration methods, and industry best practices. What would you like to know?',
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputMessage),
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAIResponse = (userInput: string) => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes('marble')) {
      return 'Marble is a metamorphic rock formed from limestone or dolomite. Famous varieties include Carrara marble from Italy, known for its pure white color and fine grain, and Pentelic marble from Greece, used in the Parthenon. Each marble type has unique characteristics - would you like to know about specific properties or quarrying locations?';
    } else if (lowerInput.includes('quarry') || lowerInput.includes('quarrying')) {
      return 'Quarrying involves extracting stone from the earth using various methods. Modern quarries use diamond wire saws, chain saws, and drilling equipment. Traditional methods included hand tools and wedge-and-feather techniques. The extraction method depends on the stone type and desired block size. Would you like details about specific quarrying techniques?';
    } else if (lowerInput.includes('restoration') || lowerInput.includes('conservation')) {
      return 'Stone restoration requires careful analysis of the original material and damage assessment. Key principles include using compatible materials, maintaining structural integrity, and preserving historical authenticity. Techniques include cleaning, consolidation, repair, and replacement. Each project needs a conservation plan based on the stone type and environmental conditions.';
    } else if (lowerInput.includes('monument') || lowerInput.includes('historic')) {
      return 'Historic stone monuments showcase various architectural styles and materials. The Pyramids of Giza use limestone and granite, while the Taj Mahal features white marble. Each monument reflects the geological resources and craftsmanship of its era. Would you like information about specific monuments or construction techniques?';
    } else {
      return 'That\'s an interesting question about stone materials! I can provide detailed information about various aspects of the stone industry including material properties, extraction methods, historical uses, and modern applications. Could you be more specific about what aspect interests you most?';
    }
  };

  const quickQuestions = [
    { text: 'Types of marble', icon: Book },
    { text: 'Quarrying techniques', icon: Hammer },
    { text: 'Stone restoration', icon: Lightbulb },
    { text: 'Historic monuments', icon: MessageSquare }
  ];

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
  };

  return (
    <Layout>
      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-8rem)]">
        <Card className="h-full flex flex-col">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Bot className="w-6 h-6 text-stone-600" />
              Stone Industry AI Assistant
            </CardTitle>
            <p className="text-sm text-stone-600">
              Get expert knowledge about stone materials, quarrying, monuments, and industry practices
            </p>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-stone-600 text-white'
                        : 'bg-stone-100 text-stone-800'
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {message.sender === 'ai' && (
                        <Bot className="w-5 h-5 mt-0.5 text-stone-600" />
                      )}
                      {message.sender === 'user' && (
                        <User className="w-5 h-5 mt-0.5 text-white" />
                      )}
                      <div className="flex-1">
                        <p className="text-sm">{message.text}</p>
                        <p className={`text-xs mt-1 ${
                          message.sender === 'user' ? 'text-stone-300' : 'text-stone-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 rounded-lg p-3 flex items-center gap-2">
                    <Bot className="w-5 h-5 text-stone-600" />
                    <Loader2 className="w-4 h-4 animate-spin text-stone-600" />
                    <span className="text-sm text-stone-600">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="border-t p-4">
              <p className="text-sm text-stone-600 mb-3">Quick questions:</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {quickQuestions.map((question, index) => {
                  const IconComponent = question.icon;
                  return (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer hover:bg-stone-100 flex items-center gap-1"
                      onClick={() => handleQuickQuestion(question.text)}
                    >
                      <IconComponent className="w-3 h-3" />
                      {question.text}
                    </Badge>
                  );
                })}
              </div>

              {/* Input Area */}
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask about stone materials, quarrying, monuments..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim() || isLoading}
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default AiChat;
