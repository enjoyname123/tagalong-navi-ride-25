
import { Navigate } from 'react-router-dom';
import { useAuth as useClerkAuth } from '@clerk/clerk-react';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded, userId } = useClerkAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
        <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
        <div className="ml-4 text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!userId) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
