import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Globe, 
  Languages, 
  Verified, 
  MessageCircle,
  Heart,
  Share2,
  ExternalLink,
  Users,
  Eye,
  TrendingUp,
  Award,
  CheckCircle,
  Calendar,
  DollarSign,
  Play,
  Instagram,
  Youtube,
  Music,
  Facebook,
  Twitter
} from 'lucide-react';
import { getInfluencerById } from '../data/influencers';

const InfluencerProfile = () => {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [activeTab, setActiveTab] = useState('gigs');
  const [selectedPlatform, setSelectedPlatform] = useState('all');
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState('');

  useEffect(() => {
    const foundInfluencer = getInfluencerById(id);
    setInfluencer(foundInfluencer);
  }, [id]);

  if (!influencer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Influencer not found</h2>
          <p className="text-gray-600 mb-4">The influencer profile you're looking for doesn't exist.</p>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700">
            Browse all influencers
          </Link>
        </div>
      </div>
    );
  }

  const platformIcons = {
    'YouTube': Youtube,
    'Instagram': Instagram,
    'TikTok': Music,
    'Facebook': Facebook,
    'Twitter': Twitter
  };

  const platformColors = {
    'YouTube': 'bg-red-100 text-red-800 border-red-200',
    'Instagram': 'bg-purple-100 text-purple-800 border-purple-200',
    'TikTok': 'bg-pink-100 text-pink-800 border-pink-200',
    'Facebook': 'bg-blue-100 text-blue-800 border-blue-200',
    'Twitter': 'bg-sky-100 text-sky-800 border-sky-200'
  };

  const filteredGigs = selectedPlatform === 'all' 
    ? influencer.gigs 
    : influencer.gigs.filter(gig => gig.platform.toLowerCase() === selectedPlatform.toLowerCase());

  const handleContactSubmit = () => {
    if (contactMessage.trim()) {
      // Handle contact form submission
      console.log('Sending message:', contactMessage);
      setContactMessage('');
      setShowContactModal(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cover Section */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={influencer.coverImage}
          alt={`${influencer.name} cover`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Profile Info Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
              {/* Avatar */}
              <div className="relative mb-4 md:mb-0">
                <img
                  src={influencer.avatar}
                  alt={influencer.name}
                  className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg"
                />
                {influencer.verified && (
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Verified className="h-4 w-4 text-white fill-current" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-white">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">{influencer.name}</h1>
                    <p className="text-lg text-gray-200 mb-2">{influencer.username}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-semibold">{influencer.rating}</span>
                        <span className="text-gray-300">({influencer.totalReviews} reviews)</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{influencer.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{influencer.lastSeen}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 mt-4 md:mt-0">
                    <button
                      onClick={() => setShowContactModal(true)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                    >
                      <MessageCircle className="h-4 w-4" />
                      <span>Contact</span>
                    </button>
                    <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200">
                      <Heart className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-white bg-opacity-20 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-30 transition-all duration-200">
                      <Share2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">{influencer.completedOrders}</div>
                <div className="text-sm text-gray-600">Orders Completed</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">{influencer.rating}</div>
                <div className="text-sm text-gray-600">Average Rating</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">{influencer.responseTime}</div>
                <div className="text-sm text-gray-600">Response Time</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 text-center">
                <div className="text-2xl font-bold text-gray-900">{influencer.totalEarnings}</div>
                <div className="text-sm text-gray-600">Total Earnings</div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'gigs', label: `Gigs (${influencer.gigs.length})` },
                    { id: 'about', label: 'About' },
                    { id: 'portfolio', label: 'Portfolio' },
                    { id: 'reviews', label: `Reviews (${influencer.reviews.length})` }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Gigs Tab */}
                {activeTab === 'gigs' && (
                  <div className="space-y-6">
                    {/* Platform Filter */}
                    <div className="flex flex-wrap gap-2">
                      <button
                        onClick={() => setSelectedPlatform('all')}
                        className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 ${
                          selectedPlatform === 'all'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        All Platforms
                      </button>
                      {[...new Set(influencer.gigs.map(gig => gig.platform))].map((platform) => {
                        const Icon = platformIcons[platform];
                        return (
                          <button
                            key={platform}
                            onClick={() => setSelectedPlatform(platform)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                              selectedPlatform === platform
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            {Icon && <Icon className="h-4 w-4" />}
                            <span>{platform}</span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Gigs Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {filteredGigs.map((gig) => (
                        <Link
                          key={gig.id}
                          to={`/product/${gig.id}`}
                          className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                        >
                          <div className="aspect-[4/3] overflow-hidden relative">
                            <img
                              src={gig.image}
                              alt={gig.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            {gig.featured && (
                              <div className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                                Featured
                              </div>
                            )}
                            <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium border ${platformColors[gig.platform]}`}>
                              {gig.platform}
                            </div>
                          </div>
                          <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                              {gig.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{gig.description}</p>
                            
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-1">
                                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                <span className="text-sm font-semibold text-gray-900">{gig.rating}</span>
                                <span className="text-sm text-gray-600">({gig.reviews})</span>
                              </div>
                              <div className="text-sm text-gray-600">{gig.orders} orders</div>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm text-gray-600">{gig.deliveryTime}</span>
                              </div>
                              <div className="text-lg font-bold text-gray-900">
                                Starting at ${gig.startingPrice}
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-1 mt-3">
                              {gig.tags.slice(0, 3).map((tag) => (
                                <span
                                  key={tag}
                                  className="px-2 py-1 bg-blue-50 text-blue-700 rounded-full text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>

                    {filteredGigs.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Users className="h-12 w-12 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No gigs found</h3>
                        <p className="text-gray-600">
                          {selectedPlatform === 'all' 
                            ? 'This influencer hasn\'t created any gigs yet.' 
                            : `No gigs available for ${selectedPlatform}.`}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* About Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">About {influencer.name}</h3>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {influencer.about}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Skills & Expertise</h4>
                      <div className="flex flex-wrap gap-2">
                        {influencer.skills.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Certifications</h4>
                      <div className="space-y-2">
                        {influencer.certifications.map((cert) => (
                          <div key={cert} className="flex items-center space-x-2">
                            <Award className="h-4 w-4 text-yellow-500" />
                            <span className="text-gray-700">{cert}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Languages</h4>
                      <div className="flex items-center space-x-2">
                        <Languages className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">{influencer.languages.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Work</h3>
                      <p className="text-gray-600 mb-6">
                        Check out some of {influencer.name}'s recent content across different platforms.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {influencer.portfolio.map((item) => {
                        const Icon = platformIcons[item.platform];
                        return (
                          <a
                            key={item.id}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300"
                          >
                            <div className="aspect-video relative overflow-hidden">
                              <img
                                src={item.thumbnail}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <Play className="h-8 w-8 text-white" />
                              </div>
                              <div className={`absolute top-3 right-3 p-2 rounded-full ${platformColors[item.platform]}`}>
                                {Icon && <Icon className="h-4 w-4" />}
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                {item.title}
                              </h4>
                              <div className="flex items-center justify-between text-sm text-gray-600">
                                <div className="flex items-center space-x-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{item.views} views</span>
                                </div>
                                <div className="flex items-center space-x-1">
                                  <TrendingUp className="h-4 w-4" />
                                  <span>{item.engagement} engagement</span>
                                </div>
                              </div>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Client Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{influencer.rating}</span>
                        <span className="text-gray-600">({influencer.reviews.length} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {influencer.reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.buyer.avatar}
                              alt={review.buyer.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                <h4 className="font-semibold text-gray-900">{review.buyer.name}</h4>
                                <span className="text-sm text-gray-600">{review.buyer.country}</span>
                                {review.verified && (
                                  <span className="px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs">
                                    Verified
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <div className="flex items-center">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`h-4 w-4 ${
                                        i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600">{review.date}</span>
                                <span className="text-sm text-gray-600">• {review.gigTitle}</span>
                              </div>
                              <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                              <p className="text-gray-700">{review.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Quick Stats */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Member since</span>
                    <span className="font-medium text-gray-900">{influencer.memberSince}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Response time</span>
                    <span className="font-medium text-gray-900">{influencer.responseTime}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Level</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                      {influencer.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Total earnings</span>
                    <span className="font-medium text-gray-900">{influencer.totalEarnings}</span>
                  </div>
                </div>
              </div>

              {/* Social Media Accounts */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Social Media Accounts</h3>
                <div className="space-y-4">
                  {influencer.socialAccounts.map((account) => {
                    const Icon = platformIcons[account.platform];
                    return (
                      <div key={account.platform} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${platformColors[account.platform]}`}>
                              {Icon && <Icon className="h-5 w-5" />}
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-semibold text-gray-900">{account.platform}</h4>
                                {account.verified && (
                                  <Verified className="h-4 w-4 text-blue-500 fill-current" />
                                )}
                              </div>
                              <p className="text-sm text-gray-600">{account.username}</p>
                            </div>
                          </div>
                          <a
                            href={account.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div className="text-center">
                            <div className="font-bold text-gray-900">{account.subscribers}</div>
                            <div className="text-gray-600">Followers</div>
                          </div>
                          <div className="text-center">
                            <div className="font-bold text-gray-900">{account.stats.engagementRate}</div>
                            <div className="text-gray-600">Engagement</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Contact Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowContactModal(true)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Send Message</span>
                  </button>
                  <button className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>Schedule Call</span>
                  </button>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Online now</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{influencer.timezone}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Contact {influencer.name}</h3>
                <button
                  onClick={() => setShowContactModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  placeholder="Hi! I'm interested in working with you on a project..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowContactModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleContactSubmit}
                  disabled={!contactMessage.trim()}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InfluencerProfile;