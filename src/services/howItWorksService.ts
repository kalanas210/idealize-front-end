import { API_ENDPOINTS } from '../config/api';

export interface ProcessStep {
  step: number;
  title: string;
  description: string;
  details: string[];
  tips: string[];
  demoVideo?: string;
  icon: string;
}

export interface PlatformFeature {
  title: string;
  description: string;
  features: string[];
  icon: string;
}

export interface SuccessStat {
  number: string;
  label: string;
  icon: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  helpful_count: number;
  created_at: string;
  updated_at: string;
}

export interface DemoVideo {
  id: string;
  title: string;
  description: string;
  duration: string;
  thumbnail: string;
  videoUrl: string;
  category: 'buyers' | 'sellers';
}

export interface HowItWorksData {
  buyerSteps: ProcessStep[];
  sellerSteps: ProcessStep[];
  platformFeatures: PlatformFeature[];
  successStats: SuccessStat[];
}

export interface FAQResponse {
  faqs: FAQ[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: string[];
  filters: {
    category: string;
    search: string;
  };
}

export interface FeedbackData {
  rating: number;
  feedback: string;
  section?: string;
  userType?: 'buyer' | 'seller';
  suggestions?: string;
  email?: string;
}

class HowItWorksService {
  private baseURL: string;

  constructor() {
    this.baseURL = API_ENDPOINTS.BASE_URL || 'http://localhost:5000/api';
  }

  /**
   * Get all how it works data
   */
  async getAllData(): Promise<{ success: boolean; data?: HowItWorksData; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch how it works data');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching how it works data:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get steps for specific user type (buyers or sellers)
   */
  async getSteps(type: 'buyers' | 'sellers'): Promise<{ success: boolean; data?: ProcessStep[]; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/steps/${type}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch steps');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching steps:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get platform features
   */
  async getFeatures(): Promise<{ success: boolean; data?: PlatformFeature[]; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/features`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch features');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching features:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get success statistics
   */
  async getStats(): Promise<{ success: boolean; data?: SuccessStat[]; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/stats`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch stats');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching stats:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get FAQs with optional filtering and pagination
   */
  async getFAQs(params?: {
    category?: string;
    search?: string;
    limit?: number;
    page?: number;
  }): Promise<{ success: boolean; data?: FAQResponse; message?: string; error?: string }> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params?.category) searchParams.append('category', params.category);
      if (params?.search) searchParams.append('search', params.search);
      if (params?.limit) searchParams.append('limit', params.limit.toString());
      if (params?.page) searchParams.append('page', params.page.toString());
      
      const queryString = searchParams.toString();
      const url = `${this.baseURL}/how-it-works/faqs${queryString ? '?' + queryString : ''}`;
      
      const response = await fetch(url);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch FAQs');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching FAQs:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get specific FAQ by ID
   */
  async getFAQ(id: number): Promise<{ success: boolean; data?: FAQ; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/faqs/${id}`);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch FAQ');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching FAQ:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Mark FAQ as helpful
   */
  async markFAQAsHelpful(id: number): Promise<{ success: boolean; data?: { helpful_count: number }; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/faqs/${id}/helpful`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to mark FAQ as helpful');
      }
      
      return result;
    } catch (error) {
      console.error('Error marking FAQ as helpful:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get available demo videos
   */
  async getDemoVideos(category?: 'buyers' | 'sellers'): Promise<{ success: boolean; data?: DemoVideo[]; message?: string; error?: string }> {
    try {
      const url = `${this.baseURL}/how-it-works/demo-videos${category ? '?category=' + category : ''}`;
      const response = await fetch(url);
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to fetch demo videos');
      }
      
      return result;
    } catch (error) {
      console.error('Error fetching demo videos:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Submit feedback about the How it Works page
   */
  async submitFeedback(feedbackData: FeedbackData): Promise<{ success: boolean; data?: { id: number }; message?: string; error?: string }> {
    try {
      const response = await fetch(`${this.baseURL}/how-it-works/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(feedbackData),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit feedback');
      }
      
      return result;
    } catch (error) {
      console.error('Error submitting feedback:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Utility function to format FAQ categories for display
   */
  formatCategoryName(category: string): string {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  /**
   * Utility function to get category color for UI
   */
  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      'pricing': 'blue',
      'safety': 'green',
      'quality': 'purple',
      'timing': 'yellow',
      'relationships': 'pink',
      'legal': 'red',
      'analytics': 'indigo',
      'policies': 'gray',
      'support': 'teal',
      'platforms': 'orange'
    };
    
    return colors[category] || 'gray';
  }

  /**
   * Search FAQs locally (client-side filtering)
   */
  searchFAQsLocally(faqs: FAQ[], searchTerm: string): FAQ[] {
    if (!searchTerm.trim()) return faqs;
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    return faqs.filter(faq => 
      faq.question.toLowerCase().includes(lowerSearchTerm) ||
      faq.answer.toLowerCase().includes(lowerSearchTerm) ||
      faq.tags.some(tag => tag.toLowerCase().includes(lowerSearchTerm))
    );
  }

  /**
   * Sort FAQs by different criteria
   */
  sortFAQs(faqs: FAQ[], sortBy: 'helpful' | 'recent' | 'alphabetical'): FAQ[] {
    const sortedFAQs = [...faqs];
    
    switch (sortBy) {
      case 'helpful':
        return sortedFAQs.sort((a, b) => b.helpful_count - a.helpful_count);
      case 'recent':
        return sortedFAQs.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
      case 'alphabetical':
        return sortedFAQs.sort((a, b) => a.question.localeCompare(b.question));
      default:
        return sortedFAQs;
    }
  }
}

export default new HowItWorksService();
