import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import GoogleSignIn from "./OtpLogin";
import { X, Package, Clock, CheckCircle, Truck } from "lucide-react";
import WhatsappFloatingButton from "./WhatsappFloatingButton";
import "../styles/TrackOrders.css";

const TrackOrders = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    if (!isAuthenticated()) {
      setShowLoginModal(true);
      setLoading(false);
      return;
    }

    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const fetchOrders = async () => {
    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const userId = user.uid;
      const response = await fetch(`https://dbangles.vercel.app/api/orders?userId=${userId}`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch orders");
      }

      const data = await response.json();
      console.log("Orders API Response:", data);
      console.log("Raw orders data:", JSON.stringify(data, null, 2));
      
      // Handle different response structures
      if (data.success && data.orders) {
        console.log("First order sample:", data.orders[0]);
        setOrders(data.orders);
      } else if (Array.isArray(data)) {
        console.log("First order sample:", data[0]);
        setOrders(data);
      } else if (data.orders) {
        console.log("First order sample:", data.orders[0]);
        setOrders(data.orders);
      } else {
        console.log("No orders found in response");
        setOrders([]);
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError("Unable to load orders. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // The useEffect will automatically fetch orders when user state changes
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle size={20} color="#10b981" />;
      case "shipped":
      case "in transit":
        return <Truck size={20} color="#3b82f6" />;
      case "processing":
        return <Clock size={20} color="#f59e0b" />;
      default:
        return <Package size={20} color="#6b7280" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return "#10b981";
      case "shipped":
      case "in transit":
        return "#3b82f6";
      case "processing":
        return "#f59e0b";
      default:
        return "#6b7280";
    }
  };

  if (showLoginModal && !isAuthenticated()) {
    return (
      <>
        <Helmet>
          <title>Track Your Orders - DBangles | Order Status & Tracking</title>
          <meta 
            name="description" 
            content="Track your handmade bangles and designer dress orders. View order status, shipping details and delivery updates." 
          />
          <meta name="keywords" content="track order, order status, delivery tracking, DBangles orders" />
          <meta name="robots" content="noindex, nofollow" />
          <link rel="canonical" href="https://www.dbangles.in/track-orders" />
        </Helmet>
        <Navbar />
        <div className="track-orders-container">
          <div className="login-required-wrapper">
            <div className="login-required-content">
              <div className="login-icon">🔒</div>
              <h2 className="login-title">Login Required</h2>
              <p className="login-subtitle">Please sign in to view your orders</p>
              
              <div className="modal-overlay-inline">
                <div className="modal-content-inline">
                  <GoogleSignIn onSuccess={handleLoginSuccess} />
                </div>
              </div>

              <button 
                className="back-home-btn"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
        <WhatsappFloatingButton />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>My Orders - DBangles | Order History & Tracking</title>
        <meta 
          name="description" 
          content="View and track all your DBangles orders. Check order status, delivery updates and order history." 
        />
        <meta name="keywords" content="my orders, order history, track orders, DBangles" />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://www.dbangles.in/track-orders" />
      </Helmet>
      <Navbar />
      <div className="track-orders-container">
        <div className="track-orders-header">
          <h1 className="track-orders-title">
            <Package size={28} />
            My Orders
          </h1>
          <p className="track-orders-subtitle">Track and manage your orders</p>
        </div>

        {loading ? (
          <div className="orders-loading">
            <div className="loader-spinner"></div>
            <p>Loading your orders...</p>
          </div>
        ) : error ? (
          <div className="orders-error">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
            <button className="retry-btn" onClick={fetchOrders}>
              Retry
            </button>
          </div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <div className="empty-icon">📦</div>
            <h3>No Orders Yet</h3>
            <p>You haven't placed any orders yet</p>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => {
              const orderId = order.id || order._id;
              const isExpanded = expandedOrders[orderId];
              
              // Calculate total from orderedProducts if not provided
              const calculatedTotal = order.total || 
                (order.orderedProducts?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0);
              
              // Format date properly - Handle Firebase Timestamp
              let formattedDate = "N/A";
              if (order.createdAt) {
                try {
                  let dateObj;
                  // Check if it's a Firebase Timestamp object with seconds and nanoseconds
                  if (order.createdAt.seconds) {
                    dateObj = new Date(order.createdAt.seconds * 1000);
                  } 
                  // Check if it has _seconds (alternative format)
                  else if (order.createdAt._seconds) {
                    dateObj = new Date(order.createdAt._seconds * 1000);
                  } 
                  // Check if it has toDate method (Firestore Timestamp)
                  else if (typeof order.createdAt.toDate === 'function') {
                    dateObj = order.createdAt.toDate();
                  } 
                  // Otherwise try to parse as regular date
                  else {
                    dateObj = new Date(order.createdAt);
                  }
                  
                  if (isNaN(dateObj.getTime())) {
                    formattedDate = "Invalid Date";
                  } else {
                    // Format as DD/MM/YYYY HH:MM (only numbers)
                    const day = String(dateObj.getDate()).padStart(2, '0');
                    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
                    const year = dateObj.getFullYear();
                    const hours = String(dateObj.getHours()).padStart(2, '0');
                    const minutes = String(dateObj.getMinutes()).padStart(2, '0');
                    formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
                  }
                } catch (err) {
                  console.error('Date parsing error:', err, order.createdAt);
                  formattedDate = "N/A";
                }
              }

              return (
                <div key={orderId} className="order-card">
                  {/* Card Top: Status + Date */}
                  <div className="order-card-top">
                    <div className="order-status-badge" style={{ background: getStatusColor(order.orderStatus) + '15', color: getStatusColor(order.orderStatus) }}>
                      {getStatusIcon(order.orderStatus)}
                      <span>{order.orderStatus || "Processing"}</span>
                    </div>
                    <span className="order-date">{formattedDate}</span>
                  </div>

                  {/* Product Items - always visible, clickable */}
                  {order.orderedProducts && order.orderedProducts.length > 0 && (
                    <div className="order-products-list">
                      {(isExpanded ? order.orderedProducts : order.orderedProducts.slice(0, 2)).map((product, idx) => (
                        <div
                          key={idx}
                          className="order-product-item"
                          onClick={() => navigate(`/product/${product.productId || product._id || product.id || ''}`)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && navigate(`/product/${product.productId || product._id || product.id || ''}`)}
                        >
                          {product.image && (
                            <div className="order-product-thumb">
                              <img src={product.image} alt={product.name} />
                            </div>
                          )}
                          <div className="order-product-info">
                            <span className="order-product-name">{product.name}</span>
                            <span className="order-product-qty">Qty: {product.quantity}</span>
                          </div>
                          <span className="order-product-price">₹{product.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Show More / Less toggle */}
                  {order.orderedProducts && order.orderedProducts.length > 2 && (
                    <button 
                      className="show-more-btn" 
                      onClick={() => toggleOrderDetails(orderId)}
                    >
                      {isExpanded ? "Show less" : `+${order.orderedProducts.length - 2} more item${order.orderedProducts.length - 2 > 1 ? 's' : ''}`}
                    </button>
                  )}

                  {/* Order Total */}
                  <div className="order-card-footer">
                    <span className="order-total-label">Total</span>
                    <span className="order-total-value">₹{calculatedTotal}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <WhatsappFloatingButton />
    </>
  );
};

export default TrackOrders;
