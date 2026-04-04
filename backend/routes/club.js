const express = require('express');
const router = express.Router();

// Mock data for club information
const clubInfo = {
  founded: '1975',
  president: 'John Anderson',
  manager: 'Michael Roberts',
  stadium: 'TSSA National Stadium',
  colors: ['Blue', 'White', 'Gold'],
  league: 'Premier Division',
  website: 'www.tsya.com',
  motto: 'Excellence Through Unity',
  description: 'TSSA Football Club is a professional football club based in Sports City, founded in 1975 with a rich history of success and community engagement.'
};

const values = [
  {
    id: 1,
    title: 'Excellence',
    description: 'We strive for excellence in everything we do, from player development to fan experience.',
    icon: 'trophy',
    color: 'blue'
  },
  {
    id: 2,
    title: 'Community',
    description: 'We are committed to giving back to our community and being a positive force for change.',
    icon: 'heart',
    color: 'red'
  },
  {
    id: 3,
    title: 'Innovation',
    description: 'We embrace new ideas and technologies to stay at the forefront of football.',
    icon: 'target',
    color: 'green'
  },
  {
    id: 4,
    title: 'Integrity',
    description: 'We operate with honesty, transparency, and respect for all stakeholders.',
    icon: 'shield',
    color: 'purple'
  }
];

const achievements = [
  {
    id: 1,
    year: '2023',
    achievement: 'National Championship Winners',
    description: 'Secured our 8th league title in dramatic fashion',
    category: 'League',
    importance: 'high'
  },
  {
    id: 2,
    year: '2022',
    achievement: 'Stadium Renovation Complete',
    description: 'Completed $50 million stadium modernization project',
    category: 'Infrastructure',
    importance: 'medium'
  },
  {
    id: 3,
    year: '2021',
    achievement: 'Academy of the Year',
    description: 'Recognized for outstanding youth development program',
    category: 'Academy',
    importance: 'high'
  },
  {
    id: 4,
    year: '2020',
    achievement: 'Community Impact Award',
    description: 'Honored for extensive community outreach initiatives',
    category: 'Community',
    importance: 'medium'
  },
  {
    id: 5,
    year: '2019',
    achievement: 'Golden Generation',
    description: 'Homegrown talent leads team to double-winning season',
    category: 'Team',
    importance: 'high'
  },
  {
    id: 6,
    year: '1975',
    achievement: 'Club Foundation',
    description: 'TSSA established with 12 founding members',
    category: 'History',
    importance: 'high'
  }
];

const leadership = [
  {
    id: 1,
    name: 'John Anderson',
    position: 'Club President',
    experience: '15 years',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
    bio: 'Former player turned administrator with vision for sustainable growth.',
    email: 'president@tsya.com',
    joined: '2009'
  },
  {
    id: 2,
    name: 'Michael Roberts',
    position: 'Head Coach',
    experience: '8 years',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    bio: 'Tactical innovator with proven track record of developing young talent.',
    email: 'coach@tsya.com',
    joined: '2016'
  },
  {
    id: 3,
    name: 'Sarah Chen',
    position: 'Director of Football',
    experience: '6 years',
    image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop',
    bio: 'Strategic planner responsible for player recruitment and development.',
    email: 'dof@tsya.com',
    joined: '2018'
  },
  {
    id: 4,
    name: 'David Martinez',
    position: 'Academy Director',
    experience: '12 years',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    bio: 'Youth development specialist with passion for nurturing future stars.',
    email: 'academy@tsya.com',
    joined: '2012'
  }
];

const partners = [
  {
    id: 1,
    name: 'Nike',
    category: 'Kit Sponsor',
    logo: 'https://via.placeholder.com/150x80/000000/FFFFFF?text=Nike',
    website: 'www.nike.com',
    since: '2020'
  },
  {
    id: 2,
    name: 'TechCorp',
    category: 'Technology Partner',
    logo: 'https://via.placeholder.com/150x80/0000FF/FFFFFF?text=TechCorp',
    website: 'www.techcorp.com',
    since: '2021'
  },
  {
    id: 3,
    name: 'BankPlus',
    category: 'Financial Partner',
    logo: 'https://via.placeholder.com/150x80/0066CC/FFFFFF?text=BankPlus',
    website: 'www.bankplus.com',
    since: '2019'
  },
  {
    id: 4,
    name: 'SportsDrink',
    category: 'Hydration Partner',
    logo: 'https://via.placeholder.com/150x80/00AA00/FFFFFF?text=SportsDrink',
    website: 'www.sportsdrink.com',
    since: '2022'
  },
  {
    id: 5,
    name: 'MediaGroup',
    category: 'Broadcast Partner',
    logo: 'https://via.placeholder.com/150x80/CC0000/FFFFFF?text=MediaGroup',
    website: 'www.mediagroup.com',
    since: '2018'
  },
  {
    id: 6,
    name: 'AutoBrand',
    category: 'Transport Partner',
    logo: 'https://via.placeholder.com/150x80/666666/FFFFFF?text=AutoBrand',
    website: 'www.autobrand.com',
    since: '2020'
  }
];

