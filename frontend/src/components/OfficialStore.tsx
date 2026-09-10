import React, { useState } from 'react';
import { ShoppingCart, Heart, Star, Filter, Search, Plus, Minus, X } from 'lucide-react';
import { getProductImage, getAwayJerseyImage } from '../utils/productImages';

const OfficialStore = () => {
  const [cart, setCart] = useState<Array<{id: number, quantity: number}>>([]);
  const [showCart, setShowCart] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    {
      id: 1,
      name: 'Home Jersey 2024',
      price: 89.99,
      category: 'Jerseys',
      image: '/shopping/IMG_0272.jpg',
      rating: 4.8,
      reviews: 234,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      featured: true,
    },
    {
      id: 2,
      name: 'Away Jersey 2024',
      price: 89.99,
      category: 'Jerseys',
      image: getAwayJerseyImage(),
      rating: 4.7,
      reviews: 189,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      featured: true,
    },
    {
      id: 3,
      name: 'Training Kit',
      price: 59.99,
      category: 'Training',
      image: getProductImage('training'),
      rating: 4.6,
      reviews: 156,
      sizes: ['S', 'M', 'L', 'XL'],
      featured: false,
    },
    {
      id: 4,
      name: 'Scarf - Official',
      price: 24.99,
      category: 'Accessories',
      image: getProductImage('scarf'),
      rating: 4.9,
      reviews: 412,
      sizes: ['One Size'],
      featured: false,
    },
    {
      id: 5,
      name: 'Cap - Team Logo',
      price: 19.99,
      category: 'Accessories',
      image: getProductImage('cap'),
      rating: 4.5,
      reviews: 98,
      sizes: ['One Size'],
      featured: false,
    },
    {
      id: 6,
      name: 'Football - Home',
      price: 34.99,
      category: 'Equipment',
      image: getProductImage('football'),
      rating: 4.7,
      reviews: 167,
      sizes: ['Standard'],
      featured: false,
    },
    {
      id: 7,
      name: 'Jacket - Winter',
      price: 119.99,
      category: 'Outerwear',
      image: getProductImage('jacket'),
      rating: 4.8,
      reviews: 89,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      featured: true,
    },
    {
      id: 8,
      name: 'Water Bottle',
      price: 14.99,
      category: 'Accessories',
      image: getProductImage('bottle'),
      rating: 4.4,
      reviews: 234,
      sizes: ['750ml'],
      featured: false,
    },
  ];

  const categories = ['All', 'Jerseys', 'Training', 'Accessories', 'Equipment', 'Outerwear'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => 
          item.id === productId 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: number, change: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === productId) {
          const newQuantity = item.quantity + change;
          return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
        }
        return item;
      }).filter(Boolean) as Array<{id: number, quantity: number}>;
    });
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <section id="store" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Official Store</h2>
          <p className="text-xl text-gray-600">Get your authentic TSSA merchandise</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        selectedCategory === category
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Under $25</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">$25 - $50</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">$50 - $100</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-gray-600">Over $100</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden">
                  {product.featured && (
                    <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 absolute z-10 m-2 rounded">
                      FEATURED
                    </div>
                  )}
                  <div className="aspect-square relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <button className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-shadow">
                      <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
                    </button>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center mr-2">
                        {renderStars(product.rating)}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                    <div className="text-lg font-bold text-blue-600 mb-3">${product.price}</div>
                    <div className="text-sm text-gray-500 mb-3">Sizes: {product.sizes.join(', ')}</div>
                    <button
                      onClick={() => addToCart(product.id)}
                      className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowCart(!showCart)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors relative"
        >
          <ShoppingCart className="w-6 h-6" />
          {getCartItemsCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
              {getCartItemsCount()}
            </span>
          )}
        </button>

        {showCart && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">Shopping Cart</h3>
                  <button
                    onClick={() => setShowCart(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cart.map((item) => {
                        const product = products.find(p => p.id === item.id);
                        return (
                          <div key={item.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900">{product?.name}</h4>
                              <p className="text-gray-500">${product?.price}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                        <span className="text-xl font-bold text-blue-600">${getCartTotal().toFixed(2)}</span>
                      </div>
                      <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                        Proceed to Checkout
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default OfficialStore;
