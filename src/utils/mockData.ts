
export interface Review {
  rating: number;
  text: string;
  author: string;
}

export interface Business {
  id: string;
  name: string;
  type: string;
  rating: number;
  reviewCount: number;
  address: string;
  lat: number;
  lng: number;
  reviews: Review[];
}

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Corner Deli & Market',
    type: 'restaurant',
    rating: 2.8,
    reviewCount: 127,
    address: '1234 Main St, San Francisco, CA 94102',
    lat: 37.7849,
    lng: -122.4094,
    reviews: [
      {
        rating: 3,
        text: 'The sandwiches are decent but the service could be faster. Good prices though.',
        author: 'Mike R.'
      },
      {
        rating: 2,
        text: 'Food was okay but the place needs some cleaning. Staff was friendly enough.',
        author: 'Sarah L.'
      },
      {
        rating: 4,
        text: 'Hidden gem! Great pastrami sandwich and the owner is super nice.',
        author: 'David K.'
      }
    ]
  },
  {
    id: '2',
    name: 'Vintage Vinyl Records',
    type: 'retail',
    rating: 3.2,
    reviewCount: 89,
    address: '567 Castro St, San Francisco, CA 94114',
    lat: 37.7649,
    lng: -122.4350,
    reviews: [
      {
        rating: 4,
        text: 'Amazing collection of rare albums! Prices are fair and the owner knows his stuff.',
        author: 'Lisa M.'
      },
      {
        rating: 2,
        text: 'Records are overpriced and the selection is hit or miss. Dusty atmosphere.',
        author: 'Tom B.'
      },
      {
        rating: 3,
        text: 'Found some great jazz records here. Takes time to dig through everything.',
        author: 'Jazz_Lover'
      }
    ]
  },
  {
    id: '3',
    name: 'Sunrise Cafe',
    type: 'cafe',
    rating: 2.9,
    reviewCount: 156,
    address: '890 Valencia St, San Francisco, CA 94110',
    lat: 37.7599,
    lng: -122.4204,
    reviews: [
      {
        rating: 3,
        text: 'Coffee is average but they have good WiFi and plenty of seating.',
        author: 'Student_Life'
      },
      {
        rating: 2,
        text: 'Waited 20 minutes for a latte. Staff seemed overwhelmed.',
        author: 'Coffee_Addict'
      },
      {
        rating: 4,
        text: 'Great place to work! Quiet atmosphere and decent pastries.',
        author: 'Remote_Worker'
      }
    ]
  },
  {
    id: '4',
    name: 'Quick Fix Auto Repair',
    type: 'service',
    rating: 3.1,
    reviewCount: 78,
    address: '456 Mission St, San Francisco, CA 94105',
    lat: 37.7749,
    lng: -122.4194,
    reviews: [
      {
        rating: 4,
        text: 'Honest mechanic with fair prices. Fixed my car quickly.',
        author: 'Car_Owner_2023'
      },
      {
        rating: 2,
        text: 'Took longer than promised and charged extra for parts.',
        author: 'Frustrated_Driver'
      },
      {
        rating: 3,
        text: 'Decent service but the waiting area could be cleaner.',
        author: 'Regular_Customer'
      }
    ]
  },
  {
    id: '5',
    name: 'Lucky Dragon Chinese',
    type: 'restaurant',
    rating: 2.7,
    reviewCount: 203,
    address: '321 Geary St, San Francisco, CA 94102',
    lat: 37.7869,
    lng: -122.4094,
    reviews: [
      {
        rating: 3,
        text: 'Large portions and cheap prices. Food is okay for late night.',
        author: 'Night_Owl'
      },
      {
        rating: 2,
        text: 'Food arrived cold and the rice was hard. Not impressed.',
        author: 'Disappointed'
      },
      {
        rating: 4,
        text: 'Best value Chinese food in the area! Family-run place.',
        author: 'Budget_Foodie'
      }
    ]
  },
  {
    id: '6',
    name: 'Retro Arcade Bar',
    type: 'entertainment',
    rating: 3.3,
    reviewCount: 145,
    address: '789 Folsom St, San Francisco, CA 94107',
    lat: 37.7749,
    lng: -122.4094,
    reviews: [
      {
        rating: 4,
        text: 'Great selection of classic games! Drinks are a bit pricey though.',
        author: 'Gamer_Girl'
      },
      {
        rating: 3,
        text: 'Fun atmosphere but some games are broken. Good for groups.',
        author: 'Party_Planner'
      },
      {
        rating: 2,
        text: 'Too crowded on weekends and the music is too loud.',
        author: 'Casual_Visitor'
      }
    ]
  },
  {
    id: '7',
    name: 'Mom & Pop Grocery',
    type: 'retail',
    rating: 3.4,
    reviewCount: 67,
    address: '234 Irving St, San Francisco, CA 94122',
    lat: 37.7631,
    lng: -122.4686,
    reviews: [
      {
        rating: 4,
        text: 'Convenient neighborhood store with friendly owners.',
        author: 'Local_Resident'
      },
      {
        rating: 3,
        text: 'Higher prices than chain stores but good selection.',
        author: 'Comparison_Shopper'
      },
      {
        rating: 3,
        text: 'Clean store and helpful staff. Limited produce selection.',
        author: 'Weekly_Shopper'
      }
    ]
  },
  {
    id: '8',
    name: 'Neighborhood Barber',
    type: 'service',
    rating: 2.6,
    reviewCount: 94,
    address: '567 Fillmore St, San Francisco, CA 94117',
    lat: 37.7749,
    lng: -122.4320,
    reviews: [
      {
        rating: 3,
        text: 'Old school barber with reasonable prices. Cash only.',
        author: 'Traditional_Guy'
      },
      {
        rating: 2,
        text: 'Haircut was uneven and the place needs updating.',
        author: 'Style_Conscious'
      },
      {
        rating: 4,
        text: 'Best $15 haircut in the city! Been coming here for years.',
        author: 'Loyal_Customer'
      }
    ]
  }
];
