// Mock database for products, orders, and other data
export const products = [
  {
    id: 1,
    title: 'I will promote your brand in my YouTube tech reviews with detailed analysis',
    description: 'Get your product featured in my comprehensive tech review videos that reach over 250K engaged subscribers. I specialize in detailed product analysis, unboxing experiences, and honest reviews that drive real conversions.',
    fullDescription: `
      Welcome to my premium tech review service! With over 5 years of experience in the tech industry and a loyal audience of 250K+ subscribers, I offer authentic product reviews that genuinely connect with viewers.

      **What you get:**
      - Detailed product unboxing and first impressions
      - In-depth technical analysis and testing
      - Honest pros and cons discussion
      - Call-to-action with your provided links
      - Professional video editing and thumbnails
      - Cross-promotion on my social media channels

      **My Audience:**
      - 78% Male, 22% Female
      - Age range: 18-45 (primary 25-35)
      - Tech enthusiasts and early adopters
      - High purchasing power and engagement
      - Global reach with 60% US audience

      **Channel Performance:**
      - Average 50K+ views per video
      - 4.2% engagement rate
      - 89% audience retention
      - Consistent upload schedule (3x per week)
    `,
    creator: {
      id: 1,
      name: 'TechGuru Mike',
      username: '@techguruofficial',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
      coverImage: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=1200',
      verified: true,
      level: 'Top Rated',
      memberSince: '2019',
      location: 'San Francisco, CA',
      timezone: 'PST (UTC-8)',
      languages: ['English', 'Spanish'],
      responseTime: '1 hour',
      lastSeen: 'Online now',
      completedOrders: 234,
      rating: 4.9,
      totalReviews: 127,
      about: `I'm a passionate tech reviewer with over 8 years of experience in the technology industry. I started my YouTube channel in 2019 and have built a community of tech enthusiasts who trust my honest opinions and detailed analysis.

      My background includes working as a software engineer at major tech companies, which gives me unique insights into the products I review. I believe in providing authentic, unbiased reviews that help both creators and consumers make informed decisions.

      When I'm not creating content, I enjoy exploring new technologies, attending tech conferences, and mentoring aspiring content creators.`,
      rules: [
        'Product must be tech-related (smartphones, laptops, gadgets, software)',
        'Minimum 2 weeks notice required for video production',
        'I maintain editorial independence - honest reviews only',
        'Product must be sent to my PO Box address',
        'No adult content, gambling, or controversial products',
        'Revisions limited to 2 rounds of feedback',
        'Video will remain on channel permanently unless discussed otherwise'
      ],
      socialLinks: {
        youtube: 'https://youtube.com/@techguruofficial',
        twitter: 'https://twitter.com/techguruofficial',
        instagram: 'https://instagram.com/techguruofficial',
        website: 'https://techguru.com'
      },
      channelStats: {
        subscribers: '250K',
        totalViews: '15.2M',
        videosUploaded: 342,
        avgViewsPerVideo: '52K',
        engagementRate: '4.2%',
        subscriberGrowth: '+12.5%',
        viewsLast365Days: '8.7M'
      }
    },
    images: [
      'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3184299/pexels-photo-3184299.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    proofScreenshots: [
      {
        type: 'analytics',
        title: 'YouTube Analytics - Last 365 Days',
        image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: '8.7M views in the last 365 days with consistent growth'
      },
      {
        type: 'monetization',
        title: 'Monetization Status',
        image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Fully monetized channel with AdSense approval'
      },
      {
        type: 'dashboard',
        title: 'Channel Dashboard Overview',
        image: 'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: 'Real-time channel performance metrics'
      }
    ],
    packages: [
      {
        id: 'basic',
        name: 'Basic Review',
        price: 299,
        originalPrice: 399,
        deliveryTime: '7 days',
        revisions: 1,
        features: [
          '5-minute product review video',
          'Basic editing and thumbnail',
          'Upload to main channel',
          'Social media mention',
          'Basic analytics report'
        ],
        popular: false
      },
      {
        id: 'standard',
        name: 'Standard Review',
        price: 499,
        originalPrice: 649,
        deliveryTime: '5 days',
        revisions: 2,
        features: [
          '10-minute detailed review video',
          'Professional editing and custom thumbnail',
          'Upload to main channel',
          'Social media promotion package',
          'Detailed analytics report',
          'Community post mention',
          'Video optimization for SEO'
        ],
        popular: true
      },
      {
        id: 'premium',
        name: 'Premium Review',
        price: 799,
        originalPrice: 999,
        deliveryTime: '3 days',
        revisions: 3,
        features: [
          '15-minute comprehensive review video',
          'Premium editing with motion graphics',
          'Custom thumbnail design',
          'Upload to main channel',
          'Full social media campaign',
          'Comprehensive analytics report',
          'Community post and stories',
          'Video optimization for SEO',
          'Follow-up short video',
          '30-day performance tracking'
        ],
        popular: false
      }
    ],
    platform: 'YouTube',
    category: 'Technology',
    tags: ['tech review', 'product review', 'youtube', 'technology', 'gadgets', 'unboxing'],
    rating: 4.9,
    totalReviews: 127,
    completedOrders: 234,
    inQueue: 3,
    featured: true,
    createdAt: '2024-01-15',
    lastUpdated: '2024-01-20'
  }
];

