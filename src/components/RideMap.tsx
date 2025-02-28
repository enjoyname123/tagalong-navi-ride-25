
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '@/lib/types';

type RideMapProps = {
  origin: Location;
  destination: Location;
  className?: string;
};

const RideMap = ({ origin, destination, className = '' }: RideMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Mock map loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} ref={mapRef}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading map...</div>
        </div>
      )}
      
      {/* Placeholder map */}
      <div className={`w-full h-full bg-white transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-tagalong-teal/5 to-tagalong-purple/5" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-tagalong-purple/10 animate-pulse-slow" />
        
        {/* Origin marker */}
        <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium">
              {origin.label}
            </div>
            <div className="w-4 h-4 bg-tagalong-purple rounded-full" />
          </div>
        </div>
        
        {/* Destination marker */}
        <div className="absolute bottom-1/3 right-1/3 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded-md shadow-md text-xs font-medium">
              {destination.label}
            </div>
            <div className="w-4 h-4 bg-tagalong-accent rounded-full" />
          </div>
        </div>
        
        {/* Route line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#9b87f5" />
              <stop offset="100%" stopColor="#FF719A" />
            </linearGradient>
          </defs>
          <path 
            d="M 33% 33% Q 50% 50%, 66% 66%" 
            stroke="url(#routeGradient)" 
            strokeWidth="3" 
            fill="none" 
            strokeDasharray="5,5"
            className="animate-dash"
          />
        </svg>
        
        {/* Current location */}
        <div className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg">
          <Navigation className="w-5 h-5 text-tagalong-purple" />
        </div>
      </div>
    </div>
  );
};

export default RideMap;
