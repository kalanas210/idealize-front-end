import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, TrendingUp, Verified } from 'lucide-react';

const TopInfluencers = () => {
  const influencers = [
    {
      id: 1,
      name: 'TechGuru Mike',
      username: '@techguruofficial',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 299,
      rating: 4.9,
      reviews: 127,
      platform: 'YouTube',
      subscribers: '250K',
      deliveryTime: '3 days',
      responseTime: '1 hour',
      completedOrders: 234,
      featured: true,
      specialBadge: 'Top Rated'
    },
    {
      id: 2,
      name: 'FitLifeAna',
      username: '@fitlifeana',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 149,
      rating: 4.8,
      reviews: 156,
      platform: 'Instagram',
      subscribers: '180K',
      deliveryTime: '2 days',
      responseTime: '2 hours',
      completedOrders: 189,
      featured: true,
      specialBadge: 'Rising Star'
    },
    {
      id: 3,
      name: 'DanceQueenSarah',
      username: '@dancequeensarah',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 199,
      rating: 4.8,
      reviews: 156,
      platform: 'TikTok',
      subscribers: '320K',
      deliveryTime: '2 days',
      responseTime: '30 mins',
      completedOrders: 189,
      featured: true,
      specialBadge: 'Trending'
    },
    {
      id: 4,
      name: 'BusinessBob',
      username: '@businessbob',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=800',
      price: 179,
      rating: 4.7,
      reviews: 94,
      platform: 'Facebook',
      subscribers: '95K',
      deliveryTime: '2 days',
      responseTime: '1 hour',
      completedOrders: 167,
      featured: true,
      specialBadge: 'Featured'
    }
  ];

  const badgeColors = {
    'Top Rated': 'bg-gradient-to-r from-yellow-500 to-orange-500',
    'Rising Star': 'bg-gradient-to-r from-green-500 to-blue-500',
    'Trending': 'bg-gradient-to-r from-pink-500 to-purple-500',
    'Featured': 'bg-gradient-to-r from-blue-500 to-indigo-500'
  };

  const platformColors = {
    'Instagram': 'text-purple-600',
    'YouTube': 'text-red-600',
    'TikTok': 'text-pink-600',
    'Facebook': 'text-blue-600'
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Top 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Influencers
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our highest-rated and most successful creators. These verified influencers 
            have proven track records of delivering exceptional results.
          </p>
        </div>

        {/* Influencers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {influencers.map((influencer) => (
            <div
              key={influencer.id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Cover Image */}
              <div className="relative h-32 overflow-hidden">
                <img
                  src={influencer.coverImage}
                  alt={`${influencer.name} cover`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                
                {/* Special Badge */}
                <div className={`absolute top-3 right-3 px-2 py-1 ${badgeColors[influencer.specialBadge]} text-white text-xs font-semibold rounded-full`}>
                  {influencer.specialBadge}
                </div>
              </div>

              {/* Profile Section */}
              <div className="relative px-6 pb-6">
                {/* Avatar */}
                <div className="relative -mt-8 mb-4">
                  <img
                    src={influencer.avatar}
                    alt={influencer.name}
                    className="w-16 h-16 rounded-full border-4 border-white object-cover mx-auto shadow-lg"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Verified className="h-3 w-3 text-white fill-current" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{influencer.name}</h3>
                  <p className={`text-sm font-medium mb-2 ${platformColors[influencer.platform]}`}>
                    {influencer.username}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">{influencer.platform} Creator</p>
                  
                  {/* Stats Row */}
                  <div className="flex items-center justify-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">{influencer.subscribers}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-gray-900 font-semibold">{influencer.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Performance Metrics */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Orders completed:</span>
                    <span className="font-semibold text-gray-900">{influencer.completedOrders}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Response time:</span>
                    <span className="font-semibold text-green-600">{influencer.responseTime}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Starting at:</span>
                    <span className="font-bold text-lg text-gray-900">${influencer.price}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link
                    to={`/influencer/${influencer.id}`}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg font-medium text-center hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 block"
                  >
                    View Profile
                  </Link>
                  <button className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                    Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Verified Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">5M+</div>
              <div className="text-blue-100">Combined Reach</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Available</div>
            </div>
          </div>
        </div>

        {/* Browse All CTA */}
        <div className="text-center mt-12">
          <Link
            to="/influencers"
            className="inline-flex items-center px-8 py-4 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all duration-200 transform hover:scale-105"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Browse All Influencers
          </Link>
        </div>
      </div>
    </section>
  );
};

export default TopInfluencers;