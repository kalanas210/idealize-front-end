import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Paperclip, Smile, Phone, Video, FileText, Image, Download } from 'lucide-react';
import LiveChatService, { LiveChatCustomer, LiveChatAgent } from '../../services/liveChatService';

interface LiveChatWidgetProps {
  license: string;
  group?: string;
  customer?: LiveChatCustomer;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
  };
  className?: string;
  onChatStart?: (chatId: string) => void;
  onChatEnd?: (chatId: string) => void;
  onMessageSent?: (message: string) => void;
  onAgentJoin?: (agent: LiveChatAgent) => void;
}

const LiveChatWidget: React.FC<LiveChatWidgetProps> = ({
  license,
  group,
  customer,
  theme = {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    textColor: '#ffffff'
  },
  className = '',
  onChatStart,
  onChatEnd,
  onMessageSent,
  onAgentJoin
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [chatStatus, setChatStatus] = useState<'online' | 'offline' | 'away' | 'unknown'>('unknown');
  const [agentInfo, setAgentInfo] = useState<LiveChatAgent | null>(null);
  const [typingIndicator, setTypingIndicator] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showFileUpload, setShowFileUpload] = useState(false);
  
  const liveChatService = useRef<LiveChatService>();
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize LiveChat service
    liveChatService.current = new LiveChatService({
      license,
      group,
      customer,
      theme
    });

    // Initialize LiveChat
    const initLiveChat = async () => {
      setIsLoading(true);
      try {
        await liveChatService.current?.initialize();
        
        // Set up event listeners
        if (window.LiveChatWidget) {
          window.LiveChatWidget.on('chat_started', (data: any) => {
            onChatStart?.(data.chatId);
            setChatStatus('online');
          });

          window.LiveChatWidget.on('chat_ended', (data: any) => {
            onChatEnd?.(data.chatId);
            setChatStatus('offline');
          });

          window.LiveChatWidget.on('agent_joined', (data: any) => {
            const agent: LiveChatAgent = {
              id: data.agent.id,
              name: data.agent.name,
              avatar: data.agent.avatar,
              status: data.agent.status,
              specialties: data.agent.specialties || []
            };
            setAgentInfo(agent);
            onAgentJoin?.(agent);
          });

          window.LiveChatWidget.on('typing_started', () => {
            setTypingIndicator(true);
          });

          window.LiveChatWidget.on('typing_stopped', () => {
            setTypingIndicator(false);
          });

          window.LiveChatWidget.on('message_received', () => {
            setUnreadCount(prev => prev + 1);
          });
        }

        // Check initial status
        setChatStatus(liveChatService.current?.getChatStatus() || 'unknown');
      } catch (error) {
        console.error('Failed to initialize LiveChat:', error);
        setChatStatus('offline');
      } finally {
        setIsLoading(false);
      }
    };

    initLiveChat();

    // Cleanup on unmount
    return () => {
      liveChatService.current?.destroy();
    };
  }, [license, group, customer, theme, onChatStart, onChatEnd, onAgentJoin]);

  const handleToggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      liveChatService.current?.closeChat();
    } else {
      setIsOpen(true);
      liveChatService.current?.openChat();
    }
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
    if (isMinimized) {
      liveChatService.current?.maximizeChat();
    } else {
      liveChatService.current?.minimizeChat();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log('File selected:', file.name);
      setShowFileUpload(false);
    }
  };

  const getStatusColor = () => {
    switch (chatStatus) {
      case 'online':
        return 'bg-green-400';
      case 'away':
        return 'bg-yellow-400';
      case 'offline':
        return 'bg-red-400';
      default:
        return 'bg-gray-400';
    }
  };

  const getStatusText = () => {
    switch (chatStatus) {
      case 'online':
        return 'Online';
      case 'away':
        return 'Away';
      case 'offline':
        return 'Offline';
      default:
        return 'Unknown';
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg z-50 flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } ${className}`}
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <MessageCircle className="h-6 w-6 text-white" />
        )}
        
        {/* Status Indicator */}
        {!isOpen && (
          <div className={`absolute -top-1 -right-1 w-4 h-4 ${getStatusColor()} rounded-full border-2 border-white`}></div>
        )}

        {/* Unread Count */}
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatContainerRef}
          className={`fixed bottom-24 right-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-40 flex flex-col transition-all duration-300 ${
            isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
          } max-w-[calc(100vw-3rem)]`}
        >
          {/* Chat Header */}
          <div 
            className="p-4 rounded-t-lg flex items-center justify-between cursor-pointer bg-gradient-to-r from-blue-600 to-purple-600"
            onClick={handleMinimize}
          >
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                {agentInfo?.avatar ? (
                  <img src={agentInfo.avatar} alt={agentInfo.name} className="w-8 h-8 rounded-full" />
                ) : (
                  <MessageCircle className="h-5 w-5 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-semibold text-white">
                  {agentInfo ? agentInfo.name : 'Socyads Support'}
                </h3>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 ${getStatusColor()} rounded-full`}></div>
                  <span className="text-xs text-white opacity-90">{getStatusText()}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {!isMinimized && (
                <>
                  <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
                    <Phone className="h-4 w-4 text-white" />
                  </button>
                  <button className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors">
                    <Video className="h-4 w-4 text-white" />
                  </button>
                </>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleChat();
                }}
                className="p-1 hover:bg-white hover:bg-opacity-20 rounded transition-colors"
              >
                <X className="h-4 w-4 text-white" />
              </button>
            </div>
          </div>

          {/* Chat Content - Hidden when minimized */}
          {!isMinimized && (
            <>
              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                  <div className="text-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="text-gray-600 mt-2">Connecting to support...</p>
                  </div>
                ) : chatStatus === 'offline' ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <MessageCircle className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Support is currently offline</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Our team is not available right now. Please leave a message and we'll get back to you soon.
                    </p>
                    <button 
                      onClick={() => liveChatService.current?.openChat()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Leave a Message
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Welcome Message */}
                    <div className="flex justify-start">
                      <div className="max-w-[75%] p-3 bg-gray-100 text-gray-800 rounded-lg rounded-bl-none">
                        <p className="text-sm">
                          👋 Hi! I'm here to help you with any questions about Socyads. 
                          How can I assist you today?
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date().toLocaleTimeString()}
                        </p>
                      </div>
                    </div>

                    {/* Typing Indicator */}
                    {typingIndicator && (
                      <div className="flex justify-start">
                        <div className="max-w-[75%] p-3 bg-gray-100 text-gray-800 rounded-lg rounded-bl-none">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t border-gray-200">
                {/* File Upload Preview */}
                {showFileUpload && (
                  <div className="mb-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <span className="text-sm text-gray-700">Ready to upload file</span>
                      </div>
                      <button 
                        onClick={() => setShowFileUpload(false)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex space-x-2">
                  {/* File Upload Button */}
                  <button
                    onClick={() => setShowFileUpload(!showFileUpload)}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    title="Attach file"
                  >
                    <Paperclip className="h-4 w-4" />
                  </button>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    id="file-upload"
                    className="hidden"
                    onChange={handleFileUpload}
                    accept="image/*,.pdf,.doc,.docx,.txt"
                  />

                  {/* Emoji Button */}
                  <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                    <Smile className="h-4 w-4" />
                  </button>

                  {/* Message Input */}
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        // Handle send message
                        onMessageSent?.('Message sent');
                      }
                    }}
                  />

                  {/* Send Button */}
                  <button
                    onClick={() => onMessageSent?.('Message sent')}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {/* Chat Footer */}
                <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
                  <span>Powered by LiveChat</span>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 ${getStatusColor()} rounded-full`}></div>
                    <span>{getStatusText()}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default LiveChatWidget;
