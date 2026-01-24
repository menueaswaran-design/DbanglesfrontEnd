// import React, { useEffect, useState } from "react";
// import { ShoppingBag, User, Phone, MessageCircle, Calendar, MapPin, FileText, Check } from "lucide-react";
// import Navbar from "./Navbar";
// export default function OrderForm() {
//   const [products, setProducts] = useState([]);
//   const [form, setForm] = useState({
//     customerName: "",
//     phoneNumber: "",
//     whatsappNumber: "",
//     deliveryAddress: "",
//     neededDate: "",
//     orderMessage: ""
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     const cart = [
//       { name: "Premium Cotton T-Shirt", quantity: 2, discountedPrice: 799 },
//       { name: "Denim Jacket", quantity: 1, discountedPrice: 2499 }
//     ];
//     setProducts(cart);
//   }, []);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const totalPrice = products.reduce(
//     (sum, p) => sum + p.discountedPrice * p.quantity,
//     0
//   );

//   const handleSubmit = () => {
//     if (!form.customerName || !form.phoneNumber || !form.whatsappNumber || 
//         !form.deliveryAddress || !form.neededDate) {
//       alert("Please fill in all required fields");
//       return;
//     }

//     setIsSubmitting(true);

//     const order = {
//       orderId: "ORD" + Date.now(),
//       orderPlacedDate: new Date().toISOString().split("T")[0],
//       orderStatus: "Placed",
//       ...form,
//       products: products.map(p => ({
//         productName: p.name,
//         quantity: p.quantity
//       }))
//     };

//     setTimeout(() => {
//       console.log("Order placed:", order);
//       alert("Order placed successfully! 🎉");
//       setIsSubmitting(false);
//     }, 1000);
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <Navbar />
      
//         {/* <div style={styles.header}>
//           <h1 style={styles.title}>Complete Your Order</h1>
//           <p style={styles.subtitle}>Fill in your delivery details to proceed</p>
//         </div> */}

//         <div style={styles.layout}>
          
//           {/* LEFT – FORM */}
//           <div style={styles.left}>
//             <div style={styles.sectionHeader}>
//               <div style={styles.iconWrapper}>
//                 <MapPin size={20} />
//               </div>
//               <h2 style={styles.sectionTitle}>Delivery Information</h2>
//             </div>

//             <div style={styles.formGrid}>
//               <Input 
//                 icon={<User size={18} />}
//                 label="Full Name" 
//                 name="customerName"
//                 value={form.customerName}
//                 placeholder="John Doe"
//                 onChange={handleChange} 
//               />
//               <Input 
//                 icon={<Phone size={18} />}
//                 label="Phone Number" 
//                 name="phoneNumber"
//                 value={form.phoneNumber}
//                 placeholder="+91 98765 43210"
//                 onChange={handleChange} 
//               />
//             </div>

//             <div style={styles.formGrid}>
//               <Input 
//                 icon={<MessageCircle size={18} />}
//                 label="WhatsApp Number" 
//                 name="whatsappNumber"
//                 value={form.whatsappNumber}
//                 placeholder="+91 98765 43210"
//                 onChange={handleChange} 
//               />
//               <Input 
//                 icon={<Calendar size={18} />}
//                 type="date" 
//                 label="Delivery Date" 
//                 name="neededDate"
//                 value={form.neededDate}
//                 onChange={handleChange} 
//               />
//             </div>

//             <Textarea
//               icon={<MapPin size={18} />}
//               label="Delivery Address"
//               name="deliveryAddress"
//               value={form.deliveryAddress}
//               placeholder="Enter your complete delivery address"
//               onChange={handleChange}
//             />

//             <Textarea
//               icon={<FileText size={18} />}
//               label="Special Instructions"
//               name="orderMessage"
//               value={form.orderMessage}
//               placeholder="Any special requests or notes (optional)"
//               onChange={handleChange}
//               optional
//             />
//           </div>

//           {/* RIGHT – SUMMARY */}
//           <div style={styles.right}>
//             <div style={styles.stickyContainer}>
//               <div style={styles.sectionHeader}>
//                 <div style={styles.iconWrapper}>
//                   <ShoppingBag size={20} />
//                 </div>
//                 <h3 style={styles.sectionTitle}>Order Summary</h3>
//               </div>

//               <div style={styles.summary}>
//                 {products.map((p, i) => (
//                   <div key={i} style={styles.product}>
//                     <div style={styles.productInfo}>
//                       <span style={styles.productName}>{p.name}</span>
//                       <span style={styles.productQty}>Qty: {p.quantity}</span>
//                     </div>
//                     <span style={styles.productPrice}>₹{p.discountedPrice * p.quantity}</span>
//                   </div>
//                 ))}
//               </div>

//               <div style={styles.divider}></div>

//               <div style={styles.priceBreakdown}>
//                 <div style={styles.priceRow}>
//                   <span>Subtotal</span>
//                   <span>₹{totalPrice}</span>
//                 </div>
//                 {/* <div style={styles.priceRow}>
//                   <span>Delivery</span>
//                   <span style={styles.freeText}>FREE</span>
//                 </div> */}
//               </div>

//               <div style={styles.divider}></div>

//               <div style={styles.total}>
//                 <span>Total Amount</span>
//                 <span style={styles.totalAmount}>₹{totalPrice}</span>
//               </div>

//               <button 
//                 onClick={handleSubmit}
//                 style={{
//                   ...styles.button,
//                   ...(isSubmitting ? styles.buttonSubmitting : {})
//                 }}
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? (
//                   <span>Processing...</span>
//                 ) : (
//                   <>
//                     <Check size={20} />
//                     <span>Confirm Order</span>
//                   </>
//                 )}
//               </button>

//               <div style={styles.secureNote}>
               
//                 <span style={styles.secureText}>Just place order No payment required through this platform</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------- Components ---------- */

// const Input = ({ label, icon, optional, ...props }) => (
//   <div style={styles.field}>
//     <label style={styles.label}>
//       {label}
//       {optional && <span style={styles.optional}> (optional)</span>}
//     </label>
//     <div style={styles.inputWrapper}>
//       {icon && <div style={styles.inputIcon}>{icon}</div>}
//       <input 
//         style={{...styles.input, ...(icon ? styles.inputWithIcon : {})}} 
//         {...props} 
//       />
//     </div>
//   </div>
// );

// const Textarea = ({ label, icon, optional, ...props }) => (
//   <div style={styles.field}>
//     <label style={styles.label}>
//       {label}
//       {optional && <span style={styles.optional}> (optional)</span>}
//     </label>
//     <div style={styles.inputWrapper}>
//       {icon && <div style={styles.textareaIcon}>{icon}</div>}
//       <textarea 
//         rows={3} 
//         style={{...styles.textarea, ...(icon ? styles.textareaWithIcon : {})}} 
//         {...props} 
//       />
//     </div>
//   </div>
// );

// /* ---------- Styles ---------- */

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "linear-gradient(135deg, #ffffff 0%, #ffffff 100%)",
//     padding: "80px 20px",
//     fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
//   },

//   container: {
//     maxWidth: 1200,
//     margin: "0 auto"
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: 10,
//     color: "#fff"
//   },

//   title: {
//     fontSize: 42,
//     fontWeight: 800,
//     marginBottom: 8,
//     letterSpacing: "-0.5px"
//   },

//   subtitle: {
//     fontSize: 18,
//     opacity: 0.9,
//     fontWeight: 400
//   },

//   layout: {
//     display: "grid",
//     gridTemplateColumns: "1.8fr 1fr",
//     gap: 30,
//     alignItems: "start"
//   },

//   left: {
//     background: "#fff",
//     padding: 32,
//     borderRadius: 24,
//     boxShadow: "0 20px 60px rgba(214, 214, 214, 0.15)"
//   },

//   right: {
//     position: "sticky",
//     top: 40
//   },

//   stickyContainer: {
//     background: "#fff",
//     padding: 28,
//     borderRadius: 24,
//     boxShadow: "0 20px 60px rgba(244, 244, 244, 0.15)"
//   },

//   sectionHeader: {
//     display: "flex",
//     alignItems: "center",
//     gap: 12,
//     marginBottom: 24
//   },

//   iconWrapper: {
//     width: 40,
//     height: 40,
//     borderRadius: 12,
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff"
//   },

//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 700,
//     color: "#1f2937",
//     margin: 0
//   },

//   formGrid: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: 20,
//     marginBottom: 20
//   },

//   field: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 8
//   },

//   label: {
//     fontSize: 14,
//     fontWeight: 600,
//     color: "#374151",
//     letterSpacing: "0.2px"
//   },

//   optional: {
//     fontSize: 13,
//     fontWeight: 400,
//     color: "#9ca3af",
//     fontStyle: "italic"
//   },

//   inputWrapper: {
//     position: "relative"
//   },

//   inputIcon: {
//     position: "absolute",
//     left: 14,
//     top: "50%",
//     transform: "translateY(-50%)",
//     color: "#9ca3af",
//     pointerEvents: "none"
//   },

//   textareaIcon: {
//     position: "absolute",
//     left: 14,
//     top: 14,
//     color: "#9ca3af",
//     pointerEvents: "none"
//   },

//   input: {
//     width: "100%",
//     padding: "12px 14px",
//     border: "2px solid #e5e7eb",
//     borderRadius: 12,
//     fontSize: 15,
//     transition: "all 0.2s",
//     outline: "none",
//     fontFamily: "inherit",
//     boxSizing: "border-box"
//   },

//   inputWithIcon: {
//     paddingLeft: 44
//   },

//   textarea: {
//     width: "100%",
//     padding: "12px 14px",
//     border: "2px solid #e5e7eb",
//     borderRadius: 12,
//     fontSize: 15,
//     transition: "all 0.2s",
//     outline: "none",
//     fontFamily: "inherit",
//     resize: "vertical",
//     boxSizing: "border-box"
//   },

//   textareaWithIcon: {
//     paddingLeft: 44
//   },

//   summary: {
//     marginBottom: 20
//   },

//   product: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "flex-start",
//     padding: "14px 0",
//     borderBottom: "1px solid #f3f4f6"
//   },

//   productInfo: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 4
//   },

//   productName: {
//     fontSize: 15,
//     fontWeight: 500,
//     color: "#1f2937"
//   },

//   productQty: {
//     fontSize: 13,
//     color: "#6b7280"
//   },

//   productPrice: {
//     fontSize: 15,
//     fontWeight: 600,
//     color: "#1f2937"
//   },

//   divider: {
//     height: 1,
//     background: "#e5e7eb",
//     margin: "16px 0"
//   },

//   priceBreakdown: {
//     display: "flex",
//     flexDirection: "column",
//     gap: 10,
//     marginBottom: 16
//   },

//   priceRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: 14,
//     color: "#6b7280"
//   },

//   freeText: {
//     color: "#10b981",
//     fontWeight: 600
//   },

//   total: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "16px 0",
//     fontSize: 16,
//     fontWeight: 600,
//     color: "#1f2937"
//   },

//   totalAmount: {
//     fontSize: 28,
//     fontWeight: 800,
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     WebkitBackgroundClip: "text",
//     WebkitTextFillColor: "transparent",
//     backgroundClip: "text"
//   },

//   button: {
//     width: "100%",
//     padding: 16,
//     background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//     color: "#fff",
//     border: "none",
//     borderRadius: 14,
//     fontSize: 16,
//     fontWeight: 700,
//     cursor: "pointer",
//     transition: "all 0.3s",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 8,
//     boxShadow: "0 10px 25px rgba(102, 126, 234, 0.3)"
//   },

//   buttonSubmitting: {
//     opacity: 0.7,
//     cursor: "not-allowed"
//   },

//   secureNote: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     gap: 6,
//     marginTop: 16,
//     padding: 12,
//     background: "#f9fafb",
//     borderRadius: 10
//   },

//   secureIcon: {
//     fontSize: 14
//   },

//   secureText: {
//     fontSize: 13,
//     color: "#6b7280",
//     fontWeight: 500
//   }
// };