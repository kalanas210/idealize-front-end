import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import VideoModal from '../components/common/VideoModal';
import FeedbackModal from '../components/common/FeedbackModal';
import howItWorksService from '../services/howItWorksService';
import { 
  Search, 
  MessageSquare, 
  CreditCard, 
  Star, 
  ArrowRight, 
  CheckCircle, 
  Play,
  Users,
  Shield,
  Zap,
  Clock,
  Award,
  Heart,
  TrendingUp,
  Camera,
  Mic,
  Edit,
  Send,
  DollarSign,
  ThumbsUp,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Lightbulb,
  Target,
  Globe
} from 'lucide-react';

interface ProcessStep {
  step: number;
  icon: any;
  title: string;
  description: string;
  details: string[];
  tips: string[];
  demoVideo?: string;
}

interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags?: string[];
  helpful_count?: number;
}

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'buyers' | 'sellers'>('buyers');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [playingVideo, setPlayingVideo] = useState<string | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<{ url: string; title: string; description?: string } | null>(null);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const buyerSteps: ProcessStep[] = [
    {
      step: 1,
      icon: Search,
      title: 'Discover Perfect Creators',
      description: 'Find creators who match your brand, audience, and campaign goals using our advanced search and AI recommendations.',
      details: [
        'Search by platform, niche, audience demographics, and engagement rates',
        'Use AI-powered recommendations based on your brand profile',
        'Filter by location, language, and content style',
        'Browse verified creator portfolios and past work',
        'Read authentic reviews from other brands'
      ],
      tips: [
        'Use specific keywords related to your industry for better matches',
        'Check creator engagement rates, not just follower counts',
        'Look for creators whose audience aligns with your target market'
      ],
      demoVideo: '/videos/discover-creators-demo.mp4'
    },
    {
      step: 2,
      icon: MessageSquare,
      title: 'Connect & Collaborate',
      description: 'Chat directly with creators, share your vision, and plan the perfect collaboration with no middlemen.',
      details: [
        'Direct messaging with instant notifications',
        'Share brand guidelines, assets, and campaign briefs',
        'Schedule video calls for detailed discussions',
        'Negotiate terms and deliverables transparently',
        'Get creative input and content strategy advice'
      ],
      tips: [
        'Be clear about your expectations and deliverables',
        'Share your brand voice and style guidelines early',
        'Ask for creator input - they know their audience best'
      ],
      demoVideo: '/videos/messaging-demo.mp4'
    },
    {
      step: 3,
      icon: CreditCard,
      title: 'Secure Payment & Protection',
      description: 'Pay with confidence using our escrow system. Your money is protected until you approve the final content.',
      details: [
        'Secure escrow payment system protects both parties',
        'Multiple payment options (credit card, PayPal, bank transfer)',
        'Milestone-based payments for larger projects',
        'Automatic dispute resolution system',
        'Full refund protection for unsatisfactory work'
      ],
      tips: [
        'Set clear milestones for larger campaigns',
        'Review content thoroughly before final approval',
        'Use our dispute resolution if issues arise'
      ],
      demoVideo: '/videos/payment-demo.mp4'
    },
    {
      step: 4,
      icon: Star,
      title: 'Launch & Measure Success',
      description: 'Get your content, track performance, and build lasting relationships with top creators.',
      details: [
        'Receive high-quality content on schedule',
        'Track campaign performance with detailed analytics',
        'Download usage rights and content files',
        'Leave reviews to help the creator community',
        'Build long-term partnerships with successful creators'
      ],
      tips: [
        'Monitor performance metrics closely in the first 48 hours',
        'Engage with creator posts to boost reach',
        'Leave detailed reviews to help other brands'
      ],
      demoVideo: '/videos/success-demo.mp4'
    }
  ];

  const sellerSteps: ProcessStep[] = [
    {
      step: 1,
      icon: Users,
      title: 'Create Your Creator Profile',
      description: 'Build a compelling profile that showcases your unique style, audience, and the value you bring to brands.',
      details: [
        'Upload high-quality portfolio samples',
        'Connect and verify your social media accounts',
        'Add detailed audience demographics and insights',
        'Set your rates and service packages',
        'Complete identity verification for trust'
      ],
      tips: [
        'Use professional photos and well-written descriptions',
        'Showcase your best work and diverse content styles',
        'Keep your rates competitive but fair to your value'
      ],
      demoVideo: '/videos/profile-creation-demo.mp4'
    },
    {
      step: 2,
      icon: Target,
      title: 'Get Discovered by Brands',
      description: 'Optimize your profile for discoverability and start receiving collaboration requests from relevant brands.',
      details: [
        'Appear in search results based on your niche and skills',
        'Receive AI-matched collaboration opportunities',
        'Get featured in platform recommendations',
        'Apply to open brand campaigns and briefs',
        'Build your reputation through successful collaborations'
      ],
      tips: [
        'Use relevant keywords in your bio and skills',
        'Stay active and update your portfolio regularly',
        'Respond quickly to brand inquiries'
      ],
      demoVideo: '/videos/discovery-demo.mp4'
    },
    {
      step: 3,
      icon: Edit,
      title: 'Create Amazing Content',
      description: 'Collaborate with brands to create authentic content that resonates with your audience and drives results.',
      details: [
        'Work directly with brands on content strategy',
        'Use provided brand assets and guidelines',
        'Create authentic content that fits your style',
        'Get feedback and revisions before final delivery',
        'Deliver content through our secure platform'
      ],
      tips: [
        'Stay true to your authentic voice and style',
        'Communicate proactively about progress and challenges',
        'Exceed expectations to build long-term relationships'
      ],
      demoVideo: '/videos/content-creation-demo.mp4'
    },
    {
      step: 4,
      icon: DollarSign,
      title: 'Get Paid & Grow',
      description: 'Receive secure payments, build your reputation, and scale your creator business with premium opportunities.',
      details: [
        'Automatic payments released upon content approval',
        'Fast payouts to your preferred payment method',
        'Build 5-star ratings and testimonials',
        'Access to premium brand partnerships',
        'Exclusive opportunities and higher-paying campaigns'
      ],
      tips: [
        'Deliver on time to maintain high ratings',
        'Ask satisfied clients for detailed testimonials',
        'Continuously improve your skills and content quality'
      ],
      demoVideo: '/videos/payment-growth-demo.mp4'
    }
  ];

  const platformFeatures = [
    {
      icon: Shield,
      title: 'Secure & Protected',
      description: 'Advanced security measures protect your data, payments, and intellectual property.',
      features: ['SSL encryption', 'PCI compliance', 'GDPR compliant', 'Fraud protection']
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Find creators, negotiate deals, and launch campaigns faster than traditional agencies.',
      features: ['Instant messaging', 'Quick search filters', 'Rapid onboarding', 'Real-time notifications']
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'All creators are verified and vetted to ensure you work with genuine, high-quality influencers.',
      features: ['Identity verification', 'Portfolio validation', 'Performance tracking', 'Review system']
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Connect with creators worldwide across all major platforms and in 50+ languages.',
      features: ['200+ countries', '50+ languages', 'All platforms', 'Local expertise']
    }
  ];

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'How much does it cost to use Socyads?',
      answer: 'Socyads is free to join and browse. We only charge a small service fee (5-10%) when a successful collaboration is completed. This fee covers payment processing, platform maintenance, and customer support.',
      category: 'pricing'
    },
    {
      id: 2,
      question: 'How do I know if a creator is legitimate?',
      answer: 'All creators go through our verification process which includes identity verification, social media account verification, and portfolio validation. Look for the verified badge and check their reviews from previous collaborations.',
      category: 'safety'
    },
    {
      id: 3,
      question: 'What happens if I\'m not satisfied with the content?',
      answer: 'We offer multiple rounds of revisions as agreed upon with the creator. If you\'re still not satisfied, our dispute resolution team will mediate. In extreme cases, we offer full refund protection through our escrow system.',
      category: 'quality'
    },
    {
      id: 4,
      question: 'How long does it typically take to complete a collaboration?',
      answer: 'Timeline varies by project complexity. Simple posts can be completed in 2-5 days, while comprehensive campaigns may take 1-4 weeks. You can discuss and agree on timelines directly with creators.',
      category: 'timing'
    },
    {
      id: 5,
      question: 'Can I work with the same creator multiple times?',
      answer: 'Absolutely! Many brands build long-term relationships with creators. You can bookmark favorite creators, invite them to new campaigns, and even set up retainer agreements for ongoing collaborations.',
      category: 'relationships'
    },
    {
      id: 6,
      question: 'What rights do I get to the content created?',
      answer: 'Usage rights are negotiated with each creator and clearly specified in the collaboration agreement. This can range from social media usage only to full commercial rights including advertising and promotional use.',
      category: 'legal'
    },
    {
      id: 7,
      question: 'How do I track the performance of my campaigns?',
      answer: 'Our analytics dashboard provides detailed performance metrics including reach, engagement, clicks, and conversions. Creators can also share native platform insights for deeper analysis.',
      category: 'analytics'
    },
    {
      id: 8,
      question: 'Can I cancel a collaboration after it\'s started?',
      answer: 'Cancellation policies are set by individual creators and outlined before you start. Generally, you can cancel with minimal fees if work hasn\'t begun, but may incur charges for work already completed.',
      category: 'policies'
    }
  ];

  const successStats = [
    { number: '50K+', label: 'Active Creators', icon: Users },
    { number: '10K+', label: 'Successful Campaigns', icon: TrendingUp },
    { number: '98%', label: 'Client Satisfaction', icon: ThumbsUp },
    { number: '24/7', label: 'Support Available', icon: Clock }
  ];

  // Load data from API on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const result = await howItWorksService.getAllData();
        
        if (!result.success) {
          setError(result.error || 'Failed to load data');
        }
      } catch (err) {
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  const playVideo = (videoUrl: string, title: string, description?: string) => {
    setSelectedVideo({ url: videoUrl, title, description });
  };

  const closeVideoModal = () => {
    setSelectedVideo(null);
  };

  const handleFAQHelpful = async (faqId: number) => {
    try {
      await howItWorksService.markFAQAsHelpful(faqId);
      // You could update local state here to reflect the change
    } catch (error) {
      console.error('Error marking FAQ as helpful:', error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              How Socyads
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {" "}Actually Works
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              The simplest way to connect brands with creators. No agencies, no middlemen, 
              just authentic collaborations that drive real results.
            </p>
            
            {/* Tab Selector */}
            <div className="inline-flex bg-white rounded-lg p-1 shadow-sm border border-gray-200 mb-12">
              <button
                onClick={() => setActiveTab('buyers')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'buyers'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Brands
              </button>
              <button
                onClick={() => setActiveTab('sellers')}
                className={`px-6 py-3 rounded-md font-medium transition-all duration-200 ${
                  activeTab === 'sellers'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                For Creators
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {activeTab === 'buyers' ? 'How Brands Find Success' : 'How Creators Grow Their Business'}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {activeTab === 'buyers' 
                ? 'Four simple steps to launch successful influencer campaigns'
                : 'Build your creator business with authentic brand partnerships'
              }
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-32 left-0 right-0">
              <div className="flex justify-between items-center max-w-5xl mx-auto px-20">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex-1 flex justify-center">
                    <ArrowRight className="h-8 w-8 text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative">
              {(activeTab === 'buyers' ? buyerSteps : sellerSteps).map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={index} className="relative group">
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                      {/* Step Number */}
                      <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${
                        activeTab === 'buyers' ? 'bg-blue-600' : 'bg-purple-600'
                      }`}>
                        <span className="text-white font-bold text-xl">{step.step}</span>
                      </div>
                      
                      {/* Icon */}
                      <div className={`w-20 h-20 rounded-xl flex items-center justify-center mb-6 ${
                        activeTab === 'buyers' ? 'bg-blue-50' : 'bg-purple-50'
                      }`}>
                        <Icon className={`h-10 w-10 ${
                          activeTab === 'buyers' ? 'text-blue-600' : 'text-purple-600'
                        }`} />
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-xl font-bold text-gray-900 mb-4">
                        {step.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {step.description}
                      </p>
                      
                      {/* Details */}
                      <div className="space-y-3 mb-6">
                        {step.details.slice(0, 3).map((detail, detailIndex) => (
                          <div key={detailIndex} className="flex items-start space-x-3 text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{detail}</span>
                          </div>
                        ))}
                      </div>

                      {/* Pro Tips */}
                      <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center space-x-2 mb-2">
                          <Lightbulb className="h-4 w-4 text-yellow-500" />
                          <span className="text-sm font-medium text-gray-900">Pro Tips</span>
                        </div>
                        <ul className="space-y-1">
                          {step.tips.map((tip, tipIndex) => (
                            <li key={tipIndex} className="text-xs text-gray-600">
                              • {tip}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Demo Video Button */}
                      {step.demoVideo && (
                        <button
                          onClick={() => playVideo(step.demoVideo!, `${step.title} Demo`, step.description)}
                          className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
                            activeTab === 'buyers'
                              ? 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              : 'bg-purple-100 text-purple-700 hover:bg-purple-200'
                          }`}
                        >
                          <Play className="h-4 w-4" />
                          <span>Watch Demo</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose Socyads?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built-in features that make influencer marketing simple, secure, and successful
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-1">
                    {feature.features.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-sm text-gray-500 flex items-center space-x-2">
                        <CheckCircle className="h-3 w-3 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Success Stats */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Thousands of Successful Collaborations
            </h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Real numbers from real campaigns
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {successStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-blue-100">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about how Socyads works
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.id} className="bg-gray-50 rounded-lg border border-gray-200">
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-100 transition-colors duration-200"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {openFAQ === faq.id ? (
                    <ChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </button>
                {openFAQ === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {faq.answer}
                    </p>
                    <div className="flex items-center justify-between">
                      <button
                        onClick={() => handleFAQHelpful(faq.id)}
                        className="text-sm text-gray-500 hover:text-green-600 transition-colors duration-200 flex items-center space-x-1"
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>Helpful ({faq.helpful_count || 0})</span>
                      </button>
                      <div className="flex items-center space-x-2 text-xs text-gray-400">
                        {faq.tags?.map((tag, tagIndex) => (
                          <span key={tagIndex} className="bg-gray-100 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of brands and creators building authentic partnerships
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/explore"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Search className="h-5 w-5" />
              <span>Find Creators</span>
            </Link>
            <Link
              to="/become-seller"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-2"
            >
              <Heart className="h-5 w-5" />
              <span>Become a Creator</span>
            </Link>
          </div>

          <div className="mt-8 text-gray-400 text-sm flex items-center justify-between">
            <p>Questions? <Link to="/support" className="text-blue-400 hover:text-blue-300">Contact our support team</Link></p>
            <button
              onClick={() => setShowFeedbackModal(true)}
              className="text-blue-400 hover:text-blue-300 underline"
            >
              Give us feedback
            </button>
          </div>
        </div>
      </section>

      {/* Interactive Components */}
      <VideoModal
        isOpen={!!selectedVideo}
        onClose={closeVideoModal}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title || ''}
        description={selectedVideo?.description}
      />

      <FeedbackModal
        isOpen={showFeedbackModal}
        onClose={() => setShowFeedbackModal(false)}
        section="how-it-works"
        userType={activeTab === 'buyers' ? 'buyer' : 'seller'}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-75 flex items-center justify-center z-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading How it Works...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded z-50">
          <p>{error}</p>
          <button
            onClick={() => setError('')}
            className="float-right ml-2 text-red-500 hover:text-red-700"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default HowItWorks;
