import { useState } from 'react';
import { MessageCircle, Send, Search, X, User, Package, Home, Briefcase, Clock, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import LogoFinal from '../common/LogoFinal';

interface Message {
  id: string;
  sender: 'me' | 'them';
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  name: string;
  type: 'job' | 'housing' | 'marketplace' | 'support';
  lastMessage: string;
  timestamp: string;
  unread: number;
  context?: string;
}

interface MessagingCenterProps {
  onBack: () => void;
}

export default function MessagingCenter({ onBack }: MessagingCenterProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const conversations: Conversation[] = [
    {
      id: '1',
      name: 'Amazon Fulfillment',
      type: 'job',
      lastMessage: 'Thanks for applying! We\'d like to schedule an interview.',
      timestamp: '2 min ago',
      unread: 1,
      context: 'Warehouse Associate Position'
    },
    {
      id: '2',
      name: 'Lincoln Park Apartments',
      type: 'housing',
      lastMessage: 'Your application has been approved! Call to schedule showing.',
      timestamp: '1 hour ago',
      unread: 2,
      context: '2BR/1BA - $1,450/mo'
    },
    {
      id: '3',
      name: 'Sarah M.',
      type: 'marketplace',
      lastMessage: 'The couch is still available. Can you pick up Saturday?',
      timestamp: '3 hours ago',
      unread: 0,
      context: 'Queen Mattress & Box Spring'
    },
    {
      id: '4',
      name: 'FairPath Support',
      type: 'support',
      lastMessage: 'Your FairPath+ subscription has been activated!',
      timestamp: '1 day ago',
      unread: 0,
      context: 'Account Support'
    }
  ];

  const messages: { [key: string]: Message[] } = {
    '1': [
      {
        id: 'm1',
        sender: 'them',
        text: 'Hi! We received your application for the Warehouse Associate position. Your background check came back clean and we\'d love to schedule an interview!',
        timestamp: '10:45 AM'
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'Thank you so much! I\'m very excited about this opportunity. When would you like to schedule the interview?',
        timestamp: '10:47 AM'
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Great! Are you available this Friday at 2pm? We\'re located at 1234 Industrial Drive.',
        timestamp: '10:50 AM'
      },
      {
        id: 'm4',
        sender: 'me',
        text: 'Yes, Friday at 2pm works perfectly! Should I bring anything specific?',
        timestamp: '10:52 AM'
      },
      {
        id: 'm5',
        sender: 'them',
        text: 'Just bring a valid ID and be ready to discuss your availability. Looking forward to meeting you!',
        timestamp: '2 min ago'
      }
    ],
    '2': [
      {
        id: 'm1',
        sender: 'them',
        text: 'Good news! Your FastTrack application has been approved. I\'d love to show you the apartment. When are you available?',
        timestamp: '2:30 PM'
      },
      {
        id: 'm2',
        sender: 'me',
        text: 'That\'s amazing! I can do any day this week after 5pm or weekends.',
        timestamp: '2:35 PM'
      },
      {
        id: 'm3',
        sender: 'them',
        text: 'Perfect! How about Saturday at 11am? The unit is move-in ready and I think you\'ll love it.',
        timestamp: '1 hour ago'
      }
    ],
    '3': [
      {
        id: 'm1',
        sender: 'me',
        text: 'Hi! I\'d love to claim the queen mattress. I just moved into my first apartment and really need furniture.',
        timestamp: 'Yesterday'
      },
      {
        id: 'm2',
        sender: 'them',
        text: 'That\'s wonderful! I\'m so happy to help. The mattress is in great condition - only 2 years old. When can you pick it up?',
        timestamp: 'Yesterday'
      },
      {
        id: 'm3',
        sender: 'me',
        text: 'I can borrow my friend\'s truck this Saturday. Would that work?',
        timestamp: '5 hours ago'
      },
      {
        id: 'm4',
        sender: 'them',
        text: 'Saturday works great! I\'m in Lincoln Park. DM me and I\'ll send you the exact address.',
        timestamp: '3 hours ago'
      }
    ],
    '4': [
      {
        id: 'm1',
        sender: 'them',
        text: 'Welcome to FairPath+! Your subscription is now active. You\'ll save $10 on every FastTrack application.',
        timestamp: 'Yesterday'
      }
    ]
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'job':
        return <Briefcase className="h-4 w-4" />;
      case 'housing':
        return <Home className="h-4 w-4" />;
      case 'marketplace':
        return <Package className="h-4 w-4" />;
      case 'support':
        return <MessageCircle className="h-4 w-4" />;
      default:
        return <User className="h-4 w-4" />;
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // In real app, this would send the message
    setNewMessage('');
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = selectedConversation ? messages[selectedConversation] || [] : [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-white/5 bg-[#121212] sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button onClick={onBack} variant="ghost" size="icon" className="text-white/60 hover:text-white">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <LogoFinal size="md" />
            </div>
            <Button onClick={onBack} variant="outline" className="border-white/20 text-white hover:bg-white/5">
              <X className="mr-2 h-4 w-4" />
              Close
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl text-white mb-2">MESSAGES</h1>
          <p className="text-white/60">Communicate with employers, landlords, and donors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="bg-[#121212] border-white/10 p-4 flex flex-col">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white/40" />
                <Input
                  placeholder="Search messages..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-black border-white/20 text-white pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {conversations
                .filter(conv =>
                  conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  conv.context?.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`w-full text-left p-4 rounded-lg border transition-all ${
                      selectedConversation === conv.id
                        ? 'bg-[#A8F32C]/10 border-[#A8F32C]'
                        : 'bg-black border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        conv.type === 'job' ? 'bg-blue-500/20 text-blue-400' :
                        conv.type === 'housing' ? 'bg-purple-500/20 text-purple-400' :
                        conv.type === 'marketplace' ? 'bg-[#A8F32C]/20 text-[#A8F32C]' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        {getIcon(conv.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-white font-medium truncate">{conv.name}</span>
                          {conv.unread > 0 && (
                            <span className="w-5 h-5 rounded-full bg-[#A8F32C] text-black text-xs flex items-center justify-center flex-shrink-0">
                              {conv.unread}
                            </span>
                          )}
                        </div>
                        {conv.context && (
                          <p className="text-xs text-white/40 mb-1 truncate">{conv.context}</p>
                        )}
                        <p className="text-sm text-white/60 truncate">{conv.lastMessage}</p>
                        <p className="text-xs text-white/40 mt-1 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {conv.timestamp}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
            </div>
          </Card>

          {/* Message Thread */}
          <Card className="lg:col-span-2 bg-[#121212] border-white/10 flex flex-col">
            {selectedConv ? (
              <>
                {/* Header */}
                <div className="p-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      selectedConv.type === 'job' ? 'bg-blue-500/20 text-blue-400' :
                      selectedConv.type === 'housing' ? 'bg-purple-500/20 text-purple-400' :
                      selectedConv.type === 'marketplace' ? 'bg-[#A8F32C]/20 text-[#A8F32C]' :
                      'bg-gray-500/20 text-gray-400'
                    }`}>
                      {getIcon(selectedConv.type)}
                    </div>
                    <div>
                      <h3 className="text-white font-medium">{selectedConv.name}</h3>
                      {selectedConv.context && (
                        <p className="text-xs text-white/60">{selectedConv.context}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="lg:hidden text-white/60 hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {conversationMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                        <div className={`rounded-lg p-4 ${
                          message.sender === 'me'
                            ? 'bg-[#A8F32C] text-black'
                            : 'bg-black border border-white/20 text-white'
                        }`}>
                          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                        </div>
                        <p className={`text-xs text-white/40 mt-1 ${
                          message.sender === 'me' ? 'text-right' : 'text-left'
                        }`}>
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-3">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage();
                        }
                      }}
                      className="bg-black border-white/20 text-white resize-none"
                      rows={2}
                    />
                    <Button
                      onClick={handleSendMessage}
                      className="bg-[#A8F32C] text-black hover:bg-[#A8F32C]/90 px-6"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-white/40 mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 text-white/20 mx-auto mb-4" />
                  <h3 className="text-xl text-white mb-2">Select a conversation</h3>
                  <p className="text-white/60">Choose a message from the list to start chatting</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}