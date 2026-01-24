import React, { useState, useEffect } from 'react';

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import './App.css';
import ProductModal from './components/ProductModal';

function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productsData, setProductsData] = useState({ bangles: [], dresses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API or localStorage (cache)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // Try to get cached products from localStorage
        let cached = null;
        try {
          const cachedStr = localStorage.getItem('productsData');
          if (cachedStr) {
            cached = JSON.parse(cachedStr);
            // Validate cached structure
            if (cached && Array.isArray(cached.bangles) && Array.isArray(cached.dresses)) {
              setProductsData(cached);
              setLoading(false);
              return;
            }
          }
        } catch (e) {
          // Ignore parse errors and fetch fresh
        }

        // If not cached, fetch from API
        const response = await fetch('https://dbangles.vercel.app/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        if (data.success && data.products) {
          // Separate products by productType
          const bangles = data.products.filter(p => p.productType === 'bangles');
          const dresses = data.products.filter(p => p.productType === 'dresses');
          const newProductsData = { bangles, dresses };
          setProductsData(newProductsData);
          // Cache in localStorage
          try {
            localStorage.setItem('productsData', JSON.stringify(newProductsData));
          } catch (e) {
            // Ignore quota/storage errors
          }
        } else {
          setProductsData({ bangles: [], dresses: [] });
        }
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Bangles categories
  const banglesCategories = [
    'All',
    'Kundan bangles',
    'Glass bangles',
    'Hair accessories',
    'Saree pins',
    'Invisible chains',
    'Bracelets'
  ];

  // Dresses categories
  const dressesCategories = [
    'All',
    'Sarees',
    'Unstitched chudi material'
  ];

  // Filter products based on search query
  const filterProducts = (products) => {
    if (!searchQuery.trim()) return products;
    
    return products.filter(product => {
      const query = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        (product.category && product.category.toLowerCase().includes(query))
      );
    });
  };

  const filteredBangles = filterProducts(productsData.bangles || []);
  const filteredDresses = filterProducts(productsData.dresses || []);

  if (loading) {
    return (
      <div className="app">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Hero />
        <main className="main-content">
          <div className="loading">Loading products...</div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <Hero />
        <main className="main-content">
          <div className="error">Error: {error}</div>
        </main>
      </div>
    );
  }

  return (
    <div className="app">
      <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} onCartClick={() => navigate('/cart')} />
      <Hero />
      <main className="main-content">
        <ProductSection 
          title="Handmade Bangles Collection" 
          products={filteredBangles} 
          id="bangles"
          showCategories={true}
          categories={banglesCategories}
        />
        <ProductSection 
          title="Designer Dresses Collection" 
          products={filteredDresses} 
          id="dresses"
          showCategories={true}
          categories={dressesCategories}
        />
      </main>
      <footer className="footer">
        <p>&copy; 2026 DBangles - Handmade Elegance. All rights reserved.</p>
      </footer>
    </div>
  );
}


function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<AppContent />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/product/:productid' element={<ProductModal />} />
          {/* <Route path='/orders' element={<Orders />} /> */}
        </Routes>
      </Router>
    </CartProvider>
  );
}


export default App;
