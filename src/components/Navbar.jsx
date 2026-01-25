import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./../styles/Navbar.css";

function Navbar({ searchQuery, setSearchQuery, onCartClick }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.length;
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleCartClick = () => {
    onCartClick ? onCartClick() : navigate("/cart");
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

          <div className="navbar-actions">
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
      </div>
    </>
  );
}

export default Navbar;
