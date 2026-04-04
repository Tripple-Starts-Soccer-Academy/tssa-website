const express = require('express');
const router = express.Router();

// Mock data for trophies
const trophiesData = [
  {
    id: 1,
    name: 'National Championship',
    year: '2023',
    category: 'League',
    description: 'Premier Division Winners',
    competition: 'National League',
    importance: 'major',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'TSSA 3-1 City Warriors',
      topScorer: 'Marcus Rodriguez (15 goals)',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  },
  {
    id: 2,
    name: 'National Cup',
    year: '2023',
    category: 'Cup',
    description: 'Knockout Tournament Champions',
    competition: 'National Cup',
    importance: 'major',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'TSSA 2-1 United SC (AET)',
      topScorer: 'David Johnson (4 goals)',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  },
  {
    id: 3,
    name: 'Regional Championship',
    year: '2022',
    category: 'League',
    description: 'Division One Winners',
    competition: 'Regional League',
    importance: 'minor',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'TSSA 2-0 Athletic Club',
      topScorer: 'James Wilson (12 goals)',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  },
  {
    id: 4,
    name: 'Super Cup',
    year: '2022',
    category: 'Cup',
    description: 'Champions vs Cup Winners',
    competition: 'Super Cup',
    importance: 'minor',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'TSSA 3-2 City Warriors',
      topScorer: 'N/A',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  },
  {
    id: 5,
    name: 'League Cup',
    year: '2021',
    category: 'Cup',
    description: 'League Tournament Winners',
    competition: 'League Cup',
    importance: 'minor',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'TSSA 1-0 FC Phoenix',
      topScorer: 'Marcus Rodriguez (3 goals)',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  },
  {
    id: 6,
    name: 'Fair Play Award',
    year: '2021',
    category: 'Award',
    description: 'Best Sportsmanship Team',
    competition: 'Fair Play Award',
    importance: 'special',
    image: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=400&h=400&fit=crop',
    details: {
      finalScore: 'N/A',
      topScorer: 'N/A',
      manager: 'Michael Roberts',
      captain: 'John Smith'
    }
  }
];

const achievements = [
  { title: 'Total Trophies', value: '24', icon: 'trophy', color: 'text-yellow-600' },
  { title: 'League Titles', value: '8', icon: 'star', color: 'text-blue-600' },
  { title: 'Cup Wins', value: '12', icon: 'award', color: 'text-green-600' },
  { title: 'Special Awards', value: '4', icon: 'medal', color: 'text-purple-600' }
];

const categories = ['All', 'League', 'Cup', 'Award', 'Special'];

// GET all trophies
router.get('/', (req, res) => {
  const { category, importance, year, competition } = req.query;
  let filteredTrophies = trophiesData;

  if (category && category !== 'All') {
    filteredTrophies = filteredTrophies.filter(trophy => trophy.category === category);
  }
  
  if (importance) {
    filteredTrophies = filteredTrophies.filter(trophy => trophy.importance === importance);
  }
  
  if (year) {
    filteredTrophies = filteredTrophies.filter(trophy => trophy.year === year);
  }
  
  if (competition) {
    filteredTrophies = filteredTrophies.filter(trophy => 
      trophy.competition.toLowerCase().includes(competition.toLowerCase())
    );
  }

  // Sort by year (newest first)
  filteredTrophies.sort((a, b) => parseInt(b.year) - parseInt(a.year));

  res.json({
    success: true,
    data: filteredTrophies,
    count: filteredTrophies.length
  });
});

// GET trophy by ID
router.get('/:id', (req, res) => {
  const trophy = trophiesData.find(t => t.id === parseInt(req.params.id));
  if (!trophy) {
    return res.status(404).json({
      success: false,
      message: 'Trophy not found'
    });
  }
  res.json({
    success: true,
    data: trophy
  });
});

// GET trophy categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: categories
  });
});

// GET achievements summary
router.get('/achievements', (req, res) => {
  res.json({
    success: true,
    data: achievements
  });
});

// GET trophies by year
router.get('/year/:year', (req, res) => {
  const { year } = req.params;
  const yearTrophies = trophiesData.filter(trophy => trophy.year === year);

  res.json({
    success: true,
    data: yearTrophies,
    count: yearTrophies.length
  });
});

// GET trophies by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryTrophies = trophiesData.filter(trophy => trophy.category === category);

  res.json({
    success: true,
    data: categoryTrophies,
    count: categoryTrophies.length
  });
});

// GET major trophies only
router.get('/major', (req, res) => {
  const majorTrophies = trophiesData.filter(trophy => trophy.importance === 'major');

  res.json({
    success: true,
    data: majorTrophies,
    count: majorTrophies.length
  });
});

// GET trophy statistics
router.get('/stats', (req, res) => {
  const stats = {
    total: trophiesData.length,
    byCategory: trophiesData.reduce((acc, trophy) => {
      acc[trophy.category] = (acc[trophy.category] || 0) + 1;
      return acc;
    }, {}),
    byImportance: trophiesData.reduce((acc, trophy) => {
      acc[trophy.importance] = (acc[trophy.importance] || 0) + 1;
      return acc;
    }, {}),
    byDecade: trophiesData.reduce((acc, trophy) => {
      const decade = Math.floor(parseInt(trophy.year) / 10) * 10;
      const decadeLabel = `${decade}s`;
      acc[decadeLabel] = (acc[decadeLabel] || 0) + 1;
      return acc;
    }, {}),
    recentWins: trophiesData.filter(trophy => parseInt(trophy.year) >= 2020).length,
    firstWin: trophiesData.reduce((oldest, trophy) => 
      parseInt(trophy.year) < parseInt(oldest.year) ? trophy : oldest
    )
  };

  res.json({
    success: true,
    data: stats
  });
});

// GET trophy timeline
router.get('/timeline', (req, res) => {
  const timeline = trophiesData
    .sort((a, b) => parseInt(a.year) - parseInt(b.year))
    .map(trophy => ({
      year: trophy.year,
      name: trophy.name,
      category: trophy.category,
      importance: trophy.importance,
      description: trophy.description
    }));

  res.json({
    success: true,
    data: timeline
  });
});

// POST new trophy (admin only)
router.post('/', (req, res) => {
  const newTrophy = {
    id: trophiesData.length + 1,
    details: {
      finalScore: '',
      topScorer: '',
      manager: '',
      captain: ''
    },
    ...req.body
  };
  
  trophiesData.push(newTrophy);
  
  res.status(201).json({
    success: true,
    message: 'Trophy added successfully',
    data: newTrophy
  });
});

// PUT update trophy (admin only)
router.put('/:id', (req, res) => {
  const trophyIndex = trophiesData.findIndex(t => t.id === parseInt(req.params.id));
  
  if (trophyIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Trophy not found'
    });
  }
  
  trophiesData[trophyIndex] = { ...trophiesData[trophyIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'Trophy updated successfully',
    data: trophiesData[trophyIndex]
  });
});

// DELETE trophy (admin only)
router.delete('/:id', (req, res) => {
  const trophyIndex = trophiesData.findIndex(t => t.id === parseInt(req.params.id));
  
  if (trophyIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Trophy not found'
    });
  }
  
  trophiesData.splice(trophyIndex, 1);
  
  res.json({
    success: true,
    message: 'Trophy deleted successfully'
  });
});

module.exports = router;
