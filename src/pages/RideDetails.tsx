
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import RideMap from '@/components/RideMap';
import ProfileCard from '@/components/ProfileCard';
import FareCalculator from '@/components/FareCalculator';
import { mockRides, mockUsers } from '@/lib/mockData';
import { Ride } from '@/lib/types';
import { MapPin, Clock, Calendar, Shield, Phone, MessageCircle, Heart, AlertCircle, CheckCircle, Bike, Car, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

const RideDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [ride, setRide] = useState<Ride | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState<'none' | 'requested' | 'confirmed'>('none');
  const [isFavorite, setIsFavorite] = useState(false);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchRide = () => {
      setIsLoading(true);
      setTimeout(() => {
        const foundRide = mockRides.find(r => r.id === id);
        if (foundRide) {
          setRide(foundRide);
        }
        setIsLoading(false);
      }, 700);
    };
    
    fetchRide();
  }, [id]);
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const handleRequestRide = () => {
    setBookingStatus('requested');
    toast({
      title: "Ride Requested!",
      description: "Your ride request has been sent to the driver. You'll be notified when they accept.",
    });
  };
  
  const handleCancelRequest = () => {
    setBookingStatus('none');
    toast({
      title: "Request Cancelled",
      description: "Your ride request has been cancelled.",
    });
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast({
        title: "Added to Favorites",
        description: "This ride has been added to your favorites.",
      });
    }
  };
  
  if (isLoading) {
    return (
      <div className="bg-tagalong-gray min-h-screen">
        <AppHeader />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
                <div className="mt-4 text-gray-600">Loading ride details...</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  if (!ride) {
    return (
      <div className="bg-tagalong-gray min-h-screen">
        <AppHeader />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md p-8">
              <div className="flex flex-col items-center justify-center py-12">
                <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
                <h2 className="text-2xl font-bold mb-2">Ride Not Found</h2>
                <p className="text-gray-600 mb-6">The ride you're looking for doesn't exist or has been deleted.</p>
                <Button 
                  asChild
                  className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                >
                  <Link to="/find-ride">Find Another Ride</Link>
                </Button>
              </div>
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
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center justify-between mb-6">
              <h1 className="text-3xl font-bold">Ride Details</h1>
              <div className="flex items-center gap-2">
                <Badge className={`${ride.vehicleType === 'bike' ? 'bg-tagalong-purple' : 'bg-tagalong-teal'}`}>
                  {ride.vehicleType === 'bike' ? (
                    <div className="flex items-center">
                      <Bike className="w-3 h-3 mr-1" />
                      <span>Bike Ride</span>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Car className="w-3 h-3 mr-1" />
                      <span>Car Ride</span>
                    </div>
                  )}
                </Badge>
                <Badge variant="outline" className="border-tagalong-purple text-tagalong-purple">
                  <span>{ride.distance} km</span>
                </Badge>
                <Badge variant="outline" className="border-tagalong-purple text-tagalong-purple">
                  <span>{ride.duration} min</span>
                </Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                  <div className="h-64">
                    <RideMap origin={ride.origin} destination={ride.destination} className="h-full" />
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                      <div>
                        <h2 className="text-xl font-semibold mb-1">{ride.origin.label} to {ride.destination.label}</h2>
                        <div className="text-gray-600">
                          <Calendar className="w-4 h-4 inline-block mr-1" />
                          <span>{formatDate(ride.departureTime)}</span>
                          <span className="mx-2">•</span>
                          <Clock className="w-4 h-4 inline-block mr-1" />
                          <span>{formatTime(ride.departureTime)}</span>
                        </div>
                      </div>
                      <Badge className="bg-green-500">
                        <span>{ride.status}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col items-center gap-1 mt-1">
                          <div className="w-3 h-3 rounded-full bg-tagalong-purple"></div>
                          <div className="w-0.5 h-16 bg-gray-200"></div>
                          <div className="w-3 h-3 rounded-full bg-tagalong-accent"></div>
                        </div>
                        <div className="flex-1 space-y-6">
                          <div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" /> Pickup Location
                            </div>
                            <div className="font-medium">{ride.origin.label}</div>
                            <div className="text-sm text-gray-500">Exact location shared after booking</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <MapPin className="w-3 h-3 mr-1" /> Drop-off Location
                            </div>
                            <div className="font-medium">{ride.destination.label}</div>
                            <div className="text-sm text-gray-500">Exact location shared after booking</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-gray-100">
                      <div className="flex flex-wrap gap-4">
                        <div className="bg-tagalong-purple/5 px-4 py-2 rounded-lg flex items-center">
                          <Users className="w-4 h-4 text-tagalong-purple mr-2" />
                          <span className="text-sm font-medium">{ride.availableSeats} seat{ride.availableSeats > 1 ? 's' : ''} available</span>
                        </div>
                        
                        {ride.allowsGender !== 'any' && (
                          <div className="bg-tagalong-purple/5 px-4 py-2 rounded-lg flex items-center">
                            <svg className="w-4 h-4 text-tagalong-purple mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                            </svg>
                            <span className="text-sm font-medium capitalize">{ride.allowsGender}s Only</span>
                          </div>
                        )}
                        
                        {ride.requiresHelmet && (
                          <div className="bg-tagalong-purple/5 px-4 py-2 rounded-lg flex items-center">
                            <svg className="w-4 h-4 text-tagalong-purple mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                            </svg>
                            <span className="text-sm font-medium">Helmet Required</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-semibold mb-4">Safety Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">ID Verified</div>
                        <div className="text-sm text-gray-500">Driver identity has been verified</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Phone Verified</div>
                        <div className="text-sm text-gray-500">Contact number has been verified</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">In-app SOS</div>
                        <div className="text-sm text-gray-500">Emergency assistance available</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-green-100 rounded-full text-green-500">
                        <CheckCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-medium">Live Tracking</div>
                        <div className="text-sm text-gray-500">Share your ride with trusted contacts</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-semibold mb-4">Driver</h3>
                  <ProfileCard user={ride.driver} isDetailed={false} />
                  
                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button 
                      variant="outline"
                      className="border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full w-full"
                      asChild
                    >
                      <Link to={`/chat`}>
                        <MessageCircle className="w-4 h-4 mr-2" /> Chat
                      </Link>
                    </Button>
                    <Button 
                      variant="outline"
                      className="border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full w-full"
                      disabled
                    >
                      <Phone className="w-4 h-4 mr-2" /> Call
                    </Button>
                  </div>
                </div>
                
                <FareCalculator distance={ride.distance} />
                
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="space-y-4">
                    {bookingStatus === 'none' && (
                      <>
                        <Button 
                          className="w-full bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full py-6 tagalong-button h-auto"
                          onClick={handleRequestRide}
                        >
                          Request This Ride
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full py-6 h-auto"
                          onClick={toggleFavorite}
                        >
                          <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-tagalong-purple' : ''}`} /> 
                          {isFavorite ? 'Saved to Favorites' : 'Save to Favorites'}
                        </Button>
                      </>
                    )}
                    
                    {bookingStatus === 'requested' && (
                      <>
                        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                          <div className="flex items-center">
                            <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                            <span className="font-medium text-yellow-700">Request Pending</span>
                          </div>
                          <p className="mt-2 text-sm text-yellow-600">
                            Your request has been sent to the driver. You'll be notified once they accept.
                          </p>
                        </div>
                        <Button 
                          variant="outline"
                          className="w-full border-red-500 text-red-500 hover:bg-red-50 rounded-full py-6 h-auto"
                          onClick={handleCancelRequest}
                        >
                          Cancel Request
                        </Button>
                      </>
                    )}
                    
                    {bookingStatus === 'confirmed' && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-center">
                          <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                          <span className="font-medium text-green-700">Ride Confirmed!</span>
                        </div>
                        <p className="mt-2 text-sm text-green-600">
                          Your ride has been confirmed by the driver. Get ready for pickup.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RideDetails;
