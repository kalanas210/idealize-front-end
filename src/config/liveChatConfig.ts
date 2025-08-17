export const liveChatConfig = {
  // LiveChat License Key (get this from your LiveChat dashboard)
  license: import.meta.env.VITE_LIVECHAT_LICENSE || 'demo_license_key',
  
  // LiveChat Group ID (0 for default, or specific group ID)
  group: import.meta.env.VITE_LIVECHAT_GROUP || '0',
  
  // Theme Configuration
  theme: {
    primaryColor: import.meta.env.VITE_LIVECHAT_THEME_PRIMARY || '#2563eb',
    secondaryColor: import.meta.env.VITE_LIVECHAT_THEME_SECONDARY || '#1e40af',
    textColor: import.meta.env.VITE_LIVECHAT_THEME_TEXT || '#ffffff'
  },
  
  // Widget Settings
  widget: {
    position: 'bottom-right' as const,
    offset: {
      x: 24,
      y: 24
    },
    size: {
      width: 400,
      height: 600
    }
  },
  
  // Chat Features
  features: {
    fileUpload: true,
    emojiPicker: true,
    typingIndicator: true,
    readReceipts: true,
    customerInfo: true,
    chatHistory: true
  },
  
  // Customer Defaults
  customerDefaults: {
    name: 'Guest',
    email: '',
    avatar: '',
    customFields: {}
  },
  
  // Agent Settings
  agent: {
    name: 'Socyads Support',
    avatar: '',
    specialties: ['Website Design', 'Logo Design', 'Marketing', 'General Support']
  },
  
  // Pre-chat Form
  preChatForm: {
    enabled: true,
    fields: [
      { name: 'name', label: 'Name', required: true, type: 'text' },
      { name: 'email', label: 'Email', required: true, type: 'email' },
      { name: 'project', label: 'Project Type', required: false, type: 'select', options: ['Website', 'Logo', 'Marketing', 'Other'] }
    ]
  },
  
  // Offline Message
  offlineMessage: {
    enabled: true,
    title: 'Support is currently offline',
    message: 'Our team is not available right now. Please leave a message and we\'ll get back to you soon.',
    buttonText: 'Leave a Message'
  },
  
  // Auto-responders
  autoResponders: {
    welcome: {
      enabled: true,
      message: '👋 Hi! I\'m here to help you with any questions about Socyads. How can I assist you today?'
    },
    away: {
      enabled: true,
      message: 'I\'m currently away from my desk. I\'ll respond as soon as I\'m back!'
    }
  }
};

export default liveChatConfig;
