import React, { useEffect, useState } from "react";
import { useCart } from "./CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductModal.css";
import Navbar from "./Navbar";
import Loader from "./Loader";

function ProductModal() {
  const { productid } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([])
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const [cartMessage, setCartMessage] = useState("");
  const fetchproductbyId = async () => {
    try {
      const response = await fetch(`https://dbangles.vercel.app/api/products/${productid}`);
      if (!response.ok) {
        throw new Error("Failed to fetch product");
      }
      const data = await response.json();
      setProduct(data.product);
      setLoading(false);
    //   let related = allProducts.filter(
    //   (item) =>
    //     item.category === product.category &&
    //     String(item._id || item.id) !== String(productid)
    // );

    // if (related.length === 0) {
    //   related = allProducts.filter(
    //     (item) =>
    //       String(item._id || item.id) !== String(productid)
    //   );
    // }

    // setRelatedProducts(related.slice(0, 6));
    } catch (error) {
      console.error("Error fetching product by ID:", error);
      return null;
    }
    
  };

  const fetchRelatedProducts = async (category) => {
    try {
      const response = await fetch(`https://dbangles.vercel.app/api/products`);
      if (!response.ok) {
        throw new Error("Failed to fetch related products");
      }
      const data = await response.json();
      let related = data.products.filter(
        (item) =>
          String(item._id || item.id) !== String(productid)
      );
      setRelatedProducts(related.slice(0, 6));
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
   fetchproductbyId()
   fetchRelatedProducts()
},[productid]);

    

    


  if (loading) {
      return (
        <>
        <Navbar/>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <Loader />
        </div></>
      );
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
            <button
              className="product-add-btn"
              onClick={() => {
                if (cart.some((item) => item.id === product.id)) {
                  setCartMessage("Already in cart");
                } else {
                  addToCart(product);
                  setCartMessage("Added to cart");
                }
                setTimeout(() => setCartMessage(""), 2000);
              }}
            >
              Add to Cart
            </button>
            {cartMessage && (
              <div style={{ color: cartMessage === "Added to cart" ? "green" : "red", marginTop: 8, fontWeight: 500 }}>
                {cartMessage}
              </div>
            )}
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