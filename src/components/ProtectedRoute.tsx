
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';
import { useToast } from '@/components/ui/use-toast';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, userId } = useClerkAuth();
  const location = useLocation();
  const { toast } = useToast();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
        <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
        <div className="ml-4 text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userId) {
    // Show toast only when attempting to access specific protected routes
    if (location.pathname === '/chat' || location.pathname === '/profile') {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this feature",
        variant: "destructive",
      });
    }
    
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
