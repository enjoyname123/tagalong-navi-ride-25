
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Bell, 
  MessageCircle, 
  Menu, 
  X, 
  User as UserIcon,
  LogOut,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/context/AuthContext';
import { useNotifications, Notification } from '@/lib/context/NotificationContext';
import { useMessages } from '@/lib/context/MessageContext';
import { formatDistanceToNow } from 'date-fns';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const AppHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const { chats } = useMessages();
  const navigate = useNavigate();

  const unreadMessages = chats.reduce((count, chat) => {
    return count + chat.messages.filter(m => !m.isRead && m.senderId !== user?.id).length;
  }, 0);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'ride_request':
        return <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>;
      case 'chat_message':
        return <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-500">
          <MessageCircle className="w-4 h-4" />
        </div>;
      case 'ride_update':
        return <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>;
      default:
        return <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
          <Bell className="w-4 h-4" />
        </div>;
    }
  };

  return (
    <header className="bg-white shadow fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4.5C16 5.88071 14.8807 7 13.5 7C12.1193 7 11 5.88071 11 4.5C11 3.11929 12.1193 2 13.5 2C14.8807 2 16 3.11929 16 4.5Z" fill="#9b87f5"/>
              <path d="M9 6L9 19M9 19H7M9 19H12M14 16L17 22L22 15" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M6 6L3 9L6 12" stroke="#9b87f5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-tagalong-purple to-tagalong-teal">
              TagAlong
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-4">
            <Link to="/find-ride" className="text-gray-600 hover:text-tagalong-purple px-3 py-2 rounded-md transition-colors">
              Find a Ride
            </Link>
            <Link to="/offer-ride" className="text-gray-600 hover:text-tagalong-purple px-3 py-2 rounded-md transition-colors">
              Offer a Ride
            </Link>
            <Link to="/chat" className="text-gray-600 hover:text-tagalong-purple px-3 py-2 rounded-md transition-colors">
              How it Works
            </Link>
          </nav>
          
          {/* Authentication, Notifications & Profile */}
          <div className="flex items-center gap-3">
            {user ? (
              <>
                {/* Notifications */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5 text-gray-600" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 px-1.5 min-w-4 h-4 bg-tagalong-accent text-white flex items-center justify-center text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-80" align="end">
                    <DropdownMenuLabel className="flex justify-between items-center">
                      <span>Notifications</span>
                      {unreadCount > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-xs text-tagalong-purple hover:text-tagalong-purple-dark"
                          onClick={markAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <div className="max-h-80 overflow-y-auto">
                      {notifications.length > 0 ? (
                        notifications.map((notification) => (
                          <DropdownMenuItem 
                            key={notification.id} 
                            className={`p-3 ${!notification.isRead ? 'bg-tagalong-purple/5' : ''}`}
                            onClick={() => {
                              markAsRead(notification.id);
                              if (notification.actionUrl) {
                                navigate(notification.actionUrl);
                              }
                            }}
                          >
                            <div className="flex gap-3">
                              {getNotificationIcon(notification.type)}
                              <div className="flex-1">
                                <div className="font-medium">{notification.title}</div>
                                <div className="text-sm text-gray-600">{notification.message}</div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                                </div>
                              </div>
                            </div>
                          </DropdownMenuItem>
                        ))
                      ) : (
                        <div className="text-center py-6 text-gray-500">
                          No notifications
                        </div>
                      )}
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* Messages */}
                <Link to="/chat" className="relative">
                  <Button variant="ghost" size="icon">
                    <MessageCircle className="h-5 w-5 text-gray-600" />
                    {unreadMessages > 0 && (
                      <Badge className="absolute -top-1 -right-1 px-1.5 min-w-4 h-4 bg-tagalong-accent text-white flex items-center justify-center text-xs">
                        {unreadMessages}
                      </Badge>
                    )}
                  </Button>
                </Link>
                
                {/* User Profile */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full overflow-hidden">
                      {user.profileImage ? (
                        <img 
                          src={user.profileImage} 
                          alt={user.name} 
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-tagalong-purple/10 flex items-center justify-center text-tagalong-purple">
                          {user.name.charAt(0)}
                        </div>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem onClick={() => navigate('/profile')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  className="text-gray-600 hover:text-tagalong-purple"
                  asChild
                >
                  <Link to="/login">Sign in</Link>
                </Button>
                <Button 
                  className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button hidden sm:inline-flex"
                  asChild
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </>
            )}

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            <Link 
              to="/find-ride" 
              className="text-gray-600 hover:text-tagalong-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Find a Ride
            </Link>
            <Link 
              to="/offer-ride" 
              className="text-gray-600 hover:text-tagalong-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Offer a Ride
            </Link>
            <Link 
              to="/chat" 
              className="text-gray-600 hover:text-tagalong-purple py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </Link>
            
            {!user && (
              <div className="pt-2 border-t border-gray-100">
                <Button 
                  className="w-full bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button mt-2"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/signup">Sign up</Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;
