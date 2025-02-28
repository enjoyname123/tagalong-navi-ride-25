
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
    // In a real app, we would fetch chats from Supabase
    const fetchChats = async () => {
      setIsLoadingChats(true);
      try {
        // For the demo, we'll use mock data
        setChats(mockChats);
        if (mockChats.length > 0) {
          setSelectedChat(mockChats[0]);
        }
      } catch (error) {
        console.error('Error fetching chats:', error);
      } finally {
        setIsLoadingChats(false);
      }
    };

    fetchChats();
    
    // Set up real-time subscription for new messages
    // In a real app:
    // const channel = supabase
    //   .channel('public:messages')
    //   .on('postgres_changes', { 
    //     event: 'INSERT', 
    //     schema: 'public', 
    //     table: 'messages',
    //   }, async (payload) => {
    //     const newMessage = payload.new as DbMessage;
    //     
    //     // Fetch the chat this message belongs to
    //     const { data: chatData } = await supabase
    //       .from('chats')
    //       .select('*')
    //       .eq('id', newMessage.chat_id)
    //       .single();
    //     
    //     if (chatData) {
    //       // Update the chat's last_updated
    //       await supabase
    //         .from('chats')
    //         .update({ last_updated: new Date().toISOString() })
    //         .eq('id', newMessage.chat_id);
    //       
    //       // Check if the message is from someone else
    //       if (newMessage.sender_id !== user?.id) {
    //         // Create a notification
    //         const { data: senderData } = await supabase
    //           .from('users')
    //           .select('name')
    //           .eq('id', newMessage.sender_id)
    //           .single();
    //           
    //         if (senderData) {
    //           addNotification({
    //             title: 'New Message',
    //             message: `${senderData.name} sent you a message: "${newMessage.text.substring(0, 30)}${newMessage.text.length > 30 ? '...' : ''}"`,
    //             type: 'chat_message',
    //             isRead: false,
    //             relatedId: newMessage.chat_id,
    //             actionUrl: '/chat'
    //           });
    //         }
    //       }
    //       
    //       // Update the chats state with the new message
    //       setChats(prev => prev.map(chat => {
    //         if (chat.id === newMessage.chat_id) {
    //           return {
    //             ...chat,
    //             messages: [...chat.messages, {
    //               id: newMessage.id,
    //               senderId: newMessage.sender_id,
    //               text: newMessage.text,
    //               timestamp: newMessage.created_at,
    //               isRead: newMessage.is_read
    //             }],
    //             lastUpdated: new Date().toISOString()
    //           };
    //         }
    //         return chat;
    //       }));
    //     }
    //   })
    //   .subscribe();
    // 
    // return () => {
    //   supabase.removeChannel(channel);
    // };
  }, [user]);

  const selectChat = (chatId: string) => {
    const chat = chats.find(c => c.id === chatId);
    if (chat) {
      setSelectedChat(chat);
      
      // Mark all messages in this chat as read
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
      
      // In a real app, update the database:
      // await supabase
      //   .from('messages')
      //   .update({ is_read: true })
      //   .eq('chat_id', chatId)
      //   .neq('sender_id', user?.id)
      //   .eq('is_read', false);
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
    
    // Optimistically update the UI
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
    
    // In a real app, send to the database:
    // try {
    //   await supabase
    //     .from('messages')
    //     .insert({
    //       chat_id: chatId,
    //       sender_id: user.id,
    //       text,
    //       is_read: false
    //     });
    //   
    //   // Update the chat's last_updated time
    //   await supabase
    //     .from('chats')
    //     .update({ last_updated: timestamp })
    //     .eq('id', chatId);
    // } catch (error) {
    //   console.error('Error sending message:', error);
    //   // Revert optimistic update on error
    //   setChats(chats);
    // }
  };

  const createChat = async (userId: string, rideId: string): Promise<string> => {
    if (!user) throw new Error('User not authenticated');
    
    // Check if a chat already exists between these users for this ride
    const existingChat = chats.find(chat => 
      chat.rideId === rideId && 
      chat.participants.some(p => p.id === userId) &&
      chat.participants.some(p => p.id === user.id)
    );
    
    if (existingChat) {
      setSelectedChat(existingChat);
      return existingChat.id;
    }
    
    // In a real app, this would create a new chat in the database
    // For demo, create a new chat with mock data
    const otherUser = mockUsers.find(u => u.id === userId);
    if (!otherUser) throw new Error('User not found');
    
    const newChatId = `c${chats.length + 1}`;
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
    
    // In a real app:
    // try {
    //   // Create a new chat
    //   const { data: chatData, error: chatError } = await supabase
    //     .from('chats')
    //     .insert({
    //       ride_id: rideId,
    //       last_updated: timestamp
    //     })
    //     .select()
    //     .single();
    //   
    //   if (chatError) throw chatError;
    //   
    //   // Add participants to the chat
    //   await supabase
    //     .from('chat_participants')
    //     .insert([
    //       { chat_id: chatData.id, user_id: user.id },
    //       { chat_id: chatData.id, user_id: userId }
    //     ]);
    //   
    //   return chatData.id;
    // } catch (error) {
    //   console.error('Error creating chat:', error);
    //   throw error;
    // }
    
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
