import React, { useState } from "react";
import { Trash2, X } from "lucide-react";
import Navbar from "./Navbar";
import CheckoutForm from "./CheckoutForm";
// ==================== NAVBAR (Placeholder) ====================


// ==================== CART COMPONENT ====================
const Cart = ({ cartItems, updateCart, onCheckout , showCheckout}) => {
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


  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalDiscounted = cartItems.reduce(
    (sum, item) => sum + item.discountedPrice * item.quantity,
    0
  );
  const totalDiscount = totalOriginal - totalDiscounted;
  const shipping = cartItems.length > 0 ? 50 : 0;
  const grandTotal = totalDiscounted + shipping;

  if (cartItems.length === 0) {
    return (
    
      <div className="empty-cart">
          <Navbar/>
        <div className="empty-icon">🛒</div>
        <h2 className="empty-title">Your cart is empty</h2>
        <p className="empty-text">Add some products to get started</p>
      </div>
    );
  }

  return (
    <>
     
    {!showCheckout && <Navbar />}

    {/* Cart Content - outside Navbar */}
    <div className="cart-container">
      <div className="items-list-section">
        <h1 className="page-title">Shopping Cart</h1>
        <div className="items-stack">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item-card">
              <img src={item.image} alt={item.name} className="item-img" />
              <div className="item-details">
                <h3 className="item-name">{item.name}</h3>
                <div className="price-row">
                  <span className="current-price">₹{item.discountedPrice}</span>
                  <span className="old-price">₹{item.originalPrice}</span>
                </div>
                <div className="subtotal-text">
                  Subtotal: <strong>₹{item.discountedPrice * item.quantity}</strong>
                </div>
              </div>
              <div className="item-actions">
                <div className="qty-controls">
                  <button onClick={() => decreaseQty(item.id)} className="qty-btn">−</button>
                  <span className="qty-num">{item.quantity}</span>
                  <button onClick={() => increaseQty(item.id)} className="qty-btn">+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="summary-section">
        <div className="summary-card">
          <h2 className="summary-title">Order Summary</h2>
          <div className="summary-line-items">
            {cartItems.map((item) => (
              <div key={item.id} className="summary-line">
                <span>{item.name} (x{item.quantity})</span>
                <span>
                  <span style={{ textDecoration: 'line-through', color: '#bbb', marginRight: 6 }}>
                    ₹{item.originalPrice * item.quantity}
                  </span>
                  <span style={{ color: '#0f766e', fontWeight: 600, fontSize: '15px' }}>
                    ₹{item.discountedPrice * item.quantity}
                  </span>
                </span>
              </div>
            ))}
          </div>
          <div className="total-divider">
            <div className="total-row">
              <span className="total-label">Original Total</span>
              <span className="total-value" style={{ textDecoration: 'line-through', color: '#bbb', fontSize: '15px' }}>₹{totalOriginal}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Discount</span>
              <span className="total-value" style={{ color: '#ef4444', fontSize: '15px' }}>-₹{totalDiscount}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Subtotal</span>
              <span className="total-value" style={{ fontSize: '15px' }}>₹{totalDiscounted}</span>
            </div>
            <div className="total-row">
              <span className="total-label">Shipping</span>
              <span className="total-value" style={{ fontSize: '15px' }}>₹{shipping}</span>
            </div>
            <div className="total-row" style={{ fontWeight: 700, fontSize: '16px', borderTop: '2px solid #eee', marginTop: 10, paddingTop: 10 }}>
              <span className="total-label">Grand Total</span>
              <span className="total-value" style={{ color: '#0f766e', fontSize: '17px' }}>₹{grandTotal}</span>
            </div>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
    </>
  );
};
// const CheckoutForm = ({ showCheckout, onClose, cartItems, onSuccess }) => {
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [form, setForm] = useState({
//     customerName: "",
//     phoneNumber: "",
//     whatsappNumber: "",
//     deliveryAddress: "",
//     landmark: "",
//     city: "",
//     pincode: "",
//     orderMessage: "",
//   });


//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async () => {
//     if (!form.customerName || !form.phoneNumber || !form.whatsappNumber || !form.deliveryAddress) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setIsSubmitting(true);
//     try {
//       const orderPayload = {
//         ...form,
//         orderedProducts: cartItems.map((item) => ({
//           id: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.discountedPrice,
//         })),
//       };

//       const res = await fetch("https://dbangles.vercel.app/api/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(orderPayload),
//       });

//       const data = await res.json();
//       if (data.success) {
//         onSuccess();
//         alert("Order placed successfully 🎉");
//       } else {
//         alert(data.error || "Failed to place order");
//       }
//     } catch (error) {
//       alert("Failed to place order. Please try again.");
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!showCheckout) return null;

//   return (
//     <div className="modal-overlay" onClick={onClose}>
//       <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//         <button className="modal-close" onClick={onClose}><X size={24} /></button>
//         <h2 className="modal-title">Delivery Details</h2>
//         <div className="form-grid">
//           <div className="form-col">
//             <div className="input-group">
//               <label>Customer Name</label>
//               <input name="customerName" value={form.customerName} onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <label>Phone Number</label>
//               <input type="tel" name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
//             </div>
//             <div className="input-group">
//               <label>WhatsApp Number</label>
//               <input type="tel" name="whatsappNumber" value={form.whatsappNumber} onChange={handleChange} />
//             </div>
//           </div>
//           <div className="form-col">
//             <div className="input-group">
//               <label>Delivery Address</label>
//               <input name="deliveryAddress" value={form.deliveryAddress} onChange={handleChange} />
//             </div>
//             <div className="input-group">
//   <label>Landmark</label>
//   <input
//     name="landmark"
//     value={form.landmark}
//     onChange={handleChange}
//   />
// </div>

// <div className="input-group">
//   <label>City</label>
//   <input
//     name="city"
//     value={form.city}
//     onChange={handleChange}
//   />
// </div>

// <div className="input-group">
//   <label>Pincode</label>
//   <input
//     type="number"
//     name="pincode"
//     value={form.pincode}
//     onChange={handleChange}
//   />
// </div>

//             <div className="input-group">
//               <label>Order Message (optional)</label>
//               <textarea rows={2} name="orderMessage" value={form.orderMessage} onChange={handleChange} />
//             </div>
//           </div>
//         </div>
//         <button 
//           className="confirm-btn" 
//           disabled={isSubmitting} 
//           onClick={handleSubmit}
//         >
//           {isSubmitting ? "Processing..." : "Confirm Order"}
//         </button>
//       </div>
//     </div>
//   );
// };


export default function CombinedCartCheckout() {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [showCheckout, setShowCheckout] = useState(false);

  const updateCart = (items) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
  };

  const handleOrderSuccess = () => {
    setCartItems([]);
    localStorage.removeItem("cart");
    setShowCheckout(false);
  };

  return (
    <div className="app-shell">
      
      
      <main className="main-view">
        <Cart
          cartItems={cartItems}
          updateCart={updateCart}
          onCheckout={() => setShowCheckout(true)}
          showCheckout={showCheckout}
        />
      </main>

      <CheckoutForm
        showCheckout={showCheckout}
        onClose={() => setShowCheckout(false)}
        cartItems={cartItems}
        onSuccess={handleOrderSuccess}
      />

      <style>{`
        .app-shell { min-height: 100vh; background: #f8f9fa; font-family: sans-serif; }
        .nav-container { height: 70px; background: #fff; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .main-view { padding: 20px 0; }

        /* Cart Layout */
        .cart-container {
          display: flex;
          gap: 24px;
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 16px;
        }
        .items-list-section { flex: 1; }
        .summary-section { width: 350px; margin-top: 120px; }

        /* Mobile specific layout logic */
        @media (max-width: 768px) {
          .cart-container {
            flex-direction: column !important; /* Forces vertical stack */
          }
          .items-list-section { order: 1; width: 100%; }
          .summary-section { order: 2; width: 100%; margin-top: 20px; }
          .summary-card { position: static !important; } /* Disable sticky on mobile */
        }

        /* Cart Items */
        .page-title { fontSize: 20px; font-weight: 600; margin-Top: 55px;  margin-bottom: 20px; }
        .items-stack { display: flex; flex-direction: column; gap: 12px; }
        .cart-item-card { 
          background: #fff; border-radius: 14px; padding: 14px; 
          display: flex; gap: 12px; border: 1px solid #e8e8e8; 
        }
        .item-img { width: 100px; height: 100px; border-radius: 10px; object-fit: cover; background: #f0f0f0; }
        .item-details { flex: 1; }
        .item-name { font-size: 15px; font-weight: 700; margin: 0 0 8px 0; }
        .current-price { color: #0f766e; font-weight: 700; font-size: 16px; margin-right: 8px; }
        .old-price { color: #bbb; text-decoration: line-through; font-size: 13px; }
        
        /* Controls */
        .item-actions { display: flex; flex-direction: column; align-items: center; gap: 8px; }
        .qty-controls { display: flex; align-items: center; background: #f3f0fa; padding: 4px; border-radius: 8px; }
        .qty-btn { width: 28px; height: 28px; border: none; background: #fff; border-radius: 6px; cursor: pointer; font-weight: bold; }
        .qty-num { width: 30px; text-align: center; font-weight: 600; }
        .remove-btn { border: none; background: #fbe9f7; color: #0f766e; padding: 8px; border-radius: 8px; cursor: pointer; }

        /* Summary Card */
        .summary-card { 
          position: sticky; top: 90px; background: #fff; 
          padding: 20px; border-radius: 16px; border: 1px solid #e8e8e8; 
        }
        .summary-line { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: #666; }
        .total-divider { border-top: 2px solid #eee; margin-top: 15px; padding-top: 15px; }
        .total-row { display: flex; justify-content: space-between; align-items: center; }
        .total-value { font-size: 22px; font-weight: 700; color: #0f766e; }
        .checkout-btn { 
          width: 100%; margin-top: 20px;  margin-bottom: 20px; padding: 14px; border: none; border-radius: 10px;
          background: linear-gradient(135deg, #0f766e, #2dd4bf); color: #fff; font-weight: 700; cursor: pointer;
        }

        /* Empty Cart Centering */
        .empty-cart {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 60vh;
        }

       .modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 12px;
}

.modal-content {
  background: #fff;
  padding: 24px;
  border-radius: 12px;
  width: 100%;
  max-width: 800px;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.modal-close {
  position: absolute;
  top: 14px;
  right: 14px;
  border: none;
  background: none;
  cursor: pointer;
}

.form-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.form-col {
  flex: 1 1 260px;
}

.input-group {
  margin-bottom: 14px;
}

.input-group label {
  display: block;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 5px;
}

.input-group input,
.input-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
}

.input-group input:focus,
.input-group textarea:focus {
  outline: none;
  border-color: #ffffff;
}

.confirm-btn {
  width: 100%;
  padding: 14px;
  background: #0f766e;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
}

.confirm-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

      `}</style>
    </div>
  );
}