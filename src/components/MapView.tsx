
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Business } from '../utils/mockData';

interface MapViewProps {
  businesses: Business[];
  userLocation: { lat: number; lng: number };
}

const MapView: React.FC<MapViewProps> = ({ businesses, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    console.log('Initializing map with user location:', userLocation);
    console.log('Businesses to display:', businesses);

    // Initialize the map
    mapInstanceRef.current = new google.maps.Map(mapRef.current, {
      center: userLocation,
      zoom: 13,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add user location marker (blue dot)
    new google.maps.Marker({
      position: userLocation,
      map: mapInstanceRef.current,
      title: 'Your Current Location',
      icon: {
        url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="8" fill="#3B82F6"/>
            <circle cx="12" cy="12" r="3" fill="white"/>
          </svg>
        `),
        scaledSize: new google.maps.Size(24, 24),
        anchor: new google.maps.Point(12, 12)
      }
    });

    // Add business markers using real coordinates from mock data
    businesses.forEach((business) => {
      console.log(`Adding marker for ${business.name} at lat: ${business.lat}, lng: ${business.lng}`);
      
      const marker = new google.maps.Marker({
        position: { lat: business.lat, lng: business.lng },
        map: mapInstanceRef.current,
        title: business.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 24)
        }
      });

      // Add info window with business details
      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 4px 0; font-weight: bold;">${business.name}</h3>
            <p style="margin: 0 0 4px 0; color: #666; font-size: 12px;">${business.type}</p>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="color: #fbbf24;">★</span>
              <span style="margin-left: 4px; font-size: 14px;">${business.rating.toFixed(1)} (${business.reviewCount} reviews)</span>
            </div>
            <p style="margin: 0; font-size: 12px; color: #666;">${business.address}</p>
          </div>
        `
      });

      marker.addListener('click', () => {
        infoWindow.open(mapInstanceRef.current, marker);
      });
    });

  }, [businesses, userLocation]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Live Map View - {businesses.length} Low-Rated Businesses Found
      </h3>
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-200"
        style={{ minHeight: '400px' }}
      >
        {!window.google && (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
            <MapPin className="h-16 w-16 text-blue-500 mb-4" />
            <p className="text-gray-700 font-semibold">Loading Google Maps...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;
