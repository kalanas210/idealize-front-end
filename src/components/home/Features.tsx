import React from 'react';
import { Shield, Users, Search, Heart, Coffee, Zap } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: 'Your money stays safe',
      description: "We hold your payment until you're happy with the work. No more awkward conversations about refunds.",
      color: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
      accent: 'border-emerald-200'
    },
    {
      icon: Users,
      title: 'Real people, real results',
      description: "Every creator is verified by us. Check out their previous work, read honest reviews, and see what they're actually good at.",
      color: 'bg-blue-50',
      iconColor: 'text-blue-600',
      accent: 'border-blue-200'
    },
    {
      icon: Search,
      title: 'Find your perfect match',
      description: "Skip the endless DMs. Our filters help you find creators who actually fit your niche, budget, and vibe.",
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      accent: 'border-purple-200'
    },
    {
      icon: Heart,
      title: 'No nasty surprises',
      description: "What you see is what you pay. No hidden fees, no last-minute add-ons. Just honest pricing from creators who know their worth.",
      color: 'bg-pink-50',
      iconColor: 'text-pink-600',
      accent: 'border-pink-200'
    },
    {
      icon: Coffee,
      title: 'Chat like humans',
      description: "Talk directly with creators. Share your ideas, get their input, and build something amazing together.",
      color: 'bg-amber-50',
      iconColor: 'text-amber-600',
      accent: 'border-amber-200'
    },
    {
      icon: Zap,
      title: 'Quality you can count on',
      description: "Our community keeps everyone honest. Real reviews, fair ratings, and we're here to help if something goes wrong.",
      color: 'bg-indigo-50',
      iconColor: 'text-indigo-600',
      accent: 'border-indigo-200'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Why creators 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}love us
            </span>
          </h2>
          <p className="text-xl text-slate-600 leading-relaxed">
            We're not just another platform. We're the place where real connections happen between brands and creators who actually care about their work.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-8 shadow-sm border ${feature.accent} hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1`}
              >
                {/* Background decoration */}
                <div className={`absolute inset-0 ${feature.color} opacity-30 rounded-2xl transition-opacity duration-300 group-hover:opacity-50`}></div>
                
                <div className="relative">
                  <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`h-6 w-6 ${feature.iconColor}`} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-slate-800 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 bg-slate-900 text-white rounded-full font-medium hover:bg-slate-800 transition-colors duration-200">
            <span className="mr-2">✨</span>
            <span>Join thousands of happy creators</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;