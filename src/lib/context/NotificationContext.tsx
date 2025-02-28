
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
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
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp'>) => void;
};

// Sample notifications for demo
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
  const unreadCount = notifications.filter(n => !n.isRead).length;

  // In a real app, we would subscribe to notifications from Supabase
  useEffect(() => {
    // This would be a real-time subscription to new notifications
    const setupNotificationListener = async () => {
      // Example subscription for a real app:
      // const channel = supabase
      //   .channel('public:notifications')
      //   .on('postgres_changes', { 
      //     event: 'INSERT', 
      //     schema: 'public', 
      //     table: 'notifications',
      //     filter: `user_id=eq.${user?.id}`
      //   }, (payload) => {
      //     const newNotification = payload.new as DbNotification;
      //     addNotification({
      //       title: newNotification.title,
      //       message: newNotification.message,
      //       type: newNotification.type,
      //       isRead: newNotification.is_read,
      //       relatedId: newNotification.related_id,
      //       actionUrl: newNotification.action_url
      //     });
      //     
      //     // Show toast for new notification
      //     toast({
      //       title: newNotification.title,
      //       description: newNotification.message,
      //     });
      //   })
      //   .subscribe();
      // 
      // return () => {
      //   supabase.removeChannel(channel);
      // };
    };

    setupNotificationListener();
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => 
      n.id === id ? { ...n, isRead: true } : n
    ));
    
    // In a real app, update the database
    // supabase
    //   .from('notifications')
    //   .update({ is_read: true })
    //   .eq('id', id);
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    
    // In a real app, update the database
    // supabase
    //   .from('notifications')
    //   .update({ is_read: true })
    //   .eq('user_id', user?.id);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp'>) => {
    const newNotification: Notification = {
      ...notification,
      id: `n${notifications.length + 1}`,
      timestamp: new Date().toISOString()
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Show toast for new notification
    toast({
      title: notification.title,
      description: notification.message,
    });
    
    // In a real app, insert into the database
    // supabase
    //   .from('notifications')
    //   .insert({
    //     user_id: user?.id,
    //     title: notification.title,
    //     message: notification.message,
    //     type: notification.type,
    //     is_read: false,
    //     related_id: notification.relatedId,
    //     action_url: notification.actionUrl
    //   });
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
