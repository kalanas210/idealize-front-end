import React, { useState, useEffect } from 'react';
import { MessageCircle, Search, Filter, MoreVertical, Phone, Video, FileText, Image, Download, Send, Paperclip, Smile } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'customer' | 'agent';
  timestamp: Date;
  attachments?: ChatAttachment[];
  customerId: string;
  customerName: string;
  customerAvatar?: string;
}

interface ChatAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
}

interface ChatSession {
  id: string;
  customerId: string;
  customerName: string;
  customerAvatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'active' | 'waiting' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  tags: string[];
}

const SellerChatDashboard: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'waiting' | 'resolved'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all');
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    const mockChatSessions: ChatSession[] = [
      {
        id: '1',
        customerId: 'cust1',
        customerName: 'John Smith',
        customerAvatar: 'https://via.placeholder.com/40',
        lastMessage: 'I need help with my website design project',
        lastMessageTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        unreadCount: 2,
        status: 'active',
        priority: 'high',
        tags: ['website', 'design', 'urgent']
      },
      {
        id: '2',
        customerId: 'cust2',
        customerName: 'Sarah Johnson',
        customerAvatar: 'https://via.placeholder.com/40',
        lastMessage: 'Can you review my logo design?',
        lastMessageTime: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        unreadCount: 0,
        status: 'waiting',
        priority: 'medium',
        tags: ['logo', 'review']
      },
      {
        id: '3',
        customerId: 'cust3',
        customerName: 'Mike Wilson',
        customerAvatar: 'https://via.placeholder.com/40',
        lastMessage: 'Thanks for the help!',
        lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        unreadCount: 0,
        status: 'resolved',
        priority: 'low',
        tags: ['completed']
      }
    ];

    setChatSessions(mockChatSessions);
  }, []);

  // Mock messages for selected chat
  useEffect(() => {
    if (selectedChat) {
      const mockMessages: ChatMessage[] = [
        {
          id: '1',
          text: 'Hi! I need help with my website design project',
          sender: 'customer',
          timestamp: new Date(Date.now() - 10 * 60 * 1000),
          customerId: selectedChat.customerId,
          customerName: selectedChat.customerName,
          customerAvatar: selectedChat.customerAvatar
        },
        {
          id: '2',
          text: 'Hello! I\'d be happy to help you with your website design. Can you tell me more about your project?',
          sender: 'agent',
          timestamp: new Date(Date.now() - 8 * 60 * 1000),
          customerId: selectedChat.customerId,
          customerName: selectedChat.customerName,
          customerAvatar: selectedChat.customerAvatar
        },
        {
          id: '3',
          text: 'I\'m looking to create a modern e-commerce site for my clothing brand',
          sender: 'customer',
          timestamp: new Date(Date.now() - 5 * 60 * 1000),
          customerId: selectedChat.customerId,
          customerName: selectedChat.customerName,
          customerAvatar: selectedChat.customerAvatar
        }
      ];
      setMessages(mockMessages);
    }
  }, [selectedChat]);

  const filteredChatSessions = chatSessions.filter(session => {
    const matchesSearch = session.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         session.lastMessage.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || session.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || session.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedChat) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'agent',
        timestamp: new Date(),
        customerId: selectedChat.customerId,
        customerName: selectedChat.customerName,
        customerAvatar: selectedChat.customerAvatar
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
      
      // Update chat session
      setChatSessions(prev => prev.map(session => 
        session.id === selectedChat.id 
          ? { ...session, lastMessage: newMessage, lastMessageTime: new Date(), unreadCount: 0 }
          : session
      ));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'waiting': return 'bg-yellow-100 text-yellow-800';
      case 'resolved': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Chat Sessions Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Customer Chats</h2>
          <p className="text-sm text-gray-500">Manage customer conversations</p>
        </div>

        {/* Search and Filters */}
        <div className="p-4 space-y-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="waiting">Waiting</option>
            <option value="resolved">Resolved</option>
          </select>

          {/* Priority Filter */}
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value as any)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>
        </div>

        {/* Chat Sessions List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChatSessions.map((session) => (
            <div
              key={session.id}
              onClick={() => setSelectedChat(session)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                selectedChat?.id === session.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-start space-x-3">
                <img
                  src={session.customerAvatar || 'https://via.placeholder.com/40'}
                  alt={session.customerName}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900 truncate">
                      {session.customerName}
                    </h3>
                    <span className="text-xs text-gray-500">
                      {formatTime(session.lastMessageTime)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {session.lastMessage}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(session.status)}`}>
                      {session.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(session.priority)}`}>
                      {session.priority}
                    </span>
                    {session.unreadCount > 0 && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        {session.unreadCount} new
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className="bg-white border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img
                    src={selectedChat.customerAvatar || 'https://via.placeholder.com/40'}
                    alt={selectedChat.customerName}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {selectedChat.customerName}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedChat.status)}`}>
                        {selectedChat.status}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(selectedChat.priority)}`}>
                        {selectedChat.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Phone className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Video className="h-5 w-5" />
                  </button>
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="flex items-start space-x-2 max-w-[70%]">
                    {message.sender === 'customer' && (
                      <img
                        src={message.customerAvatar || 'https://via.placeholder.com/32'}
                        alt={message.customerName}
                        className="w-8 h-8 rounded-full"
                      />
                    )}
                    <div
                      className={`p-3 rounded-lg ${
                        message.sender === 'agent'
                          ? 'bg-blue-600 text-white rounded-br-none'
                          : 'bg-gray-100 text-gray-800 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'agent' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2">
                    <img
                      src={selectedChat.customerAvatar || 'https://via.placeholder.com/32'}
                      alt={selectedChat.customerName}
                      className="w-8 h-8 rounded-full"
                    />
                    <div className="p-3 bg-gray-100 rounded-lg rounded-bl-none">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white border-t border-gray-200 p-4">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Paperclip className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Smile className="h-5 w-5" />
                </button>
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage();
                    }
                  }}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="h-5 w-5" />
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Empty State */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No chat selected</h3>
              <p className="text-gray-500">Choose a customer chat from the sidebar to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerChatDashboard;
