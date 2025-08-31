import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Share2, 
  Clock, 
  CheckCircle, 
  MessageCircle, 
 
  Calendar,
  ExternalLink,
  Shield,
  Award,
  Users,
  TrendingUp,
  Eye,
  ThumbsUp,
  Flag,
  ChevronLeft,
  ChevronRight,
  Play,
  BarChart3,
  Globe,
  MapPin,
  Languages,
  Verified
} from 'lucide-react';
import { products, reviews, relatedGigs } from '../data/assets';

import { authService } from '../services/authService';
import MeetingScheduler from '../components/common/MeetingScheduler';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState('standard');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showProofModal, setShowProofModal] = useState(false);
  const [selectedProof, setSelectedProof] = useState(null);
  const [showChatModal, setShowChatModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [chatMessage, setChatMessage] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
    if (foundProduct && foundProduct.packages.length > 0) {
      const popularPackage = foundProduct.packages.find(p => p.popular);
      setSelectedPackage(popularPackage ? popularPackage.id : foundProduct.packages[0].id);
    }

    // Initialize authentication for development
    authService.initializeAuth();
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <p className="text-gray-600 mb-4">The product you're looking for doesn't exist.</p>
          <Link to="/explore" className="text-blue-600 hover:text-blue-700">
            Browse all gigs
          </Link>
        </div>
      </div>
    );
  }

  const selectedPackageData = product.packages.find(p => p.id === selectedPackage);
  const productReviews = reviews.filter(r => r.productId === product.id);

  const platformColors = {
    'YouTube': 'bg-red-100 text-red-800',
    'Instagram': 'bg-purple-100 text-purple-800',
    'TikTok': 'bg-pink-100 text-pink-800',
    'Facebook': 'bg-blue-100 text-blue-800',
    'Twitter': 'bg-sky-100 text-sky-800',
    'Twitch': 'bg-indigo-100 text-indigo-800'
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const openProofModal = (proof) => {
    setSelectedProof(proof);
    setShowProofModal(true);
  };

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Handle message sending logic here
      console.log('Sending message:', chatMessage);
      setChatMessage('');
    }
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-blue-600">Home</Link>
            <span className="text-gray-400">/</span>
            <Link to="/explore" className="text-gray-500 hover:text-blue-600">Explore Gigs</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900">{product.category}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Product Images and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative aspect-video">
                <img
                  src={product.images[selectedImageIndex]}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center hover:bg-opacity-70 transition-all duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {product.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-200 ${
                        index === selectedImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Thumbnail Strip */}
              <div className="p-4 flex space-x-3 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImageIndex ? 'border-blue-500' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={image} alt={`Product ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Information Tabs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'about', label: 'About Seller' },
                    { id: 'proof', label: 'Proof of Work' },
                    { id: 'reviews', label: `Reviews (${productReviews.length})` }
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
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">Service Description</h3>
                      <div className="prose prose-gray max-w-none">
                        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {product.fullDescription}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">What's Included</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedPackageData.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-md font-semibold text-gray-900 mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* About Seller Tab */}
                {activeTab === 'about' && (
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={product.creator.avatar}
                        alt={product.creator.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{product.creator.name}</h3>
                          {product.creator.verified && (
                            <Verified className="h-5 w-5 text-blue-500 fill-current" />
                          )}
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                            {product.creator.level}
                          </span>
                        </div>
                        <p className="text-gray-600 mb-2">{product.creator.username}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-4 w-4" />
                            <span>{product.creator.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4" />
                            <span>Member since {product.creator.memberSince}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{product.creator.completedOrders}</div>
                        <div className="text-sm text-gray-600">Orders Completed</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{product.creator.rating}</div>
                        <div className="text-sm text-gray-600">Average Rating</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{product.creator.responseTime}</div>
                        <div className="text-sm text-gray-600">Response Time</div>
                      </div>
                      <div className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="text-2xl font-bold text-gray-900">{product.creator.channelStats.subscribers}</div>
                        <div className="text-sm text-gray-600">Subscribers</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">About</h4>
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                        {product.creator.about}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Channel Statistics</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Users className="h-5 w-5 text-blue-600" />
                            <span className="font-medium text-blue-900">Subscribers</span>
                          </div>
                          <div className="text-xl font-bold text-blue-900">{product.creator.channelStats.subscribers}</div>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <Eye className="h-5 w-5 text-green-600" />
                            <span className="font-medium text-green-900">Total Views</span>
                          </div>
                          <div className="text-xl font-bold text-green-900">{product.creator.channelStats.totalViews}</div>
                        </div>
                        <div className="p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center space-x-2 mb-2">
                            <TrendingUp className="h-5 w-5 text-purple-600" />
                            <span className="font-medium text-purple-900">Engagement</span>
                          </div>
                          <div className="text-xl font-bold text-purple-900">{product.creator.channelStats.engagementRate}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Languages</h4>
                      <div className="flex items-center space-x-2">
                        <Languages className="h-5 w-5 text-gray-600" />
                        <span className="text-gray-700">{product.creator.languages.join(', ')}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Channel Link</h4>
                      <a
                        href={product.creator.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink className="h-4 w-4" />
                        <span>Visit YouTube Channel</span>
                      </a>
                    </div>

                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-3">Rules & Requirements</h4>
                      <ul className="space-y-2">
                        {product.creator.rules.map((rule, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {/* Proof of Work Tab */}
                {activeTab === 'proof' && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Proof</h3>
                      <p className="text-gray-600 mb-6">
                        Verified screenshots from the creator's channel dashboard showing real performance metrics.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {product.proofScreenshots.map((proof, index) => (
                        <div
                          key={index}
                          className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                          onClick={() => openProofModal(proof)}
                        >
                          <div className="aspect-video relative">
                            <img
                              src={proof.image}
                              alt={proof.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200">
                              <Eye className="h-8 w-8 text-white" />
                            </div>
                          </div>
                          <div className="p-4">
                            <h4 className="font-semibold text-gray-900 mb-2">{proof.title}</h4>
                            <p className="text-sm text-gray-600">{proof.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-5 w-5 text-blue-600" />
                        <span className="font-medium text-blue-900">Verified Performance</span>
                      </div>
                      <p className="text-blue-800 text-sm">
                        All performance screenshots are verified by our team to ensure authenticity and accuracy.
                      </p>
                    </div>

                    <div className="text-center">
                      <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                        <BarChart3 className="h-5 w-5 mr-2" />
                        View Live Analytics
                      </button>
                      <p className="text-sm text-gray-600 mt-2">
                        Access real-time channel performance data
                      </p>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        <span className="font-semibold text-gray-900">{product.rating}</span>
                        <span className="text-gray-600">({productReviews.length} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-6">
                      {productReviews.map((review) => (
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
                                    Verified Purchase
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
                                <span className="text-sm text-gray-600">• {review.package}</span>
                              </div>
                              <h5 className="font-medium text-gray-900 mb-2">{review.title}</h5>
                              <p className="text-gray-700 mb-3">{review.comment}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600">
                                  <ThumbsUp className="h-4 w-4" />
                                  <span>Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600">
                                  <Flag className="h-4 w-4" />
                                  <span>Report</span>
                                </button>
                              </div>
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

          {/* Right Column - Pricing and Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-6">
              {/* Pricing Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Choose a Package</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${platformColors[product.platform]}`}>
                    {product.platform}
                  </span>
                </div>

                {/* Package Selection */}
                <div className="space-y-3 mb-6">
                  {product.packages.map((pkg) => (
                    <div
                      key={pkg.id}
                      className={`relative border rounded-lg p-4 cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 left-4 bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{pkg.name}</h4>
                        <div className="text-right">
                          {pkg.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">${pkg.originalPrice}</span>
                          )}
                          <div className="text-xl font-bold text-gray-900">${pkg.price}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{pkg.deliveryTime}</span>
                        </div>
                        <div>{pkg.revisions} revision{pkg.revisions !== 1 ? 's' : ''}</div>
                      </div>
                      <ul className="space-y-1">
                        {pkg.features.slice(0, 3).map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2 text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                        {pkg.features.length > 3 && (
                          <li className="text-sm text-gray-600">
                            +{pkg.features.length - 3} more features
                          </li>
                        )}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
                    Continue (${selectedPackageData?.price})
                  </button>
                  <button
                    onClick={() => setShowChatModal(true)}
                    className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center space-x-2"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>Contact Seller</span>
                  </button>
                </div>

                {/* Additional Actions */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors duration-200">
                    <Heart className="h-4 w-4" />
                    <span className="text-sm">Save</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                    <span className="text-sm">Share</span>
                  </button>

                </div>
              </div>

              {/* Seller Info Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <img
                    src={product.creator.avatar}
                    alt={product.creator.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{product.creator.name}</h4>
                      {product.creator.verified && (
                        <Verified className="h-4 w-4 text-blue-500 fill-current" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{product.creator.level}</p>
                  </div>
                  <div className="ml-auto">
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-green-600">Online</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{product.creator.rating}</div>
                    <div className="text-xs text-gray-600">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-gray-900">{product.creator.responseTime}</div>
                    <div className="text-xs text-gray-600">Response</div>
                  </div>
                </div>

                <button
                  onClick={() => setShowChatModal(true)}
                  className="w-full border border-blue-600 text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-blue-50 transition-colors duration-200 mb-4"
                >
                  Message Seller
                </button>

                {/* Meeting Scheduler */}
                <MeetingScheduler
                  sellerUsername={product.creator.username || 'demo-seller'}
                  sellerName={product.creator.name}
                  gigId={product.id.toString()}
                  sellerId={product.creator.id || 'seller-1'}
                  onBookingComplete={(booking) => {
                    console.log('Meeting scheduled:', booking);
                    // You can add additional logic here
                  }}
                />
              </div>

              {/* Trust & Safety */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Trust & Safety</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-700">Secure payment protection</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-700">Verified seller profile</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-purple-500" />
                    <span className="text-sm text-gray-700">Quality guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Gigs Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Related Gigs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedGigs.map((gig) => (
              <Link
                key={gig.id}
                to={`/gig/${gig.id}`}
                className="group bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={gig.image}
                    alt={gig.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <img
                      src={gig.avatar}
                      alt={gig.creator}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm font-medium text-gray-900">{gig.creator}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {gig.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-900">{gig.rating}</span>
                      <span className="text-sm text-gray-600">({gig.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-gray-900">${gig.price}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Proof Modal */}
      {showProofModal && selectedProof && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">{selectedProof.title}</h3>
                <button
                  onClick={() => setShowProofModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <img
                src={selectedProof.image}
                alt={selectedProof.title}
                className="w-full rounded-lg mb-4"
              />
              <p className="text-gray-700">{selectedProof.description}</p>
            </div>
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {showChatModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">Contact {product.creator.name}</h3>
                <button
                  onClick={() => setShowChatModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="mb-4">
                <textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your message here..."
                  rows={4}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowChatModal(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Meeting Scheduler is now integrated into the seller info card */}
    </div>
  );
};

export default ProductDetail;