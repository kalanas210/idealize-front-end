import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  DollarSign,
  ShoppingCart,
  Star,
  TrendingUp,
  Users,
  Eye,
  MessageCircle,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  Plus,
  Edit,
  MoreHorizontal,
  Download,
  BarChart3,
  Settings,
  Bell,
  Target,
  Award,
  Zap,
  Heart,
  Share2,
  FileText,
  CreditCard,
  Package,
  Activity,
  Search
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
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { useAuth } from '@clerk/clerk-react';
import { useEffect } from 'react';

// Add interfaces for fetched data
interface Order {
  id: string;
  gigId?: string;
  gigTitle?: string;
  buyer?: string;
  buyerAvatar?: string;
  package?: string;
  price?: number;
  status?: string;
  orderDate?: string;
  deliveryDate?: string;
  progress?: number;
  requirements?: string;
  platform?: string;
  createdAt?: string;
}

interface Gig {
  id: string;
  title: string;
  image?: string;
  price?: number;
  orders?: number;
  rating?: number;
  reviews?: number;
  views?: number;
  clicks?: number;
  impressions?: number;
  conversionRate?: string;
  status?: string;
  platform?: string;
}

interface ReviewsStats {
  averageRating?: number;
  totalReviews?: number;
  ratingDistribution?: Record<string, number>;
}

