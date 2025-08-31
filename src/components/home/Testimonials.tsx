import React from 'react';
import { Star, Quote, ArrowLeft, ArrowRight } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Jessica Martinez',
      title: 'Marketing Director',
      company: 'TechStart Inc.',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Socyads transformed our influencer marketing strategy. We found amazing creators who perfectly matched our brand values and delivered incredible results. The ROI exceeded our expectations by 300%!',
      campaign: 'Product Launch Campaign',
      result: '300% ROI increase'
    },
    {
      id: 2,
      name: 'David Chen',
      title: 'Brand Manager',
      company: 'Fashion Forward',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The platform made it so easy to connect with top-tier influencers. The secure payment system and quality of creators on Socyads is unmatched. We\'ve run 15+ successful campaigns here.',
      campaign: 'Brand Awareness',
      result: '2.5M impressions'
    },
    {
      id: 3,
      name: 'Sarah Thompson',
      title: 'Content Creator',
      company: '@sarahlifestyle',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'As a creator, Socyads has been a game-changer for my business. The clients are professional, payments are secure, and the platform makes collaboration seamless. I\'ve tripled my income!',
      campaign: 'Creator Success',
      result: '300% income increase'
    },
    {
      id: 4,
      name: 'Michael Rodriguez',
      title: 'E-commerce Owner',
      company: 'GadgetHub',
      avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'The quality of influencers and the ease of finding the right match for our niche market is incredible. Socyads helped us scale our business to new heights with authentic partnerships.',
      campaign: 'Product Reviews',
      result: '150% sales growth'
    },
    {
      id: 5,
      name: 'Emily Parker',
      title: 'Social Media Manager',
      company: 'HealthWell Co.',
      avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 5,
      text: 'Working with influencers through Socyads has been seamless. The analytics, communication tools, and escrow system provide everything we need for successful campaigns.',
      campaign: 'Health Campaign',
      result: '500K+ engagement'
    }
  ];

  const [currentIndex, setCurrentIndex] = React.useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  React.useEffect(() => {
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleTestimonials = () => {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      visible.push(testimonials[(currentIndex + i) % testimonials.length]);
    }
    return visible;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What Our 
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}Community
            </span>
            {" "}Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what brands and creators 
            are saying about their experience with Socyads.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="relative">
          {/* Main Testimonials */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {getVisibleTestimonials().map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`bg-white rounded-2xl p-8 border border-gray-200 shadow-lg transition-all duration-500 transform ${
                  index === 1 ? 'lg:scale-105 lg:shadow-xl' : 'lg:scale-95'
                }`}
              >
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-blue-500 mb-6 opacity-60" />

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-lg leading-relaxed mb-6 text-gray-700">
                  "{testimonial.text}"
                </p>

                {/* Campaign Info */}
                <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">Campaign</p>
                      <p className="font-semibold text-gray-900">{testimonial.campaign}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Result</p>
                      <p className="font-semibold text-blue-600">{testimonial.result}</p>
                    </div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center space-x-4">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.title}</p>
                    <p className="text-sm text-gray-500">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200 group shadow-sm"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
            <button
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all duration-200 group shadow-sm"
            >
              <ArrowRight className="h-6 w-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
            </button>
          </div>

          {/* Indicators */}
          <div className="flex justify-center space-x-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-blue-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">4.9/5</div>
            <div className="text-gray-600">Average Rating</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">50K+</div>
            <div className="text-gray-600">Happy Customers</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-gray-600">Support Available</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-white rounded-2xl p-6 border border-gray-200 shadow-lg">
            <div className="text-left">
              <p className="font-semibold text-gray-900">Ready to join our success stories?</p>
              <p className="text-sm text-gray-600">Start your influencer marketing journey today</p>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;