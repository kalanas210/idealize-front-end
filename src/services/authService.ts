interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

class AuthService {
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
  }

  /**
   * Test login for development
   */
  async testLogin(): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseURL}/auth/test-login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: 'test@example.com' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Test login failed:', error);
      throw error;
    }
  }

  /**
   * Store token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  /**
   * Get token from localStorage
   */
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  /**
   * Remove token from localStorage
   */
  removeToken(): void {
    localStorage.removeItem('authToken');
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token;
  }

  /**
   * Initialize authentication (for development)
   */
  async initializeAuth(): Promise<void> {
    if (!this.isAuthenticated()) {
      try {
        const loginData = await this.testLogin();
        this.setToken(loginData.token);
        console.log('Test authentication successful');
      } catch (error) {
        console.error('Failed to initialize authentication:', error);
      }
    }
  }
}

export const authService = new AuthService();
export type { LoginResponse }; 