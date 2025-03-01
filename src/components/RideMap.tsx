
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '@/lib/types';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

type RideMapProps = {
  origin: Location;
  destination: Location;
  className?: string;
};

// Component to fit bounds and draw route
const MapController = ({ origin, destination }: { origin: Location; destination: Location }) => {
  const map = useMap();
  
  useEffect(() => {
    if (!origin.lat || !origin.lng || !destination.lat || !destination.lng) return;
    
    // Create bounds and fit map to include both markers
    const bounds = L.latLngBounds(
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    );
    
    map.fitBounds(bounds, { padding: [50, 50] });
    
    // Draw route between the points
    const points = [
      [origin.lat, origin.lng],
      [destination.lat, destination.lng]
    ];
    
    const polyline = L.polyline(points as L.LatLngExpression[], {
      color: '#9b87f5',
      weight: 4,
      opacity: 0.7
    }).addTo(map);
    
    return () => {
      map.removeLayer(polyline);
    };
  }, [map, origin, destination]);
  
  return null;
};

const RideMap = ({ origin, destination, className = '' }: RideMapProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);
  
  // Custom marker icons
  const originIcon = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: 'origin-marker'  // For custom styling
  });
  
  const destinationIcon = new L.Icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    className: 'destination-marker'  // For custom styling
  });
  
  useEffect(() => {
    setIsLoaded(true);
  }, []);
  
  // Check if we have valid coordinates
  const hasValidCoordinates = 
    origin.lat && origin.lng && destination.lat && destination.lng;
  
  if (!hasValidCoordinates) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gray-100 flex items-center justify-center ${className}`}>
        <div className="text-gray-500 p-4 text-center">
          Invalid location coordinates
        </div>
      </div>
    );
  }

  const handleMapError = () => {
    setMapError('Failed to load map tiles');
    return true;
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <div className="text-gray-400">Loading map...</div>
        </div>
      )}
      
      {mapError && (
        <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
          <div className="text-red-500 text-center p-4">{mapError}</div>
        </div>
      )}
      
      <MapContainer 
        center={[origin.lat || 0, origin.lng || 0]} 
        zoom={12} 
        style={{ height: '100%', width: '100%' }}
        className="z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          eventHandlers={{
            error: handleMapError
          }}
        />
        
        <Marker 
          position={[origin.lat, origin.lng]} 
          icon={originIcon}
        >
          <Popup>
            <div className="p-1 text-sm">
              <strong>From:</strong> {origin.label}
            </div>
          </Popup>
        </Marker>
        
        <Marker 
          position={[destination.lat, destination.lng]} 
          icon={destinationIcon}
        >
          <Popup>
            <div className="p-1 text-sm">
              <strong>To:</strong> {destination.label}
            </div>
          </Popup>
        </Marker>
        
        <MapController origin={origin} destination={destination} />
      </MapContainer>
      
      {/* Current location button */}
      <div className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg z-10">
        <Navigation className="w-5 h-5 text-tagalong-purple" />
      </div>
      
      <style>
        {`
        .origin-marker {
          filter: hue-rotate(230deg);
        }
        .destination-marker {
          filter: hue-rotate(320deg);
        }
        `}
      </style>
    </div>
  );
};

export default RideMap;
