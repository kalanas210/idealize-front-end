import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { 
  Upload, 
  X, 
  Plus, 
  Minus, 
  Save, 
  Eye, 
  Image as ImageIcon, 
  Video, 
  FileText,
  Star,
  Clock,
  DollarSign,
  Tag,
  Globe,
  Users,
  CheckCircle,
  AlertCircle,
  Info,
  Camera,
  Zap,
  Target,
  Award
} from 'lucide-react';
import { API_ENDPOINTS } from '../config/api';

const CreateGig = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [gigData, setGigData] = useState({
    title: '',
    category: '',
    subcategory: '',
    platform: '',
    description: 'I will create high-quality content that meets your specific needs and requirements. My expertise includes professional design, strategic planning, and timely delivery to ensure your project succeeds.',
    tags: [],
    images: [],
    video: null,
    packages: [
      {
        id: 'basic',
        name: 'Basic',
        description: 'Essential package with core features and quick delivery',
        price: '25',
        deliveryTime: '3',
        revisions: '1',
        features: ['Core service delivery', 'Basic support', 'Standard quality']
      },
      {
        id: 'standard',
        name: 'Standard',
        description: 'Popular choice with enhanced features and priority support',
        price: '50',
        deliveryTime: '5',
        revisions: '2',
        features: ['Enhanced features', 'Priority support', 'Source files included', 'Better quality']
      },
      {
        id: 'premium',
        name: 'Premium',
        description: 'Complete solution with all features and premium support',
        price: '100',
        deliveryTime: '7',
        revisions: '3',
        features: ['All features included', 'Premium support', 'Source files', 'Highest quality', 'Custom modifications']
      }
    ],
    requirements: ['Please provide your project requirements and any specific guidelines you have'],
    faq: [{ 
      question: 'What information do you need to start?', 
      answer: 'I need your project brief, target audience, brand guidelines, and any specific requirements or preferences you have for the project.' 
    }]
  });

  const [currentTag, setCurrentTag] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const categories = [
    { value: 'technology', label: 'Technology' },
    { value: 'fitness', label: 'Fitness & Health' },
    { value: 'beauty', label: 'Beauty & Fashion' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'education', label: 'Education' },
    { value: 'food', label: 'Food & Cooking' },
    { value: 'travel', label: 'Travel' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  const platforms = [
    { value: 'youtube', label: 'YouTube', icon: Video },
    { value: 'instagram', label: 'Instagram', icon: Camera },
    { value: 'tiktok', label: 'TikTok', icon: Video },
    { value: 'facebook', label: 'Facebook', icon: Users },
    { value: 'twitter', label: 'Twitter', icon: Globe },
    { value: 'twitch', label: 'Twitch', icon: Video },
    { value: 'linkedin', label: 'LinkedIn', icon: Users }
  ];

  const deliveryOptions = [
    { value: '1', label: '1 day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '5', label: '5 days' },
    { value: '7', label: '1 week' },
    { value: '14', label: '2 weeks' },
    { value: '21', label: '3 weeks' },
    { value: '30', label: '1 month' }
  ];

  const revisionOptions = [
    { value: '0', label: 'No revisions' },
    { value: '1', label: '1 revision' },
    { value: '2', label: '2 revisions' },
    { value: '3', label: '3 revisions' },
    { value: '5', label: '5 revisions' },
    { value: 'unlimited', label: 'Unlimited revisions' }
  ];

  const steps = [
    { id: 1, title: 'Overview', description: 'Basic gig information' },
    { id: 2, title: 'Pricing', description: 'Packages and pricing' },
    { id: 3, title: 'Description', description: 'Detailed description' },
    { id: 4, title: 'Requirements', description: 'What you need from buyers' },
    { id: 5, title: 'Gallery', description: 'Images and videos' },
    { id: 6, title: 'Publish', description: 'Review and publish' }
  ];

  const handleInputChange = (field: string, value: any) => {
    setGigData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error messages when user starts typing
    if (error) setError('');
  };

  const handlePackageChange = (packageId: string, field: string, value: any) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg =>
        pkg.id === packageId ? { ...pkg, [field]: value } : pkg
      )
    }));
  };

  const addTag = () => {
    if (currentTag.trim() && !gigData.tags.includes(currentTag.trim()) && gigData.tags.length < 5) {
      setGigData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setGigData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const addFeature = (packageId: string) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, features: [...pkg.features, ''] }
          : pkg
      )
    }));
  };

  const removeFeature = (packageId: string, index: number) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg =>
        pkg.id === packageId 
          ? { ...pkg, features: pkg.features.filter((_, i) => i !== index) }
          : pkg
      )
    }));
  };

  const removeImage = (index: number) => {
    setGigData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateFeature = (packageId: string, index: number, value: string) => {
    setGigData(prev => ({
      ...prev,
      packages: prev.packages.map(pkg =>
        pkg.id === packageId 
          ? { 
              ...pkg, 
              features: pkg.features.map((feature, i) => i === index ? value : feature)
            }
          : pkg
      )
    }));
  };

  const addRequirement = () => {
    setGigData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    setGigData(prev => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index)
    }));
  };

  const updateRequirement = (index: number, value: string) => {
    setGigData(prev => ({
      ...prev,
      requirements: prev.requirements.map((req, i) => i === index ? value : req)
    }));
  };

  const addFAQ = () => {
    setGigData(prev => ({
      ...prev,
      faq: [...prev.faq, { question: '', answer: '' }]
    }));
  };

  const handleVideoUpload = async (file: File) => {
    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to upload video');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);
      
      const response = await fetch(API_ENDPOINTS.UPLOAD.SINGLE, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();
      
      if (response.ok && result.success) {
        setGigData(prev => ({
          ...prev,
          video: result.data.url
        }));
        setSuccess('Video uploaded successfully!');
      } else {
        setError(result.message || 'Video upload failed');
      }
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video. Please try again.');
    }
  };

  const removeFAQ = (index: number) => {
    setGigData(prev => ({
      ...prev,
      faq: prev.faq.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setGigData(prev => ({
      ...prev,
      faq: prev.faq.map((item, i) => 
        i === index ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = async (files: FileList) => {
    const fileArray = Array.from(files);
    
    console.log('📁 Frontend: Files to upload:', fileArray.map(f => ({
      name: f.name,
      type: f.type,
      size: f.size
    })));
    
    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to upload files');
        return;
      }

      // Upload each file
      const uploadPromises = fileArray.map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        
        console.log('📁 Frontend: Uploading file:', {
          name: file.name,
          type: file.type,
          size: file.size
        });
        
        const response = await fetch(API_ENDPOINTS.UPLOAD.SINGLE, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          },
          body: formData
        });

        console.log('📁 Frontend: Upload response status:', response.status);
        
        const result = await response.json();
        console.log('📁 Frontend: Upload response:', result);
        
        if (response.ok && result.success) {
          return result.data.url;
        } else {
          throw new Error(result.message || result.error?.message || 'Upload failed');
        }
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      
      // Add uploaded files to gig data
      setGigData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls]
      }));

      setSuccess(`${uploadedUrls.length} files uploaded successfully!`);
    } catch (err) {
      console.error('Error uploading files:', err);
      setError('Failed to upload files. Please try again.');
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
      // Clear messages when moving to next step
      setError('');
      setSuccess('');
    }
  };

  const prevStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
      // Clear messages when moving to previous step
      setError('');
      setSuccess('');
    }
  };

  const canProceed = () => {
    switch (activeStep) {
      case 1:
        return gigData.title && gigData.category && gigData.platform;
      case 2:
        return gigData.packages.every(pkg => pkg.price && pkg.description);
      case 3:
        return gigData.description && gigData.tags.length > 0;
      case 4:
        return gigData.requirements.every(req => req.trim());
      case 5:
        return true; // Gallery is optional
      default:
        return true;
    }
  };

  // Transform gig data to match backend API format
  const transformGigData = () => {
    // Ensure all required fields have valid values
    const transformed = {
      gigTitle: gigData.title || 'Untitled Gig',
      category: gigData.category || 'technology',
      platform: gigData.platform || 'youtube',
      tags: gigData.tags.length > 0 ? gigData.tags : ['content creation'],
      pricing: {
        basic: {
          packageName: gigData.packages[0]?.name || 'Basic',
          description: gigData.packages[0]?.description || 'Essential package with core features',
          price: parseFloat(gigData.packages[0]?.price || '25'),
          delivery: parseInt(gigData.packages[0]?.deliveryTime || '3'),
          revision: parseInt(gigData.packages[0]?.revisions || '1'),
          features: (gigData.packages[0]?.features || ['Core service']).filter(f => f.trim())
        },
        standard: {
          packageName: gigData.packages[1]?.name || 'Standard',
          description: gigData.packages[1]?.description || 'Popular choice with enhanced features',
          price: parseFloat(gigData.packages[1]?.price || '50'),
          delivery: parseInt(gigData.packages[1]?.deliveryTime || '5'),
          revision: parseInt(gigData.packages[1]?.revisions || '2'),
          features: (gigData.packages[1]?.features || ['Enhanced features']).filter(f => f.trim())
        },
        premium: {
          packageName: gigData.packages[2]?.name || 'Premium',
          description: gigData.packages[2]?.description || 'Complete solution with all features',
          price: parseFloat(gigData.packages[2]?.price || '100'),
          delivery: parseInt(gigData.packages[2]?.deliveryTime || '7'),
          revision: parseInt(gigData.packages[2]?.revisions || '3'),
          features: (gigData.packages[2]?.features || ['All features included']).filter(f => f.trim())
        }
      },
      gigDescription: {
        description: gigData.description || 'Professional content creation service with high quality and timely delivery.',
        faq: (gigData.faq || []).filter(faq => faq.question?.trim() && faq.answer?.trim())
      },
      buyerRequirements: (gigData.requirements || []).filter(req => req?.trim()),
      gallery: {
        images: gigData.images || [],
        video: gigData.video || null
      }
    };

    // Ensure minimum requirements are met
    if (transformed.gigDescription.description.length < 100) {
      transformed.gigDescription.description = transformed.gigDescription.description + ' '.repeat(100 - transformed.gigDescription.description.length) + 'Additional details about our service quality, delivery process, and customer satisfaction guarantee.';
    }

    if (transformed.buyerRequirements.length === 0) {
      transformed.buyerRequirements = ['Please provide your project requirements and any specific guidelines you have'];
    }

    if (transformed.gigDescription.faq.length === 0) {
      transformed.gigDescription.faq = [{
        question: 'What information do you need to start?',
        answer: 'I need your project brief, target audience, brand guidelines, and any specific requirements or preferences you have for the project.'
      }];
    }

    return transformed;
  };

  // Validate gig data before publishing
  const validateGigData = () => {
    const errors = [];

    if (!gigData.title || gigData.title.length < 5) {
      errors.push('Title must be at least 5 characters long');
    }

    if (!gigData.category) {
      errors.push('Category is required');
    }

    if (!gigData.platform) {
      errors.push('Platform is required');
    }

    if (!gigData.description || gigData.description.length < 100) {
      errors.push('Description must be at least 100 characters long');
    }

    if (gigData.tags.length === 0) {
      errors.push('At least one tag is required');
    }

    if (!gigData.packages.every(pkg => pkg.price && pkg.description)) {
      errors.push('All packages must have price and description');
    }

    if (!gigData.requirements.every(req => req.trim())) {
      errors.push('All requirements must be filled');
    }

    return errors;
  };

  // Handle gig publishing
  const handlePublish = async () => {
    const validationErrors = validateGigData();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(', '));
      return;
    }

    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to create a gig');
        return;
      }

      const transformedData = transformGigData();
      
      console.log('📝 Frontend: Publishing gig with data:', JSON.stringify(transformedData, null, 2));
      
      const response = await fetch(API_ENDPOINTS.GIG.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transformedData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess('Gig published successfully!');
        setTimeout(() => {
          navigate('/seller-dashboard');
        }, 2000);
      } else {
        console.error('❌ Backend error response:', result);
        const errorMessage = result.message || result.error?.message || 'Failed to publish gig';
        if (result.error && Array.isArray(result.error)) {
          // Show validation errors
          const validationErrors = result.error.map((err: any) => `${err.path}: ${err.msg}`).join(', ');
          setError(`Validation errors: ${validationErrors}`);
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error('Error publishing gig:', err);
      setError('An error occurred while publishing the gig');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle saving as draft
  const handleSaveDraft = async () => {
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      const token = await getToken();
      if (!token) {
        setError('Please sign in to save a draft');
        return;
      }

      const transformedData = transformGigData();
      transformedData.status = 'draft'; // Mark as draft
      
      console.log('📝 Frontend: Saving draft with data:', JSON.stringify(transformedData, null, 2));
      
      const response = await fetch(API_ENDPOINTS.GIG.CREATE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(transformedData)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSuccess('Draft saved successfully!');
        setTimeout(() => {
          navigate('/seller-dashboard');
        }, 2000);
      } else {
        console.error('❌ Backend error response:', result);
        const errorMessage = result.message || result.error?.message || 'Failed to save draft';
        if (result.error && Array.isArray(result.error)) {
          // Show validation errors
          const validationErrors = result.error.map((err: any) => `${err.path}: ${err.msg}`).join(', ');
          setError(`Validation errors: ${validationErrors}`);
        } else {
          setError(errorMessage);
        }
      }
    } catch (err) {
      console.error('Error saving draft:', err);
      setError('An error occurred while saving the draft');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Create New Gig</h1>
              <p className="text-sm text-gray-600">Share your expertise with the world</p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 flex items-center space-x-2">
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2">
                <Save className="h-4 w-4" />
                <span>Save Draft</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Progress</h3>
              <div className="space-y-4">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`flex items-start space-x-3 cursor-pointer p-3 rounded-lg transition-colors duration-200 ${
                      activeStep === step.id
                        ? 'bg-blue-50 border border-blue-200'
                        : activeStep > step.id
                        ? 'bg-green-50 border border-green-200'
                        : 'hover:bg-gray-50'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium ${
                      activeStep === step.id
                        ? 'bg-blue-600 text-white'
                        : activeStep > step.id
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {activeStep > step.id ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${
                        activeStep === step.id ? 'text-blue-900' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h4>
                      <p className={`text-xs ${
                        activeStep === step.id ? 'text-blue-700' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              {/* Step 1: Overview */}
              {activeStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig Overview</h2>
                    <p className="text-gray-600">Let's start with the basics of your service</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gig Title *
                    </label>
                    <input
                      type="text"
                      value={gigData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      placeholder="I will create amazing content for your brand..."
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      maxLength={80}
                    />
                    <p className="text-xs text-gray-500 mt-1">{gigData.title.length}/80 characters</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        value={gigData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a category</option>
                        {categories.map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Platform *
                      </label>
                      <select
                        value={gigData.platform}
                        onChange={(e) => handleInputChange('platform', e.target.value)}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">Select a platform</option>
                        {platforms.map((platform) => (
                          <option key={platform.value} value={platform.value}>
                            {platform.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Search Tags
                    </label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {gigData.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                        >
                          {tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={currentTag}
                        onChange={(e) => setCurrentTag(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        placeholder="Add a tag..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={gigData.tags.length >= 5}
                      />
                      <button
                        onClick={addTag}
                        disabled={!currentTag.trim() || gigData.tags.length >= 5}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Add
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Add up to 5 tags to help buyers find your gig</p>
                  </div>
                </div>
              )}

              {/* Step 2: Pricing */}
              {activeStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Packages</h2>
                    <p className="text-gray-600">Create packages that offer different levels of service</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {gigData.packages.map((pkg) => (
                      <div
                        key={pkg.id}
                        className={`border-2 rounded-xl p-6 ${
                          pkg.id === 'standard' 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'border-gray-200 bg-white'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 capitalize">{pkg.name}</h3>
                          {pkg.id === 'standard' && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                              Most Popular
                            </span>
                          )}
                        </div>

                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Package Name
                            </label>
                            <input
                              type="text"
                              value={pkg.description}
                              onChange={(e) => handlePackageChange(pkg.id, 'description', e.target.value)}
                              placeholder={`${pkg.name} package description`}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Price ($)
                            </label>
                            <input
                              type="number"
                              value={pkg.price}
                              onChange={(e) => handlePackageChange(pkg.id, 'price', e.target.value)}
                              placeholder="0"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              min="5"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Delivery
                              </label>
                              <select
                                value={pkg.deliveryTime}
                                onChange={(e) => handlePackageChange(pkg.id, 'deliveryTime', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              >
                                {deliveryOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                Revisions
                              </label>
                              <select
                                value={pkg.revisions}
                                onChange={(e) => handlePackageChange(pkg.id, 'revisions', e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                              >
                                {revisionOptions.map((option) => (
                                  <option key={option.value} value={option.value}>
                                    {option.label}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Features
                            </label>
                            <div className="space-y-2">
                              {pkg.features.map((feature, index) => (
                                <div key={index} className="flex space-x-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => updateFeature(pkg.id, index, e.target.value)}
                                    placeholder="Feature description"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                  />
                                  {pkg.features.length > 1 && (
                                    <button
                                      onClick={() => removeFeature(pkg.id, index)}
                                      className="p-2 text-red-600 hover:text-red-800"
                                    >
                                      <Minus className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                onClick={() => addFeature(pkg.id)}
                                className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Add Feature</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Description */}
              {activeStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Gig Description</h2>
                    <p className="text-gray-600">Describe your service in detail to attract the right buyers</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      value={gigData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      placeholder="Describe your service, what you'll deliver, your experience, and why buyers should choose you..."
                      rows={8}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      maxLength={1200}
                    />
                    <p className="text-xs text-gray-500 mt-1">{gigData.description.length}/1200 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Frequently Asked Questions
                    </label>
                    <div className="space-y-4">
                      {gigData.faq.map((item, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-sm font-medium text-gray-900">FAQ #{index + 1}</h4>
                            {gigData.faq.length > 1 && (
                              <button
                                onClick={() => removeFAQ(index)}
                                className="text-red-600 hover:text-red-800"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={item.question}
                              onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                              placeholder="Question"
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            />
                            <textarea
                              value={item.answer}
                              onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                              placeholder="Answer"
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm resize-none"
                            />
                          </div>
                        </div>
                      ))}
                      <button
                        onClick={addFAQ}
                        className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add FAQ</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Requirements */}
              {activeStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Buyer Requirements</h2>
                    <p className="text-gray-600">What information do you need from buyers to get started?</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Requirements
                    </label>
                    <div className="space-y-3">
                      {gigData.requirements.map((requirement, index) => (
                        <div key={index} className="flex space-x-3">
                          <div className="flex-1">
                            <input
                              type="text"
                              value={requirement}
                              onChange={(e) => updateRequirement(index, e.target.value)}
                              placeholder="What do you need from the buyer?"
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          {gigData.requirements.length > 1 && (
                            <button
                              onClick={() => removeRequirement(index)}
                              className="p-3 text-red-600 hover:text-red-800"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                          )}
                        </div>
                      ))}
                      <button
                        onClick={addRequirement}
                        className="w-full py-3 border border-dashed border-gray-300 rounded-lg text-gray-600 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Requirement</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-900 mb-1">Pro Tip</h4>
                        <p className="text-sm text-blue-800">
                          Clear requirements help you deliver better results and reduce revisions. 
                          Ask for specific details like brand guidelines, target audience, or content preferences.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Gallery */}
              {activeStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Gallery</h2>
                    <p className="text-gray-600">Showcase your work with images and videos</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gig Images
                    </label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Images</h3>
                      <p className="text-gray-600 mb-4">
                        Drag and drop images here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => e.target.files && handleFiles(e.target.files)}
                        className="hidden"
                        id="image-upload"
                      />
                      <label
                        htmlFor="image-upload"
                        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Images
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Upload up to 5 images. Recommended size: 1280x720px
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gig Video (Optional)
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Video className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Upload Video</h3>
                      <p className="text-gray-600 mb-4">
                        A video can increase your gig's conversion rate
                      </p>
                      <input
                        type="file"
                        accept="video/*"
                        className="hidden"
                        id="video-upload"
                      />
                      <label
                        htmlFor="video-upload"
                        className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 cursor-pointer"
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Choose Video
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Max file size: 50MB. Recommended length: 30-60 seconds
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Publish */}
              {activeStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Publish</h2>
                    <p className="text-gray-600">Review your gig details before publishing</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Gig Summary</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Basic Information</h4>
                        <div className="space-y-2 text-sm">
                          <div><span className="text-gray-600">Title:</span> {gigData.title || 'Not set'}</div>
                          <div><span className="text-gray-600">Category:</span> {gigData.category || 'Not set'}</div>
                          <div><span className="text-gray-600">Platform:</span> {gigData.platform || 'Not set'}</div>
                          <div><span className="text-gray-600">Tags:</span> {gigData.tags.join(', ') || 'None'}</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Pricing</h4>
                        <div className="space-y-2 text-sm">
                          {gigData.packages.map((pkg) => (
                            <div key={pkg.id}>
                              <span className="text-gray-600 capitalize">{pkg.name}:</span> ${pkg.price || '0'}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-red-900 mb-1">Error</h4>
                          <p className="text-sm text-red-800">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Success Message */}
                  {success && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-900 mb-1">Success!</h4>
                          <p className="text-sm text-green-800">{success}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-green-900 mb-1">Ready to Publish</h4>
                        <p className="text-sm text-green-800">
                          Your gig looks great! Once published, it will be reviewed by our team and go live within 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={handlePublish}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 transform hover:scale-105 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Zap className="h-5 w-5" />
                      <span>{isSubmitting ? 'Publishing...' : 'Publish Gig'}</span>
                    </button>
                    <button 
                      onClick={handleSaveDraft}
                      disabled={isSubmitting}
                      className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Saving...' : 'Save as Draft'}
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={activeStep === 1}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {steps.map((step) => (
                    <div
                      key={step.id}
                      className={`w-3 h-3 rounded-full ${
                        activeStep === step.id
                          ? 'bg-blue-600'
                          : activeStep > step.id
                          ? 'bg-green-600'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>

                {activeStep < steps.length ? (
                  <button
                    onClick={nextStep}
                    disabled={!canProceed()}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                ) : (
                  <button 
                    onClick={handlePublish}
                    disabled={isSubmitting}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Publishing...' : 'Publish'}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;