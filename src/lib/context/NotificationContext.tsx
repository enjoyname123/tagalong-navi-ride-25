
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, DbNotification } from '../supabase';
import { useAuth } from './AuthContext';
import { toast } from '@/hooks/use-toast';

export type Notification = {
  id: string;
  title: string;
  message: string;
  type: 'ride_request' | 'chat_message' | 'ride_update' | 'system';
  isRead: boolean;
  timestamp: string;
  relatedId?: string;
  actionUrl?: string;
};

type NotificationContextType = {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'> & { actionUrl?: string }) => void;
};

// Sample notifications for initial state
const initialNotifications: Notification[] = [
  {
    id: 'n1',
    title: 'New Ride Request',
    message: 'Priya Sharma has requested to join your ride to Hitech City tomorrow.',
    type: 'ride_request',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    relatedId: 'r1',
    actionUrl: '/ride/r1'
  },
  {
    id: 'n2',
    title: 'New Message',
    message: 'You have a new message from Raj Kumar.',
    type: 'chat_message',
    isRead: true,
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(), // 2 hours ago
    relatedId: 'c2',
    actionUrl: '/chat'
  },
  {
    id: 'n3',
    title: 'Ride Update',
    message: 'Your upcoming ride to Jubilee Hills has been confirmed.',
    type: 'ride_update',
    isRead: false,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    relatedId: 'r2',
    actionUrl: '/ride/r2'
  }
];

const NotificationContext = createContext<NotificationContextType>({
  notifications: [],
  unreadCount: 0,
  markAsRead: () => {},
  markAllAsRead: () => {},
  addNotification: () => {}
});

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const { user } = useAuth();
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // Fetch notifications from Supabase on mount and when user changes
  useEffect(() => {
    if (!user) return;

    const fetchNotifications = async () => {
      try {
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) {
          console.error('Error fetching notifications:', error);
          return;
        }

        if (data) {
          const transformedNotifications: Notification[] = data.map((n: DbNotification) => ({
            id: n.id,
            title: n.title,
            message: n.message,
            type: n.type,
            isRead: n.is_read,
            timestamp: n.created_at,
            relatedId: n.related_id,
            actionUrl: n.action_url
          }));
          
          setNotifications(transformedNotifications);
        }
      } catch (error) {
        console.error('Error in fetchNotifications:', error);
      }
    };

    fetchNotifications();

    // Subscribe to new notifications
    const channel = supabase
      .channel('public:notifications')
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'notifications',
        filter: `user_id=eq.${user.id}`
      }, (payload) => {
        const newNotification = payload.new as DbNotification;
        
        const transformedNotification: Notification = {
          id: newNotification.id,
          title: newNotification.title,
          message: newNotification.message,
          type: newNotification.type,
          isRead: newNotification.is_read,
          timestamp: newNotification.created_at,
          relatedId: newNotification.related_id,
          actionUrl: newNotification.action_url
        };
        
        setNotifications(prev => [transformedNotification, ...prev]);
        
        // Show toast for new notification
        toast({
          title: newNotification.title,
          description: newNotification.message,
        });
      })
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const markAsRead = async (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    
    if (user) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('id', id);
      } catch (error) {
        console.error('Error marking notification as read:', error);
      }
    }
  };

  const markAllAsRead = async () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    
    if (user) {
      try {
        await supabase
          .from('notifications')
          .update({ is_read: true })
          .eq('user_id', user.id);
      } catch (error) {
        console.error('Error marking all notifications as read:', error);
      }
    }
  };

  const addNotification = async (notification: Omit<Notification, 'id' | 'timestamp'> & { actionUrl?: string }) => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('notifications')
        .insert({
          user_id: user.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          is_read: false,
          related_id: notification.relatedId,
          action_url: notification.actionUrl
        })
        .select()
        .single();
      
      if (error) {
        console.error('Error adding notification:', error);
        return;
      }
      
      if (data) {
        const newNotification: Notification = {
          id: data.id,
          title: data.title,
          message: data.message,
          type: data.type,
          isRead: data.is_read,
          timestamp: data.created_at,
          relatedId: data.related_id,
          actionUrl: data.action_url
        };
        
        setNotifications(prev => [newNotification, ...prev]);
        
        // Show toast for new notification
        toast({
          title: notification.title,
          description: notification.message,
        });
      }
    } catch (error) {
      console.error('Error in addNotification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount, 
      markAsRead, 
      markAllAsRead,
      addNotification
    }}>
      {children}
    </NotificationContext.Provider>
  );
};
