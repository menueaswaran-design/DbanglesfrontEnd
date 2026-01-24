import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
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

      const res = await fetch("https://dbangles.vercel.app/api/orders", {
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
    <div style={styles.container}>
      <Navbar/>
      <div style={styles.navbar} />

      {/* MAIN CONTENT */}
      <div style={{ ...styles.mainContent, filter: showCheckout ? "blur(4px)" : "none" }}>
        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🛒</div>
            <h3 style={styles.emptyTitle}>Your cart is empty</h3>
            <p style={styles.emptyText}>Add some products to get started</p>
          </div>
        ) : (
          <>
            {/* TITLE */}
            <h2 style={styles.pageTitle}>Shopping Cart</h2>

            {/* CART ITEMS */}
            <div style={styles.itemsList}>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} style={styles.itemImage} />
                  
                  <div style={styles.itemDetails}>
                    <h4 style={styles.itemName}>{item.name}</h4>
                    
                    <div style={styles.priceRow}>
                      <span style={styles.itemPrice}>₹{item.discountedPrice}</span>
                      <span style={styles.itemOriginal}>₹{Math.round(item.discountedPrice * 1.25)}</span>
                    </div>

                    <div style={styles.subtotalRow}>
                      Subtotal: <span style={styles.subtotalValue}>₹{item.discountedPrice * item.quantity}</span>
                    </div>
                  </div>

                  <div style={styles.itemControls}>
                    <div style={styles.qtyBox}>
                      <button style={styles.qtyBtnSmall} onClick={() => decreaseQty(item.id)}>−</button>
                      <span style={styles.qtyDisplay}>{item.quantity}</span>
                      <button style={styles.qtyBtnSmall} onClick={() => increaseQty(item.id)}>+</button>
                    </div>
                    <button style={styles.removeIconBtn} onClick={() => removeItem(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div style={styles.summarySection}>
              <h3 style={styles.summaryTitle}>Order Summary</h3>

              {/* Items List in Summary */}
              <div style={styles.summaryItems}>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.summaryItem}>
                    <div style={styles.summaryItemName}>{item.name}</div>
                    <div style={styles.summaryItemPrice}>₹{item.discountedPrice * item.quantity}</div>
                  </div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div style={styles.pricingBreakdown}>
                <div style={styles.breakdownRow}>
                  <span>Subtotal</span>
                  <span>₹{totalPrice}</span>
                </div>
               
              </div>

              {/* Total */}
              <div style={styles.totalSection}>
                <span style={styles.totalLabel}>Total Amount</span>
                <span style={styles.totalPrice}>₹{totalPrice}</span>
              </div>

              {/* Checkout Button */}
              <button style={styles.checkoutBtn} onClick={() => setShowCheckout(true)}>
                Proceed to Checkout
              </button>

             
            </div>
          </>
        )}
      </div>

      {/* MODAL - ORIGINAL FORM UNCHANGED */}
      {showCheckout && (
        <div style={styles.modalOverlay} onClick={() => setShowCheckout(false)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button
              style={styles.closeBtn}
              onClick={() => setShowCheckout(false)}
              title="Close"
            >
              <X />
            </button>

            <h3 style={{ marginBottom: 18, color: "#764ba2", fontWeight: 700, fontSize: 22 }}>Delivery Details</h3>

            <div style={styles.formGrid} onSubmit={e => { e.preventDefault(); handleSubmit(); }}>
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
            </div>

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

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f8f9fa",
  },
  navbar: {
    height: "70px",
    background: "#fff",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  mainContent: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px 16px 40px",
    transition: "filter 0.3s ease",
  },
  emptyCart: {
    textAlign: "center",
    paddingTop: "80px",
  },
  emptyIcon: {
    fontSize: "64px",
    marginBottom: "20px",
  },
  emptyTitle: {
    color: "#333",
    fontSize: "20px",
    fontWeight: "600",
    margin: "0 0 8px 0",
  },
  emptyText: {
    color: "#999",
    fontSize: "14px",
    margin: 0,
  },
  pageTitle: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#000",
    margin: "0 0 24px 0",
  },
  itemsList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "32px",
  },
  cartItem: {
    background: "#fff",
    borderRadius: "14px",
    padding: "14px",
    display: "flex",
    gap: "12px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  itemImage: {
    width: "100px",
    height: "100px",
    borderRadius: "10px",
    objectFit: "cover",
    background: "#f0f0f0",
  },
  itemDetails: {
    flex: 1,
    minWidth: 0,
  },
  itemName: {
    fontSize: "15px",
    fontWeight: "700",
    color: "#000",
    margin: "0 0 8px 0",
    lineHeight: "1.3",
  },
  priceRow: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    marginBottom: "6px",
  },
  itemPrice: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#764ba2",
  },
  itemOriginal: {
    fontSize: "13px",
    color: "#bbb",
    textDecoration: "line-through",
  },
  subtotalRow: {
    fontSize: "12px",
    color: "#666",
  },
  subtotalValue: {
    fontWeight: "600",
    color: "#000",
  },
  itemControls: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
  },
  qtyBox: {
    display: "flex",
    alignItems: "center",
    background: "#f3f0fa",
    borderRadius: "8px",
    padding: "4px 8px",
    gap: "6px",
  },
  qtyBtnSmall: {
    width: "28px",
    height: "28px",
    border: "none",
    background: "#fff",
    color: "#764ba2",
    fontWeight: "700",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyDisplay: {
    width: "24px",
    textAlign: "center",
    fontWeight: "600",
    fontSize: "14px",
  },
  removeIconBtn: {
    width: "36px",
    height: "36px",
    border: "none",
    background: "#fbe9f7",
    color: "#d72660",
    borderRadius: "8px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },
  summarySection: {
    background: "#fff",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #e8e8e8",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  summaryTitle: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#000",
    margin: "0 0 16px 0",
  },
  summaryItems: {
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e8e8e8",
  },
  summaryItem: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    marginBottom: "8px",
  },
  summaryItemName: {
    color: "#666",
  },
  summaryItemPrice: {
    fontWeight: "600",
    color: "#000",
  },
  pricingBreakdown: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "16px",
    paddingBottom: "16px",
    borderBottom: "1px solid #e8e8e8",
  },
  breakdownRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "13px",
    color: "#666",
  },
  freeText: {
    color: "#16a34a",
    fontWeight: "600",
  },
  totalSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "2px solid #e8e8e8",
  },
  totalLabel: {
    fontSize: "16px",
    fontWeight: "700",
    color: "#000",
  },
  totalPrice: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#764ba2",
  },
  checkoutBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #764ba2, #667eea)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(118,75,162,0.2)",
    marginBottom: "12px",
  },
  trustMessage: {
    textAlign: "center",
    fontSize: "12px",
    color: "#999",
    margin: 0,
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
    padding: 0,
  },
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
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
};