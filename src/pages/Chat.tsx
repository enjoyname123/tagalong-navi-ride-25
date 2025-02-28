
import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import ChatBox from '@/components/ChatBox';
import { mockChats, mockUsers } from '@/lib/mockData';
import { User, Chat as ChatType } from '@/lib/types';
import { Calendar, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Chat = () => {
  const [selectedChat, setSelectedChat] = useState<ChatType | null>(mockChats[0]);
  const [searchQuery, setSearchQuery] = useState('');
  // Assuming the first mockUser is the current user
  const currentUser = mockUsers[0];
  
  const filteredChats = mockChats.filter(chat => {
    // Get the other user in the chat (not the current user)
    const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[0];
    return otherUser.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="bg-tagalong-gray min-h-screen">
      <AppHeader />
      
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Messages</h1>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3">
                {/* Sidebar with chat list */}
                <div className="border-r border-gray-100">
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
                          const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[0];
                          const lastMessage = chat.messages[chat.messages.length - 1];
                          const isSelected = selectedChat?.id === chat.id;
                          
                          return (
                            <div 
                              key={chat.id}
                              className={`p-3 rounded-xl cursor-pointer transition-colors ${
                                isSelected 
                                  ? 'bg-tagalong-purple/10 border-tagalong-purple' 
                                  : 'hover:bg-gray-50'
                              }`}
                              onClick={() => setSelectedChat(chat)}
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
                                  {!lastMessage.isRead && lastMessage.senderId !== currentUser.id && (
                                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-tagalong-accent rounded-full border-2 border-white"></div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-start">
                                    <div className="font-medium truncate">{otherUser.name}</div>
                                    <div className="text-xs text-gray-500">
                                      {new Date(lastMessage.timestamp).toLocaleTimeString('en-US', {
                                        hour: 'numeric',
                                        minute: '2-digit',
                                        hour12: true
                                      })}
                                    </div>
                                  </div>
                                  <div className="text-sm text-gray-600 truncate">
                                    {lastMessage.senderId === currentUser.id && 'You: '}
                                    {lastMessage.text}
                                  </div>
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
                
                {/* Chat area */}
                <div className="md:col-span-2 h-[600px] flex flex-col">
                  {selectedChat ? (
                    <ChatBox chat={selectedChat} currentUser={currentUser} />
                  ) : (
                    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-tagalong-purple/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-tagalong-purple" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No chat selected</h3>
                      <p className="text-gray-600 mb-6">Select a conversation or start a new one.</p>
                      <Button
                        asChild
                        className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                      >
                        <a href="/find-ride">Find a Ride</a>
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
