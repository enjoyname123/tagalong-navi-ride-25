
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/lib/context/AuthContext';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-tagalong-gray">
        <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
        <div className="ml-4 text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
