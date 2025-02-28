
import { Bike, Car, Clock, MapPin, Star, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Ride } from '@/lib/types';

type RideCardProps = {
  ride: Ride;
  isCompact?: boolean;
};

const RideCard = ({ ride, isCompact = false }: RideCardProps) => {
  const { id, driver, origin, destination, departureTime, vehicleType, availableSeats, fare, distance, duration, allowsGender, requiresHelmet } = ride;
  
  const departureDate = new Date(departureTime);
  const formattedTime = departureDate.toLocaleTimeString('en-US', { 
    hour: 'numeric', 
    minute: '2-digit',
    hour12: true 
  });
  
  const formattedDate = departureDate.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  return (
    <div className={`glass-card rounded-2xl overflow-hidden transition-transform duration-300 hover:translate-y-[-4px] hover:shadow-lg ${isCompact ? 'p-3' : 'p-5'}`}>
      <div className="flex flex-col gap-4">
        {!isCompact && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-tagalong-purple/10">
                {driver.profileImage ? (
                  <img src={driver.profileImage} alt={driver.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-tagalong-purple font-medium">
                    {driver.name.charAt(0)}
                  </div>
                )}
              </div>
              <div>
                <div className="font-medium">{driver.name}</div>
                <div className="flex items-center text-sm text-gray-500">
                  <Star className="w-3 h-3 text-yellow-500 mr-1" />
                  <span>{driver.rating}</span>
                  {driver.isVerified && (
                    <div className="flex items-center ml-2 text-tagalong-purple">
                      <Shield className="w-3 h-3 mr-1" />
                      <span>Verified</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Badge className={`${vehicleType === 'bike' ? 'bg-tagalong-purple' : 'bg-tagalong-teal'}`}>
              {vehicleType === 'bike' ? (
                <div className="flex items-center">
                  <Bike className="w-3 h-3 mr-1" />
                  <span>Bike</span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Car className="w-3 h-3 mr-1" />
                  <span>Car</span>
                </div>
              )}
            </Badge>
          </div>
        )}
        
        <div>
          <div className="flex items-start gap-3">
            <div className="flex flex-col items-center gap-1 mt-1">
              <div className="w-3 h-3 rounded-full bg-tagalong-purple"></div>
              <div className="w-0.5 h-10 bg-gray-200"></div>
              <div className="w-3 h-3 rounded-full bg-tagalong-accent"></div>
            </div>
            <div className="flex-1 space-y-4">
              <div>
                <div className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> From
                </div>
                <div className="font-medium">{origin.label}</div>
              </div>
              <div>
                <div className="text-sm text-gray-500 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" /> To
                </div>
                <div className="font-medium">{destination.label}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 flex items-center justify-end">
                <Clock className="w-3 h-3 mr-1" /> Departure
              </div>
              <div className="font-medium">{formattedTime}</div>
              <div className="text-sm text-gray-500">{formattedDate}</div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between border-t border-gray-100 pt-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="text-xs text-gray-500">Fare</div>
              <div className="font-semibold text-tagalong-purple">₹{fare}</div>
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <div>
              <div className="text-xs text-gray-500">Time</div>
              <div className="font-medium">{duration} min</div>
            </div>
            <div className="h-6 w-px bg-gray-200"></div>
            <div>
              <div className="text-xs text-gray-500">Seats</div>
              <div className="font-medium flex items-center">
                <Users className="w-3 h-3 mr-1" /> {availableSeats}
              </div>
            </div>
          </div>
          
          {!isCompact && (
            <Button 
              asChild
              className="bg-tagalong-purple hover:bg-tagalong-purple-dark text-white rounded-full tagalong-button"
            >
              <Link to={`/ride/${id}`}>View Details</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RideCard;
