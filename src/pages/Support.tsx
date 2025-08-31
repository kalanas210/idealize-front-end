import React, { useState } from 'react';
import { 
  Search, 
  MessageCircle, 
  Phone, 
  Mail, 
  Clock, 
  ChevronRight, 
  Star, 
  ThumbsUp, 
  ThumbsDown, 
  BookOpen, 
  HelpCircle, 
  Shield, 
  CreditCard, 
  Users, 
  Settings, 
  Zap, 
  TrendingUp,
  Calendar,
  FileText,
  Video,
  Download,
  ExternalLink,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Lightbulb,
  Target,
  Award,
  Globe,
  Smartphone
} from 'lucide-react';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'getting-started', label: 'Getting Started', icon: Zap },
    { id: 'orders', label: 'Orders & Payments', icon: CreditCard },
    { id: 'account', label: 'Account & Profile', icon: Users },
    { id: 'safety', label: 'Safety & Trust', icon: Shield },
    { id: 'technical', label: 'Technical Issues', icon: Settings }
  ];

  const featuredArticles = [
    {
      id: 1,
      title: 'How to Create Your First Gig on Socyads',
      excerpt: 'A comprehensive guide to setting up your first service and attracting buyers.',
      category: 'Getting Started',
      readTime: '5 min read',
      image: 'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 15420,
      helpful: 234
    },
    {
      id: 2,
      title: 'Best Practices for Influencer Marketing Success',
      excerpt: 'Learn proven strategies to maximize your campaign results and build lasting partnerships.',
      category: 'Tips & Tricks',
      readTime: '8 min read',
      image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 12890,
      helpful: 189
    },
    {
      id: 3,
      title: 'Understanding Socyads Payment System',
      excerpt: 'Everything you need to know about payments, fees, and withdrawals.',
      category: 'Payments',
      readTime: '6 min read',
      image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
      featured: true,
      views: 9876,
      helpful: 156
    }
  ];

  const recentArticles = [
    {
      id: 4,
      title: 'New Features: Enhanced Analytics Dashboard',
      excerpt: 'Discover the latest updates to our analytics tools and how they can help grow your business.',
      category: 'Updates',
      readTime: '4 min read',
      publishDate: '2024-01-20',
      views: 5432,
      helpful: 89
    },
    {
      id: 5,
      title: 'Building Trust with Buyers: Communication Tips',
      excerpt: 'Master the art of professional communication to build lasting client relationships.',
      category: 'Tips & Tricks',
      readTime: '7 min read',
      publishDate: '2024-01-18',
      views: 7654,
      helpful: 123
    },
    {
      id: 6,
      title: 'Platform Safety Guidelines and Best Practices',
      excerpt: 'Stay safe on Socyads with our comprehensive security guidelines.',
      category: 'Safety',
      readTime: '6 min read',
      publishDate: '2024-01-15',
      views: 4321,
      helpful: 67
    },
    {
      id: 7,
      title: 'Optimizing Your Gig for Better Visibility',
      excerpt: 'SEO tips and tricks to make your services more discoverable.',
      category: 'Marketing',
      readTime: '9 min read',
      publishDate: '2024-01-12',
      views: 8765,
      helpful: 145
    },
    {
      id: 8,
      title: 'Managing Multiple Orders Efficiently',
      excerpt: 'Time management strategies for handling multiple client projects.',
      category: 'Productivity',
      readTime: '5 min read',
      publishDate: '2024-01-10',
      views: 6543,
      helpful: 98
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I get started as a seller on Socyads?',
      answer: 'Getting started is easy! First, create your account and complete your profile. Then, create your first gig by describing your service, setting your price, and uploading portfolio samples. Once approved, your gig will be live and ready to receive orders.',
      category: 'getting-started',
      helpful: 156
    },
    {
      id: 2,
      question: 'How does the payment system work?',
      answer: 'Socyads uses a secure escrow system. When a buyer places an order, the payment is held securely until the work is completed and approved. Sellers receive payment within 24 hours of order completion. We charge a 5% service fee on completed transactions.',
      category: 'orders',
      helpful: 234
    },
    {
      id: 3,
      question: 'What should I do if I have a dispute with a buyer?',
      answer: 'If you encounter issues with a buyer, first try to resolve it through direct communication. If that doesn\'t work, you can contact our support team who will mediate the dispute. We have a fair resolution process that protects both buyers and sellers.',
      category: 'safety',
      helpful: 89
    },
    {
      id: 4,
      question: 'How can I improve my gig\'s visibility?',
      answer: 'To improve visibility, use relevant keywords in your title and description, upload high-quality images, maintain good ratings, respond quickly to messages, and stay active on the platform. Our algorithm favors gigs with good performance metrics.',
      category: 'technical',
      helpful: 178
    },
    {
      id: 5,
      question: 'Can I edit my gig after it\'s published?',
      answer: 'Yes, you can edit most aspects of your gig including title, description, pricing, and images. However, if you have active orders, some changes may require approval. Major changes might temporarily pause your gig for review.',
      category: 'account',
      helpful: 123
    }
  ];

  const guides = [
    {
      id: 1,
      title: 'Complete Seller Guide',
      description: 'Everything you need to know about selling on Socyads',
      icon: BookOpen,
      color: 'bg-blue-100 text-blue-600',
      articles: 12
    },
    {
      id: 2,
      title: 'Buyer\'s Handbook',
      description: 'How to find and work with the best influencers',
      icon: Users,
      color: 'bg-green-100 text-green-600',
      articles: 8
    },
    {
      id: 3,
      title: 'Marketing Strategies',
      description: 'Proven tactics to grow your influence and earnings',
      icon: TrendingUp,
      color: 'bg-purple-100 text-purple-600',
      articles: 15
    },
    {
      id: 4,
      title: 'Platform Policies',
      description: 'Terms, guidelines, and community standards',
      icon: Shield,
      color: 'bg-orange-100 text-orange-600',
      articles: 6
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const filteredArticles = recentArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">
              How can we help you?
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Find answers, get support, and learn how to make the most of Socyads
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for help articles, guides, or FAQs..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200">
                <MessageCircle className="h-5 w-5 mr-2" />
                Live Chat
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200">
                <Mail className="h-5 w-5 mr-2" />
                Email Support
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Help Categories */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 text-center ${
                    selectedCategory === category.id
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <Icon className="h-8 w-8 mx-auto mb-2" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Articles */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow duration-200 group cursor-pointer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {article.category}
                    </span>
                    <span className="text-sm text-gray-600">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{article.excerpt}</p>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span>{article.views.toLocaleString()} views</span>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{article.helpful}</span>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-12">
            {/* Recent Articles */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Recent Articles</h2>
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  View all articles
                </button>
              </div>
              <div className="space-y-6">
                {filteredArticles.map((article) => (
                  <article
                    key={article.id}
                    className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                            {article.category}
                          </span>
                          <span className="text-sm text-gray-500">{article.readTime}</span>
                          <span className="text-sm text-gray-500">•</span>
                          <span className="text-sm text-gray-500">{article.publishDate}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-3">{article.excerpt}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>{article.views.toLocaleString()} views</span>
                          <div className="flex items-center space-x-1">
                            <ThumbsUp className="h-4 w-4" />
                            <span>{article.helpful}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-200" />
                    </div>
                  </article>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {filteredFAQs.map((faq) => (
                  <div
                    key={faq.id}
                    className="bg-white rounded-lg border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      <ChevronRight
                        className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                          expandedFAQ === faq.id ? 'rotate-90' : ''
                        }`}
                      />
                    </button>
                    {expandedFAQ === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 mb-4">{faq.answer}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-gray-500">Was this helpful?</span>
                          <button className="flex items-center space-x-1 text-green-600 hover:text-green-700">
                            <ThumbsUp className="h-4 w-4" />
                            <span>Yes ({faq.helpful})</span>
                          </button>
                          <button className="flex items-center space-x-1 text-red-600 hover:text-red-700">
                            <ThumbsDown className="h-4 w-4" />
                            <span>No</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Support */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Need More Help?</h3>
              <div className="space-y-4">
                <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <MessageCircle className="h-5 w-5 text-blue-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Live Chat</p>
                    <p className="text-sm text-gray-600">Available 24/7</p>
                  </div>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Email Support</p>
                    <p className="text-sm text-gray-600">Response within 24h</p>
                  </div>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <Phone className="h-5 w-5 text-purple-600" />
                  <div className="text-left">
                    <p className="font-medium text-gray-900">Phone Support</p>
                    <p className="text-sm text-gray-600">Mon-Fri 9AM-6PM</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Guides */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Guides</h3>
              <div className="space-y-3">
                {guides.map((guide) => {
                  const Icon = guide.icon;
                  return (
                    <button
                      key={guide.id}
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 text-left"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${guide.color}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{guide.title}</p>
                        <p className="text-sm text-gray-600">{guide.articles} articles</p>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Status */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Platform Status</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Payment System</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Messaging</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-green-600">Operational</span>
                  </div>
                </div>
              </div>
              <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                View detailed status
              </button>
            </div>

            {/* Community */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-2">Join Our Community</h3>
              <p className="text-blue-100 text-sm mb-4">
                Connect with other creators and get tips from the community.
              </p>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200">
                Join Discord
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;