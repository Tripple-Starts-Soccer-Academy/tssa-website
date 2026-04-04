const express = require('express');
const router = express.Router();

// Mock data for yearly schedule
const scheduleData = [
  {
    id: 1,
    date: '2024-02-01',
    month: 1,
    time: '19:30',
    opponent: 'Rival FC',
    competition: 'League',
    location: 'Home',
    result: 'upcoming',
    importance: 'high',
    notes: 'Big rivalry match'
  },
  {
    id: 2,
    date: '2024-02-05',
    month: 1,
    time: '15:00',
    opponent: 'Fan Meet & Greet',
    competition: 'Community',
    location: 'Community Center',
    result: 'upcoming',
    importance: 'medium',
    notes: 'Free event for fans'
  },
  {
    id: 3,
    date: '2024-02-10',
    month: 1,
    time: '16:00',
    opponent: 'United SC',
    competition: 'Cup',
    location: 'Away',
    result: 'upcoming',
    importance: 'high',
    notes: 'Cup knockout stage'
  },
  {
    id: 4,
    date: '2024-01-15',
    month: 0,
    time: '19:30',
    opponent: 'Athletic Club',
    competition: 'League',
    location: 'Home',
    result: 'W',
    score: '4-2',
    importance: 'medium',
    notes: 'Comeback victory'
  },
  {
    id: 5,
    date: '2024-01-08',
    month: 0,
    time: '16:00',
    opponent: 'United SC',
    competition: 'Cup',
    location: 'Away',
    result: 'D',
    score: '2-2',
    importance: 'high',
    notes: 'Dramatic draw'
  }
];

const competitions = ['All', 'League', 'Cup', 'Friendly', 'Champions League', 'Community'];

// GET all schedule events
router.get('/', (req, res) => {
  const { month, competition, location, result, importance } = req.query;
  let filteredSchedule = scheduleData;

  if (month !== undefined) {
    filteredSchedule = filteredSchedule.filter(event => event.month === parseInt(month));
  }
  
  if (competition && competition !== 'All') {
    filteredSchedule = filteredSchedule.filter(event => event.competition === competition);
  }
  
  if (location) {
    filteredSchedule = filteredSchedule.filter(event => event.location === location);
  }
  
  if (result) {
    filteredSchedule = filteredSchedule.filter(event => event.result === result);
  }
  
  if (importance) {
    filteredSchedule = filteredSchedule.filter(event => event.importance === importance);
  }

  // Sort by date
  filteredSchedule.sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({
    success: true,
    data: filteredSchedule,
    count: filteredSchedule.length
  });
});

// GET schedule by month
router.get('/month/:month', (req, res) => {
  const { month } = req.params;
  const monthSchedule = scheduleData.filter(event => event.month === parseInt(month));

  res.json({
    success: true,
    data: monthSchedule,
    count: monthSchedule.length
  });
});

// GET competitions
router.get('/competitions', (req, res) => {
  res.json({
    success: true,
    data: competitions
  });
});

// GET upcoming events
router.get('/upcoming', (req, res) => {
  const currentDate = new Date();
  const upcomingEvents = scheduleData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= currentDate;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  res.json({
    success: true,
    data: upcomingEvents
  });
});

// GET past events
router.get('/past', (req, res) => {
  const currentDate = new Date();
  const pastEvents = scheduleData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate < currentDate;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  res.json({
    success: true,
    data: pastEvents
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
  
  const eventsInRange = scheduleData.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= start && eventDate <= end;
  });

  res.json({
    success: true,
    data: eventsInRange
  });
});

// GET month statistics
router.get('/stats/:month', (req, res) => {
  const { month } = req.params;
  const monthEvents = scheduleData.filter(event => event.month === parseInt(month));
  
  const stats = {
    total: monthEvents.length,
    upcoming: monthEvents.filter(event => event.result === 'upcoming').length,
    completed: monthEvents.filter(event => event.result !== 'upcoming').length,
    home: monthEvents.filter(event => event.location === 'Home').length,
    away: monthEvents.filter(event => event.location === 'Away').length,
    highImportance: monthEvents.filter(event => event.importance === 'high').length,
    byCompetition: monthEvents.reduce((acc, event) => {
      acc[event.competition] = (acc[event.competition] || 0) + 1;
      return acc;
    }, {})
  };

  res.json({
    success: true,
    data: stats
  });
});

// POST new event (admin only)
router.post('/', (req, res) => {
  const newEvent = {
    id: scheduleData.length + 1,
    month: new Date(req.body.date).getMonth(),
    ...req.body
  };
  
  scheduleData.push(newEvent);
  
  res.status(201).json({
    success: true,
    message: 'Event added to schedule successfully',
    data: newEvent
  });
});

// PUT update event (admin only)
router.put('/:id', (req, res) => {
  const eventIndex = scheduleData.findIndex(e => e.id === parseInt(req.params.id));
  
  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  const updatedEvent = { ...scheduleData[eventIndex], ...req.body };
  if (req.body.date) {
    updatedEvent.month = new Date(req.body.date).getMonth();
  }
  
  scheduleData[eventIndex] = updatedEvent;
  
  res.json({
    success: true,
    message: 'Event updated successfully',
    data: updatedEvent
  });
});

// DELETE event (admin only)
router.delete('/:id', (req, res) => {
  const eventIndex = scheduleData.findIndex(e => e.id === parseInt(req.params.id));
  
  if (eventIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Event not found'
    });
  }
  
  scheduleData.splice(eventIndex, 1);
  
  res.json({
    success: true,
    message: 'Event deleted successfully'
  });
});

// GET full year calendar view
router.get('/calendar', (req, res) => {
  const year = req.query.year || new Date().getFullYear();
  
  const calendarData = [];
  for (let month = 0; month < 12; month++) {
    const monthEvents = scheduleData.filter(event => event.month === month);
    calendarData.push({
      month,
      monthName: new Date(2024, month).toLocaleString('default', { month: 'long' }),
      events: monthEvents,
      eventCount: monthEvents.length
    });
  }

  res.json({
    success: true,
    data: calendarData
  });
});

module.exports = router;
