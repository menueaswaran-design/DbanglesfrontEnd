import React, { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import scanner from "../assets/scanner.jpeg";
import "../styles/payment.css";

function Payment({ phoneNumber }) {
  const { cart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState(phoneNumber || "");

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Please login to access payment");
      navigate("/cart");
    }
  }, [isAuthenticated, navigate]);

  const getOrderId = async () => {
    if (!phone) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setOrderId("");

    try {
      // Collect product IDs from cart
      const productIds = cart.map(item => item.id);

      const response = await fetch(
        `https://dbangles.vercel.app/api/orders/${phone}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ productIds })
        }
      );

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      setOrderId(data.id); // token / orderId
    } catch (err) {
      console.error("Failed to fetch order:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (phoneNumber) {
      getOrderId();
    }
    // eslint-disable-next-line
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(orderId);
    alert("Order ID copied ✅ Paste it in payment notes");
  };

  const handleUpiCopy = () => {
    navigator.clipboard.writeText("9384957824@pthdfc");
    alert("UPI ID copied ✅");
  };

  return (
    <div className="payment-wrapper">
      <h2 className="payment-title">Complete Your Payment</h2>

      <p className="payment-subtitle">
        Scan the QR code below using Google Pay / PhonePe / UPI
      </p>

      <div className="scanner-box">
        <img src={scanner} alt="Scanner" className="scanner-image" />
        <div className="upi-row">
          <a href="upi://pay?pa=9384957824@pthdfc" className="upi-id">
            9384957824@pthdfc
          </a>
          <button onClick={handleUpiCopy} className="copy-btn">
            Copy
          </button>
        </div>
      </div>

      <div className="order-box">
        <p className="order-label">Your Order ID</p>

        {loading && (
          <div className="order-id-row">
            <div className="payment-skeleton-id shimmer-payment"></div>
            <div className="payment-skeleton-btn shimmer-payment"></div>
          </div>
        )}

        {!loading && orderId && (
          <div className="order-id-row">
            <span className="order-id">{orderId}</span>
            <button onClick={handleCopy} className="copy-btn">
              Copy
            </button>
          </div>
        )}

        {!loading && error && (
          <div className="phone-input-box">
            <input
              type="tel"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="phone-input"
            />
            <button onClick={getOrderId} className="getid-btn">
              Get ID
            </button>
          </div>
        )}

        <p className="note-text">
          ⚠️ Paste this Order ID in the payment note section
        </p>
      </div>

      <p className="after-text">
        After payment, our team will verify and confirm your order.
      </p>
    </div>
  );
}

export default Payment;
