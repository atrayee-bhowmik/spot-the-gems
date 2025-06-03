
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
    // Since Google Maps API is not loaded, we'll show a placeholder
    // In a real implementation, you would load the Google Maps JavaScript API
    console.log('Map would display user location:', userLocation);
    console.log('Map would display businesses:', businesses);
  }, [businesses, userLocation]);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Map View</h3>
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-blue-200"
        style={{ minHeight: '400px' }}
      >
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          <MapPin className="h-16 w-16 text-blue-500 mb-4" />
          <div className="text-center">
            <p className="text-gray-700 font-semibold mb-2">Interactive Map Preview</p>
            <p className="text-sm text-gray-600 mb-4">
              Google Maps integration would display here with:
            </p>
            <div className="bg-white rounded-lg p-4 shadow-sm max-w-md">
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span>Your location: {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span>{businesses.length} business markers</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              To enable live mapping, add Google Maps JavaScript API key
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
