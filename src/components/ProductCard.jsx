import React, { useState } from "react";
import { useCart } from "./CartContext";
import "../styles/ProductCard.css";

function ProductCard({ product, onView }) {
  const [message, setMessage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const { cart, addToCart } = useCart();

  const isBangle = product.productType === "bangles";
  const hasSizeVariants = isBangle && product.sizeVariants?.length > 0;

  // Initialize selectedSize when product loads
  React.useEffect(() => {
    if (hasSizeVariants && !selectedSize) {
      setSelectedSize(product.sizeVariants[0].size);
    }
  }, [product.id, hasSizeVariants]);

  // Calculate price based on selected size
  const getCurrentPrices = () => {
    if (!hasSizeVariants || !selectedSize) {
      return {
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice
      };
    }

    const variant = product.sizeVariants.find(v => v.size === selectedSize);
    if (!variant) {
      return {
        originalPrice: product.originalPrice,
        discountedPrice: product.discountedPrice
      };
    }

    return {
      originalPrice: variant.originalPrice || product.originalPrice,
      discountedPrice: variant.discountedPrice || product.discountedPrice
    };
  };

  const { originalPrice, discountedPrice } = getCurrentPrices();

  const isInCart = cart.some((item) => {
    if (hasSizeVariants) {
      return item.id === product.id && item.selectedSize === selectedSize;
    }
    return item.id === product.id;
  });

  const discount = Math.round(
    ((originalPrice - discountedPrice) / originalPrice) * 100
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

    const cartItem = {
      ...product,
      selectedSize: hasSizeVariants ? selectedSize : null,
      originalPrice,
      discountedPrice
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

        {hasSizeVariants && (
          <div className="size-selector">
            <label className="size-label">Size:</label>
            <div className="size-options">
              {product.sizeVariants.map((variant) => (
                <button
                  key={variant.size}
                  className={`size-option ${
                    selectedSize === variant.size ? "selected" : ""
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSize(variant.size);
                  }}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="product-price">
          <span className="discounted-price">
            ₹{discountedPrice}
          </span>
          <span className="original-price">
            ₹{originalPrice}
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
