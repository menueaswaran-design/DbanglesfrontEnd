import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>About Us - DBangles</title>
        <meta name="description" content="Learn about DBangles - your trusted destination for handmade bangles and designer dresses." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">About Us</h1>
          <p className="policy-page-subtitle">Handcrafted with Love & Tradition</p>
        </div>

        <div className="policy-card">
          <h2>Who We Are</h2>
          <p>
            <strong>DBangles</strong> is a trusted online destination for handmade bangles, designer dresses, sarees, 
            and traditional accessories. We are passionate about bringing the finest handcrafted jewelry and ethnic 
            wear to your doorstep, blending timeless tradition with modern elegance.
          </p>
          <p>
            Founded with the vision of making authentic handcrafted products accessible to everyone, DBangles works 
            directly with skilled artisans to deliver quality products at affordable prices.
          </p>
        </div>

        <div className="policy-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to preserve and promote traditional Indian craftsmanship by connecting artisans directly 
            with customers. We believe every piece of handmade jewelry and textile tells a story, and we strive to 
            bring that story to you with authenticity and care.
          </p>
        </div>

        <div className="policy-card">
          <h2>What We Offer</h2>
          <ul>
            <li><strong>Kundan Bangles:</strong> Exquisite handmade kundan bangles with intricate designs</li>
            <li><strong>Glass Bangles:</strong> Traditional glass bangles in vibrant colors and patterns</li>
            <li><strong>Hair Accessories:</strong> Beautiful hair accessories for every occasion</li>
            <li><strong>Invisible Chains:</strong> Elegant chains for a subtle and modern look</li>
            <li><strong>Bracelets:</strong> Handcrafted bracelets that blend tradition with contemporary style</li>
            <li><strong>Sarees:</strong> Designer sarees curated for every celebration</li>
            <li><strong>Unstitched Chudi Material:</strong> Premium quality unstitched materials for custom tailoring</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>Why Choose DBangles?</h2>
          <ul>
            <li><strong>100% Authentic:</strong> We source directly from artisans ensuring genuine handcrafted products</li>
            <li><strong>Quality Assurance:</strong> Every product goes through a quality check before dispatch</li>
            <li><strong>Affordable Pricing:</strong> Fair prices by eliminating middlemen</li>
            <li><strong>Secure Payments:</strong> Safe and secure payment options powered by Razorpay</li>
            <li><strong>Pan-India Delivery:</strong> We deliver across India with reliable shipping partners</li>
            <li><strong>Customer Support:</strong> Dedicated support team to assist you with orders and queries</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>Our Values</h2>
          <p>
            At DBangles, we believe in transparency, quality, and customer satisfaction. Every product we sell is 
            backed by our commitment to authenticity and craftsmanship. We are dedicated to providing a seamless 
            shopping experience from browsing to delivery.
          </p>
        </div>

        <div className="policy-card">
          <h2>Business Information</h2>
          <p><strong>Business Name:</strong> DBangles</p>
          <p><strong>Address:</strong> Door No. 1/2, Main Street, Chennai, Tamil Nadu - 600001, India</p>
          <p><strong>Email:</strong> <a href="mailto:support@dbangles.in">support@dbangles.in</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919876543210">+91 98765 43210</a></p>
          <p><strong>Website:</strong> <a href="https://www.dbangles.in" target="_blank" rel="noopener noreferrer">www.dbangles.in</a></p>
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

export default AboutUs;
