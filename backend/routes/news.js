const express = require('express');
const router = express.Router();

// Mock data for news articles
const newsData = [
  {
    id: 1,
    title: 'TSSA Signs Star Striker for Record Transfer',
    category: 'Transfers',
    date: '2024-01-20',
    time: '14:30',
    author: 'John Smith',
    image: 'https://images.unsplash.com/photo-1508098682728-e35c6f68dc0e?w=800&h=400&fit=crop',
    excerpt: 'In a groundbreaking move, TSSA has completed the signing of international striker Marcus Rodriguez for a club-record fee.',
    content: 'The 26-year-old forward joins from European champions, bringing with him a wealth of experience and a proven goal-scoring record...',
    readTime: '3 min read',
    likes: 456,
    comments: 89,
    shares: 234,
    trending: true,
    video: false,
    tags: ['transfer', 'striker', 'marcus-rodriguez']
  },
  {
    id: 2,
    title: 'Match Highlights: TSSA 3-1 Rival FC',
    category: 'Match',
    date: '2024-01-18',
    time: '20:15',
    author: 'Sarah Johnson',
    image: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=400&fit=crop',
    excerpt: 'Watch all the key moments from yesterday\'s thrilling victory over our biggest rivals.',
    content: 'TSSA delivered a commanding performance with goals from three different players...',
    readTime: '2 min read',
    likes: 789,
    comments: 156,
    shares: 445,
    trending: true,
    video: true,
    tags: ['match', 'highlights', 'rival-fc']
  },
  {
    id: 3,
    title: 'Academy Graduates Make First Team Debut',
    category: 'Academy',
    date: '2024-01-15',
    time: '11:00',
    author: 'Mike Wilson',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop',
    excerpt: 'Two young talents from our youth academy make their first professional appearances.',
    content: 'The future looks bright as TSSA continues to develop homegrown talent...',
    readTime: '4 min read',
    likes: 234,
    comments: 67,
    shares: 123,
    trending: false,
    video: false,
    tags: ['academy', 'youth', 'debut']
  }
];

// GET all news articles
router.get('/', (req, res) => {
  const { category, trending, search, limit = 10, page = 1 } = req.query;
  let filteredNews = newsData;

  if (category && category !== 'All') {
    filteredNews = filteredNews.filter(article => article.category === category);
  }
  
  if (trending === 'true') {
    filteredNews = filteredNews.filter(article => article.trending);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredNews = filteredNews.filter(article => 
      article.title.toLowerCase().includes(searchTerm) ||
      article.excerpt.toLowerCase().includes(searchTerm) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedNews = filteredNews.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedNews,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredNews.length,
      pages: Math.ceil(filteredNews.length / limit)
    }
  });
});

// GET news article by ID
router.get('/:id', (req, res) => {
  const article = newsData.find(n => n.id === parseInt(req.params.id));
  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'News article not found'
    });
  }
  res.json({
    success: true,
    data: article
  });
});

// GET trending news
router.get('/trending', (req, res) => {
  const trendingNews = newsData
    .filter(article => article.trending)
    .sort((a, b) => b.likes - a.likes);

  res.json({
    success: true,
    data: trendingNews
  });
});

// GET news by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryNews = newsData.filter(article => article.category === category);

  res.json({
    success: true,
    data: categoryNews,
    count: categoryNews.length
  });
});

// GET latest news
router.get('/latest', (req, res) => {
  const { limit = 5 } = req.query;
  const latestNews = newsData
    .sort((a, b) => new Date(b.date + ' ' + b.time) - new Date(a.date + ' ' + a.time))
    .slice(0, parseInt(limit));

  res.json({
    success: true,
    data: latestNews
  });
});

// POST new news article (admin only)
router.post('/', (req, res) => {
  const newArticle = {
    id: newsData.length + 1,
    likes: 0,
    comments: 0,
    shares: 0,
    trending: false,
    video: false,
    tags: [],
    ...req.body
  };
  
  newsData.push(newArticle);
  
  res.status(201).json({
    success: true,
    message: 'News article created successfully',
    data: newArticle
  });
});

// PUT update news article (admin only)
router.put('/:id', (req, res) => {
  const articleIndex = newsData.findIndex(n => n.id === parseInt(req.params.id));
  
  if (articleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'News article not found'
    });
  }
  
  newsData[articleIndex] = { ...newsData[articleIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'News article updated successfully',
    data: newsData[articleIndex]
  });
});

// DELETE news article (admin only)
router.delete('/:id', (req, res) => {
  const articleIndex = newsData.findIndex(n => n.id === parseInt(req.params.id));
  
  if (articleIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'News article not found'
    });
  }
  
  newsData.splice(articleIndex, 1);
  
  res.json({
    success: true,
    message: 'News article deleted successfully'
  });
});

// POST like article
router.post('/:id/like', (req, res) => {
  const article = newsData.find(n => n.id === parseInt(req.params.id));
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'News article not found'
    });
  }
  
  article.likes += 1;
  
  res.json({
    success: true,
    message: 'Article liked successfully',
    data: {
      likes: article.likes
    }
  });
});

// POST comment on article
router.post('/:id/comment', (req, res) => {
  const { comment } = req.body;
  const article = newsData.find(n => n.id === parseInt(req.params.id));
  
  if (!article) {
    return res.status(404).json({
      success: false,
      message: 'News article not found'
    });
  }
  
  article.comments += 1;
  
  res.json({
    success: true,
    message: 'Comment added successfully',
    data: {
      comments: article.comments
    }
  });
});

module.exports = router;
