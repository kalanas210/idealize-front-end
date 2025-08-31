import React, { useState } from 'react';
import { Sparkles, Send, Loader2, AlertCircle, CheckCircle, Star, ExternalLink, MapPin, Calendar, Users } from 'lucide-react';

interface Creator {
  id: string;
  name: string;
  username: string;
  avatar: string;
  verified: boolean;
  platform: string;
  social_username: string;
  social_url: string;
  followers_count: number;
  location: string;
  bio: string;
  skills: string[];
  member_since: string;
  gig: {
    id: string;
    title: string;
    price: number;
    rating: number;
    reviews: number;
  };
  stats: any;
}

interface AIResponse {
  query: string;
  recommendations: string;
  creatorsAnalyzed: number;
  recommendedCreators: Creator[];
}

const AskWithAI = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<AIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch('http://localhost:5000/api/ai/ask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userQuery: query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error?.message || 'Failed to get AI recommendations');
      }

      setResponse(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return '🎥';
      case 'instagram':
        return '📸';
      case 'tiktok':
        return '🎵';
      case 'facebook':
        return '📘';
      case 'twitter':
        return '🐦';
      default:
        return '📱';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'youtube':
        return 'bg-red-100 text-red-600';
      case 'instagram':
        return 'bg-pink-100 text-pink-600';
      case 'tiktok':
        return 'bg-black text-white';
      case 'facebook':
        return 'bg-blue-100 text-blue-600';
      case 'twitter':
        return 'bg-sky-100 text-sky-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  const formatRecommendations = (recommendations: string) => {
    // Convert markdown-like formatting to JSX
    return recommendations
      .split('\n')
      .map((line, index) => {
        if (line.startsWith('## ')) {
          return (
            <h2 key={index} className="text-2xl font-bold text-gray-900 mt-6 mb-4">
              {line.replace('## ', '')}
            </h2>
          );
        }
        if (line.startsWith('### ')) {
          return (
            <h3 key={index} className="text-xl font-semibold text-gray-800 mt-4 mb-2">
              {line.replace('### ', '')}
            </h3>
          );
        }
        if (line.startsWith('**') && line.endsWith('**')) {
          return (
            <p key={index} className="font-semibold text-gray-700 mb-2">
              {line.replace(/\*\*/g, '')}
            </p>
          );
        }
        if (line.startsWith('- ')) {
          return (
            <li key={index} className="text-gray-600 ml-4">
              {line.replace('- ', '')}
            </li>
          );
        }
        if (line.trim() === '') {
          return <br key={index} />;
        }
        if (line.trim()) {
          return (
            <p key={index} className="text-gray-600 mb-2">
              {line}
            </p>
          );
        }
        return null;
      });
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            AI-Powered Creator Matching
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Ask AI to Find Your Perfect Creators
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Describe your campaign in natural language and let our AI find the best content creators for your brand.
          </p>
        </div>

        {/* AI Input Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="ai-query" className="block text-sm font-medium text-gray-700 mb-2">
                Describe your campaign needs
              </label>
              <textarea
                id="ai-query"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="e.g., I want to promote cricket shoes to 18-30 year-old men in Sri Lanka"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                rows={3}
                maxLength={500}
                disabled={isLoading}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  Be specific about your target audience, location, and content type
                </p>
                <span className="text-sm text-gray-400">
                  {query.length}/500
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!query.trim() || isLoading}
              className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Analyzing creators...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Ask with AI
                </>
              )}
            </button>
          </form>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-8">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* AI Response */}
        {response && (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                <h3 className="text-xl font-semibold text-gray-900">
                  AI Recommendations
                </h3>
              </div>
              <div className="text-sm text-gray-500">
                Analyzed {response.creatorsAnalyzed} creators
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600 mb-1">Your query:</p>
                <p className="font-medium text-gray-900">"{response.query}"</p>
              </div>

              {/* Creator Cards */}
              {response.recommendedCreators && response.recommendedCreators.length > 0 && (
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Top Recommended Creators</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                    {response.recommendedCreators.map((creator, index) => (
                      <div key={creator.id} className="bg-white rounded-xl p-6 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 group min-w-0">
                        {/* Creator Header */}
                        <div className="flex items-start space-x-3 mb-4">
                          <div className="relative flex-shrink-0">
                            <img
                              src={creator.avatar}
                              alt={creator.name}
                              className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-md group-hover:shadow-lg transition-shadow duration-200"
                            />
                            {creator.verified && (
                              <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-1">
                              <h5 className="font-semibold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200 text-sm">
                                {creator.name}
                              </h5>
                              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 sm:mt-0 ${getPlatformColor(creator.platform)}`}>
                                {getPlatformIcon(creator.platform)} {creator.platform}
                              </span>
                            </div>
                            <p className="text-xs text-gray-600 truncate">{creator.social_username}</p>
                            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs text-gray-500">
                              <div className="flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                <span className="truncate">{creator.location}</span>
                              </div>
                              <div className="flex items-center">
                                <Users className="w-3 h-3 mr-1" />
                                {formatNumber(creator.followers_count)}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {creator.member_since}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Creator Bio */}
                        <p className="text-xs text-gray-600 mb-3 line-clamp-2">{creator.bio}</p>

                        {/* Skills */}
                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {creator.skills?.slice(0, 2).map((skill, skillIndex) => (
                              <span key={skillIndex} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Stats */}
                        {creator.stats && (
                          <div className="mb-3 p-2 bg-gray-50 rounded-lg">
                            <div className="grid grid-cols-2 gap-1 text-xs">
                              <div className="text-center">
                                <p className="text-gray-500 text-xs">Engagement</p>
                                <p className="font-semibold text-gray-900 text-xs">
                                  {creator.stats.engagement_rate || 'N/A'}%
                                </p>
                              </div>
                              <div className="text-center">
                                <p className="text-gray-500 text-xs">Avg Views</p>
                                <p className="font-semibold text-gray-900 text-xs">
                                  {formatNumber(creator.stats.avg_views || creator.stats.avg_likes || 0)}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Gig Information */}
                        {creator.gig && (
                          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-2 mb-3 border border-blue-200">
                            <h6 className="font-medium text-gray-900 text-xs mb-2 line-clamp-2">
                              {creator.gig.title}
                            </h6>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-1">
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600 ml-1">{creator.gig.rating}</span>
                                </div>
                                <span className="text-xs text-gray-500">({creator.gig.reviews})</span>
                              </div>
                              <span className="font-semibold text-green-600 text-xs">
                                ${creator.gig.price}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex space-x-2">
                          <a
                            href={`/gig/${creator.gig?.id || creator.id}`}
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-medium py-2 px-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 text-center transform hover:scale-105"
                          >
                            View Gig
                          </a>
                          <a
                            href={creator.social_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center px-2 py-2 border border-gray-300 text-gray-700 text-xs rounded-lg hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                            title="Visit Social Profile"
                          >
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Analysis */}
              <div className="space-y-4">
                {formatRecommendations(response.recommendations)}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Ready to connect with these creators?{' '}
                <a href="/explore" className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse all creators
                </a>
              </p>
            </div>
          </div>
        )}

        {/* Example Queries */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Try these example queries:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 max-w-6xl mx-auto">
            {[
              "I want to promote cricket shoes to 18-30 year-old men in Sri Lanka",
              "Looking for fitness influencers to promote my protein powder",
              "Need tech reviewers for my new smartphone launch",
              "Want beauty creators for my skincare brand"
            ].map((example, index) => (
              <button
                key={index}
                onClick={() => setQuery(example)}
                className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 hover:border-blue-300 hover:text-blue-600 transition-colors duration-200 text-left line-clamp-2"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AskWithAI; 