export const reviews = [
  {
    id: 1,
    productId: 1,
    buyer: {
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
      country: 'United States'
    },
    rating: 5,
    title: 'Exceptional quality and professionalism!',
    comment: 'Mike delivered exactly what was promised and more. The video quality was outstanding, and his genuine enthusiasm for our product really came through. We saw a 40% increase in sales within the first week of the video going live. Highly recommended!',
    date: '2024-01-18',
    helpful: 23,
    package: 'Standard Review',
    verified: true
  },
  {
    id: 2,
    productId: 1,
    buyer: {
      name: 'David Chen',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      country: 'Canada'
    },
    rating: 5,
    title: 'Great communication and results',
    comment: 'Working with Mike was a pleasure. He was very communicative throughout the process and delivered ahead of schedule. The review was honest and detailed, which is exactly what we wanted. Will definitely work with him again.',
    date: '2024-01-15',
    helpful: 18,
    package: 'Premium Review',
    verified: true
  },
  {
    id: 3,
    productId: 1,
    buyer: {
      name: 'Emma Wilson',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
      country: 'United Kingdom'
    },
    rating: 4,
    title: 'Good value for money',
    comment: 'The basic package was perfect for our budget. Mike provided a solid review that highlighted our product features well. The only minor issue was the delivery was a day late, but the quality made up for it.',
    date: '2024-01-12',
    helpful: 12,
    package: 'Basic Review',
    verified: true
  }
];

export const relatedGigs = [
  {
    id: 2,
    title: 'Instagram story shoutout to 180K fitness audience',
    creator: 'FitLifeAna',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 149,
    rating: 5.0,
    reviews: 89,
    platform: 'Instagram',
    deliveryTime: '1 day'
  },
  {
    id: 3,
    title: 'TikTok viral dance with your product placement',
    creator: 'DanceQueenSarah',
    avatar: 'https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 199,
    rating: 4.8,
    reviews: 156,
    platform: 'TikTok',
    deliveryTime: '2 days'
  },
  {
    id: 4,
    title: 'Facebook page post and live stream mention',
    creator: 'BusinessBob',
    avatar: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/4050288/pexels-photo-4050288.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 179,
    rating: 4.7,
    reviews: 94,
    platform: 'Facebook',
    deliveryTime: '2 days'
  },
  {
    id: 5,
    title: 'Gaming livestream sponsorship integration',
    creator: 'GameMasterAlex',
    avatar: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=600',
    price: 399,
    rating: 4.9,
    reviews: 73,
    platform: 'Twitch',
    deliveryTime: '5 days'
  }
];

export const orders = [
  {
    id: 'ORD-001',
    productId: 1,
    buyer: 'Sarah Johnson',
    seller: 'TechGuru Mike',
    package: 'Standard Review',
    status: 'completed',
    price: 499,
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-15',
    requirements: 'Please focus on the camera quality and battery life features.'
  },
  {
    id: 'ORD-002',
    productId: 1,
    buyer: 'David Chen',
    seller: 'TechGuru Mike',
    package: 'Premium Review',
    status: 'in-progress',
    price: 799,
    orderDate: '2024-01-18',
    deliveryDate: '2024-01-21',
    requirements: 'Need emphasis on business use cases and productivity features.'
  }
];

export const messages = [
  {
    id: 1,
    orderId: 'ORD-002',
    sender: 'buyer',
    senderName: 'David Chen',
    message: 'Hi Mike, I just placed an order for the premium review package. When can we schedule a call to discuss the requirements?',
    timestamp: '2024-01-18T10:30:00Z',
    read: true
  },
  {
    id: 2,
    orderId: 'ORD-002',
    sender: 'seller',
    senderName: 'TechGuru Mike',
    message: 'Hi David! Thanks for your order. I can schedule a call for tomorrow at 2 PM PST. Does that work for you?',
    timestamp: '2024-01-18T11:15:00Z',
    read: true
  },
  {
    id: 3,
    orderId: 'ORD-002',
    sender: 'buyer',
    senderName: 'David Chen',
    message: 'Perfect! I\'ll send you the product details and key points I\'d like you to cover.',
    timestamp: '2024-01-18T11:45:00Z',
    read: false
  }
];