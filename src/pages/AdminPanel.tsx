import React, { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  UserX, 
  FileText, 
  Eye, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  MessageSquare,
  ExternalLink,
  Star,
  MapPin,
  Briefcase,
  Clock,
  LogOut
} from 'lucide-react';

interface SellerApplication {
  id: string;
  name: string;
  email: string;
  phone: string;
  professional_title: string;
  experience: string;
  bio: string;
  skills: string[];
  languages: string[];
  location: string;
  social_accounts: {
    [key: string]: {
      username: string;
      followers: string;
      verified: boolean;
    };
  };
  portfolio: string[];
  verification_docs: {
    type: string;
    url: string;
  }[];
  created_at: string;
  status?: string;
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'applications' | 'users'>('applications');
  const [applications, setApplications] = useState<SellerApplication[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<SellerApplication | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [rejectionReason, setRejectionReason] = useState('');
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [pendingAction, setPendingAction] = useState<{ type: 'approve' | 'reject', userId: string } | null>(null);
  const [adminUser, setAdminUser] = useState<any>(null);

  // Load admin user and seller applications
  useEffect(() => {
    const storedAdminUser = localStorage.getItem('adminUser');
    if (storedAdminUser) {
      setAdminUser(JSON.parse(storedAdminUser));
    }
    fetchSellerApplications();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    window.location.href = '/admin-login';
  };

  const fetchSellerApplications = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (!token) {
        window.location.href = '/admin-login';
        return;
      }
      
      console.log('🔄 Fetching seller applications...');
      const response = await fetch('http://localhost:5000/api/admin/seller-applications', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('📡 API Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Admin Panel - Applications loaded:', data);
        
        // The API returns data.data.applications array
        const applicationsArray = data.data?.applications || [];
        
        console.log('📊 Number of applications:', applicationsArray.length);
        setApplications(applicationsArray);
      } else {
        const errorText = await response.text();
        console.error('❌ API Error:', response.status, errorText);
        // Use mock data for demonstration
        setApplications([
          {
            id: '1',
            name: 'Jane Smith',
            email: 'jane@example.com',
            phone: '+1234567890',
            professional_title: 'Content Creator',
            experience: '3-5 years',
            bio: 'Professional content creator specializing in tech reviews and tutorials. I have been creating content for over 3 years and have built a strong following across multiple platforms.',
            skills: ['Video Production', 'Content Writing', 'Social Media Marketing', 'SEO'],
            languages: ['English', 'Spanish'],
            location: 'Los Angeles, USA',
            social_accounts: {
              youtube: { username: '@janesmith', followers: '12.5K', verified: false },
              instagram: { username: '@janesmith_content', followers: '8.2K', verified: true },
              tiktok: { username: '@janesmith', followers: '15K', verified: false }
            },
            portfolio: ['/uploads/portfolio-1.jpg', '/uploads/portfolio-2.jpg'],
            verification_docs: [
              { type: 'id_document', url: '/uploads/id-doc.jpg' },
              { type: 'address_proof', url: '/uploads/address-proof.pdf' }
            ],
            created_at: new Date().toISOString(),
            status: 'pending'
          }
        ]);
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (userId: string) => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/seller-applications/${userId}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          adminNotes: 'Application approved after document verification'
        })
      });

      if (response.ok) {
        // Remove from applications list
        setApplications(prev => prev.filter(app => app.id !== userId));
        setSelectedApplication(null);
        alert('✅ Seller approved successfully!');
      } else {
        alert('❌ Failed to approve seller');
      }
    } catch (error) {
      console.error('Error approving seller:', error);
      alert('❌ Error approving seller');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReject = () => {
    if (pendingAction?.type === 'reject') {
      setShowRejectModal(true);
    }
  };

  const confirmReject = async () => {
    if (!pendingAction || !rejectionReason.trim()) {
      alert('Please provide a rejection reason');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      const response = await fetch(`http://localhost:5000/api/admin/seller-applications/${pendingAction.userId}/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          reason: rejectionReason
        })
      });

      if (response.ok) {
        // Remove from applications list
        setApplications(prev => prev.filter(app => app.id !== pendingAction.userId));
        setSelectedApplication(null);
        setShowRejectModal(false);
        setRejectionReason('');
        setPendingAction(null);
        alert('✅ Seller rejected successfully!');
      } else {
        alert('❌ Failed to reject seller');
      }
    } catch (error) {
      console.error('Error rejecting seller:', error);
      alert('❌ Error rejecting seller');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredApplications = (Array.isArray(applications) ? applications : []).filter(app => {
    const matchesSearch = app?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app?.professional_title?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app?.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSocialPlatformIcon = (platform: string) => {
    const icons = {
      youtube: '🎥',
      instagram: '📸',
      tiktok: '🎵',
      facebook: '📘',
      twitter: '🐦',
      linkedin: '💼'
    };
    return icons[platform as keyof typeof icons] || '📱';
  };

  const getPlatformColor = (platform: string) => {
    const colors = {
      youtube: 'bg-red-100 text-red-600',
      instagram: 'bg-pink-100 text-pink-600',
      tiktok: 'bg-black text-white',
      facebook: 'bg-blue-100 text-blue-600',
      twitter: 'bg-sky-100 text-sky-600',
      linkedin: 'bg-blue-100 text-blue-700'
    };
    return colors[platform as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
              <p className="text-gray-600 mt-2">Manage users, seller applications, and platform settings</p>
            </div>
            <div className="flex items-center space-x-4">
              {adminUser && (
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{adminUser.displayName}</p>
                  <p className="text-xs text-gray-500">{adminUser.email}</p>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'applications', label: 'Seller Applications', icon: UserCheck },
              { key: 'users', label: 'All Users', icon: Users },
              { key: 'overview', label: 'Dashboard', icon: Briefcase }
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{label}</span>
                {key === 'applications' && applications.length > 0 && (
                  <span className="bg-red-100 text-red-600 text-xs rounded-full px-2 py-1">
                    {applications.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Seller Applications Tab */}
        {activeTab === 'applications' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Applications List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Search and Filters */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <input
                        type="text"
                        placeholder="Search applications..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                </div>

                {/* Applications List */}
                <div className="divide-y divide-gray-200">
                  {isLoading ? (
                    <div className="p-8 text-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                      <p className="text-gray-600 mt-2">Loading applications...</p>
                    </div>
                  ) : filteredApplications.length === 0 ? (
                    <div className="p-8 text-center">
                      <UserCheck className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No Applications Found</h3>
                      <p className="text-gray-600">No seller applications match your current filters.</p>
                    </div>
                  ) : (
                    filteredApplications.map((application) => (
                      <div
                        key={application.id}
                        onClick={() => setSelectedApplication(application)}
                        className={`p-6 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedApplication?.id === application.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{application.name}</h3>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                {application.status || 'Pending Review'}
                              </span>
                            </div>
                            <p className="text-gray-600 mb-2">{application.email}</p>
                            <p className="text-sm text-gray-700 font-medium mb-2">{application.professional_title}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <MapPin className="h-4 w-4" />
                                <span>{application.location}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Briefcase className="h-4 w-4" />
                                <span>{application.experience}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Clock className="h-4 w-4" />
                                <span>{formatDate(application.created_at)}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                              {application.verification_docs?.length || 0} docs
                            </span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Application Details */}
            <div className="lg:col-span-1">
              {selectedApplication ? (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 sticky top-8">
                  {/* Header */}
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {selectedApplication.name}
                    </h3>
                    <p className="text-gray-600">{selectedApplication.email}</p>
                    <p className="text-sm text-gray-500 mt-1">{selectedApplication.professional_title}</p>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
                    {/* Bio */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Bio</h4>
                      <p className="text-sm text-gray-600">{selectedApplication.bio}</p>
                    </div>

                    {/* Skills */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Skills</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.skills?.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Languages */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Languages</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedApplication.languages?.map((language, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                            {language}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Social Accounts */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Social Media</h4>
                      <div className="space-y-2">
                        {selectedApplication.social_accounts && Object.entries(selectedApplication.social_accounts).map(([platform, account]) => 
                          account.username && (
                            <div key={platform} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs ${getPlatformColor(platform)}`}>
                                  {getSocialPlatformIcon(platform)} {platform}
                                </span>
                                <span className="text-sm text-gray-700">{account.username}</span>
                                {account.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                              </div>
                              <span className="text-xs text-gray-500">{account.followers}</span>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    {/* Verification Documents */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Verification Documents</h4>
                      <div className="space-y-2">
                        {selectedApplication.verification_docs?.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <FileText className="h-4 w-4 text-gray-400" />
                              <span className="text-sm text-gray-700 capitalize">
                                {doc.type.replace('_', ' ')}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => window.open(`http://localhost:5000${doc.url}`, '_blank')}
                                className="p-1 text-blue-600 hover:text-blue-800"
                                title="View Document"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => {
                                  const link = document.createElement('a');
                                  link.href = `http://localhost:5000${doc.url}`;
                                  link.download = `${doc.type}_${selectedApplication.name}`;
                                  link.click();
                                }}
                                className="p-1 text-gray-600 hover:text-gray-800"
                                title="Download Document"
                              >
                                <Download className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleApprove(selectedApplication.id)}
                        disabled={isLoading}
                        className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => {
                          setPendingAction({ type: 'reject', userId: selectedApplication.id });
                          setShowRejectModal(true);
                        }}
                        disabled={isLoading}
                        className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Select an Application</h3>
                  <p className="text-gray-600">Choose a seller application from the list to view details and take action.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Other tabs content */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Users Management</h3>
            <p className="text-gray-600">User management functionality coming soon...</p>
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Dashboard Overview</h3>
            <p className="text-gray-600">Dashboard statistics and insights coming soon...</p>
          </div>
        )}
      </div>

      {/* Rejection Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Reject Application</h3>
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setPendingAction(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Please provide a reason for rejecting this seller application. This will be sent to the applicant.
              </p>
              
              <textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Enter rejection reason..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
              />
              
              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => {
                    setShowRejectModal(false);
                    setRejectionReason('');
                    setPendingAction(null);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmReject}
                  disabled={!rejectionReason.trim() || isLoading}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? 'Rejecting...' : 'Reject Application'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;