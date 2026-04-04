const express = require('express');
const router = express.Router();

// Mock data for store products
const productsData = [
  {
    id: 1,
    name: 'Home Jersey 2024',
    price: 89.99,
    category: 'Jerseys',
    image: 'https://images.unsplash.com/photo-1556228578-1d83b39fbb04?w=400&h=400&fit=crop',
    rating: 4.8,
    reviews: 234,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    description: 'Official home jersey for the 2024 season',
    stock: {
      S: 50,
      M: 75,
      L: 100,
      XL: 80,
      XXL: 30
    }
  },
  {
    id: 2,
    name: 'Away Jersey 2024',
    price: 89.99,
    category: 'Jerseys',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    rating: 4.7,
    reviews: 189,
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    featured: true,
    description: 'Official away jersey for the 2024 season',
    stock: {
      S: 45,
      M: 60,
      L: 90,
      XL: 70,
      XXL: 25
    }
  },
  {
    id: 3,
    name: 'Training Kit',
    price: 59.99,
    category: 'Training',
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=400&fit=crop',
    rating: 4.6,
    reviews: 156,
    sizes: ['S', 'M', 'L', 'XL'],
    featured: false,
    description: 'Professional training kit for players and fans',
    stock: {
      S: 40,
      M: 55,
      L: 65,
      XL: 50
    }
  },
  {
    id: 4,
    name: 'Scarf - Official',
    price: 24.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1578632292335-df3abbb0d586?w=400&h=400&fit=crop',
    rating: 4.9,
    reviews: 412,
    sizes: ['One Size'],
    featured: false,
    description: 'Official club scarf with team colors',
    stock: {
      'One Size': 200
    }
  }
];

const categories = ['All', 'Jerseys', 'Training', 'Accessories', 'Equipment', 'Outerwear'];

// GET all products
router.get('/', (req, res) => {
  const { category, featured, search, minPrice, maxPrice, sortBy = 'name', order = 'asc' } = req.query;
  let filteredProducts = productsData;

  if (category && category !== 'All') {
    filteredProducts = filteredProducts.filter(product => product.category === category);
  }
  
  if (featured === 'true') {
    filteredProducts = filteredProducts.filter(product => product.featured);
  }
  
  if (search) {
    const searchTerm = search.toLowerCase();
    filteredProducts = filteredProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (minPrice) {
    filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
  }
  
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
  }

  // Sort products
  filteredProducts.sort((a, b) => {
    if (sortBy === 'price') {
      return order === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortBy === 'rating') {
      return order === 'asc' ? a.rating - b.rating : b.rating - a.rating;
    } else if (sortBy === 'name') {
      return order === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    }
    return 0;
  });

  res.json({
    success: true,
    data: filteredProducts,
    count: filteredProducts.length
  });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = productsData.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  res.json({
    success: true,
    data: product
  });
});

// GET categories
router.get('/categories', (req, res) => {
  res.json({
    success: true,
    data: categories
  });
});

// GET featured products
router.get('/featured', (req, res) => {
  const featuredProducts = productsData.filter(product => product.featured);
  
  res.json({
    success: true,
    data: featuredProducts
  });
});

// GET products by category
router.get('/category/:category', (req, res) => {
  const { category } = req.params;
  const categoryProducts = productsData.filter(product => product.category === category);

  res.json({
    success: true,
    data: categoryProducts,
    count: categoryProducts.length
  });
});

// POST new product (admin only)
router.post('/', (req, res) => {
  const newProduct = {
    id: productsData.length + 1,
    rating: 0,
    reviews: 0,
    featured: false,
    stock: {},
    ...req.body
  };
  
  productsData.push(newProduct);
  
  res.status(201).json({
    success: true,
    message: 'Product created successfully',
    data: newProduct
  });
});

// PUT update product (admin only)
router.put('/:id', (req, res) => {
  const productIndex = productsData.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  productsData[productIndex] = { ...productsData[productIndex], ...req.body };
  
  res.json({
    success: true,
    message: 'Product updated successfully',
    data: productsData[productIndex]
  });
});

// DELETE product (admin only)
router.delete('/:id', (req, res) => {
  const productIndex = productsData.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  productsData.splice(productIndex, 1);
  
  res.json({
    success: true,
    message: 'Product deleted successfully'
  });
});

// POST check stock
router.post('/:id/check-stock', (req, res) => {
  const { size, quantity } = req.body;
  const product = productsData.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (!product.stock[size]) {
    return res.status(400).json({
      success: false,
      message: 'Size not available'
    });
  }
  
  const availableStock = product.stock[size];
  const inStock = availableStock >= quantity;
  
  res.json({
    success: true,
    data: {
      size,
      requested: quantity,
      available: availableStock,
      inStock
    }
  });
});

// POST purchase product
router.post('/:id/purchase', (req, res) => {
  const { size, quantity } = req.body;
  const product = productsData.find(p => p.id === parseInt(req.params.id));
  
  if (!product) {
    return res.status(404).json({
      success: false,
      message: 'Product not found'
    });
  }
  
  if (!product.stock[size]) {
    return res.status(400).json({
      success: false,
      message: 'Size not available'
    });
  }
  
  if (product.stock[size] < quantity) {
    return res.status(400).json({
      success: false,
      message: 'Insufficient stock'
    });
  }
  
  product.stock[size] -= quantity;
  
  res.json({
    success: true,
    message: 'Purchase successful',
    data: {
      productId: product.id,
      name: product.name,
      size,
      quantity,
      price: product.price,
      total: product.price * quantity
    }
  });
});

module.exports = router;
