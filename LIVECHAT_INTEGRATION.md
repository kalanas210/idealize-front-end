# LiveChat Integration for SocyAds Platform

This document explains how to set up and use LiveChat integration in your SocyAds platform.

## 🚀 Features

### Customer-Facing Features
- **Real-time chat widget** - Professional chat interface for customers
- **File sharing** - Support for images, documents, and videos
- **Typing indicators** - Shows when agents are typing
- **Offline messaging** - Customers can leave messages when agents are offline
- **Pre-chat forms** - Collect customer information before starting chat
- **Mobile responsive** - Works on all devices

### Seller/Agent Features
- **Seller Chat Dashboard** - Comprehensive chat management interface
- **Customer management** - View customer information and chat history
- **Priority system** - Mark chats as high/medium/low priority
- **Status tracking** - Track chat status (active, waiting, resolved)
- **Search and filters** - Find specific customers or conversations
- **Real-time notifications** - Get notified of new messages

## 📋 Prerequisites

1. **LiveChat Account** - Sign up at [livechat.com](https://www.livechat.com)
2. **LiveChat License Key** - Get from your LiveChat dashboard
3. **Node.js & npm** - For package management
4. **React Development Environment** - Your existing SocyAds setup

## 🛠️ Installation

### 1. Install Dependencies

```bash
cd frontend
npm install react-livechat
```

### 2. Environment Configuration

Create a `.env` file in your `frontend` directory:

```bash
# LiveChat Configuration
VITE_LIVECHAT_LICENSE=your_actual_license_key_here
VITE_LIVECHAT_GROUP=0
VITE_LIVECHAT_THEME_PRIMARY=#2563eb
VITE_LIVECHAT_THEME_SECONDARY=#1e40af
VITE_LIVECHAT_THEME_TEXT=#ffffff
```

### 3. Get Your LiveChat License Key

1. Go to [LiveChat Dashboard](https://app.livechat.com/)
2. Navigate to **Settings** → **Installation**
3. Copy your **License Key**
4. Paste it in your `.env` file

## 🔧 Configuration

### Basic Configuration

The integration automatically uses your environment variables, but you can also customize the configuration in `src/config/liveChatConfig.ts`:

```typescript
export const liveChatConfig = {
  license: 'your_license_key',
  group: '0', // Default group
  theme: {
    primaryColor: '#2563eb',
    secondaryColor: '#1e40af',
    textColor: '#ffffff'
  }
  // ... more options
};
```

### Advanced Configuration

```typescript
// Custom customer fields
customerDefaults: {
  name: 'Guest',
  email: '',
  customFields: {
    projectType: '',
    budget: '',
    timeline: ''
  }
},

// Pre-chat form
preChatForm: {
  enabled: true,
  fields: [
    { name: 'name', label: 'Name', required: true },
    { name: 'email', label: 'Email', required: true },
    { name: 'project', label: 'Project Type', required: false }
  ]
}
```

## 📱 Usage

### 1. Customer Chat Widget

The chat widget automatically appears on your pages. Customers can:

- Click the chat button to start a conversation
- Fill out pre-chat forms
- Share files and images
- Leave messages when agents are offline

### 2. Seller Chat Dashboard

Sellers can access the chat dashboard to:

- View all customer conversations
- Respond to customer messages
- Set chat priorities and status
- Search and filter conversations
- Manage multiple chats simultaneously

### 3. Integration Points

#### Product Pages
```typescript
import LiveChatWidget from '../components/common/LiveChatWidget';

// Add to your product page
<LiveChatWidget
  license={liveChatConfig.license}
  customer={{
    name: customerName,
    email: customerEmail,
    customFields: {
      productId: productId,
      category: productCategory
    }
  }}
/>
```

#### Seller Dashboard
```typescript
import SellerChatDashboard from '../components/common/SellerChatDashboard';

// Add to your seller dashboard
<SellerChatDashboard />
```

## 🎨 Customization

### Theme Customization

```typescript
theme: {
  primaryColor: '#your-brand-color',
  secondaryColor: '#your-secondary-color',
  textColor: '#ffffff'
}
```

### Widget Position

```typescript
widget: {
  position: 'bottom-right', // or 'bottom-left', 'top-right', 'top-left'
  offset: {
    x: 24,
    y: 24
  }
}
```

### Chat Features

```typescript
features: {
  fileUpload: true,
  emojiPicker: true,
  typingIndicator: true,
  readReceipts: true
}
```

## 📊 Analytics & Tracking

### Chat Events

The integration provides event handlers for tracking:

```typescript
const handleChatStart = (chatId: string) => {
  // Track when chats start
  analytics.track('chat_started', { chatId });
};

const handleChatEnd = (chatId: string) => {
  // Track when chats end
  analytics.track('chat_ended', { chatId });
};

const handleMessageSent = (message: string) => {
  // Track messages sent
  analytics.track('message_sent', { message });
};
```

### Customer Information

```typescript
// Set customer data for personalized experience
liveChatService.setCustomer({
  name: 'John Doe',
  email: 'john@example.com',
  customFields: {
    projectType: 'Website Design',
    budget: '$5000',
    timeline: '2 months'
  }
});
```

## 🔒 Security & Privacy

### Data Protection
- All chat data is encrypted in transit
- Customer information is stored securely
- GDPR compliance features included
- Data retention policies configurable

### Access Control
- Agent permissions configurable
- Chat history access controls
- Customer data anonymization options

## 🚨 Troubleshooting

### Common Issues

#### Chat Widget Not Loading
1. Check your license key is correct
2. Verify environment variables are set
3. Check browser console for errors
4. Ensure LiveChat script loads properly

#### Messages Not Sending
1. Check internet connection
2. Verify LiveChat service status
3. Check agent availability
4. Review chat session status

#### Styling Issues
1. Check CSS conflicts
2. Verify theme configuration
3. Test on different devices
4. Clear browser cache

### Debug Mode

Enable debug mode to see detailed logs:

```typescript
// In your LiveChat service
console.log('LiveChat Status:', liveChatService.getChatStatus());
console.log('Agent Info:', liveChatService.getAgentInfo());
```

## 📈 Performance Optimization

### Best Practices
1. **Lazy load** chat widget on user interaction
2. **Preload** LiveChat scripts for faster startup
3. **Cache** customer information locally
4. **Optimize** image uploads and file sharing

### Monitoring
- Track chat response times
- Monitor customer satisfaction
- Analyze chat volume patterns
- Measure conversion rates

## 🔄 Updates & Maintenance

### Regular Updates
- Keep LiveChat package updated
- Monitor LiveChat service status
- Review and update configurations
- Test integrations after updates

### Backup & Recovery
- Backup chat configurations
- Export chat histories regularly
- Test recovery procedures
- Document customizations

## 📞 Support

### LiveChat Support
- [LiveChat Help Center](https://help.livechat.com/)
- [LiveChat Community](https://community.livechat.com/)
- [LiveChat Status Page](https://status.livechat.com/)

### SocyAds Integration Support
- Check this documentation
- Review code examples
- Test with demo license
- Contact development team

## 🎯 Next Steps

1. **Set up LiveChat account** and get license key
2. **Configure environment variables** with your license
3. **Test integration** with demo data
4. **Customize theme** to match your brand
5. **Train agents** on using the dashboard
6. **Monitor performance** and optimize

## 📝 License

This integration is part of the SocyAds platform and follows the same licensing terms. LiveChat is a separate service with its own terms of service.

---

**Need help?** Check the troubleshooting section or contact the development team for assistance with the integration.
