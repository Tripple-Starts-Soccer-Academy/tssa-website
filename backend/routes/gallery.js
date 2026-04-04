const express = require('express');
const router = express.Router();

// Mock data for gallery images
const galleryData = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=800&h=600&fit=crop',
    title: 'Team Celebration',
    category: 'Match',
    date: '2024-01-15',
    likes: 245,
    description: 'Team celebrates after winning the championship',
    tags: ['celebration', 'team', 'victory'],
    featured: true
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    title: 'Training Session',
    category: 'Training',
    date: '2024-01-12',
    likes: 189,
    description: 'Intense training session at the academy',
    tags: ['training', 'academy', 'practice'],
    featured: false
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1554068394-1e6e5c0b2c5f?w=800&h=600&fit=crop',
    title: 'Stadium View',
    category: 'Stadium',
    date: '2024-01-10',
    likes: 312,
    description: 'Beautiful view of our home stadium',
    tags: ['stadium', 'architecture', 'home'],
    featured: true
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=800&h=600&fit=crop',
    title: 'Match Action',
    category: 'Match',
    date: '2024-01-08',
    likes: 423,
    description: 'Exciting action from the latest match',
    tags: ['match', 'action', 'game'],
    featured: false
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1414235075428-338989a2e8c0?w=800&h=600&fit=crop',
    title: 'Trophy Presentation',
    category: 'Event',
    date: '2024-01-05',
    likes: 567,
    description: 'Trophy presentation ceremony',
    tags: ['trophy', 'ceremony', 'award'],
    featured: true
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1461896836860-08bdef4c93eb?w=800&h=600&fit=crop',
    title: 'Team Photo',
    category: 'Team',
    date: '2024-01-01',
    likes: 892,
    description: 'Official team photo for 2024 season',
    tags: ['team', 'photo', 'squad'],
    featured: true
  }
];

const categories = ['All', 'Match', 'Training', 'Stadium', 'Event', 'Team', 'Fans'];

// GET all gallery images
router.get('/', (req, res) => {
  const { category, featured, search, limit = 20, page = 1 } = req.query;
  let filteredImages = galleryData;

  if (category && category !== 'All') {
    filteredImages = filteredImages.filter(image => image.category === category);
  }
  
  if (featured === 'true') {
    filteredImages = filteredImages.filter(image => image.featured);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredImages = filteredImages.filter(image => 
      image.title.toLowerCase().includes(searchTerm) ||
      image.description.toLowerCase().includes(searchTerm) ||
      image.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  // Sort by date (newest first)
  filteredImages.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Pagination
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + parseInt(limit);
  const paginatedImages = filteredImages.slice(startIndex, endIndex);

  res.json({
    success: true,
    data: paginatedImages,
    pagination: {
      page: parseInt(page),
      limit: parseInt(limit),
      total: filteredImages.length,
      pages: Math.ceil(filteredImages.length / limit)
    }
  });
});

// GET image by ID
router.get('/:id', (req, res) => {
  const image = galleryData.find(img => img.id === parseInt(req.params.id));
  if (!image) {
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    });
  }
  res.json({
    success: true,
    data: image
  });
});

// GET categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: categories
  });
});

// GET featured images
router.get('/featured', (req, res) => {
  const featuredImages = galleryData
    .filter(image => image.featured)
    .sort((a, b) => b.likes - a.likes);

  res.json({
    success: true,
    data: featuredImages
  });
});

// GET images by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryImages = galleryData.filter(image => image.category === category);

  res.json({
    success: true,
    data: categoryImages,
    count: categoryImages.length
  });
});

// GET most liked images
router.get('/popular', (req, res) => {
  const { limit = 10 } = req.query;
  const popularImages = galleryData
    .sort((a, b) => b.likes - a.likes)
    .slice(0, parseInt(limit));

  res.json({
    success: true,
    data: popularImages
  });
});

// GET recent images
router.get('/recent', (req, res) => {
  const { limit = 10 } = req.query;
  const recentImages = galleryData
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, parseInt(limit));

  res.json({
    success: true,
    data: recentImages
  });
});

// POST new image (admin only)
router.post('/', (req, res) => {
  const newImage = {
    id: galleryData.length + 1,
    likes: 0,
    featured: false,
    tags: [],
    ...req.body
  };
  
  galleryData.push(newImage);
  
  res.status(201).json({
    success: true,
    message: 'Image added successfully',
    data: newImage
  });
});

// PUT update image (admin only)
router.put('/:id', (req, res) => {
  const imageIndex = galleryData.findIndex(img => img.id === parseInt(req.params.id));
  
  if (imageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    });
  }
  
  galleryData[imageIndex] = { ...galleryData[imageIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'Image updated successfully',
    data: galleryData[imageIndex]
  });
});

// DELETE image (admin only)
router.delete('/:id', (req, res) => {
  const imageIndex = galleryData.findIndex(img => img.id === parseInt(req.params.id));
  
  if (imageIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    });
  }
  
  galleryData.splice(imageIndex, 1);
  
  res.json({
    success: true,
    message: 'Image deleted successfully'
  });
});

// POST like image
router.post('/:id/like', (req, res) => {
  const image = galleryData.find(img => img.id === parseInt(req.params.id));
  
  if (!image) {
    return res.status(404).json({
      success: false,
      message: 'Image not found'
    });
  }
  
  image.likes += 1;
  
  res.json({
    success: true,
    message: 'Image liked successfully',
    data: {
      likes: image.likes
    }
  });
});

module.exports = router;
