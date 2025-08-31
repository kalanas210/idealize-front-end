import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  Filter, 
  Star, 
  Users, 
  MapPin, 
  Clock, 
  Verified, 
  TrendingUp,
  Eye,
  Heart,
  MessageCircle,
  Grid,
  List,
  ChevronDown,
  Award,
  Youtube,
  Instagram,
  Music,
  Facebook,
  Twitter,
  Twitch,
  Linkedin,
  Camera
} from 'lucide-react';

const AllInfluencers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [followerRange, setFollowerRange] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('rating');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);

  // Mock influencers data
  const influencers = [
    {
      id: 1,
      name: 'TechGuru Mike',
      username: '@techguruofficial',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      level: 'Top Rated',
      location: 'San Francisco, CA',
      responseTime: '1 hour',
      rating: 4.9,
      reviews: 127,
      completedOrders: 234,
      startingPrice: 299,
      platforms: ['YouTube', 'Instagram'],
      categories: ['Technology', 'Reviews'],
      followers: '250K',
      followerCount: 250000,
      engagementRate: '4.2%',
      languages: ['English', 'Spanish'],
      specialties: ['Tech Reviews', 'Product Analysis', 'Unboxing'],
      online: true,
      featured: true,
      joinedDate: '2019'
    },
    {
      id: 2,
      name: 'FitLifeAna',
      username: '@fitlifeana',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      level: 'Level 2',
      location: 'Toronto, Canada',
      responseTime: '2 hours',
      rating: 4.8,
      reviews: 156,
      completedOrders: 189,
      startingPrice: 149,
      platforms: ['Instagram', 'TikTok'],
      categories: ['Fitness', 'Health'],
      followers: '180K',
      followerCount: 180000,
      engagementRate: '5.8%',
      languages: ['English', 'French'],
      specialties: ['Fitness Training', 'Nutrition', 'Wellness'],
      online: false,
      featured: true,
      joinedDate: '2020'
    },
    {
      id: 3,
      name: 'DanceQueenSarah',
      username: '@dancequeensarah',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      level: 'Top Rated',
      location: 'London, UK',
      responseTime: '30 minutes',
      rating: 4.8,
      reviews: 156,
      completedOrders: 189,
      startingPrice: 199,
      platforms: ['TikTok', 'Instagram'],
      categories: ['Entertainment', 'Dance'],
      followers: '320K',
      followerCount: 320000,
      engagementRate: '7.2%',
      languages: ['English'],
      specialties: ['Dance Choreography', 'Viral Content', 'Trends'],
      online: true,
      featured: true,
      joinedDate: '2020'
    },
    {
      id: 4,
      name: 'BusinessBob',
      username: '@businessbob',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: false,
      level: 'Level 1',
      location: 'Sydney, Australia',
      responseTime: '3 hours',
      rating: 4.7,
      reviews: 94,
      completedOrders: 167,
      startingPrice: 179,
      platforms: ['Facebook', 'LinkedIn'],
      categories: ['Business', 'Marketing'],
      followers: '95K',
      followerCount: 95000,
      engagementRate: '3.9%',
      languages: ['English'],
      specialties: ['B2B Marketing', 'Lead Generation', 'Business Growth'],
      online: true,
      featured: false,
      joinedDate: '2021'
    },
    {
      id: 5,
      name: 'GameMasterAlex',
      username: '@gamemasteralex',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      level: 'Top Rated',
      location: 'Berlin, Germany',
      responseTime: '4 hours',
      rating: 4.9,
      reviews: 73,
      completedOrders: 98,
      startingPrice: 399,
      platforms: ['Twitch', 'YouTube'],
      categories: ['Gaming', 'Entertainment'],
      followers: '150K',
      followerCount: 150000,
      engagementRate: '12.5%',
      languages: ['English', 'German'],
      specialties: ['Gaming Reviews', 'Live Streaming', 'Esports'],
      online: false,
      featured: false,
      joinedDate: '2019'
    },
    {
      id: 6,
      name: 'GlowUpGuru',
      username: '@glowupguru',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      verified: true,
      level: 'Level 2',
      location: 'Paris, France',
      responseTime: '1 hour',
      rating: 5.0,
      reviews: 112,
      completedOrders: 203,
      startingPrice: 259,
      platforms: ['YouTube', 'Instagram'],
      categories: ['Beauty', 'Fashion'],
      followers: '420K',
      followerCount: 420000,
      engagementRate: '6.1%',
      languages: ['English', 'French'],
      specialties: ['Beauty Tutorials', 'Product Reviews', 'Makeup'],
      online: true,
      featured: true,
      joinedDate: '2018'
    }
  ];

  const platforms = ['All Platforms', 'YouTube', 'Instagram', 'TikTok', 'Facebook', 'Twitter', 'Twitch', 'LinkedIn', 'Snapchat'];
  const categories = ['All Categories', 'Technology', 'Fitness', 'Entertainment', 'Business', 'Gaming', 'Beauty', 'Fashion', 'Food', 'Travel'];
  const locations = ['All Locations', 'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 'France', 'Spain', 'Other'];
  const followerRanges = [
    { value: 'all', label: 'All Followers' },
    { value: '1k-10k', label: '1K - 10K' },
    { value: '10k-50k', label: '10K - 50K' },
    { value: '50k-100k', label: '50K - 100K' },
    { value: '100k-500k', label: '100K - 500K' },
    { value: '500k+', label: '500K+' }
  ];

  const sortOptions = [
    { value: 'rating', label: 'Highest Rated' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'followers', label: 'Most Followers' },
    { value: 'engagement', label: 'Best Engagement' },
    { value: 'newest', label: 'Newest Members' }
  ];

  const platformIcons = {
    'YouTube': Youtube,
    'Instagram': Instagram,
    'TikTok': Music,
    'Facebook': Facebook,
    'Twitter': Twitter,
    'Twitch': Twitch,
    'LinkedIn': Linkedin,
    'Snapchat': Camera
  };

  const levelColors = {
    'Top Rated': 'bg-yellow-100 text-yellow-800',
    'Level 2': 'bg-green-100 text-green-800',
    'Level 1': 'bg-blue-100 text-blue-800',
    'New Seller': 'bg-gray-100 text-gray-800'
  };

  const filteredInfluencers = influencers.filter(influencer => {
    const matchesSearch = influencer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         influencer.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlatform = selectedPlatform === 'all' || 
                           influencer.platforms.some(platform => platform.toLowerCase() === selectedPlatform.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           influencer.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || 
                           influencer.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesFollowers = followerRange === 'all' || (() => {
      const count = influencer.followerCount;
      switch (followerRange) {
        case '1k-10k': return count >= 1000 && count <= 10000;
        case '10k-50k': return count >= 10000 && count <= 50000;
        case '50k-100k': return count >= 50000 && count <= 100000;
        case '100k-500k': return count >= 100000 && count <= 500000;
        case '500k+': return count >= 500000;
        default: return true;
      }
    })();
    
    const matchesPrice = influencer.startingPrice >= priceRange[0] && influencer.startingPrice <= priceRange[1];
    
    return matchesSearch && matchesPlatform && matchesCategory && matchesLocation && matchesFollowers && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              All 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Influencers
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Browse our complete directory of verified influencers. Find the perfect creators 
              for your brand across all platforms and niches.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search influencers by name, username, or specialty..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Platform Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
                <select
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform.toLowerCase().replace(' ', '-')}>
                      {platform}
                    </option>
                  ))}
                </select>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase().replace(' ', '-')}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Followers Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Followers</label>
                <select
                  value={followerRange}
                  onChange={(e) => setFollowerRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {followerRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location.toLowerCase().replace(' ', '-')}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <span className="text-gray-500">to</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredInfluencers.length}</span> influencers found
                </p>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <Grid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Influencers Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredInfluencers.map((influencer) => (
                <div
                  key={influencer.id}
                  className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Cover Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'h-32'}`}>
                    <img
                      src={influencer.coverImage}
                      alt={`${influencer.name} cover`}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                    
                    {/* Featured Badge */}
                    {influencer.featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}

                    {/* Online Status */}
                    {influencer.online && (
                      <div className="absolute top-3 right-3 flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-800">Online</span>
                      </div>
                    )}
                  </div>

                  {/* Profile Section */}
                  <div className="relative p-4 flex-1">
                    {/* Avatar */}
                    <div className="relative -mt-8 mb-4">
                      <img
                        src={influencer.avatar}
                        alt={influencer.name}
                        className="w-16 h-16 rounded-full border-4 border-white object-cover shadow-lg"
                      />
                      {influencer.verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                          <Verified className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <div className="mb-4">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-lg font-bold text-gray-900">{influencer.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[influencer.level]}`}>
                          {influencer.level}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{influencer.username}</p>
                      
                      {/* Stats Row */}
                      <div className="flex items-center space-x-4 text-sm mb-3">
                        <div className="flex items-center space-x-1">
                          <Users className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-600">{influencer.followers}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-gray-900 font-semibold">{influencer.rating}</span>
                          <span className="text-gray-600">({influencer.reviews})</span>
                        </div>
                      </div>

                      {/* Location and Response Time */}
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-4 w-4" />
                          <span>{influencer.location}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{influencer.responseTime}</span>
                        </div>
                      </div>

                      {/* Platforms */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {influencer.platforms.map((platform) => {
                          const Icon = platformIcons[platform];
                          return (
                            <div key={platform} className="flex items-center space-x-1 bg-gray-100 px-2 py-1 rounded-full text-xs">
                              {Icon && <Icon className="h-3 w-3" />}
                              <span>{platform}</span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {influencer.specialties.slice(0, 2).map((specialty) => (
                          <span
                            key={specialty}
                            className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                        {influencer.specialties.length > 2 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                            +{influencer.specialties.length - 2} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Performance Metrics */}
                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-900">{influencer.completedOrders}</div>
                        <div className="text-gray-600">Orders</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded-lg">
                        <div className="font-semibold text-gray-900">{influencer.engagementRate}</div>
                        <div className="text-gray-600">Engagement</div>
                      </div>
                    </div>

                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Starting at</p>
                        <p className="text-xl font-bold text-gray-900">${influencer.startingPrice}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      <Link
                        to={`/influencer/${influencer.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                      >
                        View Profile
                      </Link>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        <MessageCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* No Results */}
            {filteredInfluencers.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No influencers found</h3>
                <p className="text-gray-600">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}

            {/* Pagination */}
            {filteredInfluencers.length > 0 && (
              <div className="mt-12 flex justify-center">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Previous
                  </button>
                  {[1, 2, 3, 4, 5].map((page) => (
                    <button
                      key={page}
                      className={`px-3 py-2 rounded-lg ${
                        page === 1
                          ? 'bg-blue-600 text-white'
                          : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your Campaign?</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Connect with top influencers and launch successful marketing campaigns that drive real results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
            >
              Browse Gigs
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

export default AllInfluencers;