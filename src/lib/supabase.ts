
import { createClient } from '@supabase/supabase-js';

// These values should be replaced with environment variables
// For now, we'll use placeholder values that allow the app to build
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://example.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define database schemas for TypeScript
export type DbUser = {
  id: string;
  created_at: string;
  email: string;
  name: string;
  profile_image: string | null;
  phone: string | null;
  rating: number;
  is_verified: boolean;
  rides_completed: number;
  date_joined: string;
};

export type DbMessage = {
  id: string;
  created_at: string;
  chat_id: string;
  sender_id: string;
  text: string;
  is_read: boolean;
};

export type DbChat = {
  id: string;
  created_at: string;
  ride_id: string | null;
  last_updated: string;
};

export type DbChatParticipant = {
  id: string;
  chat_id: string;
  user_id: string;
};

export type DbNotification = {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  message: string;
  type: 'ride_request' | 'chat_message' | 'ride_update' | 'system';
  is_read: boolean;
  related_id?: string;
  action_url?: string;
};

export type DbRide = {
  id: string;
  created_at: string;
  driver_id: string;
  origin_label: string;
  origin_lat: number;
  origin_lng: number;
  destination_label: string;
  destination_lat: number;
  destination_lng: number;
  departure_time: string;
  vehicle_type: 'bike' | 'car';
  available_seats: number;
  fare: number;
  distance: number;
  duration: number;
  allows_gender: 'any' | 'male' | 'female';
  requires_helmet: boolean;
  status: 'upcoming' | 'active' | 'completed' | 'cancelled';
};

// Auth helpers
export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  
  // Fetch user profile data
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data as DbUser | null;
};
