
import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../supabase';
import { Chat, ChatMessage, User } from '../types';
import { mockChats, mockUsers } from '../mockData';
import { useNotifications } from './NotificationContext';
import { useAuth } from './AuthContext';

type MessageContextType = {
  chats: Chat[];
  selectedChat: Chat | null;
  selectChat: (chatId: string) => void;
  sendMessage: (chatId: string, text: string) => Promise<void>;
  createChat: (userId: string, rideId: string) => Promise<string>;
  isLoadingChats: boolean;
};

const MessageContext = createContext<MessageContextType>({
  chats: [],
  selectedChat: null,
  selectChat: () => {},
  sendMessage: async () => {},
  createChat: async () => '',
  isLoadingChats: false,
});

export const useMessages = () => useContext(MessageContext);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [isLoadingChats, setIsLoadingChats] = useState(true);
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    const fetchChats = async () => {
      setIsLoadingChats(true);
      
      try {
        if (user) {
          const userChats = mockChats.filter(chat => 
            chat.participants.some(p => p.id === user.id)
          );
          
          setChats(userChats);
          setSelectedChat(userChats.length > 0 ? userChats[0] : null);
        } else {
          setChats([]);
          setSelectedChat(null);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchChats();
  }, [user]);

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setSelectedChat(chat);
      
      const updatedChats = chats.map(c => {
        if (c.id === chatId) {
          return {
            ...c,
            messages: c.messages.map(m => {
              if (m.senderId !== user?.id && !m.isRead) {
                return { ...m, isRead: true };
              }
              return m;
            })
          };
        }
        return c;
      });
      setChats(updatedChats);
    }
  };

  const sendMessage = async (chatId: string, text: string) => {
    if (!user) return;
    
    const timestamp = new Date().toISOString();
    const newMessage: ChatMessage = {
      id: `m${Date.now()}`,
      senderId: user.id,
      text,
      timestamp,
      isRead: false
    };
    
    const updatedChats = chats.map(chat => {
      if (chat.id === chatId) {
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastUpdated: timestamp
        };
      }
      return chat;
    });
    
    setChats(updatedChats);
    
    if (selectedChat?.id === chatId) {
      setSelectedChat({
        ...selectedChat,
        messages: [...selectedChat.messages, newMessage],
        lastUpdated: timestamp
      });
    }
    
    if (selectedChat) {
      const otherUser = selectedChat.participants.find(p => p.id !== user.id);
      if (otherUser) {
        setTimeout(() => {
          const responseMessage: ChatMessage = {
            id: `m${Date.now() + 1}`,
            senderId: otherUser.id,
            text: `Thanks for your message: "${text.substring(0, 30)}${text.length > 30 ? '...' : ''}"`,
            timestamp: new Date().toISOString(),
            isRead: false
          };
          
          const updatedChatsWithResponse = chats.map(chat => {
            if (chat.id === chatId) {
              return {
                ...chat,
                messages: [...chat.messages, responseMessage],
                lastUpdated: responseMessage.timestamp
              };
            }
            return chat;
          });
          
          setChats(updatedChatsWithResponse);
          
          if (selectedChat?.id === chatId) {
            setSelectedChat({
              ...selectedChat,
              messages: [...selectedChat.messages, responseMessage],
              lastUpdated: responseMessage.timestamp
            });
          }
          
          addNotification({
            title: 'New Message',
            message: `${otherUser.name} replied to your message`,
            type: 'chat_message',
            isRead: false,
            actionUrl: '/chat'
          });
        }, 2000);
      }
    }
  };

  const createChat = async (userId: string, rideId: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    const existingChat = chats.find(chat => 
      chat.rideId === rideId && 
      chat.participants.some(p => p.id === userId) &&
      chat.participants.some(p => p.id === user.id)
    );
    
    if (existingChat) {
      setSelectedChat(existingChat);
      return existingChat.id;
    }
    
    const otherUser = mockUsers.find(u => u.id === userId);
    if (!otherUser) throw new Error('User not found');
    
    const newChatId = `c${Date.now()}`;
    const timestamp = new Date().toISOString();
    
    const newChat: Chat = {
      id: newChatId,
      participants: [user, otherUser],
      rideId,
      messages: [],
      lastUpdated: timestamp
    };
    
    setChats([newChat, ...chats]);
    setSelectedChat(newChat);
    
    return newChatId;
  };

  return (
    <MessageContext.Provider value={{ 
      chats, 
      selectedChat, 
      selectChat, 
      sendMessage, 
      createChat,
      isLoadingChats
    }}>
      {children}
    </MessageContext.Provider>
  );
};
