import { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, X, Minimize2, Maximize2, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Textarea } from '../ui/textarea';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatbotProps {
  onClose?: () => void;
  initialMessage?: string;
  context?: 'general' | 'job' | 'housing' | 'resources';
}

export default function AIChatbot({ onClose, initialMessage, context = 'general' }: AIChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hi! I'm your FairPath AI assistant. 👋\n\nI'm here to help you with:\n• Job searching & applications\n• Housing searches & FastTrack\n• Resources & support\n• Navigating the platform\n• Optimizing your profile\n\n**Ask me anything!**`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState(initialMessage || '');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Auto-focus input
  useEffect(() => {
    if (!isMinimized) {
      textareaRef.current?.focus();
    }
  }, [isMinimized]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Simulate AI response (replace with real API call)
    setTimeout(() => {
      const response = generateAIResponse(userMessage.content, context);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full bg-gradient-to-br from-[#A8F32C] to-[#7BC41A] text-black hover:scale-110 transition-transform shadow-lg"
        >
          <Sparkles className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  return (
    <Card className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-[#0A0A0A] border-[#A8F32C]/30 shadow-2xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#A8F32C]/20 to-transparent border-b border-[#A8F32C]/30 p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#A8F32C] to-[#7BC41A] flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-black" />
          </div>
          <div>
            <div className="font-medium text-white">FairPath AI</div>
            <div className="text-xs text-white/60">Ask me anything</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="h-8 w-8 p-0 text-white/60 hover:text-white"
          >
            <Minimize2 className="h-4 w-4" />
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-8 w-8 p-0 text-white/60 hover:text-white"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-[#A8F32C] text-black'
                  : 'bg-white/5 text-white border border-white/10'
              }`}
            >
              <div className="whitespace-pre-wrap text-sm leading-relaxed">
                {message.content}
              </div>
              <div
                className={`text-xs mt-2 ${
                  message.role === 'user' ? 'text-black/60' : 'text-white/40'
                }`}
              >
                {message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 text-white border border-white/10 rounded-2xl px-4 py-3">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-sm">AI is thinking...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-white/10 p-4 bg-black/50">
        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message... (Shift+Enter for new line)"
            className="bg-white/5 border-white/20 text-white resize-none min-h-[44px] max-h-32"
            rows={1}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="h-11 w-11 p-0 bg-gradient-to-br from-[#A8F32C] to-[#7BC41A] text-black hover:scale-105 transition-transform flex-shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
        <div className="text-xs text-white/40 mt-2">
          Powered by FairPath AI • Always learning to help you better
        </div>
      </div>
    </Card>
  );
}

// AI Response Generator (placeholder - replace with real AI API)
function generateAIResponse(userInput: string, context: string): string {
  const input = userInput.toLowerCase();

  // Job-related queries
  if (input.includes('job') || input.includes('employment') || input.includes('work')) {
    return `I can help you with jobs! 🎯\n\n**Here's what I can do:**\n\n• Find felon-friendly jobs in your area\n• Optimize your resume & cover letter\n• Match you with WOTC-eligible employers\n• Prepare you for interviews\n• Track your applications\n\n**What specific help do you need?**\n\nFor example: "Find warehouse jobs near me" or "Help me write a resume"`;
  }

  // Housing-related queries
  if (input.includes('housing') || input.includes('apartment') || input.includes('home')) {
    return `Let me help you find housing! 🏠\n\n**FastTrack Housing Benefits:**\n\n• Guaranteed 48-hour response from landlords\n• Background-check friendly properties\n• Tier-based pricing ($75/$70/$65)\n• 60/40 revenue share with landlords\n\n**Your next steps:**\n\n1. Browse available properties\n2. Submit FastTrack application\n3. Get response within 48 hours!\n\nWould you like me to show you properties in a specific area?`;
  }

  // Friend A Felon marketplace
  if (input.includes('marketplace') || input.includes('free items') || input.includes('donate')) {
    return `About Friend A Felon Marketplace: 📦\n\n**Note:** The Friend A Felon marketplace is a **FairPath Pro exclusive feature**.\n\n**Upgrade to Pro ($5/month) to access:**\n\n• Free items from community\n• Furniture, clothing, electronics\n• 10 marketplace claims/month\n• All AI features\n• Priority support\n\nWould you like to upgrade to Pro or learn more about other features?`;
  }

  // Subscription/upgrade queries
  if (input.includes('upgrade') || input.includes('pro') || input.includes('plus') || input.includes('subscription')) {
    return `Let me explain our subscription tiers! 💳\n\n**Free:** $0\n• 2 marketplace claims/month\n• Basic features\n\n**Plus:** $2/month\n• 5 claims/month\n• FastTrack housing ($70)\n• Priority matching\n\n**Pro:** $5/month ⭐\n• 10 claims/month\n• Friend A Felon marketplace\n• ALL AI features\n• FastTrack housing ($65)\n• Mobile app access\n\nWhich tier interests you?`;
  }

  // Resources
  if (input.includes('resource') || input.includes('help') || input.includes('support')) {
    return `I can connect you with resources! 🤝\n\n**Available resources:**\n\n• Legal aid & expungement help\n• Mental health services\n• Substance abuse support\n• Financial counseling\n• Education & training programs\n• Transportation assistance\n• Clothing & essentials\n\nWhat type of resource are you looking for?`;
  }

  // AI features
  if (input.includes('ai') || input.includes('optimize') || input.includes('write')) {
    return `FairPath Pro includes powerful AI features! ✨\n\n**AI-powered tools:**\n\n• Resume optimization\n• Cover letter writing\n• Application auto-fill\n• Text optimization (makes your writing professional)\n• Job match recommendations\n• Interview prep\n\n**Note:** AI features require FairPath Pro ($5/month)\n\nWould you like to try them out?`;
  }

  // Default helpful response
  return `I'm here to help! 😊\n\n**I can assist with:**\n\n• **Jobs** - Find employment, optimize applications\n• **Housing** - FastTrack applications, property search\n• **Marketplace** - Free items (Pro tier only)\n• **Resources** - Support services, programs\n• **Account** - Subscriptions, profile, settings\n\n**Try asking:**\n• "Find jobs near me"\n• "How does FastTrack housing work?"\n• "What's included in Pro?"\n• "I need help with my resume"\n\nWhat would you like help with?`;
}
