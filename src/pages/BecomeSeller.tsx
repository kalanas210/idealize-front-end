import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_ENDPOINTS, getFileUploadHeaders, getAuthHeaders } from '../config/api';
import { 
  ArrowRight, 
  CheckCircle, 
  Star, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Shield, 
  Clock, 
  Award, 
  Globe, 
  Zap,
  Play,
  ChevronRight,
  User,
  Mail,
  Phone,
  MapPin,
  Camera,
  Youtube,
  Instagram,
  Music,
  Facebook,
  Twitter,
  Linkedin,
  Upload,
  FileText,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useUser, useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { useUserProfile } from "../contexts/UserContext";

// Add types for social accounts
interface SocialAccount {
  username: string;
  followers: string;
  verified: boolean;
}

interface SocialAccounts {
  [key: string]: SocialAccount;
  youtube: SocialAccount;
  instagram: SocialAccount;
  tiktok: SocialAccount;
  facebook: SocialAccount;
  twitter: SocialAccount;
  linkedin: SocialAccount;
}

interface BecomeSellerFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  profileImage: null;
  professionalTitle: string;
  description: string;
  skills: string[];
  experience: string;
  languages: string[];
  socialAccounts: SocialAccounts;
  portfolioItems: any[];
  idDocument: null;
  addressProof: null;
}

