import React, { useState, useEffect } from "react";
import scanner from "../assets/scanner.jpeg";
import "../styles/Payment.css";

function Payment({ phoneNumber }) {
  const [orderId, setOrderId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [phone, setPhone] = useState(phoneNumber || "");

  const getOrderId = async () => {
    if (!phone) {
      setError(true);
      return;
    }

    setLoading(true);
    setError(false);
    setOrderId("");

    try {
      const response = await fetch(
        `https://dbangles.vercel.app/api/orders/${phone}`
      );

      if (!response.ok) throw new Error("Failed");

      const data = await response.json();
      setOrderId(data.id); // token / orderId
    } catch (err) {
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

  return (
    <div className="payment-wrapper">
      <h2 className="payment-title">Complete Your Payment</h2>

      <p className="payment-subtitle">
        Scan the QR code below using Google Pay / PhonePe / UPI
      </p>

      <div className="scanner-box">
        <img src={scanner} alt="Scanner" className="scanner-image" />
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
