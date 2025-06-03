
import React from 'react';
import { Filter, Star } from 'lucide-react';

interface FilterBarProps {
  selectedType: string;
  onTypeChange: (type: string) => void;
  maxRating: number;
  onRatingChange: (rating: number) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  selectedType,
  onTypeChange,
  maxRating,
  onRatingChange,
}) => {
  const businessTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'restaurant', label: 'Restaurants' },
    { value: 'cafe', label: 'Cafes' },
    { value: 'retail', label: 'Retail' },
    { value: 'service', label: 'Services' },
    { value: 'entertainment', label: 'Entertainment' },
  ];

  const ratingOptions = [2.0, 2.5, 3.0, 3.5, 4.0];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-blue-100 p-6 mb-6">
      <div className="flex items-center space-x-3 mb-4">
        <Filter className="h-5 w-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Businesses</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Business Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Business Type
          </label>
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {businessTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Rating
          </label>
          <div className="flex items-center space-x-3">
            <select
              value={maxRating}
              onChange={(e) => onRatingChange(parseFloat(e.target.value))}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            >
              {ratingOptions.map((rating) => (
                <option key={rating} value={rating}>
                  {rating} stars or less
                </option>
              ))}
            </select>
            <div className="flex items-center space-x-1 text-yellow-500">
              <Star className="h-4 w-4 fill-current" />
              <span className="text-sm font-medium text-gray-600">{maxRating}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
