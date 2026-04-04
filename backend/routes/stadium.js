const express = require('express');
const router = express.Router();

// Mock data for stadium information
const stadiumInfo = {
  name: 'TSSA National Stadium',
  capacity: '45,000',
  built: '1985',
  renovated: '2023',
  address: '123 Stadium Drive, Sports City, SC 12345',
  phone: '+1 (555) 123-4567',
  email: 'stadium@tsya.com',
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  },
  description: 'A world-class sporting venue with modern facilities and rich history.'
};

const facilities = [
  {
    id: 1,
    name: 'Premium Seating',
    description: 'Luxury boxes with VIP service and best views',
    available: true,
    capacity: '500',
    priceRange: '$250-500'
  },
  {
    id: 2,
    name: 'Family Zone',
    description: 'Dedicated family area with activities for children',
    available: true,
    capacity: '5,000',
    priceRange: '$35-60'
  },
  {
    id: 3,
    name: 'Food Court',
    description: 'Variety of dining options and refreshments',
    available: true,
    capacity: 'N/A',
    priceRange: '$10-25'
  },
  {
    id: 4,
    name: 'Free Wi-Fi',
    description: 'High-speed internet throughout the stadium',
    available: true,
    capacity: '45,000',
    priceRange: 'Free'
  },
  {
    id: 5,
    name: 'Security',
    description: '24/7 professional security staff',
    available: true,
    capacity: 'N/A',
    priceRange: 'Included'
  },
  {
    id: 6,
    name: 'Parking',
    description: '2000+ parking spaces available',
    available: true,
    capacity: '2,000',
    priceRange: '$15'
  }
];

const seatingCategories = [
  {
    id: 1,
    category: 'VIP Boxes',
    price: '$250-500',
    capacity: '500',
    features: ['Premium seating', 'Private bar', 'Catering service', 'Best views'],
    available: true
  },
  {
    id: 2,
    category: 'Premium Stand',
    price: '$75-120',
    capacity: '5,000',
    features: ['Comfortable seating', 'Access to lounge', 'Food service', 'Great views'],
    available: true
  },
  {
    id: 3,
    category: 'Family Stand',
    price: '$35-60',
    capacity: '10,000',
    features: ['Family-friendly', 'Activities area', 'Food court access', 'Good views'],
    available: true
  },
  {
    id: 4,
    category: 'General Admission',
    price: '$20-35',
    capacity: '25,000',
    features: ['Traditional seating', 'Food stalls', 'Standing areas', 'Standard views'],
    available: true
  },
  {
    id: 5,
    category: 'Away Section',
    price: '$25-40',
    capacity: '4,500',
    features: ['Dedicated away fans', 'Separate entrance', 'Food service', 'Safe environment'],
    available: true
  }
];

const tours = [
  {
    id: 1,
    name: 'Standard Stadium Tour',
    duration: '60 minutes',
    price: '$15',
    highlights: ['Field access', 'Locker rooms', 'Press box', 'Museum'],
    schedule: 'Daily at 10:00, 12:00, 14:00, 16:00'
  },
  {
    id: 2,
    name: 'VIP Experience Tour',
    duration: '90 minutes',
    price: '$45',
    highlights: ['Behind the scenes', 'VIP areas', 'Meet & greet', 'Gift package'],
    schedule: 'Weekends at 11:00, 15:00'
  },
  {
    id: 3,
    name: 'Match Day Experience',
    duration: '3 hours',
    price: '$100',
    highlights: ['Pre-match access', 'Tunnel walk', 'Hospitality', 'Premium seating'],
    schedule: 'Match days only'
  }
];

const upcomingEvents = [
  {
    id: 1,
    date: '2024-02-01',
    event: 'TSSA vs Rival FC',
    expectedAttendance: '42,000',
    status: 'selling fast',
    ticketLink: '/tickets/1'
  },
  {
    id: 2,
    date: '2024-02-10',
    event: 'TSSA vs United SC',
    expectedAttendance: '38,000',
    status: 'available',
    ticketLink: '/tickets/2'
  },
  {
    id: 3,
    date: '2024-02-20',
    event: 'TSSA vs City Warriors',
    expectedAttendance: '45,000',
    status: 'sold out',
    ticketLink: '/tickets/3'
  }
];

// GET stadium information
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: stadiumInfo
  });
});

// GET stadium facilities
router.get('/facilities', (req, res) => {
  const { available } = req.query;
  let filteredFacilities = facilities;

  if (available !== undefined) {
    filteredFacilities = filteredFacilities.filter(facility => 
      facility.available === (available === 'true')
    );
  }

  res.json({
    success: true,
    data: filteredFacilities
  });
});

// GET seating categories
router.get('/seating', (req, res) => {
  const { available } = req.query;
  let filteredSeating = seatingCategories;

  if (available !== undefined) {
    filteredSeating = filteredSeating.filter(seating => 
      seating.available === (available === 'true')
    );
  }

  res.json({
    success: true,
    data: filteredSeating
  });
});

// GET stadium tours
router.get('/tours', (req, res) => {
  res.json({
    success: true,
    data: tours
  });
});

// GET tour by ID
router.get('/tours/:id', (req, res) => {
  const tour = tours.find(t => t.id === parseInt(req.params.id));
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: 'Tour not found'
    });
  }
  res.json({
    success: true,
    data: tour
  });
});

// GET upcoming stadium events
router.get('/events', (req, res) => {
  const { status } = req.query;
  let filteredEvents = upcomingEvents;

  if (status) {
    filteredEvents = filteredEvents.filter(event => event.status === status);
  }

  res.json({
    success: true,
    data: filteredEvents
  });
});

// GET stadium capacity breakdown
router.get('/capacity', (req, res) => {
  const capacityBreakdown = {
    total: 45000,
    breakdown: seatingCategories.map(category => ({
      category: category.category,
      capacity: parseInt(category.capacity.replace(',', '')),
      percentage: Math.round((parseInt(category.capacity.replace(',', '')) / 45000) * 100)
    }))
  };

  res.json({
    success: true,
    data: capacityBreakdown
  });
});

// GET stadium accessibility information
router.get('/accessibility', (req, res) => {
  const accessibility = {
    wheelchairAccess: true,
    wheelchairSpaces: 200,
    accessibleToilets: true,
    accessibleParking: 100,
    hearingLoop: true,
    visualImpairmentSupport: true,
    assistanceAvailable: true,
    contactPhone: '+1 (555) 123-4568',
    email: 'accessibility@tsya.com'
  };

  res.json({
    success: true,
    data: accessibility
  });
});

// GET transportation information
router.get('/transport', (req, res) => {
  const transport = {
    publicTransport: {
      metro: 'Stadium Station (Line 2)',
      bus: 'Routes 15, 23, 45',
      shuttle: 'From City Center'
    },
    parking: {
      totalSpaces: 2000,
      regularSpaces: 1500,
      vipSpaces: 300,
      accessibleSpaces: 200,
      price: '$15 per vehicle',
      vipPrice: '$50 per vehicle'
    },
    directions: {
      car: 'Located off Highway 101, exit 25',
      train: '10-minute walk from Stadium Station',
      airport: '45 minutes from International Airport'
    }
  };

  res.json({
    success: true,
    data: transport
  });
});

// POST book stadium tour
router.post('/tours/:id/book', (req, res) => {
  const { date, time, participants } = req.body;
  const tour = tours.find(t => t.id === parseInt(req.params.id));
  
  if (!tour) {
    return res.status(404).json({
      success: false,
      message: 'Tour not found'
    });
  }

  const booking = {
    id: Math.random().toString(36).substr(2, 9),
    tourId: tour.id,
    tourName: tour.name,
    date,
    time,
    participants,
    totalPrice: parseFloat(tour.price.replace('$', '')) * participants,
    status: 'confirmed',
    bookingDate: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Tour booked successfully',
    data: booking
  });
});

// POST facility inquiry
router.post('/inquiry', (req, res) => {
  const { name, email, phone, facility, message } = req.body;

  const inquiry = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    phone,
    facility,
    message,
    status: 'received',
    submittedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Inquiry submitted successfully',
    data: inquiry
  });
});

module.exports = router;
