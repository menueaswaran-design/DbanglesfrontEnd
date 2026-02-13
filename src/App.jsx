import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductSection from './components/ProductSection';
import RecommendedSection from './components/RecommendedSection';
import Cart from './components/Cart';
import { CartProvider } from './components/CartContext';
import { AuthProvider } from './components/AuthContext';
import TrackOrders from './components/TrackOrders';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import ProductModal from './components/Productmodal';
import Loader from './components/Loader';
import WhatsappFloatingButton from './components/WhatsappFloatingButton';
// import OtpLogin from './components/OtpLogin';
function AppContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [productsData, setProductsData] = useState({ bangles: [], dresses: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from API
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://dbangles.vercel.app/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      if (data.success && data.products) {
        const bangles = data.products.filter(p => p.productType === 'bangles');
        const dresses = data.products.filter(p => p.productType === 'dresses');
        setProductsData({ bangles, dresses });
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

  useEffect(() => {
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
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          productsData={{ bangles: [], dresses: [] }}
        />
        <Hero />
        <main className="main-content">
          <div style={{ paddingTop: 80 }}><Loader text="Loading products..." /></div>
        </main>
        <WhatsappFloatingButton />
      </div>
    );
  }


  if (error) {
    return (
      <div className="app">
        <Navbar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery}
          productsData={{ bangles: [], dresses: [] }}
        />
        <Hero />
        <main className="main-content">
          <div className="fetch-error-container">
            <div className="fetch-error-icon">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#764ba2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>
            <h2 className="fetch-error-title">Unable to Load Products</h2>
            <p className="fetch-error-text">
              We couldn't fetch the products right now. Please check your connection and try again.
            </p>
            <button className="fetch-error-retry-btn" onClick={fetchProducts}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="23 4 23 10 17 10" />
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
              </svg>
              Retry
            </button>
          </div>
        </main>
        <WhatsappFloatingButton />
      </div>
    );
  }

  // Combine all products for recommended section
  const allProducts = [...(productsData.bangles || []), ...(productsData.dresses || [])];

  return (
    <div className="app">
      <Helmet>
        <title>DBangles - Handmade Bangles & Designer Dresses | Authentic Handcrafted Jewelry</title>
        <meta 
          name="description" 
          content="Shop exclusive handmade bangles, kundan bangles, glass bangles, designer sarees and dresses. Authentic handcrafted jewelry with modern elegance. Free shipping across India." 
        />
        <meta name="keywords" content="handmade bangles, kundan bangles, glass bangles, designer dresses, sarees, handcrafted jewelry, traditional bangles, hair accessories, bracelets" />
        <meta property="og:title" content="DBangles - Handmade Bangles & Designer Dresses" />
        <meta property="og:description" content="Discover unique, handcrafted bangles and designer dresses that blend tradition with modern elegance." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.dbangles.in/" />
        
        {/* Structured Data for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "DBangles",
            "description": "Handmade bangles and designer dresses with authentic traditional design",
            "url": "https://www.dbangles.in",
            "logo": "https://www.dbangles.in/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "Customer Service"
            },
            "sameAs": [
              "https://facebook.com/dbangles",
              "https://instagram.com/dbangles"
            ]
          })}
        </script>
      </Helmet>
      <Navbar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        onCartClick={() => navigate('/cart')}
        productsData={productsData}
      />
      <Hero />
      <RecommendedSection products={allProducts} />
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
      <WhatsappFloatingButton />
    </div>
  );
}


function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<AppContent />} />
              <Route path="/cart" element={<Cart />} />
              <Route path='/product/:productid' element={<ProductModal />} />
              <Route path='/track-orders' element={<TrackOrders />} />
              {/* <Route path='/login' element={<OtpLogin />} /> */}
              {/* <Route path='/orders' element={<Orders />} /> */}
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}


export default App;