const SellerDashboard = () => {
  const { getToken } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30');
  const [profile, setProfile] = useState(null);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviewsStats, setReviewsStats] = useState<ReviewsStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSellerData = async () => {
      setLoading(true);
      setError('');
      try {
        const token = await getToken();
        // 1. Get profile
        const profileRes = await fetch('/api/users/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const profileData = await profileRes.json();
        setProfile(profileData.data);
        // 2. Get gigs
        const gigsRes = await fetch('/api/gigs?type=selling', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const gigsData = await gigsRes.json();
        setGigs(gigsData.data || []);
        // 3. Get orders
        const ordersRes = await fetch('/api/orders?type=selling', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const ordersData = await ordersRes.json();
        setOrders(ordersData.data || []);
        // 4. Get reviews stats
        if (profileData.data?.id) {
          const reviewsRes = await fetch(`/api/reviews/seller/${profileData.data.id}/stats`);
          const reviewsData = await reviewsRes.json();
          setReviewsStats(reviewsData.data);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load dashboard data.');
        setLoading(false);
      }
    };
    fetchSellerData();
  }, [getToken]);

  // Calculate earnings from completed orders
  const totalEarnings = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + (o.price || 0), 0);
  const monthlyEarnings = orders.filter(o => o.status === 'completed' && o.createdAt && new Date(o.createdAt).getMonth() === new Date().getMonth()).reduce((sum, o) => sum + (o.price || 0), 0);
  const activeOrders = orders.filter(o => o.status === 'in_progress').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const avgRating = reviewsStats?.averageRating || 0;
  const totalReviews = reviewsStats?.totalReviews || 0;

  const stats = {
    totalEarnings: totalEarnings,
    monthlyEarnings: monthlyEarnings,
    activeOrders: activeOrders,
    completedOrders: completedOrders,
    avgRating: avgRating,
    totalReviews: totalReviews,
    responseTime: '1 hour',
    completionRate: '98%',
    repeatClients: '45%',
    totalViews: '2.5M'
  };

  const ordersData = orders; // Use the state variable directly

  const gigsData = gigs; // Use the state variable directly

  const recentActivity = [
    {
      id: 1,
      type: 'new_order',
      message: 'New order received from Sarah Johnson',
      time: '2 hours ago',
      icon: ShoppingCart,
      color: 'text-green-600'
    },
    {
      id: 2,
      type: 'review_received',
      message: 'New 5-star review from David Chen',
      time: '4 hours ago',
      icon: Star,
      color: 'text-yellow-600'
    },
    {
      id: 3,
      type: 'message_received',
      message: 'New message from Emma Wilson',
      time: '6 hours ago',
      icon: MessageCircle,
      color: 'text-blue-600'
    },
    {
      id: 4,
      type: 'order_completed',
      message: 'Order ORD-004 marked as completed',
      time: '1 day ago',
      icon: CheckCircle,
      color: 'text-purple-600'
    }
  ];

  // Add type for statusColors and statusIcons
  const statusColors: { [key: string]: string } = {
    'completed': 'bg-green-100 text-green-800',
    'in-progress': 'bg-blue-100 text-blue-800',
    'revision': 'bg-orange-100 text-orange-800',
    'pending': 'bg-yellow-100 text-yellow-800',
    'cancelled': 'bg-red-100 text-red-800'
  };

  const statusIcons: { [key: string]: any } = {
    'completed': CheckCircle,
    'in-progress': Clock,
    'revision': RefreshCw,
    'pending': AlertCircle,
    'cancelled': XCircle
  };

  const filteredOrders = ordersData.filter(order => {
    const matchesSearch = (order.gigTitle ?? '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (order.buyer ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Sample data for charts and transactions
  const earningsData = [
    { month: 'Jan', earnings: 1200 },
    { month: 'Feb', earnings: 2100 },
    { month: 'Mar', earnings: 800 },
    { month: 'Apr', earnings: 1600 },
    { month: 'May', earnings: 2400 },
    { month: 'Jun', earnings: 2000 },
  ];
  const transactions = [
    { id: 'TXN-001', date: '2024-05-01', amount: 500, status: 'Completed', type: 'Withdrawal' },
    { id: 'TXN-002', date: '2024-05-03', amount: 1200, status: 'Pending', type: 'Earnings' },
    { id: 'TXN-003', date: '2024-05-05', amount: 800, status: 'Completed', type: 'Earnings' },
    { id: 'TXN-004', date: '2024-05-07', amount: 300, status: 'Completed', type: 'Withdrawal' },
  ];

  // Add mock data for analytics
  const orderStatusData = [
    { status: 'Completed', count: 24 },
    { status: 'In Progress', count: 8 },
    { status: 'Pending', count: 5 },
    { status: 'Cancelled', count: 2 },
  ];
  const platformData = [
    { platform: 'YouTube', value: 12 },
    { platform: 'Instagram', value: 8 },
    { platform: 'TikTok', value: 6 },
    { platform: 'Other', value: 3 },
  ];
  const COLORS = ['#6366f1', '#10b981', '#f59e42', '#f43f5e'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Seller Dashboard Nav Bar/Header */}
      <div className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-40 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center group flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Socyads Logo" 
                className="h-8 w-auto object-contain transform group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-4 md:mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search your gigs, orders..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all duration-200 text-slate-900 placeholder-slate-500"
                />
              </div>
            </div>
            {/* Actions */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <button className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  5
                </span>
              </button>
              <Link
                to="/create-gig"
                className="px-4 py-2 rounded-lg bg-black text-white text-sm font-semibold hover:bg-gray-900 transition-all duration-200 shadow flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Gig</span>
              </Link>
              <Link
                to="/messages"
                className="p-2 rounded-full text-gray-600 hover:text-black hover:bg-gray-100 transition-colors duration-200 border border-transparent focus:outline-none focus:ring-2 focus:ring-black"
                title="Messages"
              >
                <MessageCircle className="h-5 w-5" />
              </Link>
              <button className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-slate-900">
                <Settings className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8 items-center">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'orders', label: 'Active Orders', icon: ShoppingCart },
              { id: 'gigs', label: 'My Gigs', icon: Package },
              { id: 'earnings', label: 'Earnings', icon: DollarSign },
              { id: 'analytics', label: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-600 hover:text-black hover:border-black'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalEarnings.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  <span className="text-green-600">+15% from last month</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <ShoppingCart className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">2 due this week</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgRating}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">{stats.totalReviews} reviews</span>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Response Time</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Clock className="h-6 w-6 text-purple-600" />
                  </div>
                </div>
                <div className="mt-4 flex items-center text-sm">
                  <span className="text-gray-600">Excellent response rate</span>
                </div>
              </div>
            </div>
            {/* Earnings Chart */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Earnings Trend (Last 6 Months)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  {/* @ts-expect-error */}
                  <XAxis dataKey="month" />
                  {/* @ts-expect-error */}
                  <YAxis />
                  <Tooltip />
                  {/* @ts-expect-error */}
                  <Legend />
                  {/* @ts-expect-error */}
                  <Line type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
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

              {/* Performance Overview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Completion Rate</span>
                    <span className="font-semibold text-gray-900">{stats.completionRate}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Repeat Clients</span>
                    <span className="font-semibold text-gray-900">{stats.repeatClients}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Total Profile Views</span>
                    <span className="font-semibold text-gray-900">{stats.totalViews}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Orders Completed</span>
                    <span className="font-semibold text-gray-900">{stats.completedOrders}</span>
                  </div>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-green-50 rounded-lg">
                    <div className="text-lg font-bold text-green-600">${stats.monthlyEarnings}</div>
                    <div className="text-xs text-green-800">This Month</div>
                  </div>
                  <div className="text-center p-3 bg-blue-50 rounded-lg">
                    <div className="text-lg font-bold text-blue-600">{stats.avgRating}</div>
                    <div className="text-xs text-blue-800">Avg Rating</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  to="/create-gig"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center group"
                >
                  <Plus className="h-8 w-8 text-blue-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-sm font-medium text-gray-900">Create New Gig</p>
                </Link>
                <Link
                  to="/messages"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center group"
                >
                  <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-sm font-medium text-gray-900">Messages</p>
                </Link>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center group">
                  <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-sm font-medium text-gray-900">View Analytics</p>
                </button>
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-center group">
                  <Settings className="h-8 w-8 text-gray-600 mx-auto mb-2 group-hover:scale-110 transition-transform duration-200" />
                  <p className="text-sm font-medium text-gray-900">Settings</p>
                </button>
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
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search orders..."
                      className="pl-4 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                const StatusIcon = statusIcons[order.status ?? 'pending'];
                return (
                  <div key={order.id} className="bg-white rounded-xl border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={order.buyerAvatar ?? ''}
                          alt={order.buyer ?? ''}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.gigTitle ?? ''}</h3>
                          <p className="text-sm text-gray-600 mb-2">by {order.buyer ?? ''}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <span>Order #{order.id}</span>
                            <span>•</span>
                            <span>{order.package ?? ''}</span>
                            <span>•</span>
                            <span>{order.platform ?? ''}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status ?? 'pending']}`}>
                          <StatusIcon className="h-3 w-3" />
                          <span className="capitalize">{(order.status ?? 'pending').replace('-', ' ')}</span>
                        </div>
                        <p className="text-lg font-bold text-gray-900 mt-2">${order.price ?? 0}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-600">Order Date</p>
                        <p className="font-medium text-gray-900">{order.orderDate ?? ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Delivery Date</p>
                        <p className="font-medium text-gray-900">{order.deliveryDate ?? ''}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Progress</p>
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${order.progress ?? 0}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{order.progress ?? 0}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-gray-600 mb-2">Requirements</p>
                      <p className="text-sm text-gray-900 bg-gray-50 p-3 rounded-lg">{order.requirements ?? ''}</p>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Due in:</span>
                        <span className="text-sm font-medium text-gray-900">3 days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="px-4 py-2 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                          <MessageCircle className="h-4 w-4 mr-2 inline" />
                          Message
                        </button>
                        <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          <FileText className="h-4 w-4 mr-2 inline" />
                          Deliver Work
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
                    : 'You don\'t have any active orders yet.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Gigs Tab */}
        {activeTab === 'gigs' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">My Gigs</h3>
              <Link
                to="/create-gig"
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create New Gig</span>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gigsData.map((gig) => (
                <div key={gig.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200">
                  <div className="aspect-video relative">
                    <img
                      src={gig.image ?? ''}
                      alt={gig.title}
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${
                      gig.status === 'active' ? 'bg-green-100 text-green-800' :
                      gig.status === 'paused' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {gig.status ?? ''}
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">{gig.title}</h4>
                    
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <span className="text-gray-600">Price:</span>
                        <span className="font-semibold text-gray-900 ml-1">${gig.price ?? 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Orders:</span>
                        <span className="font-semibold text-gray-900 ml-1">{gig.orders ?? 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Rating:</span>
                        <span className="font-semibold text-gray-900 ml-1">{gig.rating ?? 0}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Views:</span>
                        <span className="font-semibold text-gray-900 ml-1">{gig.views?.toLocaleString() ?? '0'}</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">Conversion Rate</span>
                        <span className="font-medium text-gray-900">{gig.conversionRate ?? '0%'}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: gig.conversionRate ?? '0%' }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors duration-200">
                        <Edit className="h-4 w-4 mr-1 inline" />
                        Edit
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Earnings Tab */}
        {activeTab === 'earnings' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
              {/* Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-6 bg-green-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">${stats.totalEarnings.toLocaleString()}</div>
                  <div className="text-sm text-green-800">Total Earnings</div>
                </div>
                <div className="text-center p-6 bg-blue-50 rounded-xl">
                  <div className="text-3xl font-bold text-blue-600 mb-2">${stats.monthlyEarnings.toLocaleString()}</div>
                  <div className="text-sm text-blue-800">This Month</div>
                </div>
                <div className="text-center p-6 bg-purple-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">${Math.round(stats.totalEarnings / (stats.completedOrders || 1))}</div>
                  <div className="text-sm text-purple-800">Avg per Order</div>
                </div>
              </div>
              {/* Earnings Chart */}
              <div className="mb-8">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={earningsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    {/* @ts-expect-error */}
                    <XAxis dataKey="month" />
                    {/* @ts-expect-error */}
                    <YAxis />
                    <Tooltip />
                    {/* @ts-expect-error */}
                    <Legend />
                    {/* @ts-expect-error */}
                    <Line type="monotone" dataKey="earnings" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              {/* Transactions Table */}
              <div className="overflow-x-auto">
                <h4 className="text-md font-semibold text-gray-900 mb-2">Recent Transactions</h4>
                <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transactions.map((txn) => (
                      <tr key={txn.id} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-sm text-gray-900">{txn.id}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{txn.date}</td>
                        <td className="px-4 py-2 text-sm text-gray-600">{txn.type}</td>
                        <td className="px-4 py-2 text-sm text-gray-900 font-semibold">${txn.amount}</td>
                        <td className="px-4 py-2 text-sm">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            txn.status === 'Completed' ? 'bg-green-100 text-green-800' :
                            txn.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {txn.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Performance Analytics</h3>
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
              {/* Analytics Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600 mb-2">45.6K</div>
                  <div className="text-sm text-blue-800">Profile Views</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600 mb-2">1.2K</div>
                  <div className="text-sm text-green-800">Gig Clicks</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600 mb-2">2.1%</div>
                  <div className="text-sm text-purple-800">Conversion Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600 mb-2">4.9</div>
                  <div className="text-sm text-orange-800">Avg Rating</div>
                </div>
              </div>
              {/* Analytics Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Order Status Bar Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Order Status Breakdown</h4>
                  <ResponsiveContainer width="100%" height={220}>
                    <BarChart data={orderStatusData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      {/* @ts-expect-error */}
                      <XAxis dataKey="status" />
                      {/* @ts-expect-error */}
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      {/* @ts-expect-error */}
                      <Bar dataKey="count" fill="#6366f1" radius={[6, 6, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                {/* Platform Pie Chart */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-md font-semibold text-gray-900 mb-2">Gig Platform Distribution</h4>
                  <ResponsiveContainer width="100%" height={220}>
                    <PieChart>
                      {/* @ts-expect-error */}
                      <Pie
                        data={platformData}
                        dataKey="value"
                        nameKey="platform"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label
                      >
                        {platformData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      {/* @ts-expect-error */}
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;