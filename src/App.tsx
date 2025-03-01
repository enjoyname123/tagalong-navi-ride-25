
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./lib/context/AuthContext";
import { NotificationProvider } from "./lib/context/NotificationContext";
import { MessageProvider } from "./lib/context/MessageContext";
import Index from "./pages/Index";
import FindRide from "./pages/FindRide";
import OfferRide from "./pages/OfferRide";
import RideDetails from "./pages/RideDetails";
import UserProfile from "./pages/UserProfile";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import { useEffect } from "react";

const queryClient = new QueryClient();

// This wrapper will help prevent the sign-in loop
const AuthRoutes = () => {
  const { user, isLoading } = useAuth();
  
  // Skip rendering routes until auth state is determined
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">
      <div className="animate-spin w-8 h-8 border-4 border-tagalong-purple border-t-transparent rounded-full"></div>
    </div>;
  }
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
      <Route path="/find-ride" element={<FindRide />} />
      <Route path="/offer-ride" element={<OfferRide />} />
      <Route path="/ride/:id" element={<RideDetails />} />
      <Route path="/profile" element={
        <ProtectedRoute>
          <UserProfile />
        </ProtectedRoute>
      } />
      <Route path="/chat" element={
        <ProtectedRoute>
          <Chat />
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <NotificationProvider>
          <MessageProvider>
            <BrowserRouter>
              <AuthRoutes />
            </BrowserRouter>
          </MessageProvider>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
