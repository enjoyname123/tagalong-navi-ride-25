
import React, { createContext, useContext, useEffect, useState } from 'react';
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

  useEffect(() => {
    // In a production app, we would fetch the real user data from Supabase
    // For the demo, we'll use the first mock user
    const loadUser = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would fetch the user from Supabase
        // const dbUser = await getCurrentUser();
        
        // For the demo, using mock data
        const mockUser = mockUsers[0];
        
        if (mockUser) {
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        // In a real app, fetch user profile
        // We're using mock data for demo
        setUser(mockUsers[0]);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) {
        // For demo, directly set the mock user
        setUser(mockUsers[0]);
      }
      return { error };
    } catch (error) {
      console.error('Error signing in:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });
      
      if (!error && data.user) {
        // In a real app, create user profile in the database
        // For the demo, we'll use the mock user
        setUser(mockUsers[0]);
      }
      
      return { error };
    } catch (error) {
      console.error('Error signing up:', error);
      return { error: error as Error };
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};
