import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, Eye, Clock } from 'lucide-react';

const FeaturedGigs = () => {
  const gigs = [
    {
      id: 1,
      title: 'I will promote your brand in my YouTube tech reviews',
      creator: 'TechGuru Mike',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 299,
      rating: 4.9,
      reviews: 127,
      platform: 'YouTube',
      subscribers: '250K',
      deliveryTime: '3 days',
      featured: true
    },
    {
      id: 2,
      title: 'Instagram story shoutout to 180K fitness audience',
      creator: 'FitLifeAna',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 149,
      rating: 5.0,
      reviews: 89,
      platform: 'Instagram',
      subscribers: '180K',
      deliveryTime: '1 day',
      featured: true
    },
    {
      id: 3,
      title: 'TikTok viral dance with your product placement',
      creator: 'DanceQueenSarah',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 199,
      rating: 4.8,
      reviews: 156,
      platform: 'TikTok',
      subscribers: '320K',
      deliveryTime: '2 days',
      featured: true
    },
    {
      id: 4,
      title: 'Facebook page post and live stream mention',
      creator: 'BusinessBob',
      avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 179,
      rating: 4.7,
      reviews: 94,
      platform: 'Facebook',
      subscribers: '95K',
      deliveryTime: '2 days',
      featured: true
    },
    {
      id: 5,
      title: 'Gaming livestream sponsorship integration',
      creator: 'GameMasterAlex',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 399,
      rating: 4.9,
      reviews: 73,
      platform: 'Twitch',
      subscribers: '150K',
      deliveryTime: '5 days',
      featured: false
    },
    {
      id: 6,
      title: 'Beauty tutorial featuring your products',
      creator: 'GlowUpGuru',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=600',
      price: 259,
      rating: 5.0,
      reviews: 112,
      platform: 'YouTube',
      subscribers: '420K',
      deliveryTime: '4 days',
      featured: false
    }
  ];

  const platformColors = {
    'YouTube': 'bg-red-100 text-red-800',
    'Instagram': 'bg-purple-100 text-purple-800',
    'TikTok': 'bg-pink-100 text-pink-800',
    'Facebook': 'bg-blue-100 text-blue-800',
    'Twitch': 'bg-indigo-100 text-indigo-800'
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Featured 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Gigs
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl">
              Discover top-rated services from our verified creators. 
              Hand-picked for quality and proven results.
            </p>
          </div>
          <Link
            to="/explore"
            className="mt-6 lg:mt-0 inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105"
          >
            View All Gigs
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Gigs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {gigs.map((gig) => (
            <div
              key={gig.id}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              {/* Gig Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={gig.image}
                  alt={gig.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Featured Badge */}
                {gig.featured && (
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </div>
                )}

                {/* Favorite Button */}
                <button className="absolute top-4 right-4 w-10 h-10 bg-white bg-opacity-90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 group/heart">
                  <Heart className="h-5 w-5 text-gray-600 group-hover/heart:text-red-500 transition-colors duration-200" />
                </button>

                {/* Platform Badge */}
                <div className={`absolute bottom-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${platformColors[gig.platform] || 'bg-gray-100 text-gray-800'}`}>
                  {gig.platform}
                </div>
              </div>

              {/* Gig Content */}
              <div className="p-6">
                {/* Creator Info */}
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={gig.avatar}
                    alt={gig.creator}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{gig.creator}</h4>
                    <p className="text-sm text-gray-600">{gig.subscribers} followers</p>
                  </div>
                </div>

                {/* Gig Title */}
                <Link
                  to={`/product/${gig.id}`}
                  className="block text-lg font-semibold text-gray-900 mb-3 hover:text-blue-600 transition-colors duration-200 line-clamp-2"
                >
                  {gig.title}
                </Link>

                {/* Rating and Reviews */}
                <div className="flex items-center space-x-2 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{gig.rating}</span>
                  </div>
                  <span className="text-sm text-gray-600">({gig.reviews} reviews)</span>
                </div>

                {/* Price and Delivery */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{gig.deliveryTime}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Starting at</p>
                    <p className="text-xl font-bold text-gray-900">${gig.price}</p>
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
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-6">
            Looking for something specific? Browse our complete collection of services.
          </p>
          <Link
            to="/explore"
            className="inline-flex items-center px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-600 transition-all duration-200 transform hover:scale-105"
          >
            Explore All Gigs
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedGigs;