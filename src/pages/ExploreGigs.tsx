import React, { useState } from 'react';
import { Search, SlidersHorizontal, Star, Heart, Eye, Clock, ChevronDown, Grid, List } from 'lucide-react';
import { Link } from 'react-router-dom';

const ExploreGigs = () => {
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
  const gigs = [
    {
      id: 1,
      title: 'I will promote your brand in my YouTube tech reviews with detailed analysis',
      creator: 'TechGuru Mike',
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
      title: 'Instagram story shoutout to 180K fitness audience with engagement guarantee',
      creator: 'FitLifeAna',
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
      title: 'TikTok viral dance with your product placement and trending hashtags',
      creator: 'DanceQueenSarah',
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
      title: 'Facebook page post and live stream mention for business growth',
      creator: 'BusinessBob',
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
      title: 'Gaming livestream sponsorship integration with audience interaction',
      creator: 'GameMasterAlex',
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
      title: 'Beauty tutorial featuring your products with detailed review',
      creator: 'GlowUpGuru',
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

  const platformColors: { [key: string]: string } = {
    'YouTube': 'bg-red-100 text-red-800',
    'Instagram': 'bg-purple-100 text-purple-800',
    'TikTok': 'bg-pink-100 text-pink-800',
    'Facebook': 'bg-blue-100 text-blue-800',
    'Twitter': 'bg-sky-100 text-sky-800',
    'Twitch': 'bg-indigo-100 text-indigo-800',
    'LinkedIn': 'bg-blue-100 text-blue-800',
    'Snapchat': 'bg-yellow-100 text-yellow-800'
  };

  const levelColors: { [key: string]: string } = {
    'Top Rated': 'bg-yellow-100 text-yellow-800',
    'Level 2': 'bg-green-100 text-green-800',
    'Level 1': 'bg-blue-100 text-blue-800',
    'New Seller': 'bg-gray-100 text-gray-800'
  };

  const filteredGigs = gigs.filter(gig => {
    const matchesSearch = gig.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         gig.specialties.some(spec => spec.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPlatform = selectedPlatform === 'all' || 
                           gig.platforms.some(platform => platform.toLowerCase() === selectedPlatform.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           gig.categories.some(cat => cat.toLowerCase() === selectedCategory.toLowerCase());
    
    const matchesLocation = selectedLocation === 'all' || 
                           gig.location.toLowerCase().includes(selectedLocation.toLowerCase());
    
    const matchesFollowers = followerRange === 'all' || (() => {
      const count = gig.followerCount;
      switch (followerRange) {
        case '1k-10k': return count >= 1000 && count <= 10000;
        case '10k-50k': return count >= 10000 && count <= 50000;
        case '50k-100k': return count >= 50000 && count <= 100000;
        case '100k-500k': return count >= 100000 && count <= 500000;
        case '500k+': return count >= 500000;
        default: return true;
      }
    })();
    
    const matchesPrice = gig.startingPrice >= priceRange[0] && gig.startingPrice <= priceRange[1];
    
    return matchesSearch && matchesPlatform && matchesCategory && matchesLocation && matchesFollowers && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
              Explore 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Gigs
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Find the perfect influencer for your next campaign
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for services, influencers, or keywords..."
                  className="w-full pl-12 pr-4 py-4 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 shadow-sm"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200">
                  Search
                </button>
              </div>
            </div>

            {/* Popular Tags */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              <span className="text-sm text-gray-600 mr-2">Popular:</span>
              {['YouTube Reviews', 'Instagram Stories', 'TikTok Trends', 'Gaming', 'Beauty'].map((tag) => (
                <button 
                  key={tag} 
                  className="px-3 py-1 bg-white border border-gray-200 hover:border-blue-300 rounded-full text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Responsive Slide-over for mobile */}
          {/* Overlay for mobile filter */}
          {showFilters && (
            <button
              onClick={() => setShowFilters(false)}
              className="fixed inset-0 z-40 bg-black bg-opacity-30 lg:hidden"
              aria-label="Close filters overlay"
              title="Close filters overlay"
            />
          )}
          <div
            className={`fixed z-50 inset-y-0 left-0 w-80 max-w-full bg-white border-r border-slate-200 shadow-xl transform transition-transform duration-300 lg:static lg:translate-x-0 lg:w-80 rounded-none lg:rounded-xl p-0 lg:p-6 ${
              showFilters ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}
            style={{ top: showFilters ? 0 : undefined }}
          >
            <div className="bg-white rounded-none lg:rounded-xl shadow-none lg:shadow-sm border-0 lg:border border-gray-200 p-6 sticky top-0 h-screen lg:h-auto overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="lg:hidden text-gray-400 hover:text-gray-600"
                  aria-label="Close filters"
                  title="Close filters"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                <select
                  title="Category"
                  aria-label="Category"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category} value={category.toLowerCase().replace(' ', '-')}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Platform Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Platform</label>
                <select
                  title="Platform"
                  aria-label="Platform"
                  value={selectedPlatform}
                  onChange={(e) => setSelectedPlatform(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {platforms.map((platform) => (
                    <option key={platform} value={platform.toLowerCase().replace(' ', '-')}>{platform}</option>
                  ))}
                </select>
              </div>

              {/* Followers Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Followers</label>
                <select
                  title="Followers"
                  aria-label="Followers"
                  value={followerRange}
                  onChange={(e) => setFollowerRange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {followerRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                <select
                  title="Location"
                  aria-label="Location"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {locations.map((location) => (
                    <option key={location} value={location.toLowerCase().replace(' ', '-')}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">Price Range</label>
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <input
                      type="number"
                      placeholder="Min price"
                      aria-label="Minimum price"
                      value={priceRange[0]}
                      onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                    />
                    <span className="text-gray-500 text-center">to</span>
                    <input
                      type="number"
                      placeholder="Max price"
                      aria-label="Maximum price"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 1000])}
                      className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-0"
                    />
                  </div>
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      aria-label="Maximum price range"
                    />
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200" aria-label="Clear all filters" title="Clear all filters">
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
                  aria-label="Open filters"
                  title="Open filters"
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters
                </button>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredGigs.length}</span> services available
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
                    title="Sort by"
                    aria-label="Sort by"
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

            {/* Gigs Grid/List */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-6'}>
              {filteredGigs.map((gig) => (
                <div
                  key={gig.id}
                  className={`group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Gig Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-[4/3]'}`}>
                    <img
                      src={gig.coverImage}
                      alt={gig.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Featured Badge */}
                    {gig.featured && (
                      <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}

                    {/* Favorite Button */}
                    <button
                      className="absolute top-3 right-3 w-8 h-8 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 group/heart"
                      aria-label="Add to favorites"
                      title="Add to favorites"
                    >
                      <Heart className="h-4 w-4 text-gray-600 group-hover/heart:text-red-500 transition-colors duration-200" />
                    </button>

                    {/* Platform Badge */}
                    <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium ${platformColors[gig.platforms[0]] || 'bg-gray-100 text-gray-800'}`}>
                      {gig.platforms[0]}
                    </div>

                    {/* Online Status */}
                    {gig.online && (
                      <div className="absolute bottom-3 right-3 flex items-center space-x-1 bg-green-100 px-2 py-1 rounded-full">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-800">Online</span>
                      </div>
                    )}
                  </div>

                  {/* Gig Content */}
                  <div className="p-4 flex-1">
                    {/* Creator Info */}
                    <div className="flex items-center space-x-3 mb-3">
                      <img
                        src={gig.avatar}
                        alt={gig.creator}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium text-gray-900 text-sm">{gig.creator}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${levelColors[gig.level]}`}>
                            {gig.level}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600">{gig.followers} followers</p>
                      </div>
                    </div>

                    {/* Gig Title */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                      {gig.title}
                    </h3>

                    {/* Rating and Reviews */}
                    <div className="flex items-center space-x-2 mb-3">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-semibold text-gray-900">{gig.rating}</span>
                      </div>
                      <span className="text-sm text-gray-600">({gig.reviews})</span>
                      <span className="text-xs text-gray-500">{gig.completedOrders} orders completed</span>
                    </div>

                    {/* Price and Delivery */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{gig.responseTime}</span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">${gig.startingPrice}</p>
                      </div>
                    </div>

                    {/* Quick Action Buttons */}
                    <div className="mt-4 flex space-x-2">
                      <Link
                        to={`/product/${gig.id}`}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
                      >
                        View Details
                      </Link>
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200" aria-label="Quick view" title="Quick view">
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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

            {/* Promotion Banner */}
            <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Are you an influencer?</h3>
                  <p className="text-blue-100 mb-4 md:mb-0">Start selling your services and reach thousands of potential clients</p>
                </div>
                <a
                  href="/create-gig"
                  className="px-6 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Become a Seller
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreGigs;