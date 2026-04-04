const express = require('express');
const router = express.Router();

// Mock data for events
const eventsData = [
  {
    id: 1,
    title: 'TSSA vs Rival FC',
    type: 'Match',
    date: '2024-02-01',
    time: '19:30',
    location: 'Home Stadium',
    competition: 'League',
    isHome: true,
    importance: 'high',
    ticketPrice: '$25',
    availableTickets: 450,
    description: 'Big rivalry match of the season'
  },
  {
    id: 2,
    title: 'Fan Meet & Greet',
    type: 'Event',
    date: '2024-02-05',
    time: '15:00',
    location: 'Community Center',
    competition: 'Community',
    isHome: true,
    importance: 'medium',
    ticketPrice: 'Free',
    availableTickets: 200,
    description: 'Meet your favorite players'
  },
  {
    id: 3,
    title: 'TSSA vs United SC',
    type: 'Match',
    date: '2024-02-10',
    time: '16:00',
    location: 'Away Stadium',
    competition: 'Cup',
    isHome: false,
    importance: 'high',
    ticketPrice: '$30',
    availableTickets: 0,
    description: 'Cup competition knockout stage'
  },
  {
    id: 4,
    title: 'Youth Academy Open Day',
    type: 'Event',
    date: '2024-02-15',
    time: '10:00',
    location: 'Training Ground',
    competition: 'Academy',
    isHome: true,
    importance: 'low',
    ticketPrice: 'Free',
    availableTickets: 100,
    description: 'Discover our youth development program'
  }
];

// GET all events
router.get('/', (req, res) => {
  const { type, competition, importance, isHome } = req.query;
  let filteredEvents = eventsData;

  if (type) {
    filteredEvents = filteredEvents.filter(event => event.type === type);
  }
  if (competition) {
    filteredEvents = filteredEvents.filter(event => event.competition === competition);
  }
  if (importance) {
    filteredEvents = filteredEvents.filter(event => event.importance === importance);
  }
  if (isHome !== undefined) {
    filteredEvents = filteredEvents.filter(event => event.isHome === (isHome === 'true'));
  }

  res.json({
    success: true,
    data: filteredEvents,
    count: filteredEvents.length
  });
});

// GET event by ID
router.get('/:id', (req, res) => {
  const event = eventsData.find(e => e.id === parseInt(req.params.id));
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  res.json({
    success: true,
    data: event
  });
});

// GET upcoming events
router.get('/upcoming', (req, res) => {
  const currentDate = new Date();
  const upcomingEvents = eventsData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({
    success: true,
    data: upcomingEvents
  });
});

// GET events by date range
router.get('/range', (req, res) => {
  const { startDate, endDate } = req.query;
  
  if (!startDate || !endDate) {
    return res.status(400).json({
      success: false,
      message: 'Start date and end date are required'
    });
  }

  const start = new Date(startDate);
  const end = new Date(endDate);
  
  const eventsInRange = eventsData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= start && eventDate <= end;
  });

  res.json({
    success: true,
    data: eventsInRange
  });
});

// POST new event (admin only)
router.post('/', (req, res) => {
  const newEvent = {
    id: eventsData.length + 1,
    ...req.body
  };
  
  eventsData.push(newEvent);
  
  res.status(201).json({
    success: true,
    message: 'Event created successfully',
    data: newEvent
  });
});

// PUT update event (admin only)
router.put('/:id', (req, res) => {
  const eventIndex = eventsData.findIndex(e => e.id === parseInt(req.params.id));
  
  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  eventsData[eventIndex] = { ...eventsData[eventIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'Event updated successfully',
    data: eventsData[eventIndex]
  });
});

// DELETE event (admin only)
router.delete('/:id', (req, res) => {
  const eventIndex = eventsData.findIndex(e => e.id === parseInt(req.params.id));
  
  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  eventsData.splice(eventIndex, 1);
  
  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});

// POST purchase tickets for event
router.post('/:id/tickets', (req, res) => {
  const { quantity } = req.body;
  const event = eventsData.find(e => e.id === parseInt(req.params.id));
  
  if (!event) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  if (event.availableTickets < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Not enough tickets available'
    });
  }
  
  event.availableTickets -= quantity;
  
  res.json({
    success: true,
    message: 'Tickets purchased successfully',
    data: {
      eventId: event.id,
      quantity,
      remainingTickets: event.availableTickets
    }
  });
});

module.exports = router;
