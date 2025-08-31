import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Youtube, 
  Instagram, 
  Music, 
  Facebook, 
  Twitter, 
  Twitch,
  Linkedin,
  Camera,
  Search,
  Filter,
  TrendingUp,
  Users,
  Eye,
  Star,
  ArrowRight,
  Play,
  Heart,
  Share2
} from 'lucide-react';

const BrowsePlatforms = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popularity');

  const platforms = [
    {
      id: 'youtube',
      name: 'YouTube',
      icon: Youtube,
      description: 'Video content, reviews, tutorials, vlogs, and educational content',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-red-800',
      creators: 2847,
      avgPrice: 350,
      avgViews: '125K',
      engagementRate: '4.2%',
      categories: ['Tech Reviews', 'Gaming', 'Beauty', 'Education', 'Entertainment', 'Lifestyle'],
      image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      growth: '+15%'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: Instagram,
      description: 'Posts, stories, reels, IGTV, and influencer collaborations',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-800',
      creators: 3421,
      avgPrice: 180,
      avgViews: '85K',
      engagementRate: '5.8%',
      categories: ['Fashion', 'Beauty', 'Fitness', 'Food', 'Travel', 'Lifestyle'],
      image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      growth: '+22%'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: Music,
      description: 'Short videos, viral content, trends, dances, and challenges',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50',
      borderColor: 'border-pink-200',
      textColor: 'text-pink-800',
      creators: 1892,
      avgPrice: 220,
      avgViews: '200K',
      engagementRate: '7.2%',
      categories: ['Dance', 'Comedy', 'Education', 'Food', 'Fashion', 'Music'],
      image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: true,
      growth: '+35%'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: Facebook,
      description: 'Page posts, live streams, groups, and community engagement',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      creators: 1256,
      avgPrice: 160,
      avgViews: '65K',
      engagementRate: '3.9%',
      categories: ['Business', 'News', 'Community', 'Events', 'Local', 'Education'],
      image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      growth: '+8%'
    },
    {
      id: 'twitter',
      name: 'Twitter',
      icon: Twitter,
      description: 'Tweets, threads, spaces, and real-time engagement',
      color: 'from-sky-500 to-blue-600',
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-200',
      textColor: 'text-sky-800',
      creators: 987,
      avgPrice: 120,
      avgViews: '45K',
      engagementRate: '2.8%',
      categories: ['News', 'Tech', 'Business', 'Politics', 'Sports', 'Entertainment'],
      image: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      growth: '+5%'
    },
    {
      id: 'twitch',
      name: 'Twitch',
      icon: Twitch,
      description: 'Live streaming, gaming content, and interactive broadcasts',
      color: 'from-indigo-500 to-purple-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-200',
      textColor: 'text-indigo-800',
      creators: 743,
      avgPrice: 450,
      avgViews: '15K',
      engagementRate: '12.5%',
      categories: ['Gaming', 'Just Chatting', 'Music', 'Art', 'Sports', 'IRL'],
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      growth: '+18%'
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: Linkedin,
      description: 'Professional content, thought leadership, and B2B marketing',
      color: 'from-blue-600 to-blue-700',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-800',
      creators: 654,
      avgPrice: 280,
      avgViews: '25K',
      engagementRate: '4.1%',
      categories: ['Business', 'Technology', 'Leadership', 'Marketing', 'Finance', 'Career'],
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      growth: '+12%'
    },
    {
      id: 'snapchat',
      name: 'Snapchat',
      icon: Camera,
      description: 'Stories, AR lenses, and ephemeral content marketing',
      color: 'from-yellow-400 to-yellow-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      textColor: 'text-yellow-800',
      creators: 432,
      avgPrice: 190,
      avgViews: '75K',
      engagementRate: '6.3%',
      categories: ['Lifestyle', 'Fashion', 'Entertainment', 'Food', 'Travel', 'Music'],
      image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=800',
      featured: false,
      growth: '+10%'
    }
  ];

  const categories = ['All Categories', 'Entertainment', 'Education', 'Business', 'Lifestyle', 'Technology', 'Gaming'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'creators', label: 'Most Creators' },
    { value: 'price-low', label: 'Lowest Price' },
    { value: 'price-high', label: 'Highest Price' },
    { value: 'engagement', label: 'Best Engagement' }
  ];

  const filteredPlatforms = platforms.filter(platform => {
    const matchesSearch = platform.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         platform.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         platform.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || 
                           platform.categories.some(cat => cat.toLowerCase().includes(selectedCategory.toLowerCase()));
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Browse All 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Platforms
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Discover influencers across all major social media platforms. Find the perfect creators 
              for your brand on YouTube, Instagram, TikTok, and more.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search platforms, categories, or content types..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category} value={category.toLowerCase().replace(' ', '-')}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{filteredPlatforms.length}</span> platforms available
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Platform Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {platforms.reduce((sum, platform) => sum + platform.creators, 0).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total Creators</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
            <div className="text-sm text-gray-600">Platforms Available</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">$240</div>
            <div className="text-sm text-gray-600">Average Price</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">5.2%</div>
            <div className="text-sm text-gray-600">Avg Engagement</div>
          </div>
        </div>

        {/* Platforms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlatforms.map((platform) => {
            const Icon = platform.icon;
            return (
              <div
                key={platform.id}
                className="group bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                {/* Platform Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={platform.image}
                    alt={`${platform.name} creators`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Featured Badge */}
                  {platform.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}

                  {/* Growth Badge */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{platform.growth}</span>
                  </div>

                  {/* Platform Icon */}
                  <div className={`absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-r ${platform.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>

                  {/* Platform Name */}
                  <div className="absolute bottom-4 right-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                      {platform.name}
                    </h3>
                  </div>
                </div>

                {/* Platform Content */}
                <div className="p-6">
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {platform.description}
                  </p>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Users className="h-4 w-4 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{platform.creators.toLocaleString()}</span>
                      </div>
                      <div className="text-xs text-gray-600">Creators</div>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center space-x-1 mb-1">
                        <Eye className="h-4 w-4 text-gray-600" />
                        <span className="text-lg font-bold text-gray-900">{platform.avgViews}</span>
                      </div>
                      <div className="text-xs text-gray-600">Avg Views</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">${platform.avgPrice}</div>
                      <div className="text-sm text-gray-600">Avg Price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl font-bold text-gray-900">{platform.engagementRate}</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Popular Categories</h4>
                    <div className="flex flex-wrap gap-1">
                      {platform.categories.slice(0, 4).map((category) => (
                        <span
                          key={category}
                          className={`px-2 py-1 ${platform.bgColor} ${platform.textColor} rounded-full text-xs font-medium`}
                        >
                          {category}
                        </span>
                      ))}
                      {platform.categories.length > 4 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                          +{platform.categories.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/explore?platform=${platform.id}`}
                      className={`flex-1 bg-gradient-to-r ${platform.color} text-white py-3 px-4 rounded-lg font-medium text-center hover:opacity-90 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2`}
                    >
                      <span>Explore {platform.name}</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredPlatforms.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No platforms found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Campaign?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of successful brands who trust Socyads for their influencer marketing campaigns 
            across all major platforms.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Browse All Gigs
            </Link>
            <Link
              to="/create-gig"
              className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              Become a Creator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowsePlatforms;