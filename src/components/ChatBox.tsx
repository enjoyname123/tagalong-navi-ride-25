
import { useState, useRef, useEffect } from 'react';
import { Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat, User } from '@/lib/types';
import { useMessages } from '@/lib/context/MessageContext';
import { formatDistanceToNow } from 'date-fns';

type ChatBoxProps = {
  chat: Chat;
  currentUser: User;
};

const ChatBox = ({ chat, currentUser }: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { sendMessage } = useMessages();
  
  const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;
    
    try {
      await sendMessage(chat.id, newMessage);
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const sendGreeting = async () => {
    const greeting = "Hello! I'm interested in your ride.";
    try {
      await sendMessage(chat.id, greeting);
    } catch (error) {
      console.error('Error sending greeting:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="p-4 border-b border-gray-100 bg-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-tagalong-purple/10">
            {otherUser.profileImage ? (
              <img src={otherUser.profileImage} alt={otherUser.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg font-medium text-tagalong-purple">
                {otherUser.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <div className="font-medium">{otherUser.name}</div>
            <div className="text-xs text-gray-500 flex items-center">
              <span className="w-2 h-2 rounded-full bg-green-500 mr-1"></span>
              Online
            </div>
          </div>
        </div>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chat.messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-6">
            <div className="w-16 h-16 bg-tagalong-purple/10 rounded-full flex items-center justify-center mb-4">
              <Send className="w-8 h-8 text-tagalong-purple" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Start a conversation</h3>
            <p className="text-gray-600 mb-4 max-w-xs">
              Say hello and start chatting about your ride details or any questions you may have.
            </p>
            <Button 
              onClick={sendGreeting}
              className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full"
            >
              Send a greeting
            </Button>
          </div>
        ) : (
          chat.messages.map((message) => {
            const isCurrentUser = message.senderId === currentUser.id;
            const sender = isCurrentUser ? currentUser : otherUser;
            
            return (
              <div 
                key={message.id} 
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="flex-shrink-0 self-end">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-tagalong-purple/10">
                      {sender.profileImage ? (
                        <img src={sender.profileImage} alt={sender.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-sm font-medium text-tagalong-purple">
                          {sender.name.charAt(0)}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div 
                      className={`rounded-2xl px-4 py-2 ${
                        isCurrentUser 
                          ? 'bg-tagalong-purple text-white rounded-tr-none' 
                          : 'bg-white border border-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <div className={`text-xs text-gray-500 mt-1 flex items-center ${isCurrentUser ? 'justify-end' : 'justify-start'}`}>
                      <Clock className="w-3 h-3 mr-1" />
                      <span>{formatTime(message.timestamp)}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message input */}
      <div className="border-t border-gray-100 p-4 bg-white">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="w-full px-4 py-2 pr-10 rounded-full border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
            />
            <div className="absolute right-0 top-0 h-full flex items-center pr-3">
              <button className="text-gray-400 hover:text-tagalong-purple">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>
            </div>
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={newMessage.trim() === ''}
            className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full p-3 tagalong-button"
            size="icon"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