const communityPrograms = [
  {
    id: 1,
    name: 'Youth Development',
    description: 'Free football training for underprivileged children',
    participants: '500+',
    impact: 'High',
    status: 'active'
  },
  {
    id: 2,
    name: 'Education Support',
    description: 'Scholarships and tutoring for young athletes',
    participants: '200+',
    impact: 'Medium',
    status: 'active'
  },
  {
    id: 3,
    name: 'Health & Wellness',
    description: 'Community fitness programs and health screenings',
    participants: '1000+',
    impact: 'High',
    status: 'active'
  },
  {
    id: 4,
    name: 'Environmental Initiative',
    description: 'Sustainability programs and green stadium initiatives',
    participants: 'All fans',
    impact: 'Medium',
    status: 'active'
  }
];

// GET club information
router.get('/', (req, res) => {
  res.json({
    success: true,
    data: clubInfo
  });
});

// GET club values
router.get('/values', (req, res) => {
  res.json({
    success: true,
    data: values
  });
});

// GET club achievements
router.get('/achievements', (req, res) => {
  const { category, importance } = req.query;
  let filteredAchievements = achievements;

  if (category) {
    filteredAchievements = filteredAchievements.filter(achievement => 
      achievement.category === category
    );
  }

  if (importance) {
    filteredAchievements = filteredAchievements.filter(achievement => 
      achievement.importance === importance
    );
  }

  res.json({
    success: true,
    data: filteredAchievements
  });
});

// GET leadership team
router.get('/leadership', (req, res) => {
  const { position } = req.query;
  let filteredLeadership = leadership;

  if (position) {
    filteredLeadership = filteredLeadership.filter(leader => 
      leader.position.toLowerCase().includes(position.toLowerCase())
    );
  }

  res.json({
    success: true,
    data: filteredLeadership
  });
});

// GET leader by ID
router.get('/leadership/:id', (req, res) => {
  const leader = leadership.find(l => l.id === parseInt(req.params.id));
  if (!leader) {
    return res.status(404).json({
      success: false,
      message: 'Leader not found'
    });
  }
  res.json({
    success: true,
    data: leader
  });
});

// GET partners and sponsors
router.get('/partners', (req, res) => {
  const { category } = req.query;
  let filteredPartners = partners;

  if (category) {
    filteredPartners = filteredPartners.filter(partner => 
      partner.category === category
    );
  }

  res.json({
    success: true,
    data: filteredPartners
  });
});

// GET community programs
router.get('/community', (req, res) => {
  const { status, impact } = req.query;
  let filteredPrograms = communityPrograms;

  if (status) {
    filteredPrograms = filteredPrograms.filter(program => 
      program.status === status
    );
  }

  if (impact) {
    filteredPrograms = filteredPrograms.filter(program => 
      program.impact === impact
    );
  }

  res.json({
    success: true,
    data: filteredPrograms
  });
});

// GET club statistics
router.get('/stats', (req, res) => {
  const stats = {
    founded: clubInfo.founded,
    totalTrophies: 24,
    leagueTitles: 8,
    cupWins: 12,
    academyGraduates: 156,
    communityPrograms: 4,
    partners: 6,
    globalFans: '2.5M',
    socialMediaFollowers: '850K',
    websiteVisitors: '1.2M/year',
    stadiumCapacity: '45,000',
    averageAttendance: '42,500',
    seasonTicketHolders: '35,000'
  };

  res.json({
    success: true,
    data: stats
  });
});

// POST contact form
router.post('/contact', (req, res) => {
  const { name, email, subject, message, type } = req.body;

  const contact = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    subject,
    message,
    type: type || 'general',
    status: 'received',
    submittedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Contact form submitted successfully',
    data: contact
  });
});

// POST newsletter subscription
router.post('/newsletter', (req, res) => {
  const { email, name } = req.body;

  const subscription = {
    id: Math.random().toString(36).substr(2, 9),
    email,
    name: name || '',
    status: 'active',
    subscribedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Newsletter subscription successful',
    data: subscription
  });
});

// POST membership application
router.post('/membership', (req, res) => {
  const { name, email, phone, membershipType, paymentMethod } = req.body;

  const membership = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    phone,
    membershipType,
    paymentMethod,
    status: 'pending',
    appliedAt: new Date().toISOString(),
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Membership application submitted successfully',
    data: membership
  });
});

// POST volunteer application
router.post('/volunteer', (req, res) => {
  const { name, email, phone, program, availability, experience } = req.body;

  const volunteer = {
    id: Math.random().toString(36).substr(2, 9),
    name,
    email,
    phone,
    program,
    availability,
    experience,
    status: 'under_review',
    appliedAt: new Date().toISOString()
  };

  res.status(201).json({
    success: true,
    message: 'Volunteer application submitted successfully',
    data: volunteer
  });
});

module.exports = router;
