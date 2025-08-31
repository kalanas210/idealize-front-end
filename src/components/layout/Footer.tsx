import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Linkedin, Youtube, Heart } from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Find creators',
      links: [
        { name: 'YouTube', href: '/category/youtube' },
        { name: 'Instagram', href: '/category/instagram' },
        { name: 'TikTok', href: '/category/tiktok' },
        { name: 'Twitter', href: '/category/twitter' },
        { name: 'All platforms', href: '/platforms' }
      ]
    },
    {
      title: 'For brands',
      links: [
        { name: 'Explore creators', href: '/influencers' },
        { name: 'How it works', href: '/how-it-works' },
        { name: 'Success stories', href: '/case-studies' },
        { name: 'Pricing', href: '/pricing' }
      ]
    },
    {
      title: 'For creators',
      links: [
        { name: 'Start earning', href: '/become-seller' },
        { name: 'Creator guide', href: '/resources' },
        { name: 'Community', href: '/community' },
        { name: 'Payments', href: '/payments' }
      ]
    },
    {
      title: 'Help & support',
      links: [
        { name: 'Help center', href: '/help' },
        { name: 'Contact us', href: '/contact' },
        { name: 'Safety', href: '/safety' },
        { name: 'Terms', href: '/terms' },
        { name: 'Privacy', href: '/privacy' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'YouTube', icon: Youtube, href: '#' }
  ];

  return (
    <footer className="bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center mb-6">
             <img 
                src="/logo.png" 
                alt="Socyads Logo" 
                className="h-10 w-auto object-contain"
              />
            </Link>
            <p className="text-slate-600 text-sm mb-6 max-w-sm leading-relaxed">
              We're building the friendliest place for creators and brands to work together. 
              Real people, real results, real relationships.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center hover:bg-slate-100 hover:border-slate-300 transition-colors duration-200 group"
                    aria-label={social.name}
                  >
                    <Icon className="h-4 w-4 text-slate-600 group-hover:text-slate-900 transition-colors duration-200" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-base font-semibold text-slate-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-slate-600 hover:text-slate-900 transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-slate-200 py-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
            <div className="mb-6 lg:mb-0">
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Stay in the loop</h3>
              <p className="text-slate-600 text-sm">
                Get creator tips, platform updates, and the occasional dose of inspiration.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 lg:min-w-[400px]">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-slate-900 focus:border-transparent text-slate-900 placeholder-slate-500"
              />
              <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-slate-200 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="text-slate-600 text-sm mb-4 md:mb-0">
              <p className="flex items-center">
                Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by the Socyads team
              </p>
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link to="/terms" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Terms
              </Link>
              <Link to="/privacy" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Privacy
              </Link>
              <Link to="/cookies" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Cookies
              </Link>
              <Link to="/accessibility" className="text-slate-600 hover:text-slate-900 transition-colors duration-200">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;