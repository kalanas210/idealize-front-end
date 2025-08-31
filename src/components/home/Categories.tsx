import React from 'react';
import { Link } from 'react-router-dom';
import { Youtube, Instagram, Music, Facebook } from 'lucide-react';

const Categories = () => {
  const categories = [
    {
      name: 'YouTube',
      icon: Youtube,
      description: 'Video content, reviews, tutorials',
      count: '2,500+ creators',
      image: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50'
    },
    {
      name: 'TikTok',
      icon: Music,
      description: 'Short videos, viral content, trends',
      count: '1,800+ creators',
      image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-pink-500 to-purple-600',
      bgColor: 'bg-pink-50'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      description: 'Posts, stories, reels, IGTV',
      count: '3,200+ creators',
      image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50'
    },
    {
      name: 'Facebook',
      icon: Facebook,
      description: 'Page posts, live streams, groups',
      count: '1,200+ creators',
      image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=600',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Popular 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Platforms
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover talented influencers across all major social media platforms. 
            Find the perfect match for your brand and audience.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={`/explore?platform=${category.name.toLowerCase()}`}
                className="group relative overflow-hidden bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Background Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={`${category.name} creators`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors duration-300">
                    {category.name}
                  </h3>
                  
                  <p className="text-sm text-gray-200 mb-2">
                    {category.description}
                  </p>
                  
                  <p className="text-sm font-semibold text-yellow-300">
                    {category.count}
                  </p>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/20 group-hover:to-purple-600/20 transition-all duration-300"></div>
              </Link>
            );
          })}
        </div>

        {/* Browse All CTA */}
        <div className="text-center">
          <Link
            to="/explore"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Browse All Platforms
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Platform Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">8,700+</div>
            <div className="text-sm text-gray-600">Total Creators</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">25M+</div>
            <div className="text-sm text-gray-600">Combined Followers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">15K+</div>
            <div className="text-sm text-gray-600">Completed Projects</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 mb-2">4.9/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Categories;