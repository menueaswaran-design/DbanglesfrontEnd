import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/Checkoutform.css";
import Payment from "./Payment.jsx";

const CheckoutForm = ({ showCheckout, onClose, cartItems }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openscanner, setOpenscanner] = useState(false);
  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    whatsappNumber: "",
    deliveryAddress: "",
    landmark: "",
    city: "",
    pincode: "",
    orderMessage: "",
  });
  const [errors, setErrors] = useState({});

  // Check authentication on mount
  useEffect(() => {
    if (!isAuthenticated()) {
      alert("Please login to proceed with checkout");
      navigate("/cart");
      onClose();
    } else {
      // Debug: Log user info
      console.log('Current user:', user);
      console.log('User ID:', user?.uid);
      console.log('User email:', user?.email);
    }
  }, [isAuthenticated, navigate, onClose, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Only allow numbers for phone, whatsapp, pincode
    if (["phoneNumber", "whatsappNumber", "pincode"].includes(name)) {
      // Remove non-digits
      let newValue = value.replace(/\D/g, "");
      // Limit to 10 digits for phone/whatsapp
      if ((name === "phoneNumber" || name === "whatsappNumber") && newValue.length > 10) {
        newValue = newValue.slice(0, 10);
      }
      // Limit pincode to 6 digits (optional, can adjust)
      if (name === "pincode" && newValue.length > 6) {
        newValue = newValue.slice(0, 6);
      }
      setForm({ ...form, [name]: newValue });
    } else {
      setForm({ ...form, [name]: value });
    }
    // Clear error for this field on change
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async () => {
    // Validation
    const newErrors = {};
    if (!form.customerName) newErrors.customerName = "Name is required";
    if (!form.phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phoneNumber)) {
      newErrors.phoneNumber = "Enter a valid 10-digit number";
    }
    if (!form.whatsappNumber) {
      newErrors.whatsappNumber = "WhatsApp number is required";
    } else if (!/^\d{10}$/.test(form.whatsappNumber)) {
      newErrors.whatsappNumber = "Enter a valid 10-digit number";
    }
    if (!form.deliveryAddress) newErrors.deliveryAddress = "Address is required";
    if (!form.landmark) newErrors.landmark = "Landmark is required";
    if (!form.city) newErrors.city = "City is required";
    if (!form.pincode) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    // Final authentication check before submitting
    if (!isAuthenticated()) {
      alert("Session expired. Please login again.");
      navigate("/cart");
      onClose();
      return;
    }

    // Validate user.uid exists
    if (!user?.uid) {
      alert("User authentication error. Please login again.");
      navigate("/cart");
      onClose();
      return;
    }

    // Debug: log the payload being sent
    const orderPayload = {
      ...form,
      userId: user.uid,
      userEmail: user.email,
      orderedProducts: cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.discountedPrice,
      })),
    };
    console.log('Submitting order payload:', orderPayload);
    console.log('User ID being sent:', user.uid);
    console.log('User Email being sent:', user.email);

    setIsSubmitting(true);

    try {
      const API_URL = "https://dbangles.vercel.app/api/orders";
      
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();
      console.log('Order API response:', data);
      console.log('Response status:', res.status);

      if (res.ok && data.success) {
        console.log('✅ Order created successfully with ID:', data.orderId);
        setOpenscanner(true);
      } else {
        console.error('❌ Order creation failed:', data.error);
        setErrors({ submit: data.error || "Failed to place order" });
        setOpenscanner(false);
      }
    } catch (error) {
      console.error(error);
      setErrors({ submit: "Failed to place order. Please try again." });
      setOpenscanner(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!showCheckout) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        {openscanner ? (
          <Payment phoneNumber={form.phoneNumber} />
        ) : (
          <>
            <h2 className="modal-title">Delivery Details</h2>

            {user && (
              <div style={{ textAlign: 'center', marginBottom: '16px', padding: '8px', background: '#f0f9ff', borderRadius: '8px' }}>
                <small style={{ color: '#0369a1' }}>Logged in as: {user.email}</small>
              </div>
            )}

            <div className="form-grid">
              <div className="form-col">
                <div className="input-group">
                  <label>Customer Name *</label>
                  <input
                    name="customerName"
                    placeholder="Enter your name"
                    value={form.customerName}
                    onChange={handleChange}
                  />
                  {errors.customerName && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.customerName}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="10-digit number"
                    value={form.phoneNumber}
                    onChange={handleChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                  />
                  {errors.phoneNumber && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.phoneNumber}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>WhatsApp Number *</label>
                  <input
                    type="tel"
                    name="whatsappNumber"
                    placeholder="WhatsApp number"
                    value={form.whatsappNumber}
                    onChange={handleChange}
                    maxLength={10}
                    inputMode="numeric"
                    pattern="[0-9]{10}"
                  />
                  {errors.whatsappNumber && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.whatsappNumber}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>Delivery Address *</label>
                  <textarea
                    rows={3}
                    name="deliveryAddress"
                    placeholder="House / Street / Area"
                    value={form.deliveryAddress}
                    onChange={handleChange}
                  />
                  {errors.deliveryAddress && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.deliveryAddress}</div>
                  )}
                </div>
              </div>

              <div className="form-col">
                <div className="input-group">
                  <label>Landmark *</label>
                  <input
                    name="landmark"
                    placeholder="Nearby landmark"
                    value={form.landmark}
                    onChange={handleChange}
                  />
                  {errors.landmark && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.landmark}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>City *</label>
                  <input
                    name="city"
                    placeholder="City"
                    value={form.city}
                    onChange={handleChange}
                  />
                  {errors.city && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.city}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>Pincode *</label>
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    maxLength={6}
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                  />
                  {errors.pincode && (
                    <div style={{ color: "red", fontSize: 13 }}>{errors.pincode}</div>
                  )}
                </div>

                <div className="input-group">
                  <label>Order Message (optional)</label>
                  <textarea
                    rows={3}
                    name="orderMessage"
                    placeholder="Any special instructions"
                    value={form.orderMessage}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            {errors.submit && (
              <div style={{ color: "red", fontSize: 14, marginBottom: 8, textAlign: 'center' }}>{errors.submit}</div>
            )}
            
            <button
              className="confirm-btn"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckoutForm;
