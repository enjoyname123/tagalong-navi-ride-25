
import { useState, useRef, useEffect } from 'react';
import { Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Chat, User } from '@/lib/types';

type ChatBoxProps = {
  chat: Chat;
  currentUser: User;
};

const ChatBox = ({ chat, currentUser }: ChatBoxProps) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const otherUser = chat.participants.find(p => p.id !== currentUser.id) || chat.participants[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    // In a real app, this would send the message to an API
    console.log('Sending message:', newMessage);
    
    // Clear input
    setNewMessage('');
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chat.messages.map((message) => {
          const isCurrentUser = message.senderId === currentUser.id;
          const sender = isCurrentUser ? currentUser : otherUser;
          
          return (
            <div 
              key={message.id} 
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[80%] ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="flex-shrink-0">
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
                        : 'bg-gray-100 text-gray-800 rounded-tl-none'
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
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="border-t border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="w-full px-4 py-2 rounded-full border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
            />
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
