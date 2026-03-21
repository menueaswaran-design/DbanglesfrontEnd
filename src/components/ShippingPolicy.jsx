import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function ShippingPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Shipping & Delivery Policy - DBangles</title>
        <meta name="description" content="Read DBangles Shipping and Delivery Policy for shipping timelines, charges, and delivery details." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">Shipping & Delivery Policy</h1>
          <p className="policy-page-subtitle">Last updated: February 28, 2026</p>
        </div>

        <div className="policy-card">
          <h2>1. Overview</h2>
          <p>
            At DBangles, we strive to deliver your orders as quickly and safely as possible. This policy provides 
            detailed information about our shipping methods, delivery timelines, and charges.
          </p>
        </div>

        <div className="policy-card">
          <h2>2. Shipping Coverage</h2>
          <ul>
            <li>We currently ship across <strong>India</strong> (all states and union territories).</li>
            <li>We do not offer international shipping at this time.</li>
            <li>Some remote areas may have extended delivery timelines.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>3. Shipping Charges</h2>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Order Value</th>
                  <th>Shipping Charge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Above ₹499</td>
                  <td><strong>FREE</strong></td>
                </tr>
                <tr>
                  <td>Below ₹499</td>
                  <td>₹49 flat rate</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p><em>Note: Shipping charges are calculated at checkout and displayed before payment.</em></p>
        </div>

        <div className="policy-card">
          <h2>4. Delivery Timelines</h2>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Estimated Delivery</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Metro Cities (Chennai, Delhi, Mumbai, Bangalore, Kolkata, Hyderabad)</td>
                  <td>3-5 business days</td>
                </tr>
                <tr>
                  <td>Tier 2 & 3 Cities</td>
                  <td>5-7 business days</td>
                </tr>
                <tr>
                  <td>Remote / Rural Areas</td>
                  <td>7-10 business days</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            <em>Note: Delivery timelines are estimated and may vary due to unforeseen circumstances such as natural 
            disasters, strikes, or public holidays. Timelines are calculated from the date of order dispatch, 
            not the date of order placement.</em>
          </p>
        </div>

        <div className="policy-card">
          <h2>5. Order Processing</h2>
          <ul>
            <li>Orders are processed within <strong>1-2 business days</strong> after payment confirmation.</li>
            <li>Orders placed on weekends or public holidays will be processed on the next business day.</li>
            <li>Once your order is dispatched, you will receive a shipping confirmation email/SMS with a tracking number.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>6. Order Tracking</h2>
          <ul>
            <li>After dispatch, you will receive a tracking ID via email/SMS.</li>
            <li>You can track your order on our website at the <a href="/track-orders">Track Orders</a> page.</li>
            <li>You can also track directly on the courier partner's website using the tracking ID.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>7. Shipping Partners</h2>
          <p>
            We work with trusted courier and logistics partners to ensure safe and timely delivery of your orders. 
            Our shipping partners include India Post, Delhivery, BlueDart, and other reliable courier services 
            depending on your location.
          </p>
        </div>

        <div className="policy-card">
          <h2>8. Packaging</h2>
          <p>
            All products are carefully packaged to ensure they reach you in perfect condition. Fragile items like 
            glass bangles are given extra protective packaging. We use eco-friendly packaging materials wherever possible.
          </p>
        </div>

        <div className="policy-card">
          <h2>9. Failed Delivery</h2>
          <ul>
            <li>If delivery is unsuccessful due to incorrect address, unavailability of recipient, or refusal to accept, 
            the courier partner will attempt delivery up to <strong>2-3 times</strong>.</li>
            <li>After failed attempts, the package will be returned to us.</li>
            <li>Re-shipping charges may apply for re-delivery.</li>
            <li>Please ensure your delivery address and phone number are accurate at the time of placing the order.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>10. Damaged Products During Shipping</h2>
          <p>
            If you receive a product that is damaged during transit, please contact us within <strong>48 hours</strong> of 
            delivery with photos of the damaged product and packaging. We will arrange a replacement or full refund 
            as per our <a href="/refund-policy">Refund & Cancellation Policy</a>.
          </p>
        </div>

        <div className="policy-card">
          <h2>11. Contact Us</h2>
          <p>For any shipping-related queries, please contact us:</p>
          <p><strong>DBangles</strong></p>
          <p>Email: <a href="mailto:support@dbangles.in">support@dbangles.in</a></p>
          <p>Phone: <a href="tel:+919876543210">+91 98765 43210</a></p>
          <p>Address: Door No. 1/2, Main Street, Chennai, Tamil Nadu - 600001, India</p>
        </div>
      </div>

      <footer className="policy-footer">
        <div className="policy-footer-links">
          <a href="/about-us">About Us</a>
          <a href="/contact-us">Contact Us</a>
          <a href="/privacy-policy">Privacy Policy</a>
          <a href="/terms-and-conditions">Terms & Conditions</a>
          <a href="/refund-policy">Refund & Cancellation</a>
          <a href="/shipping-policy">Shipping & Delivery</a>
        </div>
        <p>&copy; 2026 DBangles - Handmade Elegance. All rights reserved.</p>
      </footer>
      <WhatsappFloatingButton />
    </>
  );
}

export default ShippingPolicy;
