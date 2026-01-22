import React, { useState } from "react";
import {
  User,
  Phone,
  MessageCircle,
  Calendar,
  MapPin,
  FileText,
  Check,
  Trash2,
  X
} from "lucide-react";
import Navbar from "./Navbar";

export default function CombinedCartCheckout() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  const [showCheckout, setShowCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    phoneNumber: "",
    whatsappNumber: "",
    deliveryAddress: "",
    neededDate: "",
    orderMessage: "",
  });

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const increaseQty = (id) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    updateCart(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id) => {
    updateCart(cartItems.filter((item) => item.id !== id));
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (
      !form.customerName ||
      !form.phoneNumber ||
      !form.whatsappNumber ||
      !form.deliveryAddress
    ) {
      alert("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Prepare order data
      const orderPayload = {
        customerName: form.customerName,
        phoneNumber: form.phoneNumber,
        whatsappNumber: form.whatsappNumber,
        deliveryAddress: form.deliveryAddress,
        orderMessage: form.orderMessage,
        orderedProducts: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.discountedPrice
        })),
      };

      // Send to backend (adjust URL as needed)
      const res = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload),
      });
      const data = await res.json();
      if (data.success) {
        setCartItems([]);
        localStorage.removeItem("cart");
        setShowCheckout(false);
        alert("Order placed successfully 🎉");
      } else {
        alert(data.error || "Failed to place order");
      }
    } catch (error) {
      alert("Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f7f8fa" }}>
      <Navbar />

      {/* MAIN CONTENT */}
      <div
        style={{
          maxWidth: 480,
          margin: "90px auto 0 auto",
          padding: 16,
          filter: showCheckout ? "blur(4px)" : "none",
        }}
      >
        {cartItems.length === 0 ? (
          <h3 style={{ textAlign: "center", color: "#888", fontWeight: 500, marginTop: 48 }}>Your cart is empty 🛒</h3>
        ) : (
          <>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cardModern}>
                  <img src={item.image} style={styles.imageModern} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 16, color: "#222", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.name}</div>
                    <div style={{ color: "#764ba2", fontWeight: 500, fontSize: 15 }}>₹{item.discountedPrice}</div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button style={styles.qtyBtn} onClick={() => decreaseQty(item.id)}>-</button>
                    <span style={{ minWidth: 24, textAlign: "center", fontWeight: 500 }}>{item.quantity}</span>
                    <button style={styles.qtyBtn} onClick={() => increaseQty(item.id)}>+</button>
                  </div>
                  <button style={styles.removeBtn} onClick={() => removeItem(item.id)} title="Remove">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "24px 0 8px 0" }}>
              <span style={{ fontWeight: 600, fontSize: 18, color: "#222" }}>Total</span>
              <span style={{ fontWeight: 700, fontSize: 20, color: "#764ba2" }}>₹{totalPrice}</span>
            </div>

            <button
              style={styles.checkoutBtnModern}
              onClick={() => setShowCheckout(true)}
            >
              Checkout
            </button>
          </>
        )}
      </div>

      {/* MODAL */}
      {showCheckout && (
        <div style={styles.modalOverlay} onClick={() => setShowCheckout(false)}>
          <div
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={styles.closeBtn}
              onClick={() => setShowCheckout(false)}
              title="Close"
            >
              <X />
            </button>

            <h3 style={{ marginBottom: 18, color: "#764ba2", fontWeight: 700, fontSize: 22 }}>Delivery Details</h3>

            <form style={styles.formGrid} onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
              <div style={styles.formCol}>
                <Input label="Full Name" name="customerName" onChange={handleChange} />
                <Input label="Phone Number" name="phoneNumber" onChange={handleChange} />
                <Input label="WhatsApp Number" name="whatsappNumber" onChange={handleChange} />
               
              </div>
              <div style={styles.formCol}>
                <Textarea
                  label="Delivery Address"
                  name="deliveryAddress"
                  onChange={handleChange}
                />
                <Textarea
                  label="Order Message"
                  name="orderMessage"
                  optional
                  onChange={handleChange}
                />
              </div>
            </form>

            <button
              style={{
                ...styles.confirmBtn,
                background: "linear-gradient(135deg,#764ba2,#667eea)",
                opacity: isSubmitting ? 0.6 : 1,
                fontWeight: 600,
                fontSize: 16,
                marginTop: 8,
              }}
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* INPUT COMPONENTS */

const Input = ({ label, optional, ...props }) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label}
      {optional && " (optional)"}
    </label>
    <input style={styles.input} {...props} />
  </div>
);

const Textarea = ({ label, optional, ...props }) => (
  <div style={{ marginBottom: 12 }}>
    <label>
      {label}
      {optional && " (optional)"}
    </label>
    <textarea rows={3} style={styles.input} {...props} />
  </div>
);

/* STYLES */

const styles = {
    formGrid: {
      display: "flex",
      gap: 18,
      marginBottom: 8,
      flexWrap: "wrap",
    },
    formCol: {
      flex: 1,
      minWidth: 200,
      display: "flex",
      flexDirection: "column",
      gap: 10,
    },
  cardModern: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    background: "#fff",
    borderRadius: 14,
    boxShadow: "0 2px 12px 0 rgba(118,75,162,0.07)",
    padding: 12,
    marginBottom: 0,
    border: "1px solid #f0f0f0",
    transition: "box-shadow 0.2s",
  },

  imageModern: {
    width: 54,
    height: 54,
    objectFit: "cover",
    borderRadius: 10,
    boxShadow: "0 1px 4px 0 rgba(118,75,162,0.10)",
  },

  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    border: "none",
    background: "#f3f0fa",
    color: "#764ba2",
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    transition: "background 0.2s, color 0.2s",
    boxShadow: "0 1px 2px 0 rgba(118,75,162,0.06)",
    outline: "none",
  },

  removeBtn: {
    border: "none",
    background: "#fbe9f7",
    color: "#d72660",
    borderRadius: 8,
    width: 28,
    height: 28,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: 6,
    transition: "background 0.2s, color 0.2s",
  },

  checkoutBtnModern: {
    width: "100%",
    padding: 14,
    background: "linear-gradient(135deg,#764ba2,#667eea)",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontWeight: 700,
    fontSize: 17,
    marginTop: 18,
    cursor: "pointer",
    boxShadow: "0 2px 8px 0 rgba(118,75,162,0.10)",
    transition: "background 0.2s",
  },

  modalOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.35)",
    backdropFilter: "blur(4px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  },

  modal: {
    background: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "100%",
    maxWidth: 500,
    position: "relative",
  },

  closeBtn: {
    position: "absolute",
    top: 10,
    right: 10,
    border: "none",
    background: "none",
    cursor: "pointer",
  },

  input: {
    width: "100%",
    padding: 10,
    border: "1px solid #e5e7eb",
    borderRadius: 6,
  },

  confirmBtn: {
    width: "100%",
    padding: 14,
    marginTop: 10,
    background: "linear-gradient(135deg,#667eea,#764ba2)",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};
