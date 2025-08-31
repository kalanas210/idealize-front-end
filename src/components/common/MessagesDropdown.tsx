import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Eye, Clock, CheckCircle, User } from 'lucide-react';

const MessagesDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'Thanks for the amazing video! The quality exceeded my expectations.',
      time: '2 min ago',
      unread: true,
      orderTitle: 'YouTube Tech Review'
    },
    {
      id: 2,
      sender: 'David Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'When can we schedule the call to discuss the requirements?',
      time: '1 hour ago',
      unread: true,
      orderTitle: 'Instagram Story Promotion'
    },
    {
      id: 3,
      sender: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'Could you make the dance more energetic? I\'ve sent some reference videos.',
      time: '3 hours ago',
      unread: false,
      orderTitle: 'TikTok Viral Dance'
    },
    {
      id: 4,
      sender: 'Michael Rodriguez',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      message: 'Perfect! The Facebook post performed really well. Thank you!',
      time: '1 day ago',
      unread: false,
      orderTitle: 'Facebook Business Promotion'
    }
  ]);

  const unreadCount = messages.filter(m => m.unread).length;

  const markAsRead = (id: number) => {
    setMessages(messages.map(m => 
      m.id === id ? { ...m, unread: false } : m
    ));
  };

  const markAllAsRead = () => {
    setMessages(messages.map(m => ({ ...m, unread: false })));
  };

  return (
    <div className="relative">
      {/* Messages Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
      >
        <MessageCircle className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-green-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Messages Dropdown */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-30" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Messages Panel */}
          <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-lg border border-gray-200 z-40 max-h-96 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
              <div className="flex items-center space-x-2">
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Mark all as read
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Messages List */}
            <div className="max-h-80 overflow-y-auto">
              {messages.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-sm font-medium text-gray-900 mb-1">No messages</h3>
                  <p className="text-sm text-gray-500">You're all caught up!</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`p-4 hover:bg-gray-50 transition-colors duration-200 cursor-pointer ${
                        message.unread ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                      }`}
                      onClick={() => markAsRead(message.id)}
                    >
                      <div className="flex space-x-3">
                        <div className="flex-shrink-0">
                          <img
                            src={message.avatar}
                            alt={message.sender}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-sm font-medium text-gray-900 truncate">
                              {message.sender}
                            </p>
                            <div className="flex items-center space-x-1">
                              <span className="text-xs text-gray-500">{message.time}</span>
                              {message.unread && (
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              )}
                            </div>
                          </div>
                          
                          <p className="text-sm text-gray-600 line-clamp-2 mb-1">
                            {message.message}
                          </p>
                          
                          <p className="text-xs text-blue-600 font-medium">
                            {message.orderTitle}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-200 bg-gray-50">
              <Link
                to="/messages"
                className="w-full text-center text-sm text-blue-600 hover:text-blue-700 font-medium block"
                onClick={() => setIsOpen(false)}
              >
                View all messages
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MessagesDropdown;