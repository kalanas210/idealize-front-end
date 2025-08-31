import React, { useState } from 'react';
import { MessageCircle, Users, Settings, BarChart3, FileText, Phone, Video, Download, Upload, Smile } from 'lucide-react';
import LiveChatWidget from '../components/common/LiveChatWidget';
import SellerChatDashboard from '../components/common/SellerChatDashboard';
import liveChatConfig from '../config/liveChatConfig';

const LiveChatDemo: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'features' | 'dashboard' | 'config'>('features');
  const [customerInfo, setCustomerInfo] = useState({
    name: 'Demo Customer',
    email: 'demo@example.com',
    avatar: 'https://via.placeholder.com/40'
  });

  const features = [
    {
      icon: <MessageCircle className="h-8 w-8 text-blue-600" />,
      title: 'Real-time Chat',
      description: 'Instant messaging between customers and sellers with typing indicators and read receipts.'
    },
    {
      icon: <Upload className="h-8 w-8 text-green-600" />,
      title: 'File Sharing',
      description: 'Share images, documents, and videos during conversations for better project collaboration.'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: 'Multi-agent Support',
      description: 'Multiple sellers can handle different types of inquiries and projects simultaneously.'
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-orange-600" />,
      title: 'Analytics & Reports',
      description: 'Track chat performance, response times, and customer satisfaction metrics.'
    },
    {
      icon: <Settings className="h-8 w-8 text-gray-600" />,
      title: 'Customizable Widget',
      description: 'Brand the chat widget with your colors, logo, and messaging preferences.'
    },
    {
      icon: <Phone className="h-8 w-8 text-red-600" />,
      title: 'Offline Messaging',
      description: 'Customers can leave messages when agents are offline for 24/7 support.'
    }
  ];

  const handleChatStart = (chatId: string) => {
    console.log('Demo: Chat started with ID:', chatId);
  };

  const handleChatEnd = (chatId: string) => {
    console.log('Demo: Chat ended with ID:', chatId);
  };

  const handleMessageSent = (message: string) => {
    console.log('Demo: Message sent:', message);
  };

  const handleAgentJoin = (agent: any) => {
    console.log('Demo: Agent joined:', agent);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <MessageCircle className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">LiveChat Integration Demo</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Powered by <a href="https://www.livechat.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">LiveChat</a>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('features')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'features'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Features Overview
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Seller Dashboard
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'config'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Configuration
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'features' && (
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Professional Customer Support for Your SocyAds Platform
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Transform customer interactions with real-time chat, file sharing, and intelligent routing. 
                Boost sales and customer satisfaction with LiveChat integration.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                  <div className="flex items-center space-x-3 mb-4">
                    {feature.icon}
                    <h3 className="text-lg font-semibold text-gray-900">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>

            {/* Demo Chat Widget */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Try the Chat Widget</h3>
              <p className="text-gray-600 mb-4">
                Click the chat button in the bottom-right corner to experience the LiveChat widget. 
                This demo shows the customer-facing interface.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">
                  <strong>Note:</strong> This is a demonstration. In production, you would need a valid LiveChat license key.
                </p>
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose LiveChat?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Increase Sales</h4>
                  <p className="text-gray-600">25% average increase in order value after implementing LiveChat</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Better Support</h4>
                  <p className="text-gray-600">30% increase in customer conversion with improved support</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">Easy Integration</h4>
                  <p className="text-gray-600">200+ integrations and seamless setup with your existing platform</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Seller Chat Dashboard</h2>
              <p className="text-xl text-gray-600">
                Professional interface for sellers to manage customer conversations, set priorities, and provide excellent support.
              </p>
            </div>
            
            {/* Dashboard Preview */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Dashboard Preview</h3>
                <p className="text-sm text-gray-600">This shows how sellers will manage customer chats</p>
              </div>
              <div className="h-[600px]">
                <SellerChatDashboard />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'config' && (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Configuration & Setup</h2>
              <p className="text-xl text-gray-600">
                Learn how to configure LiveChat for your specific needs and brand requirements.
              </p>
            </div>

            {/* Configuration Options */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Environment Variables</h3>
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>
{`# LiveChat Configuration
VITE_LIVECHAT_LICENSE=your_license_key
VITE_LIVECHAT_GROUP=0
VITE_LIVECHAT_THEME_PRIMARY=#2563eb
VITE_LIVECHAT_THEME_SECONDARY=#1e40af
VITE_LIVECHAT_THEME_TEXT=#ffffff`}
                  </pre>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Theme Configuration</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                    <input
                      type="color"
                      value={liveChatConfig.theme.primaryColor}
                      readOnly
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                    <input
                      type="color"
                      value={liveChatConfig.theme.secondaryColor}
                      readOnly
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Setup Steps */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Setup Steps</h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-700">
                <li>Sign up for a LiveChat account at <a href="https://www.livechat.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">livechat.com</a></li>
                <li>Get your license key from the LiveChat dashboard</li>
                <li>Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file with your license key</li>
                <li>Customize the theme colors and settings</li>
                <li>Test the integration with demo data</li>
                <li>Train your team on using the seller dashboard</li>
              </ol>
            </div>

            {/* Documentation Links */}
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">📚 Documentation & Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="LIVECHAT_INTEGRATION.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  <FileText className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Integration Guide</h4>
                    <p className="text-sm text-blue-700">Complete setup and configuration instructions</p>
                  </div>
                </a>
                <a
                  href="https://www.livechat.com/help/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-blue-200 hover:border-blue-300 transition-colors"
                >
                  <MessageCircle className="h-6 w-6 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">LiveChat Help</h4>
                    <p className="text-sm text-blue-700">Official LiveChat documentation and support</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* LiveChat Widget - Only show if license is configured */}
      {liveChatConfig.license && liveChatConfig.license !== 'demo_license_key' && (
        <LiveChatWidget
          license={liveChatConfig.license}
          group={liveChatConfig.group}
          customer={customerInfo}
          theme={liveChatConfig.theme}
          onChatStart={handleChatStart}
          onChatEnd={handleChatEnd}
          onMessageSent={handleMessageSent}
          onAgentJoin={handleAgentJoin}
        />
      )}
    </div>
  );
};

export default LiveChatDemo;
