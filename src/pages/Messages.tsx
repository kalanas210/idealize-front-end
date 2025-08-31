import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Paperclip, 
  Smile, 
  MoreVertical,
  Phone,
  Video,
  Info,
  Archive,
  Star,
  Flag,
  Trash2,
  Circle,
  CheckCircle2,
  Clock,
  Image,
  File,
  Download,
  Eye,
  Heart,
  Reply
} from 'lucide-react';

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [messageText, setMessageText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAttachmentMenu, setShowAttachmentMenu] = useState(false);

  // Mock conversations data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Thanks for the amazing video! The quality exceeded my expectations.',
      timestamp: '2 min ago',
      unread: 2,
      online: true,
      orderTitle: 'YouTube Tech Review',
      orderValue: '$499'
    },
    {
      id: 2,
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'When can we schedule the call to discuss the requirements?',
      timestamp: '1 hour ago',
      unread: 0,
      online: true,
      orderTitle: 'Instagram Story Promotion',
      orderValue: '$299'
    },
    {
      id: 3,
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Could you make the dance more energetic? I\'ve sent some reference videos.',
      timestamp: '3 hours ago',
      unread: 1,
      online: false,
      orderTitle: 'TikTok Viral Dance',
      orderValue: '$199'
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Perfect! The Facebook post performed really well. Thank you!',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      orderTitle: 'Facebook Business Promotion',
      orderValue: '$179'
    },
    {
      id: 5,
      name: 'Lisa Park',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
      lastMessage: 'Hi! I\'m interested in your beauty tutorial service. Can we discuss?',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      orderTitle: 'New Inquiry',
      orderValue: 'Potential'
    }
  ];

  // Mock messages for selected conversation
  const messages = [
    {
      id: 1,
      senderId: 1,
      senderName: 'Sarah Johnson',
      text: 'Hi! I just placed an order for your YouTube tech review service. I\'m really excited to work with you!',
      timestamp: '2024-01-22T10:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      text: 'Hi Sarah! Thank you for choosing my service. I\'m excited to work with you too! Could you please share the product details and any specific points you\'d like me to cover?',
      timestamp: '2024-01-22T10:45:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Sarah Johnson',
      text: 'Absolutely! I\'ve attached the product specifications and key features I\'d like you to highlight.',
      timestamp: '2024-01-22T11:00:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 4,
      senderId: 1,
      senderName: 'Sarah Johnson',
      text: '',
      timestamp: '2024-01-22T11:01:00Z',
      type: 'file',
      fileName: 'Product_Specifications.pdf',
      fileSize: '2.4 MB',
      status: 'read'
    },
    {
      id: 5,
      senderId: 'me',
      senderName: 'You',
      text: 'Perfect! I\'ve reviewed the specifications. The product looks amazing. I\'ll focus on the camera quality, battery life, and performance features as requested. I\'ll have the video ready by Friday.',
      timestamp: '2024-01-22T11:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 6,
      senderId: 1,
      senderName: 'Sarah Johnson',
      text: 'That sounds perfect! I\'m looking forward to seeing the final video. Thank you for your professionalism!',
      timestamp: '2024-01-22T12:00:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 7,
      senderId: 'me',
      senderName: 'You',
      text: 'Here\'s the completed video review! I\'ve included detailed analysis of all the features you mentioned. Let me know if you need any revisions.',
      timestamp: '2024-01-25T14:30:00Z',
      type: 'text',
      status: 'read'
    },
    {
      id: 8,
      senderId: 'me',
      senderName: 'You',
      text: '',
      timestamp: '2024-01-25T14:31:00Z',
      type: 'video',
      fileName: 'Tech_Review_Final.mp4',
      fileSize: '156 MB',
      thumbnail: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
      status: 'read'
    },
    {
      id: 9,
      senderId: 1,
      senderName: 'Sarah Johnson',
      text: 'Thanks for the amazing video! The quality exceeded my expectations. This is exactly what I was looking for. I\'ll definitely work with you again!',
      timestamp: '2024-01-25T16:00:00Z',
      type: 'text',
      status: 'delivered'
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatFileSize = (bytes: string) => {
    return bytes;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Messages</h1>
              <p className="text-sm text-gray-600">Communicate with your clients</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 200px)' }}>
          <div className="flex h-full">
            {/* Conversations Sidebar */}
            <div className="w-1/3 border-r border-gray-200 flex flex-col">
              {/* Search */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Conversations List */}
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors duration-200 ${
                      selectedConversation === conversation.id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <img
                          src={conversation.avatar}
                          alt={conversation.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="text-sm font-semibold text-gray-900 truncate">
                            {conversation.name}
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                            {conversation.unread > 0 && (
                              <span className="w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 truncate mb-2">
                          {conversation.lastMessage}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-blue-600 font-medium">
                            {conversation.orderTitle}
                          </span>
                          <span className="text-xs text-gray-500">
                            {conversation.orderValue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 flex flex-col">
              {selectedConv ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b border-gray-200 bg-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <img
                            src={selectedConv.avatar}
                            alt={selectedConv.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          {selectedConv.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                          )}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{selectedConv.name}</h3>
                          <p className="text-sm text-gray-600">
                            {selectedConv.online ? 'Online now' : 'Last seen 2 hours ago'} • {selectedConv.orderTitle}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Phone className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Video className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <Info className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                          {message.type === 'text' && (
                            <div
                              className={`p-3 rounded-lg ${
                                message.senderId === 'me'
                                  ? 'bg-blue-600 text-white rounded-br-none'
                                  : 'bg-white text-gray-900 rounded-bl-none border border-gray-200'
                              }`}
                            >
                              <p className="text-sm">{message.text}</p>
                            </div>
                          )}

                          {message.type === 'file' && (
                            <div
                              className={`p-3 rounded-lg border ${
                                message.senderId === 'me'
                                  ? 'bg-blue-600 text-white border-blue-500 rounded-br-none'
                                  : 'bg-white text-gray-900 border-gray-200 rounded-bl-none'
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                                  message.senderId === 'me' ? 'bg-blue-500' : 'bg-gray-100'
                                }`}>
                                  <File className={`h-5 w-5 ${
                                    message.senderId === 'me' ? 'text-white' : 'text-gray-600'
                                  }`} />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium">{message.fileName}</p>
                                  <p className={`text-xs ${
                                    message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                                  }`}>
                                    {formatFileSize(message.fileSize)}
                                  </p>
                                </div>
                                <button className={`p-1 rounded ${
                                  message.senderId === 'me' 
                                    ? 'hover:bg-blue-500 text-white' 
                                    : 'hover:bg-gray-100 text-gray-600'
                                }`}>
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          )}

                          {message.type === 'video' && (
                            <div
                              className={`rounded-lg overflow-hidden ${
                                message.senderId === 'me' ? 'rounded-br-none' : 'rounded-bl-none'
                              }`}
                            >
                              <div className="relative">
                                <img
                                  src={message.thumbnail}
                                  alt="Video thumbnail"
                                  className="w-full h-48 object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                  <button className="w-12 h-12 bg-white bg-opacity-90 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200">
                                    <Eye className="h-6 w-6 text-gray-800 ml-1" />
                                  </button>
                                </div>
                              </div>
                              <div className={`p-3 ${
                                message.senderId === 'me' ? 'bg-blue-600 text-white' : 'bg-white text-gray-900 border-l border-r border-b border-gray-200'
                              }`}>
                                <div className="flex items-center justify-between">
                                  <div>
                                    <p className="text-sm font-medium">{message.fileName}</p>
                                    <p className={`text-xs ${
                                      message.senderId === 'me' ? 'text-blue-100' : 'text-gray-500'
                                    }`}>
                                      {formatFileSize(message.fileSize)}
                                    </p>
                                  </div>
                                  <button className={`p-1 rounded ${
                                    message.senderId === 'me' 
                                      ? 'hover:bg-blue-500 text-white' 
                                      : 'hover:bg-gray-100 text-gray-600'
                                  }`}>
                                    <Download className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          )}

                          <div className={`flex items-center space-x-2 mt-1 ${
                            message.senderId === 'me' ? 'justify-end' : 'justify-start'
                          }`}>
                            <span className="text-xs text-gray-500">
                              {formatTime(message.timestamp)}
                            </span>
                            {message.senderId === 'me' && (
                              <div className="flex items-center">
                                {message.status === 'read' ? (
                                  <CheckCircle2 className="h-3 w-3 text-blue-500" />
                                ) : message.status === 'delivered' ? (
                                  <CheckCircle2 className="h-3 w-3 text-gray-400" />
                                ) : (
                                  <Circle className="h-3 w-3 text-gray-400" />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 bg-white">
                    <div className="flex items-end space-x-3">
                      <div className="relative">
                        <button
                          onClick={() => setShowAttachmentMenu(!showAttachmentMenu)}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        >
                          <Paperclip className="h-5 w-5" />
                        </button>
                        
                        {showAttachmentMenu && (
                          <div className="absolute bottom-full left-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg py-2 min-w-[150px]">
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                              <Image className="h-4 w-4" />
                              <span>Photo/Video</span>
                            </button>
                            <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center space-x-2">
                              <File className="h-4 w-4" />
                              <span>Document</span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 relative">
                        <textarea
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          onKeyPress={handleKeyPress}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          style={{ minHeight: '44px', maxHeight: '120px' }}
                        />
                      </div>
                      
                      <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200">
                        <Smile className="h-5 w-5" />
                      </button>
                      
                      <button
                        onClick={handleSendMessage}
                        disabled={!messageText.trim()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        <Send className="h-4 w-4" />
                        <span>Send</span>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
                    <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;