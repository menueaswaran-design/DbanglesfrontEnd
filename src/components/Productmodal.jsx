import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductModal.css";
import Navbar from "./Navbar";

function ProductModal() {
  const { productid } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("productsData"));
    if (!storedData) return;

    const allProducts = [
      ...(storedData.bangles || []),
      ...(storedData.dresses || [])
    ];

    const foundProduct = allProducts.find(
      (item) => String(item._id || item.id) === String(productid)
    );

    if (!foundProduct) return;

    setProduct(foundProduct);

    let related = allProducts.filter(
      (item) =>
        item.category === foundProduct.category &&
        String(item._id || item.id) !== String(productid)
    );

    if (related.length === 0) {
      related = allProducts.filter(
        (item) =>
          String(item._id || item.id) !== String(productid)
      );
    }

    setRelatedProducts(related.slice(0, 6));
  }, [productid]);

  if (!product) {
    return <div className="product-page product-not-found">Product not found</div>;
  }

  const discount = Math.round(
    ((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100
  );

  return (
    
    <div className="product-page">
        
      {/* MAIN PRODUCT SECTION */}
      <div className="product-container">
        <div className="product-image-section">
          <div className="image-wrapper">
            <img src={product.image} alt={product.name} />
            {discount > 0 && (
              <div className="discount-badge">-{discount}%</div>
            )}
          </div>
        </div>

        <div className="product-info-section">
          <p className="category">{product.category}</p>
          <h2>{product.name}</h2>

          <div className="product-price">
            <span className="discounted">₹{product.discountedPrice.toLocaleString()}</span>
            <span className="original">₹{product.originalPrice.toLocaleString()}</span>
          </div>

          <div className="price-info">
            <span className="save-amount">
              You save ₹{(product.originalPrice - product.discountedPrice).toLocaleString()}
            </span>
              <Navbar />
          </div>

          <p className="description">{product.description}</p>

          <div className="button-group">
            <button className="product-add-btn">Add to Cart</button>
            <button className="product-wishlist-btn">Buy Now</button>
          </div>

          
        </div>
      </div>

      {/* RELATED PRODUCTS SECTION */}
      {relatedProducts.length > 0 && (
        <div className="related-section">
          <h3>Related Products</h3>

          <div className="related-grid">
            {relatedProducts.map((item) => (
              <div
                key={item._id || item.id}
                className="related-card"
                onClick={() => navigate(`/product/${item._id || item.id}`)}
              >
                <div className="related-image-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <p className="related-name">{item.name}</p>
                <div className="related-price">
                  <span className="related-discounted">
                    ₹{item.discountedPrice.toLocaleString()}
                  </span>
                  <span className="related-original">
                    ₹{item.originalPrice.toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductModal;