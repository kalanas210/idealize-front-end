export interface LiveChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: Date;
  attachments?: LiveChatAttachment[];
  customerId?: string;
  agentId?: string;
  chatId: string;
}

export interface LiveChatAttachment {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'video';
  size: number;
}

export interface LiveChatCustomer {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  customFields?: Record<string, any>;
}

export interface LiveChatAgent {
  id: string;
  name: string;
  avatar?: string;
  status: 'online' | 'offline' | 'away';
  specialties?: string[];
}

export interface LiveChatConfig {
  license: string;
  group?: string;
  customer?: LiveChatCustomer;
  theme?: {
    primaryColor?: string;
    secondaryColor?: string;
    textColor?: string;
  };
}

class LiveChatService {
  private config: LiveChatConfig;
  private isInitialized: boolean = false;

  constructor(config: LiveChatConfig) {
    this.config = config;
  }

  // Initialize LiveChat widget
  async initialize(): Promise<void> {
    try {
      // Load LiveChat script dynamically
      await this.loadLiveChatScript();
      this.isInitialized = true;
      
      // Configure LiveChat with your settings
      if (window.LiveChatWidget) {
        window.LiveChatWidget.init({
          license: this.config.license,
          group: this.config.group || 0,
          customer: this.config.customer,
          theme: this.config.theme,
          params: {
            customer: {
              name: this.config.customer?.name || 'Guest',
              email: this.config.customer?.email || '',
              customFields: this.config.customer?.customFields || {}
            }
          }
        });
      }
    } catch (error) {
      console.error('Failed to initialize LiveChat:', error);
    }
  }

  // Load LiveChat script
  private loadLiveChatScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.LiveChatWidget) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdn.livechatinc.com/tracking.js';
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load LiveChat script'));
      document.head.appendChild(script);
    });
  }

  // Open chat widget
  openChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.open();
    }
  }

  // Close chat widget
  closeChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.close();
    }
  }

  // Maximize chat widget
  maximizeChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.maximize();
    }
  }

  // Minimize chat widget
  minimizeChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.minimize();
    }
  }

  // Hide chat widget
  hideChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.hide();
    }
  }

  // Show chat widget
  showChat(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.show();
    }
  }

  // Send message programmatically
  sendMessage(message: string): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.sendMessage(message);
    }
  }

  // Set customer data
  setCustomer(customer: LiveChatCustomer): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.setCustomer({
        name: customer.name,
        email: customer.email,
        customFields: customer.customFields || {}
      });
    }
  }

  // Get chat status
  getChatStatus(): 'online' | 'offline' | 'away' | 'unknown' {
    if (this.isInitialized && window.LiveChatWidget) {
      return window.LiveChatWidget.getChatStatus() || 'unknown';
    }
    return 'unknown';
  }

  // Check if chat is available
  isChatAvailable(): boolean {
    return this.getChatStatus() !== 'offline';
  }

  // Get agent info
  getAgentInfo(): LiveChatAgent | null {
    if (this.isInitialized && window.LiveChatWidget) {
      const agent = window.LiveChatWidget.getAgentInfo();
      if (agent) {
        return {
          id: agent.id,
          name: agent.name,
          avatar: agent.avatar,
          status: agent.status,
          specialties: agent.specialties || []
        };
      }
    }
    return null;
  }

  // Set custom variables
  setCustomVariables(variables: Record<string, any>): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.setCustomVariables(variables);
    }
  }

  // Trigger custom event
  triggerCustomEvent(eventName: string, data?: any): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.triggerCustomEvent(eventName, data);
    }
  }

  // Destroy LiveChat instance
  destroy(): void {
    if (this.isInitialized && window.LiveChatWidget) {
      window.LiveChatWidget.destroy();
      this.isInitialized = false;
    }
  }
}

// Extend Window interface for LiveChat
declare global {
  interface Window {
    LiveChatWidget: {
      init: (config: any) => void;
      open: () => void;
      close: () => void;
      maximize: () => void;
      minimize: () => void;
      hide: () => void;
      show: () => void;
      sendMessage: (message: string) => void;
      setCustomer: (customer: any) => void;
      getChatStatus: () => string;
      getAgentInfo: () => any;
      setCustomVariables: (variables: any) => void;
      triggerCustomEvent: (eventName: string, data?: any) => void;
      destroy: () => void;
    };
  }
}

export default LiveChatService;
