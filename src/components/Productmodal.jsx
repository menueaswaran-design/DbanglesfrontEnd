import React, { useEffect, useState } from "react";
import { Share2 } from "lucide-react";
import { useCart } from "./CartContext";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductModal.css";
import WhatsappFloatingButton from "./WhatsappFloatingButton";
import Navbar from "./Navbar";

function ProductModal() {
  const { productid } = useParams();
  const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, cart } = useCart();
  const [cartMessage, setCartMessage] = useState("");
  
  const bangleSizes = ["2.2", "2.4", "2.6", "2.8", "2.10"];
  const [selectedSize, setSelectedSize] = useState("2.6");

  const fetchproductbyId = async () => {
    setLoading(true); 
    try {
      const response = await fetch(`https://dbangles.vercel.app/api/products/${productid}`);
      if (!response.ok) throw new Error("Failed to fetch product");
      const data = await response.json();
      setProduct(data.product);
      // Fetch related after product is found
      fetchRelatedProducts();
      setLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setLoading(false);
    }
  };

  const handleShare = async () => {
    if (!product) return;
    const shareTitle = `DBangles | ${product.name}`;
    const shareText = `Discover "${product.name}" for just ₹${product.discountedPrice} \n\n${product.description}\n\nShop now at DBangles!`;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        console.log("Sharing failed", error);
      }
    } else {
      // Fallback: copy link to clipboard
      try {
        await navigator.clipboard.writeText(`${shareTitle}\n${shareText}\n${shareUrl}`);
        alert("Share link copied to clipboard!");
      } catch {
        alert("Sharing not supported on this browser");
      }
    }
  };


  const fetchRelatedProducts = async () => {
    try {
      const response = await fetch(`https://dbangles.vercel.app/api/products`);
      if (!response.ok) throw new Error("Failed to fetch related products");
      const data = await response.json();
      let related = data.products.filter(
        (item) => String(item._id || item.id) !== String(productid)
      );
      setRelatedProducts(related.slice(0, 10));
    } catch (error) {
      console.error("Error fetching related products:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchproductbyId();
  }, [productid]);

  // FULL PAGE SHIMMER
  if (loading) {
    return (
      <div className="productmodal-page">
        <Navbar />
        <div className="productmodal-container shimmer-active">
          <div className="productmodal-image-section">
            <div className="productmodal-image-wrapper shimmer-box"></div>
          </div>
          <div className="productmodal-info-section">
            <div className="shimmer-line short"></div>
            <div className="shimmer-line long"></div>
            <div className="shimmer-line full" style={{height: '100px', margin: '20px 0'}}></div>
            <div className="shimmer-line medium"></div>
            <div className="productmodal-button-group">
              <div className="shimmer-btn"></div>
              <div className="shimmer-btn"></div>
            </div>
          </div>
        </div>
        <div className="productmodal-related-section">
          <div className="shimmer-line short"></div>
          <div className="productmodal-related-grid">
            {[1,2,3,4].map(i => (
              <div key={i} className="productmodal-related-card">
                <div className="productmodal-rel-img-wrapper shimmer-box"></div>
                <div className="shimmer-line long"></div>
                <div className="shimmer-line short"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const discount = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

  return (
    <div className="productmodal-page">
      <Navbar />
       <WhatsappFloatingButton />
      <div className="productmodal-container">

        <div className="productmodal-image-section">
          <div className="productmodal-image-wrapper" style={{ position: "relative" }}>
            <img src={product.image} alt={product.name} />
            <button onClick={handleShare} className="share-icon-btn">
              <Share2 size={22} />
            </button>
          </div>
        </div>

        <div className="productmodal-info-section">
          <p className="productmodal-category">{product.category}</p>
        {/* Share button moved to image top right */}

          <h2 className="productmodal-title">{product.name}</h2>
          <div className="productmodal-description-box">
            <p className="productmodal-description-text">
              {product.description && product.description.split(/(\n+)/).map((part, idx) => {
                if (/^\n+$/.test(part)) {
                  // Render a <br /> for each newline character
                  return Array.from({ length: part.length }, (_, i) => <br key={"br-"+idx+"-"+i} />);
                }
                return part;
              })}
            </p>
          </div>

          {/* Size Selection for Bangles */}
          {product.category?.toLowerCase().includes('bangle') && (
            <div className="productmodal-size-section">
              <p className="size-label">Select Size:</p>
              <div className="size-options">
                {bangleSizes.map((size) => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="productmodal-price-row">
            <span className="productmodal-discounted">₹{product.discountedPrice}</span>
            <span className="productmodal-original">₹{product.originalPrice}</span>
            {discount > 0 && <span className="productmodal-percent">{discount}% OFF</span>}
          </div>

          <p className="productmodal-save-text">Inclusive of all taxes. You save ₹{product.originalPrice - product.discountedPrice}</p>

          <div className="productmodal-note-box">
            <p className="productmodal-note-text">
              <strong>NOTE:</strong> The bangles we will start to make only after the payment. If any mistake in our side the amount is refund to you. If any queries WhatsApp or Instagram DM. We will reach out to you incase any clarification. Customization available.
            </p>
          </div>

          <div className="productmodal-button-group">
            <button 
              className="productmodal-add-btn" 
              disabled={cart.some(item => item.id === product.id)}
              onClick={() => {
                if (cart.some(item => item.id === product.id)) {
                  setCartMessage("Already in cart");
                } else {
                  addToCart({ ...product, selectedSize });
                  setCartMessage("Added to cart");
                }
                setTimeout(() => setCartMessage(""), 2000);
              }}
            >
              {cart.some(item => item.id === product.id) ? "In Cart" : "Add to Cart"}
            </button>
            <button onClick={() => { navigate('/cart', { state: { product: { ...product, selectedSize } } })}} className="productmodal-buy-btn">Buy Now</button>
          </div>
          {cartMessage && <p className="productmodal-cart-feedback">{cartMessage}</p>}
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="productmodal-related-section">
          <h3 className="productmodal-related-heading">Related Products</h3>
          <div className="productmodal-related-grid">
            {relatedProducts.map((item) => (
              <div key={item._id || item.id} className="productmodal-related-card" onClick={() => navigate(`/product/${item._id || item.id}`)}>
                <div className="productmodal-rel-img-wrapper">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="productmodal-rel-info">
                   <p className="productmodal-rel-name">{item.name}</p>
                   <div className="productmodal-rel-price">
                    <span className="productmodal-rel-disc">₹{item.discountedPrice}</span>
                    <span className="productmodal-rel-orig">₹{item.originalPrice}</span>
                  </div>
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