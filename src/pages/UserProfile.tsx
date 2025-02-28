
import { useState, useEffect } from 'react';
import AppHeader from '@/components/AppHeader';
import ProfileCard from '@/components/ProfileCard';
import RideCard from '@/components/RideCard';
import { mockUsers, mockRides } from '@/lib/mockData';
import { Ride, User } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Car, Star, Settings, LogOut, Edit, MapPin, Clock, Shield } from 'lucide-react';

const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const [upcomingRides, setUpcomingRides] = useState<Ride[]>([]);
  const [pastRides, setPastRides] = useState<Ride[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const fetchUserData = () => {
      setIsLoading(true);
      setTimeout(() => {
        // Use the first user from mock data as the current user
        setUser(mockUsers[0]);
        
        // Mock upcoming and past rides
        setUpcomingRides(mockRides.slice(0, 2));
        
        // Create past rides by modifying some data
        const mockPastRides = mockRides.slice(2, 5).map(ride => ({
          ...ride,
          status: 'completed' as const,
          departureTime: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString() // Random past date
        }));
        setPastRides(mockPastRides);
        
        setIsLoading(false);
      }, 700);
    };
    
    fetchUserData();
  }, []);

  if (isLoading || !user) {
    return (
      <div className="bg-tagalong-gray min-h-screen">
        <AppHeader />
        <main className="pt-16 pb-20">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-12 h-12 rounded-full border-2 border-tagalong-purple border-t-transparent animate-spin"></div>
              <div className="mt-4 text-gray-600">Loading profile...</div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-6">
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <div className="flex justify-end mb-4">
                    <Button variant="ghost" size="icon" className="text-gray-500 hover:text-tagalong-purple">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                  <ProfileCard user={user} isDetailed={true} />
                  
                  <div className="mt-6 space-y-4">
                    <Button 
                      variant="outline"
                      className="w-full justify-start border-gray-200 text-gray-700 hover:bg-tagalong-purple/5 hover:border-tagalong-purple hover:text-tagalong-purple"
                    >
                      <Settings className="w-4 h-4 mr-2" /> Settings
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start border-gray-200 text-gray-700 hover:bg-red-50 hover:border-red-300 hover:text-red-500"
                    >
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl shadow-md p-6">
                  <h3 className="font-semibold mb-4">Verification Status</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-1 bg-green-100 rounded-full text-green-500 mr-3">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium">Phone Number</span>
                      </div>
                      <Badge className="bg-green-500">Verified</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-1 bg-green-100 rounded-full text-green-500 mr-3">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium">Email</span>
                      </div>
                      <Badge className="bg-green-500">Verified</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-1 bg-green-100 rounded-full text-green-500 mr-3">
                          <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="font-medium">Government ID</span>
                      </div>
                      <Badge className="bg-green-500">Verified</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="p-1 bg-yellow-100 rounded-full text-yellow-500 mr-3">
                          <Clock className="w-4 h-4" />
                        </div>
                        <span className="font-medium">Driver's License</span>
                      </div>
                      <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>
                    </div>
                    
                    <Button
                      className="w-full mt-2 bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                    >
                      <Shield className="w-4 h-4 mr-2" /> Complete Verification
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <Tabs defaultValue="upcoming" className="w-full">
                  <TabsList className="grid grid-cols-3 mb-6 bg-white rounded-xl p-1">
                    <TabsTrigger value="upcoming" className="rounded-lg">Upcoming Rides</TabsTrigger>
                    <TabsTrigger value="past" className="rounded-lg">Past Rides</TabsTrigger>
                    <TabsTrigger value="favorites" className="rounded-lg">Favorites</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upcoming" className="space-y-6">
                    {upcomingRides.length > 0 ? (
                      upcomingRides.map(ride => (
                        <RideCard key={ride.id} ride={ride} />
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-tagalong-purple/10 rounded-full flex items-center justify-center">
                          <Calendar className="w-8 h-8 text-tagalong-purple" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Upcoming Rides</h3>
                        <p className="text-gray-600 mb-6">You don't have any upcoming rides scheduled.</p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            asChild
                            className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                          >
                            <a href="/find-ride">Find a Ride</a>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="border-tagalong-purple text-tagalong-purple hover:bg-tagalong-purple/5 rounded-full"
                          >
                            <a href="/offer-ride">Offer a Ride</a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="past" className="space-y-6">
                    {pastRides.length > 0 ? (
                      pastRides.map(ride => (
                        <RideCard key={ride.id} ride={ride} />
                      ))
                    ) : (
                      <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 bg-tagalong-purple/10 rounded-full flex items-center justify-center">
                          <Car className="w-8 h-8 text-tagalong-purple" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No Past Rides</h3>
                        <p className="text-gray-600 mb-6">You haven't taken any rides with TagAlong yet.</p>
                        <Button
                          asChild
                          className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                        >
                          <a href="/find-ride">Find Your First Ride</a>
                        </Button>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="favorites" className="space-y-6">
                    <div className="bg-white rounded-2xl shadow-md p-8 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-tagalong-purple/10 rounded-full flex items-center justify-center">
                        <Star className="w-8 h-8 text-tagalong-purple" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">No Favorites Yet</h3>
                      <p className="text-gray-600 mb-6">Save your favorite rides for quick access.</p>
                      <Button
                        asChild
                        className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                      >
                        <a href="/find-ride">Browse Rides</a>
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
