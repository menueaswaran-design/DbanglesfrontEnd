import React, { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product, onView, showLabel = false }) {
  const [message, setMessage] = useState(null);
  const { cart, addToCart } = useCart();

  const isInCart = cart.some((item) => String(item.id) === String(product._id || product.id));
  const isSold = product.label?.toLowerCase() === 'sold-out';

  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) /
      product.originalPrice) *
      100
  );

  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (isSold) return;

    if (isInCart) {
      showMessage("Already in cart", "cart-error");
      return;
    }

    const cartItem = {
      ...product,
      id: product._id || product.id
    };
    addToCart(cartItem);
    showMessage("Added to cart", "cart-success");
  };

  return (
    <div
      className="product-card"
      onClick={() => onView && onView(product)}
    >
      <div className="product-image-container">
        {showLabel && product.label && product.label.toLowerCase() !== 'sold-out' ? (
          <div className={`product-label product-label-${product.label.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.label}
          </div>
        ) : null}
        {isSold ? (
          <div className="product-label product-label-sold-out">
            SOLD OUT
          </div>
        ) : null}
        <img
          src={product.image}
          alt={product.name}
          className={`product-image ${isSold ? 'sold-out-blur' : ''}`}
        />
      </div>

      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">
          {product.description?.replace(/\n/g, " ").trim()}
        </p>

        <div className="product-price">
          <span className="discounted-price">
            ₹{product.discountedPrice}
          </span>
          <span className="original-price">
            ₹{product.originalPrice}
          </span>
          <span className="discount-percent">
            {discount}% OFF
          </span>
        </div>

        {message && (
          <div className={`message ${message.type}`}>
            <div className={`message-icon ${message.type}`}>✓</div>
            {message.text}
          </div>
        )}

        <button
          className={`add-to-cart-btn ${isInCart ? "added" : ""} ${isSold ? "sold-out" : ""}`}
          onClick={handleAddToCart}
          disabled={isInCart || isSold}
        >
          {isSold ? "Sold Out" : isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
