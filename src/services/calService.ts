interface CalEventType {
  id: string;
  title: string;
  description: string;
  duration: number;
  price?: number;
  currency?: string;
}

interface CalBooking {
  id: string;
  startTime: string;
  endTime: string;
  meetingUrl: string;
  calendarEvent: any;
  status: string;
}

interface CalServiceResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

class CalService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
  }

  /**
   * Get available time slots for a seller
   */
  async getAvailableSlots(
    sellerUsername: string,
    date: string,
    duration: number = 30
  ): Promise<CalServiceResponse<any[]>> {
    try {
      const response = await fetch(
        `${this.baseURL}/api/cal/available-slots?sellerUsername=${sellerUsername}&date=${date}&duration=${duration}`
      );

      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to get available slots'
        };
      }

      return {
        success: true,
        data: result.data.availableSlots
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch available slots'
      };
    }
  }

  /**
   * Create a new meeting booking
   */
  async createBooking(bookingData: {
    eventTypeId: string;
    startTime: string;
    endTime: string;
    buyerEmail: string;
    buyerName: string;
    gigId: string;
    sellerId: string;
  }): Promise<CalServiceResponse<CalBooking>> {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        return {
          success: false,
          error: 'Authentication required'
        };
      }

      const response = await fetch(`${this.baseURL}/api/cal/book`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(bookingData)
      });

      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to create booking'
        };
      }

      return {
        success: true,
        data: result.data.booking,
        message: result.message
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to create booking'
      };
    }
  }

  /**
   * Get seller's event types
   */
  async getEventTypes(sellerUsername: string): Promise<CalServiceResponse<CalEventType[]>> {
    try {
      const response = await fetch(
        `${this.baseURL}/api/cal/event-types/${sellerUsername}`
      );

      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to get event types'
        };
      }

      return {
        success: true,
        data: result.data.eventTypes
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch event types'
      };
    }
  }

  /**
   * Get embed code for seller's booking page
   */
  async getEmbedCode(
    sellerUsername: string,
    eventTypeId?: string
  ): Promise<CalServiceResponse<any>> {
    try {
      const url = eventTypeId
        ? `${this.baseURL}/api/cal/embed/${sellerUsername}?eventTypeId=${eventTypeId}`
        : `${this.baseURL}/api/cal/embed/${sellerUsername}`;

      const response = await fetch(url);
      const result = await response.json();

      if (!result.success) {
        return {
          success: false,
          error: result.error || 'Failed to get embed code'
        };
      }

      return {
        success: true,
        data: result.data
      };
    } catch (error) {
      return {
        success: false,
        error: 'Failed to fetch embed code'
      };
    }
  }

  /**
   * Generate direct booking link
   */
  generateBookingLink(sellerUsername: string, eventTypeId?: string): string {
    const baseUrl = import.meta.env.VITE_CAL_BASE_URL || 'https://cal.com';
    return eventTypeId
      ? `${baseUrl}/${sellerUsername}/${eventTypeId}`
      : `${baseUrl}/${sellerUsername}`;
  }

  /**
   * Generate iframe embed code
   */
  generateIframeEmbed(sellerUsername: string, eventTypeId?: string): string {
    const baseUrl = import.meta.env.VITE_CAL_BASE_URL || 'https://cal.com';
    const embedUrl = eventTypeId
      ? `${baseUrl}/${sellerUsername}/${eventTypeId}`
      : `${baseUrl}/${sellerUsername}`;

    return `<iframe src="${embedUrl}?embed=true" width="100%" height="700px" frameborder="0" style="border-radius: 8px;"></iframe>`;
  }

  /**
   * Check if Cal.com service is available
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await fetch(`${this.baseURL}/api/cal/health`);
      const result = await response.json();
      return result.success && result.data.configured;
    } catch (error) {
      return false;
    }
  }

  /**
   * Format date for Cal.com API
   */
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  /**
   * Format time for Cal.com API
   */
  formatTime(date: Date): string {
    return date.toISOString();
  }

  /**
   * Get next available business day
   */
  getNextBusinessDay(): Date {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    // Skip weekends
    while (tomorrow.getDay() === 0 || tomorrow.getDay() === 6) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }
    
    return tomorrow;
  }

  /**
   * Generate time slots for a day
   */
  generateTimeSlots(
    startHour: number = 9,
    endHour: number = 17,
    interval: number = 30
  ): string[] {
    const slots: string[] = [];
    const startTime = new Date();
    startTime.setHours(startHour, 0, 0, 0);
    
    const endTime = new Date();
    endTime.setHours(endHour, 0, 0, 0);
    
    while (startTime < endTime) {
      slots.push(startTime.toTimeString().slice(0, 5));
      startTime.setMinutes(startTime.getMinutes() + interval);
    }
    
    return slots;
  }
}

export default CalService;
export type { CalEventType, CalBooking, CalServiceResponse };
