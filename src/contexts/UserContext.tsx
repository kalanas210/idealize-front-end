import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser } from '@clerk/clerk-react';
import { useAuth } from '@clerk/clerk-react';
import { API_ENDPOINTS } from '../config/api';
import { authService } from '../services/authService';

interface UserProfile {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'buyer' | 'seller' | 'admin';
  verified: boolean;
  avatar?: string;
  bio?: string;
  skills?: string[];
  languages?: string[];
  location?: string;
  professionalTitle?: string;
  experience?: string;
}

interface UserContextType {
  userProfile: UserProfile | null;
  isLoading: boolean;
  refetchProfile: () => Promise<void>;
  updateUserRole: (role: 'buyer' | 'seller' | 'admin') => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUserProfile = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserProfile must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const { isSignedIn, user } = useUser();
  const { getToken } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUserProfile = async () => {
    if (!isSignedIn || !user) return;

    console.log('UserContext - Fetching profile for user:', user.id);
    setIsLoading(true);
    try {
      const token = await getToken();
      if (!token) return;

      const response = await fetch(API_ENDPOINTS.USER.PROFILE, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data) {
          console.log('UserContext - Profile fetched successfully:', data.data);
          
          // Check if we have a stored role that should override the fetched one
          const storedRole = localStorage.getItem('userRole');
          console.log('UserContext - Profile fetched, stored role:', storedRole, 'fetched role:', data.data.role);
          
          if (storedRole && ['buyer', 'seller', 'admin'].includes(storedRole)) {
            console.log('UserContext - Using stored role:', storedRole);
            setUserProfile({ ...data.data, role: storedRole });
          } else {
            console.log('UserContext - Using fetched role:', data.data.role);
            setUserProfile(data.data);
          }
        }
      } else {
        // If profile fetch fails, create a default profile from Clerk user
        const storedRole = localStorage.getItem('userRole');
        console.log('UserContext - Profile fetch failed, stored role:', storedRole);
        
        const defaultProfile = {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'user',
          name: user.fullName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
          role: storedRole && ['buyer', 'seller', 'admin'].includes(storedRole) ? storedRole : 'buyer',
          verified: true
        };
        console.log('UserContext - Using default profile:', defaultProfile);
        setUserProfile(defaultProfile);
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
      // Create default profile on error
      if (user) {
        const storedRole = localStorage.getItem('userRole');
        setUserProfile({
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress || '',
          username: user.username || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'user',
          name: user.fullName || user.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
          role: storedRole && ['buyer', 'seller', 'admin'].includes(storedRole) ? storedRole : 'buyer',
          verified: true
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refetchProfile = async () => {
    await fetchUserProfile();
  };

  const updateUserRole = (role: 'buyer' | 'seller' | 'admin') => {
    if (userProfile) {
      console.log('UserContext - Updating user role from', userProfile.role, 'to', role);
      setUserProfile({ ...userProfile, role });
      
      // Also update the role in localStorage to persist across re-renders
      localStorage.setItem('userRole', role);
      console.log('UserContext - Role saved to localStorage:', role);
    } else {
      console.log('UserContext - No userProfile available for role update');
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
      // Clear stored role when user signs out
      localStorage.removeItem('userRole');
    }
  }, [isSignedIn, user]);

  const value: UserContextType = {
    userProfile,
    isLoading,
    refetchProfile,
    updateUserRole
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};
