import React from 'react';
import { Search, MessageSquare, CreditCard, Star, ArrowRight, CheckCircle } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      step: 1,
      icon: Search,
      title: 'Find your people',
      description: 'Browse creators who actually fit your brand. No more endless scrolling through irrelevant profiles.',
      details: ['Search by platform, niche, and vibe', 'Check out real work examples', 'Read honest reviews from other brands']
    },
    {
      step: 2,
      icon: MessageSquare,
      title: 'Have a chat',
      description: 'Talk directly with creators about your ideas. Share your vision, ask questions, and make sure you\'re both excited about the collaboration.',
      details: ['Direct messaging (no middlemen)', 'Share your brief and get feedback', 'Agree on timelines and deliverables']
    },
    {
      step: 3,
      icon: CreditCard,
      title: 'Pay with confidence',
      description: 'Your payment is safe with us. We hold the funds until you\'re happy with the work – no awkward conversations needed.',
      details: ['Secure payment protection', 'Multiple payment options', 'Money released when you\'re satisfied']
    },
    {
      step: 4,
      icon: Star,
      title: 'Share the love',
      description: 'Leave a review to help other brands discover great creators. Your feedback helps build a better community for everyone.',
      details: ['Rate your experience', 'Help creators build their reputation', 'Discover new talent through reviews']
    }
  ];

  const benefits = [
    { icon: CheckCircle, text: 'Every creator is verified' },
    { icon: CheckCircle, text: 'Your money stays protected' },
    { icon: CheckCircle, text: 'We\'re here to help 24/7' },
    { icon: CheckCircle, text: 'Fair dispute resolution' }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            How it 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}actually works
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            No complicated processes or corporate jargon. Just four simple steps to connect with creators who get your brand.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Lines - Desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 transform -translate-y-1/2">
            <div className="flex justify-between items-center px-32">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 flex items-center justify-center">
                  <ArrowRight className="h-6 w-6 text-slate-300" />
                </div>
              ))}
            </div>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition-shadow duration-300 h-full">
                    {/* Step Number */}
                    <div className="w-12 h-12 bg-slate-900 rounded-xl flex items-center justify-center mb-6">
                      <span className="text-white font-bold text-lg">{step.step}</span>
                    </div>
                    
                    {/* Icon */}
                    <div className="w-16 h-16 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-4">
                      {step.title}
                    </h3>
                    
                    <p className="text-slate-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>
                    
                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-start space-x-2 text-sm text-slate-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mt-20 bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Why brands trust us</h3>
            <p className="text-slate-600">We've built everything you need for successful collaborations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center space-x-3">
                <benefit.icon className="h-5 w-5 text-green-500 flex-shrink-0" />
                <span className="text-slate-700 font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;