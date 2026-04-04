const express = require('express');
const router = express.Router();

// Mock data for matches
const matchesData = [
  {
    id: 1,
    opponent: 'Rival FC',
    date: '2024-02-01',
    time: '19:30',
    location: 'Home',
    competition: 'League',
    result: 'upcoming',
    score: null,
    importance: 'high'
  },
  {
    id: 2,
    opponent: 'United SC',
    date: '2024-01-08',
    time: '16:00',
    location: 'Away',
    competition: 'Cup',
    result: 'D',
    score: '2-2',
    importance: 'high'
  },
  {
    id: 3,
    opponent: 'City Warriors',
    date: '2024-01-01',
    time: '15:00',
    location: 'Home',
    competition: 'League',
    result: 'W',
    score: '2-0',
    importance: 'medium'
  },
  {
    id: 4,
    opponent: 'Athletic Club',
    date: '2023-12-28',
    time: '20:00',
    location: 'Home',
    competition: 'League',
    result: 'W',
    score: '4-2',
    importance: 'medium'
  }
];

const seasonStats = [
  { season: '2023-24', played: 45, won: 32, drawn: 8, lost: 5, goalsFor: 89, goalsAgainst: 31 },
  { season: '2022-23', played: 42, won: 28, drawn: 10, lost: 4, goalsFor: 76, goalsAgainst: 28 },
  { season: '2021-22', played: 40, won: 25, drawn: 9, lost: 6, goalsFor: 68, goalsAgainst: 35 },
  { season: '2020-21', played: 38, won: 22, drawn: 8, lost: 8, goalsFor: 61, goalsAgainst: 33 }
];

// GET all matches
router.get('/', (req, res) => {
  const { competition, location, result } = req.query;
  let filteredMatches = matchesData;

  if (competition) {
    filteredMatches = filteredMatches.filter(match => match.competition === competition);
  }
  if (location) {
    filteredMatches = filteredMatches.filter(match => match.location === location);
  }
  if (result) {
    filteredMatches = filteredMatches.filter(match => match.result === result);
  }

  res.json({
    success: true,
    data: filteredMatches,
    count: filteredMatches.length
  });
});

// GET match by ID
router.get('/:id', (req, res) => {
  const match = matchesData.find(m => m.id === parseInt(req.params.id));
  if (!match) {
    return res.status(404).json({
      success: false,
      message: 'Match not found'
    });
  }
  res.json({
    success: true,
    data: match
  });
});

// GET season statistics
router.get('/stats/season', (req, res) => {
  res.json({
    success: true,
    data: seasonStats
  });
});

// GET recent matches (last 5)
router.get('/recent', (req, res) => {
  const recentMatches = matchesData
    .filter(match => match.result !== 'upcoming')
    .slice(0, 5);
  
  res.json({
    success: true,
    data: recentMatches
  });
});

// GET upcoming matches
router.get('/upcoming', (req, res) => {
  const upcomingMatches = matchesData.filter(match => match.result === 'upcoming');
  
  res.json({
    success: true,
    data: upcomingMatches
  });
});

// POST new match (admin only)
router.post('/', (req, res) => {
  const newMatch = {
    id: matchesData.length + 1,
    ...req.body
  };
  
  matchesData.push(newMatch);
  
  res.status(201).json({
    success: true,
    message: 'Match created successfully',
    data: newMatch
  });
});

// PUT update match (admin only)
router.put('/:id', (req, res) => {
  const matchIndex = matchesData.findIndex(m => m.id === parseInt(req.params.id));
  
  if (matchIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Match not found'
    });
  }
  
  matchesData[matchIndex] = { ...matchesData[matchIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'Match updated successfully',
    data: matchesData[matchIndex]
  });
});

// DELETE match (admin only)
router.delete('/:id', (req, res) => {
  const matchIndex = matchesData.findIndex(m => m.id === parseInt(req.params.id));
  
  if (matchIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Match not found'
    });
  }
  
  matchesData.splice(matchIndex, 1);
  
  res.json({
    success: true,
    message: 'Match deleted successfully'
  });
});

module.exports = router;
