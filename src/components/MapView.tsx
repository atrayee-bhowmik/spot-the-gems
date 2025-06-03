
import React, { useEffect, useRef } from 'react';
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

    // Initialize map
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

    // Add user location marker
    new google.maps.Marker({
      position: userLocation,
      map: mapInstanceRef.current,
      title: 'Your Location',
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

    // Add business markers
    businesses.forEach((business) => {
      const marker = new google.maps.Marker({
        position: { lat: business.lat, lng: business.lng },
        map: mapInstanceRef.current,
        title: business.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" fill="#EF4444"/>
              <circle cx="12" cy="10" r="3" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(24, 24),
          anchor: new google.maps.Point(12, 24)
        }
      });

      const infoWindow = new google.maps.InfoWindow({
        content: `
          <div style="padding: 8px; max-width: 200px;">
            <h3 style="margin: 0 0 4px 0; font-size: 14px; font-weight: bold;">${business.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${business.type}</p>
            <div style="display: flex; align-items: center; margin-bottom: 4px;">
              <span style="color: #F59E0B; margin-right: 4px;">★</span>
              <span style="font-size: 12px;">${business.rating.toFixed(1)} (${business.reviewCount} reviews)</span>
            </div>
            <p style="margin: 0; font-size: 11px; color: #666;">${business.address}</p>
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
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Map View</h3>
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg"
        style={{ minHeight: '400px' }}
      >
        <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-2">Google Maps would load here</p>
            <p className="text-sm text-gray-500">
              In a real implementation, you would need to add the Google Maps JavaScript API
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
