
import { useState, useEffect } from 'react';
import { Search, Clock, MapPin, Filter, Bike, Car } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Ride, VehicleType } from '@/lib/types';
import { hyderabadLocations } from '@/lib/mockData';

type RideFinderProps = {
  onSearch: (rides: Ride[]) => void;
  availableRides: Ride[];
};

const RideFinder = ({ onSearch, availableRides }: RideFinderProps) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType | 'all'>('all');
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  
  useEffect(() => {
    // Set current time as default
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setTime(`${hours}:${minutes}`);
  }, []);
  
  const handleOriginChange = (value: string) => {
    setOrigin(value);
    if (value.length > 1) {
      const matches = hyderabadLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setOriginSuggestions(matches);
    } else {
      setOriginSuggestions([]);
    }
  };
  
  const handleDestinationChange = (value: string) => {
    setDestination(value);
    if (value.length > 1) {
      const matches = hyderabadLocations.filter(loc => 
        loc.toLowerCase().includes(value.toLowerCase())
      );
      setDestinationSuggestions(matches);
    } else {
      setDestinationSuggestions([]);
    }
  };
  
  const handleSearch = () => {
    // In a real app, this would call an API with the search parameters
    console.log('Searching for rides:', { origin, destination, date, time, vehicleType });
    
    // Filter available rides based on search criteria
    let filteredRides = [...availableRides];
    
    if (origin) {
      filteredRides = filteredRides.filter(ride => 
        ride.origin.label.toLowerCase().includes(origin.toLowerCase())
      );
    }
    
    if (destination) {
      filteredRides = filteredRides.filter(ride => 
        ride.destination.label.toLowerCase().includes(destination.toLowerCase())
      );
    }
    
    if (vehicleType !== 'all') {
      filteredRides = filteredRides.filter(ride => ride.vehicleType === vehicleType);
    }
    
    onSearch(filteredRides);
  };

  return (
    <div className="glass-card rounded-2xl overflow-hidden transition-transform duration-300 hover:shadow-lg">
      <div className="p-5">
        <div className="flex flex-col gap-5">
          <div className="flex items-center gap-2 text-tagalong-purple">
            <Search className="w-5 h-5" />
            <h3 className="font-semibold">Find a Ride</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <div className="flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="From"
                  value={origin}
                  onChange={(e) => handleOriginChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                />
              </div>
              {originSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 max-h-40 overflow-y-auto">
                  {originSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-tagalong-purple/5 text-gray-700"
                      onClick={() => {
                        setOrigin(suggestion);
                        setOriginSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <div className="flex items-center">
                <div className="absolute left-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="To"
                  value={destination}
                  onChange={(e) => handleDestinationChange(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                />
              </div>
              {destinationSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-gray-100 max-h-40 overflow-y-auto">
                  {destinationSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-tagalong-purple/5 text-gray-700"
                      onClick={() => {
                        setDestination(suggestion);
                        setDestinationSuggestions([]);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                  />
                </div>
              </div>
              
              <div className="relative">
                <div className="flex items-center">
                  <div className="absolute left-3 text-gray-400">
                    <Clock className="w-5 h-5" />
                  </div>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant="outline"
                className={`cursor-pointer px-3 py-2 transition-colors ${vehicleType === 'all' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                onClick={() => setVehicleType('all')}
              >
                <span className="text-sm font-medium">All Vehicles</span>
              </Badge>
              <Badge 
                variant="outline"
                className={`cursor-pointer px-3 py-2 transition-colors ${vehicleType === 'bike' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                onClick={() => setVehicleType('bike')}
              >
                <Bike className="w-3 h-3 mr-1" />
                <span className="text-sm font-medium">Bike Only</span>
              </Badge>
              <Badge 
                variant="outline"
                className={`cursor-pointer px-3 py-2 transition-colors ${vehicleType === 'car' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                onClick={() => setVehicleType('car')}
              >
                <Car className="w-3 h-3 mr-1" />
                <span className="text-sm font-medium">Car Only</span>
              </Badge>
              <Badge 
                variant="outline"
                className="cursor-pointer px-3 py-2 border-gray-200 text-gray-600 hover:border-tagalong-purple"
                onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              >
                <Filter className="w-3 h-3 mr-1" />
                <span className="text-sm font-medium">More Filters</span>
              </Badge>
            </div>
            
            {isFiltersOpen && (
              <div className="bg-gray-50 rounded-xl p-4 space-y-3 animate-fade-in">
                <div className="text-sm font-medium">Additional Filters</div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="cursor-pointer px-3 py-2 border-gray-200 text-gray-600 hover:border-tagalong-purple">
                    <span className="text-sm font-medium">Verified Users</span>
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-3 py-2 border-gray-200 text-gray-600 hover:border-tagalong-purple">
                    <span className="text-sm font-medium">Female Only</span>
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-3 py-2 border-gray-200 text-gray-600 hover:border-tagalong-purple">
                    <span className="text-sm font-medium">Helmet Required</span>
                  </Badge>
                  <Badge variant="outline" className="cursor-pointer px-3 py-2 border-gray-200 text-gray-600 hover:border-tagalong-purple">
                    <span className="text-sm font-medium">Top Rated (4.5+)</span>
                  </Badge>
                </div>
              </div>
            )}
          </div>
          
          <Button
            onClick={handleSearch}
            className="w-full bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full py-6 tagalong-button h-auto"
          >
            <Search className="w-5 h-5 mr-2" />
            Search Rides
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RideFinder;
