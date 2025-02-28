
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import ChatBox from '@/components/ChatBox';
import { useAuth } from '@/lib/context/AuthContext';
import { useMessages } from '@/lib/context/MessageContext';
import { Chat as ChatType } from '@/lib/types';
import { Calendar, Search, ChevronLeft, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { formatDistanceToNow } from 'date-fns';

const Chat = () => {
  const { user } = useAuth();
  const { chats, selectedChat, selectChat, isLoadingChats } = useMessages();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileViewingChat, setIsMobileViewingChat] = useState(false);
  
  useEffect(() => {
    // Check for mobile view on initial render and when selectedChat changes
    const checkMobileView = () => {
      if (window.innerWidth < 768 && selectedChat) {
        setIsMobileViewingChat(true);
      } else {
        setIsMobileViewingChat(false);
      }
    };
    
    checkMobileView();
    
    // Add resize listener
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, [selectedChat]);
  
  if (!user) {
    return null; // Should be handled by ProtectedRoute
  }
  
  const filteredChats = chats.filter(chat => {
    // Get the other user in the chat (not the current user)
    const otherUser = chat.participants.find(p => p.id !== user.id) || chat.participants[0];
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  }).sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  const handleSelectChat = (chat: ChatType) => {
    selectChat(chat.id);
  };

  if (isLoadingChats) {
    return (
      <div className="bg-tagalong-gray min-h-screen">
        <AppHeader />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center h-[500px]">
              <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
              <div className="ml-4 text-gray-600">Loading chats...</div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="bg-tagalong-gray min-h-screen">
      <AppHeader />
      
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Sidebar with chat list - hide on mobile when viewing a chat */}
                {(!isMobileViewingChat || !selectedChat) && (
                  <div className="border-r border-gray-100 md:block">
                    <div className="p-4">
                      <div className="relative mb-4">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Search className="h-4 w-4 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Search messages..."
                          className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      
                      <div className="space-y-1">
                        {filteredChats.length > 0 ? (
                          filteredChats.map((chat) => {
                            const otherUser = chat.participants.find(p => p.id !== user.id) || chat.participants[0];
                            const lastMessage = chat.messages[chat.messages.length - 1];
                            const isSelected = selectedChat?.id === chat.id;
                            const hasUnread = chat.messages.some(m => !m.isRead && m.senderId !== user.id);
                            
                            return (
                              <div 
                                key={chat.id}
                                className={`p-3 rounded-xl cursor-pointer transition-colors ${
                                  isSelected 
                                    ? 'bg-tagalong-purple/10 border-tagalong-purple' 
                                    : hasUnread
                                    ? 'bg-tagalong-purple/5 hover:bg-tagalong-purple/10'
                                    : 'hover:bg-gray-50'
                                }`}
                                onClick={() => handleSelectChat(chat)}
                              >
                                <div className="flex items-center gap-3">
                                  <div className="relative">
                                    <div className="w-12 h-12 rounded-full overflow-hidden bg-tagalong-purple/10">
                                      {otherUser.profileImage ? (
                                        <img src={otherUser.profileImage} alt={otherUser.name} className="w-full h-full object-cover" />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center text-xl font-medium text-tagalong-purple">
                                          {otherUser.name.charAt(0)}
                                        </div>
                                      )}
                                    </div>
                                    {hasUnread && (
                                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-tagalong-accent rounded-full border-2 border-white"></div>
                                    )}
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start">
                                      <div className="font-medium truncate">{otherUser.name}</div>
                                      {lastMessage && (
                                        <div className="text-xs text-gray-500">
                                          {formatDistanceToNow(new Date(lastMessage.timestamp), { addSuffix: false })}
                                        </div>
                                      )}
                                    </div>
                                    {lastMessage ? (
                                      <div className={`text-sm truncate ${hasUnread ? 'font-medium text-gray-800' : 'text-gray-600'}`}>
                                        {lastMessage.senderId === user.id && 'You: '}
                                        {lastMessage.text}
                                      </div>
                                    ) : (
                                      <div className="text-sm text-gray-500 italic">
                                        No messages yet
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="text-center py-8">
                            <p className="text-gray-500">No chats found</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Chat area - hide on mobile when viewing chat list */}
                <div className={`${isMobileViewingChat ? 'col-span-1' : 'hidden md:block md:col-span-2'} h-[600px] flex flex-col`}>
                  {selectedChat ? (
                    <>
                      {isMobileViewingChat && (
                        <div className="bg-white p-3 border-b border-gray-100 md:hidden">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-600"
                            onClick={() => setIsMobileViewingChat(false)}
                          >
                            <ChevronLeft className="w-5 h-5 mr-1" />
                            Back to chats
                          </Button>
                        </div>
                      )}
                      <ChatBox chat={selectedChat} currentUser={user} />
                    </>
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-tagalong-purple/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-8 h-8 text-tagalong-purple" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No chat selected</h3>
                      <p className="text-gray-600 mb-6">Select a conversation or start a new one.</p>
                      <Button
                        asChild
                        className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                      >
                        <Link to="/find-ride">Find a Ride</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
