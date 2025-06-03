
import React, { useState, useEffect } from 'react';
import { MapPin, Filter, Star, Navigation } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import BusinessCard from '../components/BusinessCard';
import MapView from '../components/MapView';
import { mockBusinesses, Business } from '../utils/mockData';

const Index = () => {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);
  const [filteredBusinesses, setFilteredBusinesses] = useState<Business[]>(mockBusinesses);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedBusinessType, setSelectedBusinessType] = useState<string>('all');
  const [maxRating, setMaxRating] = useState<number>(3.5);
  const [isLoading, setIsLoading] = useState(false);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    filterBusinesses();
  }, [businesses, selectedBusinessType, maxRating]);

  const getCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(location);
          setIsLoading(false);
          console.log('Current location:', location);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to a default location (San Francisco)
          setUserLocation({ lat: 37.7749, lng: -122.4194 });
          setIsLoading(false);
        }
      );
    } else {
      console.error('Geolocation is not supported');
      setUserLocation({ lat: 37.7749, lng: -122.4194 });
      setIsLoading(false);
    }
  };

  const filterBusinesses = () => {
    let filtered = businesses.filter(business => business.rating <= maxRating);
    
    if (selectedBusinessType !== 'all') {
      filtered = filtered.filter(business => business.type === selectedBusinessType);
    }
    
    setFilteredBusinesses(filtered);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Business Finder</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                <Navigation className="h-4 w-4" />
                <span>{isLoading ? 'Locating...' : 'Use My Location'}</span>
              </button>
              <button
                onClick={() => setShowMap(!showMap)}
                className="flex items-center space-x-2 bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                <span>{showMap ? 'Hide Map' : 'Show Map'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter Bar */}
        <FilterBar
          selectedType={selectedBusinessType}
          onTypeChange={setSelectedBusinessType}
          maxRating={maxRating}
          onRatingChange={setMaxRating}
        />

        {/* Map View */}
        {showMap && userLocation && (
          <div className="mb-8">
            <MapView
              businesses={filteredBusinesses}
              userLocation={userLocation}
            />
          </div>
        )}

        {/* Results Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Found {filteredBusinesses.length} businesses with {maxRating} stars or less
              </h2>
              <p className="text-gray-600 mt-1">
                Discover hidden gems and support local businesses in your area
              </p>
            </div>
            <div className="flex items-center space-x-2 text-blue-600">
              <Star className="h-5 w-5" />
              <span className="font-medium">Max {maxRating} stars</span>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-8">
              <Filter className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
              <p className="text-gray-600">Try adjusting your filters or location to find more businesses.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
