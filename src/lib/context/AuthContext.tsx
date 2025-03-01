
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useAuth as useClerkAuth, useUser } from '@clerk/clerk-react';
import { supabase, getCurrentUser, DbUser } from '../supabase';
import { User } from '../types';
import { mockUsers } from '../mockData';

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  signIn: async () => ({ error: new Error('Not implemented') }),
  signOut: async () => {},
  signUp: async () => ({ error: new Error('Not implemented') }),
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isLoaded: isClerkLoaded, isSignedIn, userId } = useClerkAuth();
  const { user: clerkUser } = useUser();

  useEffect(() => {
    // Load user data when Clerk auth is loaded
    const loadUser = async () => {
      setIsLoading(true);
      
      try {
        if (isClerkLoaded) {
          if (isSignedIn && userId && clerkUser) {
            // In a real app, we would fetch user profile from our database
            // For demo, create a user object from Clerk data or use mock data
            
            // Try to find a matching mock user (for demo purposes)
            const mockUser = mockUsers.find(u => u.email === clerkUser.primaryEmailAddress?.emailAddress);
            
            if (mockUser) {
              setUser(mockUser);
            } else {
              // Create a new user based on Clerk data
              const newUser: User = {
                id: userId,
                name: clerkUser.firstName && clerkUser.lastName 
                  ? `${clerkUser.firstName} ${clerkUser.lastName}`
                  : clerkUser.username || 'TagAlong User',
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                profileImage: clerkUser.imageUrl || null,
                phone: clerkUser.phoneNumbers?.[0]?.phoneNumber || null,
                rating: 0,
                isVerified: clerkUser.emailAddresses?.[0]?.verification?.status === 'verified',
                ridesCompleted: 0,
                dateJoined: new Date().toISOString()
              };
              
              setUser(newUser);
            }
          } else {
            setUser(null);
          }
          
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        setIsLoading(false);
      }
    };

    loadUser();
  }, [isClerkLoaded, isSignedIn, userId, clerkUser]);

  // These methods use the mocked Supabase methods for demo
  // In a production app with Clerk, these would be removed or adapted
  const signIn = async (email: string, password: string) => {
    try {
      // This is just for compatibility with existing code
      // Clerk handles the actual sign in
      return { error: null };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    // Clerk handles sign out in the UI
    setUser(null);
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // This is just for compatibility with existing code
      // Clerk handles the actual sign up
      return { error: null };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isLoading: isLoading || !isClerkLoaded, 
      signIn, 
      signOut, 
      signUp 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
