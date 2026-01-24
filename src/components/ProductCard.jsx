import React, { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/ProductCard.css";


function ProductCard({ product, onView }) {
  const [message, setMessage] = useState(null);
  const { cart, addToCart } = useCart();

  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) /
      product.originalPrice) *
      100
  );

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (cart.some((item) => item.id === product.id)) {
      showMessage("Already in cart", "error");
      return;
    }
    addToCart(product);
    showMessage("Added to cart", "success");
  };

  return (
    <div
      className="product-card"
      style={{ position: "relative", cursor: "pointer" }}
      onClick={() => onView && onView(product)}
    >
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
          <span className="original-price">
            ₹{product.originalPrice}
          </span>
          <span className="discounted-price">
            ₹{product.discountedPrice}
          </span>
        </div>

        {/* ✅ Message above button */}
        {message && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "500",
              color:
                message.type === "success"
                  ? "#22c55e"
                  : "#ef4444",
            }}
          >
            {/* Circle Tick */}
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor:
                  message.type === "success"
                    ? "#22c55e"
                    : "#ef4444",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              ✓
            </div>

            {message.text}
          </div>
        )}

        <button
          className="add-to-cart-btn"
          onClick={handleAddToCart}
        >
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
    </div>
  );
}

export default ProductCard;
