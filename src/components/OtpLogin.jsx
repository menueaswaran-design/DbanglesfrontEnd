// import React, { useState } from "react";
// import { auth } from "../firebase";
// import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// const OtpLogin = () => {
//   const [phone, setPhone] = useState("");
//   const [otp, setOtp] = useState("");
//   const [confirmationResult, setConfirmationResult] = useState(null);

//   // 🔹 Setup Recaptcha
//  const setupRecaptcha = () => {
//   if (!window.recaptchaVerifier) {
//     window.recaptchaVerifier = new RecaptchaVerifier(
//       auth, // 🔥 auth MUST be first
//       "recaptcha-container",
//       {
//         size: "invisible",
//         callback: () => {
//           console.log("Recaptcha verified");
//         },
//       }
//     );
//   }
// };


//   // 🔹 Send OTP
//   const sendOtp = async () => {
//     if (!phone) return alert("Enter phone number");

//     try {
//       setupRecaptcha();
//       const appVerifier = window.recaptchaVerifier;

//       const result = await signInWithPhoneNumber(auth, phone, appVerifier);
//       setConfirmationResult(result);
//       alert("OTP Sent!");
//     } catch (error) {
//       console.error(error);
//       alert(error.message);
//     }
//   };

//   // 🔹 Verify OTP
//   const verifyOtp = async () => {
//     if (!otp) return alert("Enter OTP");

//     try {
//       const result = await confirmationResult.confirm(otp);
//       console.log("User:", result.user);
//       alert("Login Successful!");
//     } catch (error) {
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div>
//       <h2>Phone OTP Login</h2>

//       <input
//         type="tel"
//         placeholder="+919876543210"
//         value={phone}
//         onChange={(e) => setPhone(e.target.value)}
//       />

//       <button onClick={sendOtp}>Send OTP</button>

//       <br /><br />

//       <input
//         type="text"
//         placeholder="Enter OTP"
//         value={otp}
//         onChange={(e) => setOtp(e.target.value)}
//       />

//       <button onClick={verifyOtp}>Verify OTP</button>

//       {/* 🔹 Required Recaptcha Div */}
//       <div id="recaptcha-container"></div>
//     </div>
//   );
// };

// export default OtpLogin;
