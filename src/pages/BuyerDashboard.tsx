import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  MessageCircle, 
  Eye, 
  Download,
  MoreHorizontal,
  TrendingUp,
  Users,
  DollarSign,
  ShoppingCart,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Heart,
  Share2,
  FileText,
  CreditCard,
  Bell,
  Settings,
  BarChart3,
  Target,
  Zap,
  Activity,
  TrendingDown,
  Plus,
  Minus,
  Receipt,
  Wallet,
  Shield,
  Lock,
  Unlock,
  ArrowUpRight,
  ArrowDownRight,
  Circle,
  Square,
  Triangle,
  MessageSquare
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts';

const BuyerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [billingFilter, setBillingFilter] = useState('all');
  const [analyticsView, setAnalyticsView] = useState('overview');
  const [savedFilter, setSavedFilter] = useState('all'); // 'all', 'influencers', 'gigs'

  // Mock data
  const stats = {
    totalSpent: 2450,
    activeOrders: 3,
    completedOrders: 12,
    savedInfluencers: 8,
    avgRating: 4.8,
    totalReach: '2.5M',
    engagementRate: '5.2%',
    roi: '320%'
  };

  const orders = [
    {
      id: 'ORD-001',
      gigTitle: 'YouTube tech review for smartphone',
      seller: 'TechGuru Mike',
      sellerAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      package: 'Standard Review',
      price: 499,
      status: 'completed',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-20',
      rating: 5,
      platform: 'YouTube',
      views: '125K',
      engagement: '4.2%',
      deliverables: ['Video Review', 'Analytics Report', 'Social Media Posts']
    },
    {
      id: 'ORD-002',
      gigTitle: 'Instagram story promotion for fitness brand',
      seller: 'FitLifeAna',
      sellerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      package: 'Premium Package',
      price: 299,
      status: 'in-progress',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-22',
      rating: null,
      platform: 'Instagram',
      views: 'Pending',
      engagement: 'Pending',
      deliverables: ['Story Posts', 'Highlight Feature', 'Analytics']
    },
    {
      id: 'ORD-003',
      gigTitle: 'TikTok viral dance with product placement',
      seller: 'DanceQueenSarah',
      sellerAvatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
      package: 'Basic Package',
      price: 199,
      status: 'revision',
      orderDate: '2024-01-20',
      deliveryDate: '2024-01-25',
      rating: null,
      platform: 'TikTok',
      views: 'In Review',
      engagement: 'In Review',
      deliverables: ['Dance Video', 'Product Integration']
    },
    {
      id: 'ORD-004',
      gigTitle: 'Facebook business page promotion',
      seller: 'BusinessBob',
      sellerAvatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      package: 'Standard Package',
      price: 179,
      status: 'pending',
      orderDate: '2024-01-22',
      deliveryDate: '2024-01-27',
      rating: null,
      platform: 'Facebook',
      views: 'Not Started',
      engagement: 'Not Started',
      deliverables: ['Page Posts', 'Live Stream Mention']
    }
  ];

  const savedInfluencers = [
    {
      id: 1,
      name: 'TechGuru Mike',
      username: '@techguruofficial',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      platform: 'YouTube',
      followers: '250K',
      rating: 4.9,
      startingPrice: 299,
      lastActive: '2 hours ago'
    },
    {
      id: 2,
      name: 'FitLifeAna',
      username: '@fitlifeana',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      platform: 'Instagram',
      followers: '180K',
      rating: 4.8,
      startingPrice: 149,
      lastActive: '1 day ago'
    }
  ];

  const savedGigs = [
    {
      id: 1,
      title: 'I will create professional tech review videos',
      seller: 'TechGuru Mike',
      sellerAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      platform: 'YouTube',
      price: 299,
      rating: 4.9,
      reviews: 127,
      orders: 234,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'I will create engaging Instagram story content',
      seller: 'FitLifeAna',
      sellerAvatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      platform: 'Instagram',
      price: 149,
      rating: 4.8,
      reviews: 89,
      orders: 156,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'I will create viral TikTok dance videos',
      seller: 'DanceQueenSarah',
      sellerAvatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
      platform: 'TikTok',
      price: 199,
      rating: 4.7,
      reviews: 203,
      orders: 445,
      image: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: 'order_completed',
      message: 'Order ORD-001 has been completed by TechGuru Mike',
      time: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'message_received',
      message: 'New message from FitLifeAna about your order',
      time: '4 hours ago',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      id: 3,
      type: 'revision_requested',
      message: 'Revision requested for order ORD-003',
      time: '1 day ago',
      icon: RefreshCw,
      color: 'text-orange-600'
    },
    {
      id: 4,
      type: 'order_placed',
      message: 'New order ORD-004 placed successfully',
      time: '2 days ago',
      icon: ShoppingCart,
      color: 'text-purple-600'
    }
  ];

  const statusColors = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'revision': 'bg-orange-100 text-orange-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const statusIcons = {
    'completed': CheckCircle,
    'in-progress': Clock,
    'revision': RefreshCw,
    'pending': AlertCircle,
    'cancelled': XCircle
  };

  // Billing data
  const billingData = [
    {
      id: 'TXN-001',
      amount: 499,
      status: 'completed',
      date: '2024-01-15',
      description: 'YouTube tech review for smartphone',
      seller: 'TechGuru Mike',
      paymentMethod: 'Credit Card',
      transactionId: 'txn_123456789',
      type: 'payment'
    },
    {
      id: 'TXN-002',
      amount: 299,
      status: 'pending',
      date: '2024-01-18',
      description: 'Instagram story promotion for fitness brand',
      seller: 'FitLifeAna',
      paymentMethod: 'Credit Card',
      transactionId: 'txn_987654321',
      type: 'payment'
    },
    {
      id: 'TXN-003',
      amount: 199,
      status: 'completed',
      date: '2024-01-20',
      description: 'TikTok viral dance with product placement',
      seller: 'DanceQueenSarah',
      paymentMethod: 'PayPal',
      transactionId: 'txn_456789123',
      type: 'payment'
    },
    {
      id: 'TXN-004',
      amount: 179,
      status: 'refunded',
      date: '2024-01-22',
      description: 'Facebook business page promotion',
      seller: 'BusinessBob',
      paymentMethod: 'Credit Card',
      transactionId: 'txn_789123456',
      type: 'refund'
    }
  ];

  // Analytics data
  const analyticsData = {
    performanceData: [
      { date: '2024-01-15', orders: 2, spent: 798, impressions: 125000, engagementRate: 4.2 },
      { date: '2024-01-18', orders: 1, spent: 299, impressions: 85000, engagementRate: 5.1 },
      { date: '2024-01-20', orders: 1, spent: 199, impressions: 95000, engagementRate: 3.8 },
      { date: '2024-01-22', orders: 1, spent: 179, impressions: 75000, engagementRate: 4.5 },
      { date: '2024-01-25', orders: 2, spent: 450, impressions: 110000, engagementRate: 4.8 },
      { date: '2024-01-28', orders: 1, spent: 299, impressions: 90000, engagementRate: 5.2 }
    ],
    platformData: [
      { platform: 'YouTube', orders: 2, spent: 798, impressions: 125000 },
      { platform: 'Instagram', orders: 1, spent: 299, impressions: 85000 },
      { platform: 'TikTok', orders: 1, spent: 199, impressions: 95000 },
      { platform: 'Facebook', orders: 1, spent: 179, impressions: 75000 }
    ],
    statusData: [
      { status: 'completed', count: 12, color: '#10b981' },
      { status: 'in_progress', count: 3, color: '#3b82f6' },
      { status: 'pending', count: 1, color: '#f59e0b' },
      { status: 'cancelled', count: 0, color: '#ef4444' }
    ],
    spendingTrend: [
      { month: 'Jan', spent: 2450, orders: 8 },
      { month: 'Feb', spent: 3200, orders: 12 },
      { month: 'Mar', spent: 2800, orders: 10 },
      { month: 'Apr', spent: 4100, orders: 15 },
      { month: 'May', spent: 3600, orders: 13 },
      { month: 'Jun', spent: 5200, orders: 18 }
    ]
  };

  // Payment methods
  const paymentMethods = [
    {
      id: 1,
      type: 'credit_card',
      name: 'Visa ending in 4242',
      last4: '4242',
      brand: 'visa',
      isDefault: true,
      expiryMonth: 12,
      expiryYear: 2025
    },
    {
      id: 2,
      type: 'paypal',
      name: 'PayPal Account',
      email: 'user@example.com',
      isDefault: false
    }
  ];

  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.gigTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Navigation Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Title and Navigation */}
            <div className="flex items-center space-x-8">
              <div className="bg-gray-50 px-4 py-2 rounded-lg">
                <h1 className="text-xl font-bold text-gray-900">Buyer Dashboard</h1>
              </div>
              
              {/* Navigation Tabs */}
              <nav className="flex space-x-6">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'orders', label: 'My Orders', icon: ShoppingCart },
                  { id: 'saved', label: 'Saved', icon: Heart },
                  { id: 'analytics', label: 'Analytics', icon: TrendingUp },
                  { id: 'billing', label: 'Billing', icon: CreditCard }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center space-x-2 py-2 px-3 rounded-lg font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Right side - Actions */}
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <MessageSquare className="h-6 w-6" />
              </button>
              <button className="p-2 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Spent</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+12% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-orange-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">2 in progress, 1 pending</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Star className="h-4 w-4 text-yellow-400 mr-1 fill-current" />
                  <span className="text-gray-600">{stats.avgRating} avg rating</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Reach</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalReach}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <Target className="h-4 w-4 text-purple-500 mr-1" />
                  <span className="text-gray-600">{stats.engagementRate} engagement</span>
                </div>
              </div>
            </div>

            {/* Recent Activity & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Activity */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-gray-100`}>
                          <Icon className={`h-4 w-4 ${activity.color}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.message}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <button className="mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all activity
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Link
                    to="/explore"
                    className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center"
                  >
                    <Search className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Find Influencers</p>
                  </Link>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
                    <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Messages</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
                    <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Analytics</p>
                  </button>
                  <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center">
                    <Settings className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">Settings</p>
                  </button>
                </div>
              </div>
            </div>

            {/* Performance Overview */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Campaign Performance</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">{stats.roi}</div>
                  <div className="text-sm text-blue-800">Return on Investment</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">{stats.totalReach}</div>
                  <div className="text-sm text-green-800">Total Reach</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">{stats.engagementRate}</div>
                  <div className="text-sm text-purple-800">Avg Engagement Rate</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search orders..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="revision">Revision</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600">
                    {filteredOrders.length} orders found
                  </span>
                </div>
              </div>
            </div>

            {/* Orders List */}
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const StatusIcon = statusIcons[order.status as keyof typeof statusIcons] || AlertCircle;
                return (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={order.sellerAvatar}
                          alt={order.seller}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.gigTitle}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {order.seller}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Order #{order.id}</span>
                            <span>•</span>
                            <span>{order.package}</span>
                            <span>•</span>
                            <span>{order.platform}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status as keyof typeof statusColors] || 'bg-gray-100 text-gray-800'}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{order.status.replace('-', ' ')}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-2">${order.price}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium text-gray-900">{order.orderDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Date</p>
                        <p className="font-medium text-gray-900">{order.deliveryDate}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Performance</p>
                        <p className="font-medium text-gray-900">{order.views} views • {order.engagement} engagement</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Deliverables</p>
                      <div className="flex flex-wrap gap-2">
                        {order.deliverables.map((deliverable, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {deliverable}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        {order.rating && (
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-900">{order.rating}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <MessageCircle className="h-4 w-4 mr-2 inline" />
                          Message
                        </button>
                        <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <Eye className="h-4 w-4 mr-2 inline" />
                          View Details
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredOrders.length === 0 && (
              <div className="text-center py-12">
                <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-4">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'You haven\'t placed any orders yet.'}
                </p>
                <Link
                  to="/explore"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <Search className="h-4 w-4 mr-2" />
                  Browse Gigs
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Saved Tab */}
        {activeTab === 'saved' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Saved Items</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={savedFilter}
                    onChange={(e) => setSavedFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Saved</option>
                    <option value="influencers">Influencers</option>
                    <option value="gigs">Gigs</option>
                  </select>
                  <span className="text-sm text-gray-600">
                    {savedFilter === 'all' && `${savedInfluencers.length + savedGigs.length} total`}
                    {savedFilter === 'influencers' && `${savedInfluencers.length} influencers`}
                    {savedFilter === 'gigs' && `${savedGigs.length} gigs`}
                  </span>
                </div>
              </div>

              {/* Side-by-side layout for Saved Items */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Side - Saved Influencers */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <Users className="h-6 w-6 mr-2" />
                    Saved Influencers ({savedInfluencers.length})
                  </h4>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {savedInfluencers.map((influencer) => (
                      <div key={`influencer-${influencer.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={influencer.avatar}
                            alt={influencer.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900 text-sm truncate">{influencer.name}</h5>
                            <p className="text-xs text-gray-600 truncate">{influencer.username}</p>
                          </div>
                          <button className="text-red-500 hover:text-red-700">
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Platform</span>
                            <span className="font-medium">{influencer.platform}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Followers</span>
                            <span className="font-medium">{influencer.followers}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Rating</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="font-medium">{influencer.rating}</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Starting at</span>
                            <span className="font-bold text-gray-900">${influencer.startingPrice}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link
                            to={`/influencer/${influencer.id}`}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-center text-xs hover:bg-blue-700 transition-colors duration-200"
                          >
                            View Profile
                          </Link>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition-colors duration-200">
                            <MessageCircle className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {savedInfluencers.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <Users className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No saved influencers</p>
                    </div>
                  )}
                </div>

                {/* Right Side - Saved Gigs */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FileText className="h-6 w-6 mr-2" />
                    Saved Gigs ({savedGigs.length})
                  </h4>
                  
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {savedGigs.map((gig) => (
                      <div key={`gig-${gig.id}`} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <img
                            src={gig.image}
                            alt={gig.title}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="font-semibold text-gray-900 text-sm line-clamp-2">{gig.title}</h5>
                            <p className="text-xs text-gray-600 truncate">{gig.seller}</p>
                          </div>
                          <button className="text-red-500 hover:text-red-700">
                            <Heart className="h-4 w-4 fill-current" />
                          </button>
                        </div>

                        <div className="space-y-2 mb-3">
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Platform</span>
                            <span className="font-medium">{gig.platform}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Orders</span>
                            <span className="font-medium">{gig.orders}</span>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Rating</span>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 text-yellow-400 fill-current" />
                              <span className="font-medium">{gig.rating}</span>
                              <span className="text-gray-500">({gig.reviews})</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-xs">
                            <span className="text-gray-600">Starting at</span>
                            <span className="font-bold text-gray-900">${gig.price}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Link
                            to={`/gig/${gig.id}`}
                            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-center text-xs hover:bg-blue-700 transition-colors duration-200"
                          >
                            View Gig
                          </Link>
                          <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded text-xs hover:bg-gray-50 transition-colors duration-200">
                            <ShoppingCart className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {savedGigs.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                      <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">No saved gigs</p>
                    </div>
                  )}
                </div>
              </div>


            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Campaign Analytics</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={analyticsView}
                    onChange={(e) => setAnalyticsView(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="overview">Overview</option>
                    <option value="performance">Performance</option>
                    <option value="platforms">Platforms</option>
                    <option value="trends">Trends</option>
                  </select>
                  <select
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="7">Last 7 days</option>
                    <option value="30">Last 30 days</option>
                    <option value="90">Last 90 days</option>
                    <option value="365">Last year</option>
                  </select>
                </div>
              </div>

              {/* Analytics Overview */}
              {analyticsView === 'overview' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 mb-2">2.5M</div>
                      <div className="text-sm text-blue-800">Total Impressions</div>
                      <div className="text-xs text-blue-600 mt-1 flex items-center justify-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +15% vs last period
                      </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 mb-2">125K</div>
                      <div className="text-sm text-green-800">Total Engagements</div>
                      <div className="text-xs text-green-600 mt-1 flex items-center justify-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +8% vs last period
                      </div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600 mb-2">5.2%</div>
                      <div className="text-sm text-purple-800">Avg Engagement Rate</div>
                      <div className="text-xs text-purple-600 mt-1 flex items-center justify-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +0.3% vs last period
                      </div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600 mb-2">320%</div>
                      <div className="text-sm text-orange-800">Return on Investment</div>
                      <div className="text-xs text-orange-600 mt-1 flex items-center justify-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +45% vs last period
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Performance Chart */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Campaign Performance</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={analyticsData.performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="spent" stroke="#6366f1" strokeWidth={2} name="Spent ($)" />
                          <Line type="monotone" dataKey="impressions" stroke="#10b981" strokeWidth={2} name="Impressions" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Platform Distribution */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Platform Distribution</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <RechartsPieChart>
                          <Pie
                            data={analyticsData.platformData}
                            dataKey="spent"
                            nameKey="platform"
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            label
                          >
                            {analyticsData.platformData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* Performance Analytics */}
              {analyticsView === 'performance' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Engagement Rate Trend */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Engagement Rate Trend</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <AreaChart data={analyticsData.performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="engagementRate" stroke="#8b5cf6" fill="#8b5cf6" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Order Status Distribution */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Order Status Distribution</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <BarChart data={analyticsData.statusData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="status" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* Platform Analytics */}
              {analyticsView === 'platforms' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Platform Performance */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Platform Performance</h4>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={analyticsData.platformData} layout="horizontal">
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis type="number" />
                          <YAxis dataKey="platform" type="category" />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="spent" fill="#6366f1" name="Spent ($)" />
                          <Bar dataKey="impressions" fill="#10b981" name="Impressions" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Platform ROI */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Platform ROI Comparison</h4>
                      <div className="space-y-4">
                        {analyticsData.platformData.map((platform, index) => (
                          <div key={platform.platform} className="flex items-center justify-between p-3 bg-white rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className={`w-4 h-4 rounded-full`} style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                              <span className="font-medium text-gray-900">{platform.platform}</span>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">
                                ${((platform.impressions / platform.spent) * 100).toFixed(0)}%
                              </div>
                              <div className="text-xs text-gray-600">ROI</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Trends Analytics */}
              {analyticsView === 'trends' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Spending Trend */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Monthly Spending Trend</h4>
                      <ResponsiveContainer width="100%" height={250}>
                        <LineChart data={analyticsData.spendingTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line type="monotone" dataKey="spent" stroke="#6366f1" strokeWidth={3} name="Spent ($)" />
                          <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Growth Metrics */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h4 className="text-md font-semibold text-gray-900 mb-4">Growth Metrics</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-gray-900">Spending Growth</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-green-600">+28%</div>
                            <div className="text-xs text-gray-600">vs last month</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-gray-900">Reach Growth</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-blue-600">+15%</div>
                            <div className="text-xs text-gray-600">vs last month</div>
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                          <div className="flex items-center space-x-3">
                            <Target className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-gray-900">Engagement Growth</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-semibold text-purple-600">+8%</div>
                            <div className="text-xs text-gray-600">vs last month</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Billing Tab */}
        {activeTab === 'billing' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Billing & Payments</h3>
                <div className="flex items-center space-x-4">
                  <select
                    value={billingFilter}
                    onChange={(e) => setBillingFilter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Transactions</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="refunded">Refunded</option>
                  </select>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2">
                    <Plus className="h-4 w-4" />
                    <span>Add Payment Method</span>
                  </button>
                </div>
              </div>

              {/* Billing Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    ${billingData.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-green-800">Total Spent</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    ${billingData.filter(t => t.status === 'pending').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-blue-800">Pending Payments</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">
                    ${billingData.filter(t => t.status === 'refunded').reduce((sum, t) => sum + t.amount, 0).toLocaleString()}
                  </div>
                  <div className="text-sm text-orange-800">Total Refunds</div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="mb-8">
                <h4 className="text-md font-semibold text-gray-900 mb-4">Payment Methods</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{method.name}</p>
                          <p className="text-sm text-gray-600">
                            {method.type === 'credit_card' ? `•••• ${method.last4}` : method.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {method.isDefault && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Default
                          </span>
                        )}
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transaction History */}
              <div>
                <h4 className="text-md font-semibold text-gray-900 mb-4">Transaction History</h4>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Transaction</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Seller</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {billingData
                        .filter(t => billingFilter === 'all' || t.status === billingFilter)
                        .map((transaction) => (
                        <tr key={transaction.id} className="border-t border-gray-100 hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-900 font-medium">
                            {transaction.id}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {transaction.date}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-900">
                            {transaction.description}
                          </td>
                          <td className="px-4 py-3 text-sm text-gray-600">
                            {transaction.seller}
                          </td>
                          <td className="px-4 py-3 text-sm font-semibold text-gray-900">
                            ${transaction.amount}
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                              transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              transaction.status === 'refunded' ? 'bg-orange-100 text-orange-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <div className="flex items-center space-x-2">
                              <button className="p-1 text-gray-400 hover:text-gray-600" title="View Details">
                                <Eye className="h-4 w-4" />
                              </button>
                              <button className="p-1 text-gray-400 hover:text-gray-600" title="Download Receipt">
                                <Download className="h-4 w-4" />
                              </button>
                              {transaction.status === 'pending' && (
                                <button className="p-1 text-red-400 hover:text-red-600" title="Cancel">
                                  <XCircle className="h-4 w-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Billing Insights */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Spending Insights</h5>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average Order Value</span>
                      <span className="text-sm font-medium text-gray-900">
                        ${(billingData.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.amount, 0) / 
                           billingData.filter(t => t.status === 'completed').length).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Most Used Platform</span>
                      <span className="text-sm font-medium text-gray-900">YouTube</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Payment Success Rate</span>
                      <span className="text-sm font-medium text-green-600">98.5%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h5 className="text-sm font-semibold text-gray-900 mb-3">Security & Compliance</h5>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">PCI DSS Compliant</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Lock className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">256-bit SSL Encryption</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-gray-600">Fraud Protection Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerDashboard;