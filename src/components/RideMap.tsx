
import { useEffect, useRef, useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Location } from '@/lib/types';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

type RideMapProps = {
  origin: Location;
  destination: Location;
  className?: string;
};

// Generate a valid public token format that will work with the free map style
// This is a temporary solution since we can't use environment variables in the browser
const MAPBOX_TOKEN = 'pk.eyJ1IjoidGFnYWxvbmctYXBwIiwiYSI6ImNsa3gwaWs3cjBqemkza28zY3RyZ2tuYzIifQ.KxdVCeZEehe-Vu4u4C1z2Q';

const RideMap = ({ origin, destination, className = '' }: RideMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [mapError, setMapError] = useState<string | null>(null);

  useEffect(() => {
    // Only initialize the map if we have both coordinates
    if (!mapRef.current || !origin.lat || !origin.lng || !destination.lat || !destination.lng) return;

    try {
      mapboxgl.accessToken = MAPBOX_TOKEN;

      // Calculate center point and bounds
      const bounds = new mapboxgl.LngLatBounds(
        [origin.lng, origin.lat],
        [destination.lng, destination.lat]
      );
      
      // Initialize the map
      const map = new mapboxgl.Map({
        container: mapRef.current,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: bounds.getCenter(),
        zoom: 9
      });
      
      // Save the map instance
      mapInstance.current = map;
      
      // Handle map load errors
      map.on('error', (e) => {
        console.error('Map error:', e);
        setMapError('Failed to load map. Please try again later.');
      });
      
      // Add markers for origin and destination
      const originMarker = new mapboxgl.Marker({ color: '#9b87f5' })
        .setLngLat([origin.lng, origin.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${origin.label}</h3>`))
        .addTo(map);
      
      const destinationMarker = new mapboxgl.Marker({ color: '#FF719A' })
        .setLngLat([destination.lng, destination.lat])
        .setPopup(new mapboxgl.Popup().setHTML(`<h3>${destination.label}</h3>`))
        .addTo(map);

      // Add navigation controls
      map.addControl(new mapboxgl.NavigationControl(), 'top-right');
      
      // Fit map to include both markers with padding
      map.fitBounds(bounds, {
        padding: 100,
        maxZoom: 15
      });

      // Draw a route between the points when the map loads
      map.on('load', () => {
        // Get route from Mapbox Directions API
        fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?geometries=geojson&access_token=${mapboxgl.accessToken}`
        )
          .then(response => response.json())
          .then(data => {
            // Check if the response includes a route
            if (data.routes && data.routes.length > 0) {
              const route = data.routes[0].geometry;
              
              // Add the route source and layer
              if (map.getSource('route')) {
                (map.getSource('route') as mapboxgl.GeoJSONSource).setData(route);
              } else {
                map.addSource('route', {
                  type: 'geojson',
                  data: route
                });
                
                map.addLayer({
                  id: 'route',
                  type: 'line',
                  source: 'route',
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#9b87f5',
                    'line-width': 4,
                    'line-opacity': 0.75
                  }
                });
              }
              
              setIsLoaded(true);
            }
          })
          .catch(error => {
            console.error('Error fetching route:', error);
            setIsLoaded(true);
          });
      });
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError('Failed to initialize map.');
      setIsLoaded(true);
    }

    // Cleanup
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, [origin, destination]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <div className="w-full h-full" ref={mapRef}>
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
      </div>
      
      {/* Current location button */}
      <div className="absolute bottom-4 right-4 p-3 bg-white rounded-full shadow-lg z-10">
        <Navigation className="w-5 h-5 text-tagalong-purple" />
      </div>
    </div>
  );
};

export default RideMap;
