import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { ShoppingBag, LogOut, Search } from "lucide-react";
import "../styles/Navbar.css";

function Navbar({ searchQuery, setSearchQuery, onCartClick, productsData = { bangles: [], dresses: [] } }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const cartCount = cart.length;
  const navigate = useNavigate();

  // All products for search suggestions
  const allProducts = [...(productsData.bangles || []), ...(productsData.dresses || [])];

  // Generate search suggestions
  useEffect(() => {
    if (mobileSearchQuery.trim().length > 0) {
      const filtered = allProducts
        .filter(product => 
          product.name.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(mobileSearchQuery.toLowerCase()) ||
          product.category.toLowerCase().includes(mobileSearchQuery.toLowerCase())
        )
        .slice(0, 6); // Show max 6 suggestions
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [mobileSearchQuery]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileSearch = () => {
    setIsMobileSearchOpen(!isMobileSearchOpen);
    setMobileSearchQuery("");
    setSuggestions([]);
  };

  const handleSuggestionClick = (product) => {
    setIsMobileSearchOpen(false);
    setMobileSearchQuery("");
    setSuggestions([]);
    // Navigate to product detail page
    const productId = product._id || product.id;
    navigate(`/product/${productId}`);
  };

  const handleCartClick = () => {
    onCartClick ? onCartClick() : navigate("/cart");
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      {/* ================= TOP NAVBAR ================= */}
      <nav className="navbar">
        <div className="navbar-container">
          {/* LOGO (HIDDEN ON MOBILE VIA CSS) */}
          <div className="navbar-logo" onClick={() => navigate("/")}>
            <h1>DBangles</h1>
            <span className="logo-tagline">Handmade Elegance</span>
          </div>

          <ul className="navbar-menu">
            <li><a href="/">Home</a></li>
            <li><a href="#bangles">Bangles</a></li>
            <li><a href="#dresses">Dresses</a></li>
          </ul>

          {/* Mobile Search and Hamburger Container */}
          <div className="mobile-controls">
            {/* Mobile Search Icon */}
            <button
              className="mobile-search-btn mobile-only"
              onClick={toggleMobileSearch}
              aria-label="Search products"
            >
              <Search size={22} />
            </button>

            {/* Hamburger menu for mobile */}
            <button
              className="hamburger-menu mobile-only"
              aria-label="Open menu"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            >
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
              <span className="hamburger-bar"></span>
            </button>
          </div>

          <div className="navbar-actions">
            {/* ORDERS – DESKTOP ONLY */}
            <button
              className="icon-btn track-btn desktop-only"
              onClick={() => navigate('/track-orders')}
              title="Orders"
            >
              <ShoppingBag size={24} />
            </button>

            {/* LOGOUT – DESKTOP ONLY (if logged in) */}
            {user && (
              <button
                className="icon-btn logout-btn desktop-only"
                onClick={handleLogout}
                title="Logout"
              >
                <LogOut size={22} />
              </button>
            )}

            {/* SEARCH – DESKTOP ONLY */}
            <div className={`search-container ${isSearchOpen ? "active" : ""}`}>
              <button className="icon-btn" onClick={toggleSearch}>
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
            </div>

            {/* CART – DESKTOP ONLY */}
            <button
              className="icon-btn cart-btn desktop-only"
              onClick={handleCartClick}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>

              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      {isMobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mobile-menu" onClick={e => e.stopPropagation()}>
            <button className="close-mobile-menu" onClick={() => setIsMobileMenuOpen(false)}>&times;</button>
            <ul>
              <li><a href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
              <li><a href="#bangles" onClick={() => setIsMobileMenuOpen(false)}>Bangles</a></li>
              <li><a href="#dresses" onClick={() => setIsMobileMenuOpen(false)}>Dresses</a></li>
              {user && (
                <li>
                  <button 
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="mobile-menu-logout-btn"
                  >
                    <LogOut size={20} style={{marginRight: '8px'}} />
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}

      {/* ================= MOBILE SEARCH OVERLAY ================= */}
      {isMobileSearchOpen && (
        <div className="mobile-search-overlay" onClick={toggleMobileSearch}>
          <div className="mobile-search-container" onClick={e => e.stopPropagation()}>
            <div className="mobile-search-input-container">
              <Search size={20} className="mobile-search-icon" />
              <input
                type="text"
                placeholder="Search products..."
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                className="mobile-search-input"
                autoFocus
              />
              <button onClick={toggleMobileSearch} className="mobile-search-close">
                &times;
              </button>
            </div>
            
            {suggestions.length > 0 && (
              <div className="search-suggestions">
                {suggestions.map((product) => (
                  <div 
                    key={product.id} 
                    className="suggestion-item"
                    onClick={() => handleSuggestionClick(product)}
                  >
                    <img src={product.image} alt={product.name} className="suggestion-image" />
                    <div className="suggestion-content">
                      <h4 className="suggestion-name">{product.name}</h4>
                      <p className="suggestion-category">{product.category}</p>
                      <div className="suggestion-price">
                        <span className="discount-price">₹{product.discountedPrice}</span>
                        {product.originalPrice > product.discountedPrice && (
                          <span className="original-price">₹{product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {mobileSearchQuery.length > 0 && suggestions.length === 0 && (
              <div className="no-suggestions">
                <p>No products found for "{mobileSearchQuery}"</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= MOBILE BOTTOM NAV ================= */}
      <div className="mobile-bottom-nav">
        {/* HOME */}
        <button
          className="mobile-nav-btn"
          onClick={() => navigate("/")}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          <span>Home</span>
        </button>

        {/* CART */}
        <button
          className="mobile-nav-btn"
          onClick={handleCartClick}
        >
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          <span>Cart</span>

          {cartCount > 0 && (
            <span className="mobile-cart-badge">{cartCount}</span>
          )}
        </button>

        {/* ORDERS */}
        <button
          className="mobile-nav-btn"
          onClick={() => navigate('/track-orders')}
        >
          <ShoppingBag size={26} />
          <span>Orders</span>
        </button>

        {/* LOGOUT (if logged in) */}
        {user && (
          <button
            className="mobile-nav-btn"
            onClick={handleLogout}
          >
            <LogOut size={26} />
            <span>Logout</span>
          </button>
        )}
      </div>
    </>
  );
}

export default Navbar;