const BecomeSeller = () => {
  const { isSignedIn } = useUser();
  const { getToken } = useAuth();
  const { updateUserRole, refetchProfile } = useUserProfile();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<BecomeSellerFormData>({
    // Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    profileImage: null,
    
    // Professional Info
    professionalTitle: '',
    description: '',
    skills: [],
    experience: '',
    languages: [],
    
    // Social Media
    socialAccounts: {
      youtube: { username: '', followers: '', verified: false },
      instagram: { username: '', followers: '', verified: false },
      tiktok: { username: '', followers: '', verified: false },
      facebook: { username: '', followers: '', verified: false },
      twitter: { username: '', followers: '', verified: false },
      linkedin: { username: '', followers: '', verified: false }
    },
    
    // Portfolio
    portfolioItems: [],
    
    // Verification
    idDocument: null,
    addressProof: null
  });

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [currentSkill, setCurrentSkill] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('');

  const steps = [
    { id: 1, title: 'Personal Information', description: 'Tell us about yourself' },
    { id: 2, title: 'Professional Profile', description: 'Your skills and experience' },
    { id: 3, title: 'Social Media', description: 'Connect your accounts' },
    { id: 4, title: 'Portfolio', description: 'Showcase your work' },
    { id: 5, title: 'Verification', description: 'Verify your identity' },
    { id: 6, title: 'Review', description: 'Review and submit' }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn Money',
      description: 'Set your own prices and keep 95% of what you earn',
      color: 'text-green-600'
    },
    {
      icon: Users,
      title: 'Global Reach',
      description: 'Connect with clients from around the world',
      color: 'text-blue-600'
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work when you want, how you want',
      color: 'text-purple-600'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'Protected transactions with escrow system',
      color: 'text-orange-600'
    }
  ];

  const stats = [
    { number: '10K+', label: 'Active Sellers' },
    { number: '$5M+', label: 'Paid to Creators' },
    { number: '50K+', label: 'Completed Orders' },
    { number: '4.9/5', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      title: 'YouTube Creator',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'Socyads helped me turn my passion into a profitable business. I\'ve earned over $50K in my first year!',
      earnings: '$50K+'
    },
    {
      name: 'Mike Chen',
      title: 'Tech Reviewer',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'The platform is incredibly user-friendly and the support team is amazing. Highly recommended!',
      earnings: '$75K+'
    },
    {
      name: 'Emma Wilson',
      title: 'Fitness Influencer',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      quote: 'I love the flexibility and the quality of clients I get through Socyads. It\'s been life-changing!',
      earnings: '$35K+'
    }
  ];

  const platformIcons = {
    youtube: Youtube,
    instagram: Instagram,
    tiktok: Music,
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin
  };

  const countries = [
    'United States', 'Canada', 'United Kingdom', 'Australia', 'Germany', 
    'France', 'Spain', 'Italy', 'Netherlands', 'Other'
  ];

  const skillSuggestions = [
    'Content Creation', 'Video Editing', 'Social Media Marketing', 'Photography',
    'Graphic Design', 'Copywriting', 'SEO', 'Influencer Marketing', 'Brand Strategy',
    'Community Management', 'Analytics', 'Live Streaming'
  ];

  const languageOptions = [
    'English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese',
    'Chinese', 'Japanese', 'Korean', 'Arabic', 'Hindi', 'Other'
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialAccountChange = (platform: keyof SocialAccounts, field: keyof SocialAccount, value: any) => {
    setFormData(prev => ({
      ...prev,
      socialAccounts: {
        ...prev.socialAccounts,
        [platform]: {
          ...prev.socialAccounts[platform],
          [field]: value
        }
      }
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const addLanguage = () => {
    if (currentLanguage && !formData.languages.includes(currentLanguage)) {
      setFormData(prev => ({
        ...prev,
        languages: [...prev.languages, currentLanguage]
      }));
      setCurrentLanguage('');
    }
  };

  const removeLanguage = (languageToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.filter(lang => lang !== languageToRemove)
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Client-side validation
      const validationErrors: {[key: string]: string} = {};
      
      // Check bio length
      if (!formData.description || formData.description.length < 20) {
        validationErrors.description = 'Bio must be at least 20 characters long';
      }
      
      // Check skills
      if (!formData.skills || formData.skills.length === 0) {
        validationErrors.skills = 'Please add at least one skill';
      }
      
      // Check languages
      if (!formData.languages || formData.languages.length === 0) {
        validationErrors.languages = 'Please add at least one language';
      }
      
      // Check required fields
      if (!formData.firstName) {
        validationErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        validationErrors.lastName = 'Last name is required';
      }
      if (!formData.email) {
        validationErrors.email = 'Email is required';
      }
      
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        setLoading(false);
        return;
      }
      
      // Clear any previous errors
      setErrors({});
      
      const token = await getToken();
      if (!token) {
        alert('Please sign in to continue');
        setLoading(false);
        return;
      }

      // 1. Upload profile photo if present
      let avatarUrl = '';
      if (formData.profileImage) {
        const form = new FormData();
        form.append('file', formData.profileImage);
        const res = await fetch(API_ENDPOINTS.UPLOAD.SINGLE, {
          method: 'POST',
          headers: getFileUploadHeaders(token),
          body: form
        });
        const data = await res.json();
        avatarUrl = data?.data?.url || '';
      }

      // 2. Upload portfolio items (if any)
      let portfolioUrls: string[] = [];
      if (formData.portfolioItems && formData.portfolioItems.length > 0) {
        const form = new FormData();
        formData.portfolioItems.forEach((file: File) => form.append('files', file));
        const res = await fetch(API_ENDPOINTS.UPLOAD.MULTIPLE, {
          method: 'POST',
          headers: getFileUploadHeaders(token),
          body: form
        });
        const data = await res.json();
        portfolioUrls = data?.data?.uploaded?.map((f: any) => f.url) || [];
      }

      // 3. Upload verification docs (if any)
      let verificationDocs: { type: string; url: string }[] = [];
      if (formData.idDocument) {
        const form = new FormData();
        form.append('file', formData.idDocument);
        const res = await fetch(API_ENDPOINTS.UPLOAD.SINGLE, {
          method: 'POST',
          headers: getFileUploadHeaders(token),
          body: form
        });
        const data = await res.json();
        if (data?.data?.url) {
          verificationDocs.push({ type: 'id', url: data.data.url });
        }
      }
      
      if (formData.addressProof) {
        const form = new FormData();
        form.append('file', formData.addressProof);
        const res = await fetch(API_ENDPOINTS.UPLOAD.SINGLE, {
          method: 'POST',
          headers: getFileUploadHeaders(token),
          body: form
        });
        const data = await res.json();
        if (data?.data?.url) {
          verificationDocs.push({ type: 'address', url: data.data.url });
        }
      }

      // 4. Transform data to match backend schema
      // Convert portfolio URLs to portfolio objects
      const portfolioItems = portfolioUrls.map((url, index) => ({
        title: `Portfolio Item ${index + 1}`,
        description: 'Portfolio showcase',
        imageUrl: url,
        type: 'image'
      }));

      // Filter social accounts to only include complete ones
      const validSocialAccounts = formData.socialAccounts?.filter(account => 
        account.platform && account.username && account.url
      ) || [];

      // 5. Send all data to become-seller endpoint
      const res = await fetch(API_ENDPOINTS.USER.BECOME_SELLER, {
        method: 'POST',
        headers: getAuthHeaders(token),
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          city: formData.city,
          professionalTitle: formData.professionalTitle,
          experience: formData.experience,
          bio: formData.description,
          skills: formData.skills,
          languages: formData.languages,
          location: `${formData.city}, ${formData.country}`,
          avatar: avatarUrl,
          socialAccounts: validSocialAccounts,
          portfolio: portfolioItems,
          verificationDocs: verificationDocs
        })
      });

      const result = await res.json();
      setLoading(false);
      
      if (res.ok && result.success) {
        console.log('✅ Seller registration successful, updating user role...');
        
        // Update user role to seller in context
        updateUserRole('seller');
        console.log('✅ User role updated in context');
        
        // Check localStorage to verify role was saved
        const storedRole = localStorage.getItem('userRole');
        console.log('🔍 localStorage role check:', storedRole);
        
        // Refetch user profile to ensure role is updated
        console.log('🔄 Refetching user profile...');
        await refetchProfile();
        console.log('✅ User profile refetched');
        
        // Check localStorage again after refetch
        const storedRoleAfter = localStorage.getItem('userRole');
        console.log('🔍 localStorage role check after refetch:', storedRoleAfter);
        
        alert('Application submitted successfully! We will review your application and get back to you soon.');
        window.location.href = '/seller-dashboard';
      } else {
        alert(result?.message || result?.error?.message || 'Failed to register as seller');
      }
    } catch (err) {
      setLoading(false);
      console.error('Seller registration error:', err);
      alert('An error occurred. Please try again.');
    }
  };

  // Only allow form steps (2+) if authenticated
  if ((currentStep > 1) && !isSignedIn) return <RedirectToSignIn />;

  if (currentStep === 1 && !formData.firstName) {
    // Landing page
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 overflow-hidden">
          <div className="absolute inset-0">
            <img
              src="https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=1920"
              alt="Background"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
                Turn Your Influence Into
                <span className="block text-yellow-300">Income</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Join thousands of creators earning money by promoting brands they love. 
                Start your journey as a Socyads seller today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Start Selling Today</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
                <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Play className="h-5 w-5" />
                  <span>Watch How It Works</span>
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                    <div className="text-blue-100">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Why Choose Socyads?
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We provide everything you need to succeed as a creator
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow duration-200">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${benefit.color}`} />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Success Stories
              </h2>
              <p className="text-xl text-gray-600">
                See how creators are building their businesses with Socyads
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                  <div className="flex items-center space-x-4 mb-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.title}</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {testimonial.earnings}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="flex items-center mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to Start Earning?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Join our community of successful creators and start monetizing your influence today.
            </p>
            <button
              onClick={() => setCurrentStep(2)}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 mx-auto"
            >
              <span>Get Started Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Application Form
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Step Indicator */}
      {currentStep > 1 && (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="text-sm text-gray-600 font-semibold mb-2 text-right">
            Step {currentStep} of {steps.length}
          </div>
        </div>
      )}
      {/* Header */}
      {/* Removed the secondary logo/header block */}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step) => (
              <div
                key={step.id}
                className={`flex items-center ${step.id < steps.length ? 'flex-1' : ''}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step.id
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {currentStep > step.id ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    step.id
                  )}
                </div>
                {step.id < steps.length && (
                  <div
                    className={`flex-1 h-1 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">{steps[currentStep - 1].title}</h2>
            <p className="text-gray-600">{steps[currentStep - 1].description}</p>
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
          {/* Step 2: Personal Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="John"
                  />
                  {errors.firstName && (
                    <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Doe"
                  />
                  {errors.lastName && (
                    <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select your country</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="New York"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <Camera className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => handleInputChange('profileImage', e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Professional Profile */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Title *
                </label>
                <input
                  type="text"
                  value={formData.professionalTitle}
                  onChange={(e) => handleInputChange('professionalTitle', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Tech Reviewer, Fitness Coach, Beauty Guru"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Professional Description *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={4}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                    errors.description ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Describe your expertise, experience, and what makes you unique... (minimum 20 characters)"
                />
                <p className={`text-sm mt-1 ${formData.description.length < 20 ? 'text-red-500' : 'text-gray-500'}`}>
                  {formData.description.length}/500 characters (minimum 20 required)
                </p>
                {errors.description && (
                  <p className="text-sm text-red-500 mt-1">{errors.description}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Skills & Expertise *
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.skills ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Add a skill..."
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Add
                  </button>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {skillSuggestions.map((skill) => (
                    <button
                      key={skill}
                      onClick={() => {
                        setCurrentSkill(skill);
                        addSkill();
                      }}
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors duration-200"
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.skills.length} skills added (minimum 1 required)
                </p>
                {errors.skills && (
                  <p className="text-sm text-red-500 mt-1">{errors.skills}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Years of Experience
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select experience level</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Languages *
                </label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {formData.languages.map((language, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                    >
                      {language}
                      <button
                        onClick={() => removeLanguage(language)}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <select
                    value={currentLanguage}
                    onChange={(e) => setCurrentLanguage(e.target.value)}
                    className={`flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.languages ? 'border-red-300' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select a language</option>
                    {languageOptions.map((language) => (
                      <option key={language} value={language}>{language}</option>
                    ))}
                  </select>
                  <button
                    onClick={addLanguage}
                    disabled={!currentLanguage}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {formData.languages.length} languages added (minimum 1 required)
                </p>
                {errors.languages && (
                  <p className="text-sm text-red-500 mt-1">{errors.languages}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Social Media */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Your Social Media Accounts</h3>
                <p className="text-gray-600">Add your social media profiles to showcase your reach and engagement</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(platformIcons).map(([platform, Icon]) => (
                  <div key={platform} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center space-x-3 mb-4">
                      <Icon className="h-6 w-6 text-gray-700" />
                      <h4 className="font-medium text-gray-900 capitalize">{platform}</h4>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Username/Handle</label>
                        <input
                          type="text"
                          value={formData.socialAccounts[platform as keyof SocialAccounts].username}
                          onChange={(e) => handleSocialAccountChange(platform as keyof SocialAccounts, 'username', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder={`@your${platform}handle`}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm text-gray-600 mb-1">Followers/Subscribers</label>
                        <input
                          type="text"
                          value={formData.socialAccounts[platform as keyof SocialAccounts].followers}
                          onChange={(e) => handleSocialAccountChange(platform as keyof SocialAccounts, 'followers', e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          placeholder="e.g., 10K, 50K, 1M"
                        />
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.socialAccounts[platform as keyof SocialAccounts].verified}
                          onChange={(e) => handleSocialAccountChange(platform as keyof SocialAccounts, 'verified', e.target.checked)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-600">Verified Account</label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-blue-900">Why connect social accounts?</h4>
                    <p className="text-sm text-blue-800 mt-1">
                      Connecting your social media accounts helps buyers understand your reach and engagement. 
                      You can always add more accounts later.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Portfolio */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Showcase Your Work</h3>
                <p className="text-gray-600">Upload examples of your best content to attract potential buyers</p>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Portfolio Items</h3>
                <p className="text-gray-600 mb-4">
                  Add images, videos, or links to your best work
                </p>
                <input
                  type="file"
                  multiple
                  onChange={e => handleInputChange('portfolioItems', Array.from(e.target.files || []))}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Supported formats: JPG, PNG, MP4, MOV (max 50MB each)
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Placeholder portfolio items */}
                {formData.portfolioItems && formData.portfolioItems.length > 0 ? (
                  formData.portfolioItems.map((item, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                      <div className="aspect-video bg-gray-200 rounded-lg mb-3 flex items-center justify-center">
                        <FileText className="h-8 w-8 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        placeholder="Portfolio item title"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  ))
                ) : (
                  <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 text-center">
                    <p className="text-gray-500">No portfolio items uploaded yet.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 6: Verification */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Identity</h3>
                <p className="text-gray-600">Help us keep the platform safe by verifying your identity</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Government ID</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload a photo of your ID</p>
                    <input
                      type="file"
                      onChange={e => handleInputChange('idDocument', e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Accepted: Passport, Driver's License, National ID
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-4">Proof of Address</h4>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">Upload proof of address</p>
                    <input
                      type="file"
                      onChange={e => handleInputChange('addressProof', e.target.files?.[0] || null)}
                      className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Accepted: Utility bill, Bank statement (last 3 months)
                  </p>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-yellow-900">Verification Process</h4>
                    <p className="text-sm text-yellow-800 mt-1">
                      Your documents will be reviewed within 24-48 hours. We take privacy seriously and 
                      your information is encrypted and secure.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-8 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 2}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {currentStep < steps.length ? (
              <button
                onClick={nextStep}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <span>Continue</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span>{loading ? "Submitting..." : "Submit Application"}</span>
                <CheckCircle className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BecomeSeller;