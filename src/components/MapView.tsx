
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { Business } from '../utils/mockData';

interface MapViewProps {
  businesses: Business[];
  userLocation: { lat: number; lng: number };
}

const MapView: React.FC<MapViewProps> = ({ businesses, userLocation }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    if (!mapRef.current || !window.google) return;

    console.log('Initializing map with businesses:', businesses);

    // Initialize the map centered on San Francisco
    mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
      center: { lat: 37.7749, lng: -122.4194 }, // San Francisco center
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    // Add business markers using real coordinates from mock data
    businesses.forEach((business) => {
      console.log(`Adding marker for ${business.name} at lat: ${business.lat}, lng: ${business.lng}`);
      
      const marker = new window.google.maps.Marker({
        position: { lat: business.lat, lng: business.lng },
        map: mapInstanceRef.current,
        title: business.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" fill="#EF4444"/>
            </svg>
          `),
          scaledSize: new window.google.maps.Size(32, 32),
          anchor: new window.google.maps.Point(16, 32)
        }
      });

      // Generate a placeholder image URL
      const placeholderImage = `https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=200&h=120&fit=crop&crop=center`;

      // Add info window with business details and mock image
      const infoWindow = new window.google.maps.InfoWindow({
        content: `
          <div style="padding: 12px; max-width: 280px; font-family: Arial, sans-serif;">
            <img src="${placeholderImage}" alt="${business.name}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
            <h3 style="margin: 0 0 6px 0; font-weight: bold; font-size: 16px; color: #1f2937;">${business.name}</h3>
            <p style="margin: 0 0 6px 0; color: #6b7280; font-size: 13px; text-transform: capitalize;">${business.type}</p>
            <div style="display: flex; align-items: center; margin-bottom: 6px;">
              <span style="color: #fbbf24; font-size: 16px;">★</span>
              <span style="margin-left: 4px; font-size: 14px; font-weight: 500;">${business.rating.toFixed(1)}</span>
              <span style="margin-left: 4px; font-size: 12px; color: #6b7280;">(${business.reviewCount} reviews)</span>
            </div>
            <p style="margin: 0 0 12px 0; font-size: 12px; color: #6b7280; line-height: 1.4;">${business.address}</p>
            <button 
              onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(business.address)}', '_blank')"
              style="
                background-color: #3b82f6; 
                color: white; 
                border: none; 
                padding: 8px 16px; 
                border-radius: 6px; 
                font-size: 12px; 
                font-weight: 500;
                cursor: pointer;
                width: 100%;
                transition: background-color 0.2s;
              "
              onmouseover="this.style.backgroundColor='#2563eb'"
              onmouseout="this.style.backgroundColor='#3b82f6'"
            >
              Get Directions
            </button>
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
