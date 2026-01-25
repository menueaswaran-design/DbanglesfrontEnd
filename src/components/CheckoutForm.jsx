import React, { useState } from "react";
import { X } from "lucide-react";
import "../styles/Checkoutform.css";
import Payment from "./Payment.jsx";
const CheckoutForm = ({ showCheckout, onClose, cartItems }) => {
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

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.customerName ||
      !form.phoneNumber ||
      !form.whatsappNumber ||
      !form.deliveryAddress ||
      !form.landmark ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        ...form,
        orderedProducts: cartItems.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discountedPrice,
        })),
      };

      const res = await fetch("https://dbangles.vercel.app/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // ✅ Only open scanner if order is successful
        setOpenscanner(true);
      } else {
        alert(data.error || "Failed to place order");
        setOpenscanner(false);
      }
    } catch (error) {
      console.error(error);
      alert("Failed to place order. Please try again.");
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

          <div className="form-grid">
            {/* LEFT */}
            <div className="form-col">
              <div className="input-group">
                <label>Customer Name *</label>
                <input
                  name="customerName"
                  placeholder="Enter your name"
                  value={form.customerName}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  name="phoneNumber"
                  placeholder="10-digit number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>WhatsApp Number *</label>
                <input
                  type="tel"
                  name="whatsappNumber"
                  placeholder="WhatsApp number"
                  value={form.whatsappNumber}
                  onChange={handleChange}
                />
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
              </div>
            </div>

            {/* RIGHT */}
            <div className="form-col">
              <div className="input-group">
                <label>Landmark</label>
                <input
                  name="landmark"
                  placeholder="Nearby landmark"
                  value={form.landmark}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>City *</label>
                <input
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                />
              </div>

              <div className="input-group">
                <label>Pincode *</label>
                <input
                  type="number"
                  name="pincode"
                  placeholder="Pincode"
                  value={form.pincode}
                  onChange={handleChange}
                />
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
      </div>
    </div>
  );
};

export default CheckoutForm;
