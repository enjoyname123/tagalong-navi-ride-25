
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '@/components/AppHeader';
import FareCalculator from '@/components/FareCalculator';
import { MapPin, Calendar, Clock, Bike, Car, Users, Shield, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { hyderabadLocations } from '@/lib/mockData';
import { VehicleType } from '@/lib/types';

const OfferRide = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [vehicleType, setVehicleType] = useState<VehicleType>('bike');
  const [availableSeats, setAvailableSeats] = useState(1);
  const [calculatedFare, setCalculatedFare] = useState(0);
  const [allowsGender, setAllowsGender] = useState<'any' | 'male' | 'female'>('any');
  const [requiresHelmet, setRequiresHelmet] = useState(vehicleType === 'bike');
  const [originSuggestions, setOriginSuggestions] = useState<string[]>([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState<string[]>([]);
  
  // Mock distance calculation - would be done via API in production
  const getDistance = () => {
    return Math.round((Math.random() * 10 + 2) * 10) / 10; // Random distance between 2-12 km
  };
  
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
  
  const handleVehicleChange = (type: VehicleType) => {
    setVehicleType(type);
    if (type === 'bike') {
      setAvailableSeats(1);
      setRequiresHelmet(true);
    } else {
      setAvailableSeats(Math.min(availableSeats, 4));
      setRequiresHelmet(false);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!origin || !destination) {
        toast({
          title: "Missing information",
          description: "Please fill in both origin and destination",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (!date || !time) {
        toast({
          title: "Missing information",
          description: "Please select both date and time",
          variant: "destructive"
        });
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };
  
  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  
  const handleFareCalculated = (fare: number) => {
    setCalculatedFare(fare);
  };
  
  const handleSubmit = () => {
    // In a real app, this would submit to an API
    toast({
      title: "Ride Offered Successfully!",
      description: "Your ride has been published and is now available for others to join.",
    });
    
    // Navigate to home or ride details page
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <div className="bg-tagalong-gray min-h-screen">
      <AppHeader />
      
      <main className="pt-16 pb-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">Offer a Ride</h1>
            <p className="text-gray-600 mb-8">Share your journey with others heading the same way</p>
            
            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
              {/* Progress steps */}
              <div className="bg-tagalong-purple/5 px-6 py-4">
                <div className="flex justify-between">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 1 ? 'bg-tagalong-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                      1
                    </div>
                    <div className={`ml-2 ${currentStep >= 1 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Route</div>
                  </div>
                  <div className={`flex-1 border-t-2 self-center mx-2 ${currentStep >= 2 ? 'border-tagalong-purple' : 'border-gray-200'}`}></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 2 ? 'bg-tagalong-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                      2
                    </div>
                    <div className={`ml-2 ${currentStep >= 2 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Schedule</div>
                  </div>
                  <div className={`flex-1 border-t-2 self-center mx-2 ${currentStep >= 3 ? 'border-tagalong-purple' : 'border-gray-200'}`}></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 3 ? 'bg-tagalong-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                      3
                    </div>
                    <div className={`ml-2 ${currentStep >= 3 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Vehicle</div>
                  </div>
                  <div className={`flex-1 border-t-2 self-center mx-2 ${currentStep >= 4 ? 'border-tagalong-purple' : 'border-gray-200'}`}></div>
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${currentStep >= 4 ? 'bg-tagalong-purple text-white' : 'bg-gray-200 text-gray-600'}`}>
                      4
                    </div>
                    <div className={`ml-2 ${currentStep >= 4 ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>Confirm</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                {currentStep === 1 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">Where are you going?</h2>
                    
                    <div className="space-y-6">
                      <div className="relative">
                        <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-1">
                          Starting Point
                        </label>
                        <div className="flex items-center">
                          <div className="absolute left-3 text-gray-400">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <input
                            id="origin"
                            type="text"
                            placeholder="Enter your starting location"
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
                        <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-1">
                          Destination
                        </label>
                        <div className="flex items-center">
                          <div className="absolute left-3 text-gray-400">
                            <MapPin className="w-5 h-5" />
                          </div>
                          <input
                            id="destination"
                            type="text"
                            placeholder="Enter your destination"
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
                    </div>
                  </div>
                )}
                
                {currentStep === 2 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">When are you leaving?</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
                          Date
                        </label>
                        <div className="flex items-center">
                          <div className="absolute ml-3 text-gray-400">
                            <Calendar className="w-5 h-5" />
                          </div>
                          <input
                            id="date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            min={new Date().toISOString().split('T')[0]}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
                          Time
                        </label>
                        <div className="flex items-center">
                          <div className="absolute ml-3 text-gray-400">
                            <Clock className="w-5 h-5" />
                          </div>
                          <input
                            id="time"
                            type="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-tagalong-purple focus:ring-1 focus:ring-tagalong-purple outline-none transition-colors"
                          />
                        </div>
                      </div>
                      
                      <div className="bg-tagalong-purple/5 p-4 rounded-xl">
                        <div className="text-sm font-medium text-gray-700 mb-2">Trip Summary</div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <div className="text-sm text-gray-500">From</div>
                            <div className="font-medium">{origin || "Not set"}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-500">To</div>
                            <div className="font-medium">{destination || "Not set"}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">Vehicle & Preferences</h2>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Vehicle Type
                        </label>
                        <div className="grid grid-cols-2 gap-4">
                          <div
                            className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                              vehicleType === 'bike' 
                                ? 'border-tagalong-purple bg-tagalong-purple/5' 
                                : 'border-gray-200 hover:border-tagalong-purple/50'
                            }`}
                            onClick={() => handleVehicleChange('bike')}
                          >
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                vehicleType === 'bike' ? 'bg-tagalong-purple text-white' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <Bike className="w-5 h-5" />
                              </div>
                              <div className="ml-3">
                                <div className="font-medium">Bike</div>
                                <div className="text-xs text-gray-500">Max 1 passenger</div>
                              </div>
                            </div>
                          </div>
                          
                          <div
                            className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                              vehicleType === 'car' 
                                ? 'border-tagalong-purple bg-tagalong-purple/5' 
                                : 'border-gray-200 hover:border-tagalong-purple/50'
                            }`}
                            onClick={() => handleVehicleChange('car')}
                          >
                            <div className="flex items-center">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                vehicleType === 'car' ? 'bg-tagalong-purple text-white' : 'bg-gray-100 text-gray-400'
                              }`}>
                                <Car className="w-5 h-5" />
                              </div>
                              <div className="ml-3">
                                <div className="font-medium">Car</div>
                                <div className="text-xs text-gray-500">Up to 4 passengers</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {vehicleType === 'car' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Available Seats
                          </label>
                          <div className="flex items-center">
                            <button
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                              onClick={() => setAvailableSeats(Math.max(1, availableSeats - 1))}
                              disabled={availableSeats <= 1}
                            >
                              -
                            </button>
                            <div className="mx-4 flex items-center">
                              <Users className="w-5 h-5 text-gray-500 mr-2" />
                              <span className="font-medium">{availableSeats}</span>
                            </div>
                            <button
                              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"
                              onClick={() => setAvailableSeats(Math.min(4, availableSeats + 1))}
                              disabled={availableSeats >= 4}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Passenger Preference
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <Badge 
                            variant="outline"
                            className={`cursor-pointer px-3 py-2 transition-colors ${allowsGender === 'any' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                            onClick={() => setAllowsGender('any')}
                          >
                            <span className="text-sm font-medium">Any Gender</span>
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`cursor-pointer px-3 py-2 transition-colors ${allowsGender === 'male' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                            onClick={() => setAllowsGender('male')}
                          >
                            <span className="text-sm font-medium">Males Only</span>
                          </Badge>
                          <Badge 
                            variant="outline"
                            className={`cursor-pointer px-3 py-2 transition-colors ${allowsGender === 'female' ? 'bg-tagalong-purple/10 border-tagalong-purple text-tagalong-purple' : 'border-gray-200 text-gray-600 hover:border-tagalong-purple'}`}
                            onClick={() => setAllowsGender('female')}
                          >
                            <span className="text-sm font-medium">Females Only</span>
                          </Badge>
                        </div>
                      </div>
                      
                      {vehicleType === 'bike' && (
                        <div>
                          <label className="flex items-center">
                            <input
                              type="checkbox"
                              checked={requiresHelmet}
                              onChange={(e) => setRequiresHelmet(e.target.checked)}
                              className="rounded text-tagalong-purple focus:ring-tagalong-purple mr-2"
                            />
                            <span className="text-sm font-medium text-gray-700">Helmet Required for Passenger</span>
                          </label>
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {currentStep === 4 && (
                  <div className="animate-fade-in">
                    <h2 className="text-xl font-semibold mb-6">Confirm Your Ride Details</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-6">
                        <div className="bg-tagalong-purple/5 p-4 rounded-xl">
                          <div className="text-sm font-medium text-gray-700 mb-2">Route Details</div>
                          <div className="grid grid-cols-1 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">From</div>
                              <div className="font-medium">{origin}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">To</div>
                              <div className="font-medium">{destination}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Estimated Distance</div>
                              <div className="font-medium">{getDistance()} km</div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-tagalong-purple/5 p-4 rounded-xl">
                          <div className="text-sm font-medium text-gray-700 mb-2">Schedule</div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <div className="text-sm text-gray-500">Date</div>
                              <div className="font-medium">{new Date(date).toLocaleDateString('en-US', { 
                                day: 'numeric', 
                                month: 'short',
                                year: 'numeric'
                              })}</div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Time</div>
                              <div className="font-medium">{time}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="bg-tagalong-purple/5 p-4 rounded-xl">
                          <div className="text-sm font-medium text-gray-700 mb-2">Vehicle & Preferences</div>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="flex items-center">
                              <div className="mr-2">
                                {vehicleType === 'bike' ? (
                                  <Bike className="w-5 h-5 text-tagalong-purple" />
                                ) : (
                                  <Car className="w-5 h-5 text-tagalong-purple" />
                                )}
                              </div>
                              <div>
                                <div className="font-medium capitalize">{vehicleType}</div>
                                <div className="text-xs text-gray-500">{availableSeats} seat{availableSeats > 1 ? 's' : ''} available</div>
                              </div>
                            </div>
                            <div>
                              <div className="text-sm text-gray-500">Passenger Gender</div>
                              <div className="font-medium capitalize">{allowsGender === 'any' ? 'No preference' : `${allowsGender}s only`}</div>
                            </div>
                            {vehicleType === 'bike' && (
                              <div>
                                <div className="text-sm text-gray-500">Helmet</div>
                                <div className="font-medium">{requiresHelmet ? 'Required' : 'Not required'}</div>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <FareCalculator 
                          distance={getDistance()} 
                          onFareCalculated={handleFareCalculated}
                        />
                      </div>
                    </div>
                    
                    <div className="mt-6 bg-tagalong-purple/5 p-4 rounded-xl">
                      <div className="flex items-center">
                        <Shield className="w-5 h-5 text-tagalong-purple mr-2" />
                        <div className="text-sm font-medium text-gray-700">Safety Reminder</div>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        By offering this ride, you agree to follow TagAlong's safety guidelines and community standards. 
                        Drive safely and ensure a pleasant experience for your passengers.
                      </p>
                    </div>
                  </div>
                )}
                
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 ? (
                    <Button
                      variant="outline"
                      className="rounded-full border-gray-200"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                  ) : (
                    <div></div>
                  )}
                  
                  {currentStep < 4 ? (
                    <Button
                      className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                      onClick={handleNextStep}
                    >
                      Continue <ChevronRight className="w-4 h-4 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
                      onClick={handleSubmit}
                    >
                      Publish Ride
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfferRide;
