
import React from 'react';
import { Star, MapPin, Navigation } from 'lucide-react';
import { Business } from '../utils/mockData';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  const getDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${business.address}`;
    window.open(url, '_blank');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <div key={i} className="relative">
            <Star className="h-4 w-4 text-gray-300" />
            <div className="absolute inset-0 overflow-hidden w-1/2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <Star key={i} className="h-4 w-4 text-gray-300" />
        );
      }
    }
    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 hover:shadow-md transition-shadow duration-200">
      {/* Business Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {business.name}
          </h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
            {business.type}
          </span>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-2 mb-3">
        <div className="flex items-center space-x-1">
          {renderStars(business.rating)}
        </div>
        <span className="text-sm font-medium text-gray-900">
          {business.rating.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500">
          ({business.reviewCount} reviews)
        </span>
      </div>

      {/* Address */}
      <div className="flex items-start space-x-2 mb-4">
        <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
        <span className="text-sm text-gray-600 leading-relaxed">
          {business.address}
        </span>
      </div>

      {/* Sample Reviews */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recent Reviews:</h4>
        <div className="space-y-2">
          {business.reviews.slice(0, 2).map((review, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-3">
              <div className="flex items-center space-x-2 mb-1">
                <div className="flex items-center space-x-1">
                  {renderStars(review.rating)}
                </div>
                <span className="text-xs text-gray-500">- {review.author}</span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">
                {review.text}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex space-x-3">
        <button
          onClick={getDirections}
          className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <Navigation className="h-4 w-4" />
          <span>Get Directions</span>
        </button>
      </div>
    </div>
  );
};

export default BusinessCard;
