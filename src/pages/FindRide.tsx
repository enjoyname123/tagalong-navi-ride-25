
import { useState } from 'react';
import AppHeader from '@/components/AppHeader';
import RideFinder from '@/components/RideFinder';
import RideCard from '@/components/RideCard';
import RideMap from '@/components/RideMap';
import { mockRides } from '@/lib/mockData';
import { Bike, Car, Filter, SlidersHorizontal, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ride, VehicleType } from '@/lib/types';

const FindRide = () => {
  const [searchResults, setSearchResults] = useState<Ride[]>(mockRides);
  const [activeVehicleFilter, setActiveVehicleFilter] = useState<VehicleType | 'all'>('all');
  const [mapView, setMapView] = useState(false);
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null);
  
  const handleSearch = (results: Ride[]) => {
    setSearchResults(results);
  };
  
  const filterByVehicle = (vehicleType: VehicleType | 'all') => {
    setActiveVehicleFilter(vehicleType);
    
    if (vehicleType === 'all') {
      setSearchResults(mockRides);
    } else {
      const filtered = mockRides.filter(ride => ride.vehicleType === vehicleType);
      setSearchResults(filtered);
    }
  };
  
  const handleRideSelect = (ride: Ride) => {
    setSelectedRide(ride);
  };

  return (
    <div className="bg-tagalong-gray min-h-screen">
      <AppHeader />
      
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3 space-y-6">
              <h1 className="text-3xl font-bold">Find a Ride</h1>
              <p className="text-gray-600">Find everyday commuters heading your way. Split costs and make connections.</p>
              
              <RideFinder onSearch={handleSearch} availableRides={mockRides} />
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-md p-4 mb-6">
                <div className="flex flex-wrap justify-between items-center mb-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-0">
                    <Button
                      variant={mapView ? "outline" : "default"}
                      className={`rounded-full px-4 ${!mapView ? 'bg-tagalong-purple text-white' : 'border-gray-200 text-gray-600'}`}
                      onClick={() => setMapView(false)}
                    >
                      List View
                    </Button>
                    <Button
                      variant={mapView ? "default" : "outline"}
                      className={`rounded-full px-4 ${mapView ? 'bg-tagalong-purple text-white' : 'border-gray-200 text-gray-600'}`}
                      onClick={() => setMapView(true)}
                    >
                      Map View
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 vehicle-toggle">
                    <button 
                      className={`vehicle-toggle-option ${activeVehicleFilter === 'all' ? 'active' : ''}`}
                      onClick={() => filterByVehicle('all')}
                    >
                      All
                    </button>
                    <button 
                      className={`vehicle-toggle-option ${activeVehicleFilter === 'bike' ? 'active' : ''}`}
                      onClick={() => filterByVehicle('bike')}
                    >
                      <Bike className="w-4 h-4 mr-1 inline-block" /> Bikes
                    </button>
                    <button 
                      className={`vehicle-toggle-option ${activeVehicleFilter === 'car' ? 'active' : ''}`}
                      onClick={() => filterByVehicle('car')}
                    >
                      <Car className="w-4 h-4 mr-1 inline-block" /> Cars
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-gray-600">
                    <MapPin className="w-4 h-4 inline-block mr-1" /> 
                    Showing rides in <span className="font-medium">Hyderabad</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-full">
                    <SlidersHorizontal className="w-4 h-4 mr-1" /> Filters
                  </Button>
                </div>
                
                {mapView ? (
                  <div className="h-[600px] relative rounded-2xl overflow-hidden border border-gray-100">
                    {selectedRide ? (
                      <RideMap 
                        origin={selectedRide.origin} 
                        destination={selectedRide.destination} 
                        className="h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-500">
                        Select a ride to view the route
                      </div>
                    )}
                    
                    <div className="absolute bottom-4 left-4 right-4 bg-white rounded-xl shadow-lg p-3 z-10">
                      <div className="text-sm text-gray-500 mb-2">
                        {searchResults.length} rides available
                      </div>
                      <div className="flex gap-2 overflow-x-auto pb-2 snap-x">
                        {searchResults.map((ride) => (
                          <div 
                            key={ride.id}
                            className={`flex-shrink-0 w-64 snap-start cursor-pointer transition-all duration-200 ${
                              selectedRide?.id === ride.id ? 'ring-2 ring-tagalong-purple rounded-xl' : ''
                            }`}
                            onClick={() => handleRideSelect(ride)}
                          >
                            <RideCard ride={ride} isCompact={true} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {searchResults.length > 0 ? (
                      searchResults.map((ride) => (
                        <div 
                          key={ride.id} 
                          className="cursor-pointer" 
                          onClick={() => handleRideSelect(ride)}
                        >
                          <RideCard ride={ride} />
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                          <Filter className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">No rides found</h3>
                        <p className="text-gray-600 mb-4">Try adjusting your search filters</p>
                        <Button 
                          variant="outline"
                          className="rounded-full border-tagalong-purple text-tagalong-purple"
                          onClick={() => setSearchResults(mockRides)}
                        >
                          Clear filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              {selectedRide && !mapView && (
                <div className="bg-white rounded-2xl shadow-md p-6 animate-fade-in">
                  <div className="text-xl font-semibold mb-4">Selected Ride Details</div>
                  <div className="h-[300px]">
                    <RideMap 
                      origin={selectedRide.origin} 
                      destination={selectedRide.destination} 
                      className="h-full"
                    />
                  </div>
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-gray-500">Distance</div>
                      <div className="font-medium">{selectedRide.distance} km</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Duration</div>
                      <div className="font-medium">{selectedRide.duration} min</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Estimated Fare</div>
                      <div className="font-semibold text-tagalong-purple">₹{selectedRide.fare}</div>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-end">
                    <Button 
                      asChild
                      className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                    >
                      <a href={`/ride/${selectedRide.id}`}>Request This Ride</a>
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default FindRide;
