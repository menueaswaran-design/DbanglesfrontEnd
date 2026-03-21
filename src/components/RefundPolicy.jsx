import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function RefundPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Refund & Cancellation Policy - DBangles</title>
        <meta name="description" content="Read DBangles Refund and Cancellation Policy for returns, exchanges, and refund procedures." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">Refund & Cancellation Policy</h1>
          <p className="policy-page-subtitle">Last updated: February 28, 2026</p>
        </div>

        <div className="policy-card">
          <h2>1. Overview</h2>
          <p>
            At DBangles, we want you to be completely satisfied with your purchase. This policy outlines the terms 
            and conditions for cancellations, returns, and refunds. Please read this policy carefully before making 
            a purchase.
          </p>
        </div>

        <div className="policy-card">
          <h2>2. Order Cancellation</h2>
          <h3>a) Cancellation by Customer</h3>
          <ul>
            <li>You may cancel your order <strong>within 24 hours</strong> of placing it, provided the order has not been shipped.</li>
            <li>To cancel an order, contact us immediately at <a href="mailto:support@dbangles.in">support@dbangles.in</a> or call <a href="tel:+919876543210">+91 98765 43210</a> with your order ID.</li>
            <li>If the order has already been shipped, cancellation is not possible. You may initiate a return after receiving the product.</li>
          </ul>
          <h3>b) Cancellation by DBangles</h3>
          <p>We reserve the right to cancel an order in the following cases:</p>
          <ul>
            <li>Product is out of stock or unavailable</li>
            <li>Pricing or product description error on the website</li>
            <li>Suspected fraudulent or unauthorized transaction</li>
            <li>Inability to verify payment or delivery information</li>
          </ul>
          <p>In such cases, a full refund will be initiated immediately.</p>
        </div>

        <div className="policy-card">
          <h2>3. Return Policy</h2>
          <h3>a) Eligibility for Returns</h3>
          <ul>
            <li>Returns are accepted within <strong>7 days</strong> of delivery.</li>
            <li>The product must be unused, unworn, and in its original packaging with all tags intact.</li>
            <li>Products that are damaged, altered, or washed after delivery are not eligible for return.</li>
          </ul>
          <h3>b) Non-Returnable Items</h3>
          <p>The following items are <strong>not eligible</strong> for return:</p>
          <ul>
            <li>Glass bangles (due to fragile nature)</li>
            <li>Customized or personalized products</li>
            <li>Products purchased during sale or clearance events (unless defective)</li>
            <li>Items with broken seals or missing tags</li>
          </ul>
          <h3>c) How to Initiate a Return</h3>
          <ol>
            <li>Contact our support team at <a href="mailto:support@dbangles.in">support@dbangles.in</a> with your order ID and reason for return.</li>
            <li>Share clear photos of the product showing the issue (if applicable).</li>
            <li>Our team will review your request and respond within <strong>48 hours</strong>.</li>
            <li>If approved, you will receive return shipping instructions.</li>
          </ol>
        </div>

        <div className="policy-card">
          <h2>4. Exchange Policy</h2>
          <ul>
            <li>Exchanges are subject to product availability.</li>
            <li>You may request an exchange for a different size or color (if available) within <strong>7 days</strong> of delivery.</li>
            <li>The product must be in its original condition with tags intact.</li>
            <li>If the exchanged product has a price difference, you will be charged or refunded the difference accordingly.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>5. Refund Policy</h2>
          <h3>a) Refund Eligibility</h3>
          <p>Refunds will be processed in the following cases:</p>
          <ul>
            <li>Order cancelled before shipment</li>
            <li>Product received is defective or damaged during transit</li>
            <li>Wrong product delivered</li>
            <li>Product significantly different from the description on the website</li>
            <li>Return approved by our team after inspection</li>
          </ul>
          <h3>b) Refund Process</h3>
          <ul>
            <li>Once we receive and inspect the returned product, we will notify you of the refund status via email.</li>
            <li>Approved refunds will be processed within <strong>5-7 business days</strong>.</li>
            <li>Refunds will be credited back to the <strong>original payment method</strong> used during purchase (via Razorpay).</li>
            <li>Bank processing times may add an additional 3-5 business days for the refund to reflect in your account.</li>
          </ul>
          <h3>c) Refund for Cancelled Orders</h3>
          <ul>
            <li>For orders cancelled before shipment, refund will be processed within <strong>3-5 business days</strong>.</li>
            <li>The refund will be credited to the original payment method.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>6. Damaged or Defective Products</h2>
          <ul>
            <li>If you receive a damaged or defective product, please contact us within <strong>48 hours</strong> of delivery.</li>
            <li>Provide your order ID along with clear photos/videos of the damaged product and packaging.</li>
            <li>We will arrange a replacement or full refund at no additional cost to you.</li>
            <li>Do not dispose of the damaged product or packaging until the claim is resolved.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>7. Late or Missing Refunds</h2>
          <p>If you haven't received your refund within the expected timeframe:</p>
          <ol>
            <li>Check your bank account or credit card statement again.</li>
            <li>Contact your bank or credit card company, as processing times may vary.</li>
            <li>If you've done all of this and still have not received your refund, please contact us at <a href="mailto:support@dbangles.in">support@dbangles.in</a>.</li>
          </ol>
        </div>

        <div className="policy-card">
          <h2>8. Shipping Costs for Returns</h2>
          <ul>
            <li>If the return is due to a defective, damaged, or wrong product, <strong>DBangles will bear the return shipping cost</strong>.</li>
            <li>If the return is initiated for any other reason (change of mind, etc.), the <strong>customer will bear the return shipping cost</strong>.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>9. Contact Us</h2>
          <p>For any questions or concerns about our Refund & Cancellation Policy, please contact us:</p>
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

export default RefundPolicy;
