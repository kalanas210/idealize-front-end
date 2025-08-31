// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Base URL
  BASE: API_BASE_URL,
  
  // Auth endpoints
  AUTH: {
    LOGIN: `${API_BASE_URL}/api/auth/login`,
    REGISTER: `${API_BASE_URL}/api/auth/register`,
    REFRESH: `${API_BASE_URL}/api/auth/refresh-token`,
    LOGOUT: `${API_BASE_URL}/api/auth/logout`,
    PROFILE: `${API_BASE_URL}/api/auth/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/auth/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/api/auth/change-password`,
    VERIFY_TOKEN: `${API_BASE_URL}/api/auth/verify-token`,
    CLERK_WEBHOOK: `${API_BASE_URL}/api/auth/clerk-webhook`,
  },
  
  // User endpoints
  USER: {
    PROFILE: `${API_BASE_URL}/api/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
    BECOME_SELLER: `${API_BASE_URL}/api/users/become-seller`,
    SELLER_APPLICATION_STATUS: `${API_BASE_URL}/api/users/seller-application-status`,
    DETAIL: (id: string) => `${API_BASE_URL}/api/users/${id}`,
    LIST: `${API_BASE_URL}/api/users`,
  },
  
  // Upload endpoints
  UPLOAD: {
    AUTH: `${API_BASE_URL}/api/upload/auth`,
    SINGLE: `${API_BASE_URL}/api/upload/single`,
    MULTIPLE: `${API_BASE_URL}/api/upload/multiple`,
  },
  
  // Dashboard endpoints (unified)
  DASHBOARD: {
    BUYER: `${API_BASE_URL}/api/dashboard/buyer`,
    SELLER: `${API_BASE_URL}/api/dashboard/seller`,
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
    RECOMMEND_CREATORS: `${API_BASE_URL}/api/ai/recommend-creators`,
    ANALYZE_CONTENT: `${API_BASE_URL}/api/ai/analyze-content`,
  },
  
  // Cal.com endpoints
  CAL: {
    EVENT_TYPES: (username: string) => `${API_BASE_URL}/api/cal/event-types/${username}`,
    AVAILABLE_SLOTS: (username: string) => `${API_BASE_URL}/api/cal/available-slots/${username}`,
    BOOKINGS: `${API_BASE_URL}/api/cal/bookings`,
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
