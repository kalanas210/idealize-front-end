// Mock database for influencer profiles and their gigs
export const influencers = [
  {
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
    totalEarnings: '$125,000+',
    about: `I'm a passionate tech reviewer with over 8 years of experience in the technology industry. I started my YouTube channel in 2019 and have built a community of tech enthusiasts who trust my honest opinions and detailed analysis.

My background includes working as a software engineer at major tech companies, which gives me unique insights into the products I review. I believe in providing authentic, unbiased reviews that help both creators and consumers make informed decisions.

When I'm not creating content, I enjoy exploring new technologies, attending tech conferences, and mentoring aspiring content creators.`,
    skills: ['Tech Reviews', 'Product Analysis', 'Video Editing', 'Content Strategy', 'SEO Optimization'],
    certifications: ['YouTube Creator Certification', 'Google Analytics Certified', 'Adobe Premiere Pro Expert'],
    socialAccounts: [
      {
        platform: 'YouTube',
        username: '@techguruofficial',
        url: 'https://youtube.com/@techguruofficial',
        subscribers: '250K',
        verified: true,
        stats: {
          totalViews: '15.2M',
          videosUploaded: 342,
          avgViewsPerVideo: '52K',
          engagementRate: '4.2%',
          subscriberGrowth: '+12.5%',
          viewsLast365Days: '8.7M'
        }
      },
      {
        platform: 'Instagram',
        username: '@techguru_mike',
        url: 'https://instagram.com/techguru_mike',
        subscribers: '85K',
        verified: true,
        stats: {
          totalPosts: 1250,
          avgLikes: '3.2K',
          avgComments: '180',
          engagementRate: '3.8%',
          storiesViews: '25K',
          reachLast30Days: '450K'
        }
      },
      {
        platform: 'TikTok',
        username: '@techguruofficial',
        url: 'https://tiktok.com/@techguruofficial',
        subscribers: '120K',
        verified: false,
        stats: {
          totalVideos: 89,
          avgViews: '45K',
          avgLikes: '2.1K',
          engagementRate: '4.7%',
          totalLikes: '1.2M',
          viewsLast30Days: '2.8M'
        }
      }
    ],
    gigs: [
      {
        id: 1,
        title: 'I will create a detailed tech review video for your product',
        description: 'Professional YouTube tech review with in-depth analysis and honest opinions',
        image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'YouTube',
        category: 'Technology',
        startingPrice: 299,
        deliveryTime: '3 days',
        rating: 4.9,
        reviews: 127,
        orders: 234,
        featured: true,
        tags: ['tech review', 'youtube', 'product analysis']
      },
      {
        id: 2,
        title: 'I will promote your tech product on my Instagram stories',
        description: 'Engaging Instagram stories promotion with swipe-up links and product highlights',
        image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'Instagram',
        category: 'Technology',
        startingPrice: 149,
        deliveryTime: '1 day',
        rating: 4.8,
        reviews: 89,
        orders: 156,
        featured: false,
        tags: ['instagram', 'stories', 'tech promotion']
      },
      {
        id: 3,
        title: 'I will create viral TikTok content featuring your gadget',
        description: 'Creative TikTok videos showcasing your tech products with trending sounds',
        image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'TikTok',
        category: 'Technology',
        startingPrice: 199,
        deliveryTime: '2 days',
        rating: 4.7,
        reviews: 67,
        orders: 98,
        featured: false,
        tags: ['tiktok', 'viral content', 'gadgets']
      }
    ],
    portfolio: [
      {
        id: 1,
        title: 'iPhone 15 Pro Max Review',
        platform: 'YouTube',
        views: '125K',
        engagement: '4.2%',
        thumbnail: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://youtube.com/watch?v=example1'
      },
      {
        id: 2,
        title: 'MacBook Air M3 Unboxing',
        platform: 'Instagram',
        views: '45K',
        engagement: '3.8%',
        thumbnail: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://instagram.com/p/example2'
      },
      {
        id: 3,
        title: 'Gaming Setup Tour',
        platform: 'TikTok',
        views: '89K',
        engagement: '4.7%',
        thumbnail: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://tiktok.com/@techguruofficial/video/example3'
      }
    ],
    reviews: [
      {
        id: 1,
        buyer: {
          name: 'Sarah Johnson',
          avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
          country: 'United States'
        },
        rating: 5,
        title: 'Exceptional quality and professionalism!',
        comment: 'Mike delivered exactly what was promised and more. The video quality was outstanding, and his genuine enthusiasm for our product really came through.',
        date: '2024-01-18',
        gigTitle: 'Tech Review Video',
        verified: true
      },
      {
        id: 2,
        buyer: {
          name: 'David Chen',
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
          country: 'Canada'
        },
        rating: 5,
        title: 'Great communication and results',
        comment: 'Working with Mike was a pleasure. He was very communicative throughout the process and delivered ahead of schedule.',
        date: '2024-01-15',
        gigTitle: 'Instagram Stories Promotion',
        verified: true
      }
    ]
  },
  {
    id: 2,
    name: 'FitLifeAna',
    username: '@fitlifeana',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=300',
    coverImage: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=1200',
    verified: true,
    level: 'Level 2',
    memberSince: '2020',
    location: 'Toronto, Canada',
    timezone: 'EST (UTC-5)',
    languages: ['English', 'French'],
    responseTime: '2 hours',
    lastSeen: '2 hours ago',
    completedOrders: 189,
    rating: 4.8,
    totalReviews: 156,
    totalEarnings: '$85,000+',
    about: `Certified fitness trainer and nutrition coach with a passion for helping people achieve their health goals. I've been creating fitness content for over 4 years and have built a community of 180K+ followers who trust my advice.

My content focuses on realistic fitness routines, healthy recipes, and mental wellness. I believe in promoting body positivity and sustainable lifestyle changes rather than quick fixes.

I work with fitness brands, supplement companies, and wellness products that align with my values and can genuinely benefit my audience.`,
    skills: ['Fitness Training', 'Nutrition Coaching', 'Content Creation', 'Photography', 'Community Building'],
    certifications: ['NASM Certified Personal Trainer', 'Precision Nutrition Level 1', 'Yoga Alliance RYT-200'],
    socialAccounts: [
      {
        platform: 'Instagram',
        username: '@fitlifeana',
        url: 'https://instagram.com/fitlifeana',
        subscribers: '180K',
        verified: true,
        stats: {
          totalPosts: 2100,
          avgLikes: '8.5K',
          avgComments: '320',
          engagementRate: '4.9%',
          storiesViews: '45K',
          reachLast30Days: '850K'
        }
      },
      {
        platform: 'YouTube',
        username: 'FitLife with Ana',
        url: 'https://youtube.com/c/fitlifeana',
        subscribers: '95K',
        verified: true,
        stats: {
          totalViews: '8.2M',
          videosUploaded: 156,
          avgViewsPerVideo: '28K',
          engagementRate: '5.1%',
          subscriberGrowth: '+18.2%',
          viewsLast365Days: '4.8M'
        }
      },
      {
        platform: 'TikTok',
        username: '@fitlifeana',
        url: 'https://tiktok.com/@fitlifeana',
        subscribers: '220K',
        verified: true,
        stats: {
          totalVideos: 245,
          avgViews: '65K',
          avgLikes: '4.2K',
          engagementRate: '6.5%',
          totalLikes: '2.8M',
          viewsLast30Days: '5.2M'
        }
      }
    ],
    gigs: [
      {
        id: 4,
        title: 'I will create fitness content featuring your products',
        description: 'Professional fitness content showcasing your products in workout routines',
        image: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'Instagram',
        category: 'Fitness',
        startingPrice: 149,
        deliveryTime: '2 days',
        rating: 4.8,
        reviews: 156,
        orders: 189,
        featured: true,
        tags: ['fitness', 'instagram', 'product placement']
      },
      {
        id: 5,
        title: 'I will create workout videos for your fitness brand',
        description: 'Complete workout routines featuring your equipment or supplements',
        image: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'YouTube',
        category: 'Fitness',
        startingPrice: 299,
        deliveryTime: '5 days',
        rating: 4.9,
        reviews: 89,
        orders: 134,
        featured: false,
        tags: ['youtube', 'workout', 'fitness equipment']
      },
      {
        id: 6,
        title: 'I will create viral fitness challenges on TikTok',
        description: 'Engaging fitness challenges that showcase your brand in a fun way',
        image: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=600',
        platform: 'TikTok',
        category: 'Fitness',
        startingPrice: 199,
        deliveryTime: '3 days',
        rating: 4.7,
        reviews: 78,
        orders: 112,
        featured: false,
        tags: ['tiktok', 'fitness challenge', 'viral content']
      }
    ],
    portfolio: [
      {
        id: 4,
        title: '30-Day Abs Challenge',
        platform: 'Instagram',
        views: '89K',
        engagement: '4.9%',
        thumbnail: 'https://images.pexels.com/photos/4050302/pexels-photo-4050302.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://instagram.com/p/example4'
      },
      {
        id: 5,
        title: 'Full Body HIIT Workout',
        platform: 'YouTube',
        views: '156K',
        engagement: '5.1%',
        thumbnail: 'https://images.pexels.com/photos/4050318/pexels-photo-4050318.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://youtube.com/watch?v=example5'
      },
      {
        id: 6,
        title: 'Morning Routine Challenge',
        platform: 'TikTok',
        views: '234K',
        engagement: '6.5%',
        thumbnail: 'https://images.pexels.com/photos/4050417/pexels-photo-4050417.jpeg?auto=compress&cs=tinysrgb&w=400',
        url: 'https://tiktok.com/@fitlifeana/video/example6'
      }
    ],
    reviews: [
      {
        id: 3,
        buyer: {
          name: 'Emma Wilson',
          avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
          country: 'United Kingdom'
        },
        rating: 5,
        title: 'Amazing engagement and authentic content',
        comment: 'Ana created beautiful content that perfectly showcased our fitness products. Her audience engagement was incredible!',
        date: '2024-01-20',
        gigTitle: 'Fitness Content Creation',
        verified: true
      }
    ]
  }
];

export const getInfluencerById = (id) => {
  return influencers.find(influencer => influencer.id === parseInt(id));
};

export const getInfluencerGigs = (influencerId) => {
  const influencer = getInfluencerById(influencerId);
  return influencer ? influencer.gigs : [];
};

export const getInfluencerReviews = (influencerId) => {
  const influencer = getInfluencerById(influencerId);
  return influencer ? influencer.reviews : [];
};