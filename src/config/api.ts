// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Base URL
  BASE: API_BASE_URL,
  
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    ME: `${API_BASE_URL}/api/auth/me`,
    GOOGLE: `${API_BASE_URL}/api/auth/google`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
    BECOME_SELLER: `${API_BASE_URL}/api/users/become-seller`,
    SELLER_APPLICATION_STATUS: `${API_BASE_URL}/api/users/seller-application-status`,
  },
  
  // Upload endpoints
  UPLOAD: {
    SINGLE: `${API_BASE_URL}/api/upload/single`,
    MULTIPLE: `${API_BASE_URL}/api/upload/multiple`,
  },
  
  // Seller dashboard endpoints
  SELLER_DASHBOARD: {
    OVERVIEW: `${API_BASE_URL}/api/seller/dashboard/overview`,
    EARNINGS: `${API_BASE_URL}/api/seller/dashboard/earnings`,
    ORDERS: `${API_BASE_URL}/api/seller/dashboard/orders`,
    GIGS: `${API_BASE_URL}/api/seller/dashboard/gigs`,
    ANALYTICS: `${API_BASE_URL}/api/seller/dashboard/analytics`,
    REVIEWS: `${API_BASE_URL}/api/seller/dashboard/reviews`,
    ACTIVITY: `${API_BASE_URL}/api/seller/dashboard/activity`,
    PERFORMANCE: `${API_BASE_URL}/api/seller/dashboard/performance`,
    TRANSACTIONS: `${API_BASE_URL}/api/seller/dashboard/transactions`,
  },
  
  // Buyer dashboard endpoints
  BUYER_DASHBOARD: {
    OVERVIEW: `${API_BASE_URL}/api/buyer/dashboard/overview`,
    ORDERS: `${API_BASE_URL}/api/buyer/dashboard/orders`,
    SAVED_INFLUENCERS: `${API_BASE_URL}/api/buyer/dashboard/saved-influencers`,
    SAVED_GIGS: `${API_BASE_URL}/api/buyer/dashboard/saved-gigs`,
    SAVED: `${API_BASE_URL}/api/buyer/dashboard/saved`,
    ANALYTICS: `${API_BASE_URL}/api/buyer/dashboard/analytics`,
    BILLING: `${API_BASE_URL}/api/buyer/dashboard/billing`,
    ACTIVITY: `${API_BASE_URL}/api/buyer/dashboard/activity`,
    PERFORMANCE: `${API_BASE_URL}/api/buyer/dashboard/performance`,
  },
  
  // Gig endpoints
  GIG: {
    LIST: `${API_BASE_URL}/api/gigs`,
    CREATE: `${API_BASE_URL}/api/gigs`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/gigs/${id}`,
    UPDATE: (id: string) => `${API_BASE_URL}/api/gigs/${id}`,
    DELETE: (id: string) => `${API_BASE_URL}/api/gigs/${id}`,
  },
  
  // Order endpoints
  ORDER: {
    CREATE: `${API_BASE_URL}/api/orders`,
    LIST: `${API_BASE_URL}/api/orders`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/orders/${id}`,
    UPDATE_STATUS: (id: string) => `${API_BASE_URL}/api/orders/${id}/status`,
    DELIVER: (id: string) => `${API_BASE_URL}/api/orders/${id}/deliver`,
  },
  
  // Review endpoints
  REVIEW: {
    CREATE: `${API_BASE_URL}/api/reviews`,
    LIST: `${API_BASE_URL}/api/reviews`,
    GIG_REVIEWS: (gigId: string) => `${API_BASE_URL}/api/reviews/gig/${gigId}`,
    HELPFUL: (id: string) => `${API_BASE_URL}/api/reviews/${id}/helpful`,
  },
  
  // Message endpoints
  MESSAGE: {
    CONVERSATIONS: `${API_BASE_URL}/api/messages`,
    MESSAGES: (conversationId: string) => `${API_BASE_URL}/api/messages/${conversationId}`,
    SEND: `${API_BASE_URL}/api/messages`,
  },
  
  // Admin endpoints
  ADMIN: {
    DASHBOARD: `${API_BASE_URL}/api/admin/dashboard`,
    USERS: `${API_BASE_URL}/api/admin/users`,
    GIGS: `${API_BASE_URL}/api/admin/gigs`,
    SELLER_APPLICATIONS: `${API_BASE_URL}/api/admin/seller-applications`,
    APPROVE_SELLER: (userId: string) => `${API_BASE_URL}/api/admin/seller-applications/${userId}/approve`,
    REJECT_SELLER: (userId: string) => `${API_BASE_URL}/api/admin/seller-applications/${userId}/reject`,
  },
  
  // AI endpoints
  AI: {
    ASK: `${API_BASE_URL}/api/ai/ask`,
    HEALTH: `${API_BASE_URL}/api/ai/health`,
  },
  
  // Cal.com endpoints
  CAL: {
    HEALTH: `${API_BASE_URL}/api/cal/health`,
    BOOKING_LINK: (sellerId: string) => `${API_BASE_URL}/api/cal/booking-link/${sellerId}`,
    BOOK: `${API_BASE_URL}/api/cal/book`,
    AVAILABLE_SLOTS: `${API_BASE_URL}/api/cal/available-slots`,
    EVENT_TYPES: (sellerUsername: string) => `${API_BASE_URL}/api/cal/event-types/${sellerUsername}`,
    EMBED: (sellerUsername: string) => `${API_BASE_URL}/api/cal/embed/${sellerUsername}`,
  },
};

// Helper function to get headers with auth token
export const getAuthHeaders = (token?: string) => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

// Helper function for file upload headers
export const getFileUploadHeaders = (token?: string) => {
  const headers: HeadersInit = {};
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  // Note: Don't set Content-Type for FormData - let browser set it
  return headers;
};

export default API_ENDPOINTS;
