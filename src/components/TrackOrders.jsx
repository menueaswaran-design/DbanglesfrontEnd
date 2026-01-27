import React, { useState, useEffect } from "react";
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
      const response = await fetch(`http://localhost:3000/api/orders?userId=${userId}`);
      
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
                  {/* First Product Name */}
                  {order.orderedProducts && order.orderedProducts.length > 0 && (
                    <h3 className="order-product-name">
                      {order.orderedProducts[0].name}
                      {order.orderedProducts.length > 1 && (
                        <span className="more-items"> +{order.orderedProducts.length - 1} more</span>
                      )}
                    </h3>
                  )}

                  {/* Status */}
                  <div className="order-status" style={{ color: getStatusColor(order.orderStatus) }}>
                    {getStatusIcon(order.orderStatus)}
                    <span>{order.orderStatus || "Processing"}</span>
                  </div>

                  {/* Date */}
                  <div className="order-date">{formattedDate}</div>

                  {/* Expanded Details */}
                  {isExpanded && order.orderedProducts && order.orderedProducts.length > 1 && (
                    <div className="order-details-expanded">
                      <div className="other-products-list">
                        {order.orderedProducts.map((product, idx) => (
                          <div key={idx} className="product-detail-item">
                            <span className="product-name">{product.name}</span>
                            <span className="product-qty">Qty: {product.quantity}</span>
                            <span className="product-price">₹{product.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Show More Button - only if more than 1 product */}
                  {order.orderedProducts && order.orderedProducts.length > 1 && (
                    <button 
                      className="show-more-btn" 
                      onClick={() => toggleOrderDetails(orderId)}
                    >
                      {isExpanded ? "Show Less" : "Show More Details"}
                    </button>
                  )}
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
