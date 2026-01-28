import React, { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product, onView }) {
  const [message, setMessage] = useState(null);
  const { cart, addToCart } = useCart();

  const isInCart = cart.some((item) => item.id === product.id);

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

    if (isInCart) {
      showMessage("Already in cart", "cart-error");
      return;
    }

    addToCart(product);
    showMessage("Added to cart", "cart-success");
  };

  return (
    <div
      className="product-card"
      onClick={() => onView && onView(product)}
    >
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
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
          className={`add-to-cart-btn ${isInCart ? "added" : ""}`}
          onClick={handleAddToCart}
          disabled={isInCart}
        >
          {isInCart ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
