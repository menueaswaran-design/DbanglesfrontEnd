import React, { useState } from 'react';
import '../styles/ProductCard.css';

function ProductCard({ product }) {
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type });
    }, 1800);
  };

  const handleAddToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const alreadyExists = cart.some(item => item.id === product.id);
    if (alreadyExists) {
      showToast('Already in cart', 'error');
      return;
    }

    const updatedCart = [...cart, { ...product, quantity: 1 }];
    localStorage.setItem('cart', JSON.stringify(updatedCart));

    showToast('Added to cart', 'success');
  };

  return (
    <div className="product-card" style={{ position: 'relative' }}>
      
      {/* Toast */}
      {toast.show && (
        <div
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            padding: '8px 14px',
            borderRadius: 20,
            fontSize: 13,
            fontWeight: 500,
            color: '#fff',
            background:
              toast.type === 'success' ? '#22c55e' : '#ef4444',
            boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
            animation: 'fadeInOut 1.8s ease',
            zIndex: 10
          }}
        >
          {toast.message}
        </div>
      )}

      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        <span className="discount-badge">-{discount}%</span>
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>

        <div className="product-price">
          <span className="original-price">₹{product.originalPrice}</span>
          <span className="discounted-price">₹{product.discountedPrice}</span>
        </div>

        <button className="add-to-cart-btn" onClick={handleAddToCart}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(-6px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; }
            100% { opacity: 0; transform: translateY(-6px); }
          }
        `}
      </style>
    </div>
  );
}

export default ProductCard;
