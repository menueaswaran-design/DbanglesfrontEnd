import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function ContactUs() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Contact Us - DBangles</title>
        <meta name="description" content="Get in touch with DBangles. We're here to help with your orders, queries, and feedback." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">Contact Us</h1>
          <p className="policy-page-subtitle">We'd love to hear from you</p>
        </div>

        <div className="contact-grid">
          <div className="contact-card">
            <span className="contact-card-icon">📍</span>
            <h3>Our Address</h3>
            <p>DBangles</p>
            <p>Door No. 1/2, Main Street</p>
            <p>Chennai, Tamil Nadu - 600001</p>
            <p>India</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon">✉️</span>
            <h3>Email Us</h3>
            <p><a href="mailto:support@dbangles.in">support@dbangles.in</a></p>
            <p>We typically respond within 24 hours</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon">📞</span>
            <h3>Call Us</h3>
            <p><a href="tel:+919876543210">+91 98765 43210</a></p>
            <p>Mon - Sat: 10:00 AM - 7:00 PM IST</p>
          </div>
          <div className="contact-card">
            <span className="contact-card-icon">🕐</span>
            <h3>Business Hours</h3>
            <p>Monday - Saturday</p>
            <p>10:00 AM - 7:00 PM IST</p>
            <p>Sunday: Closed</p>
          </div>
        </div>

        <div className="policy-card">
          <h2>Get In Touch</h2>
          <p>
            If you have any questions about our products, orders, or services, please don't hesitate to reach out. 
            Our customer support team is available to assist you with:
          </p>
          <ul>
            <li>Order related queries and tracking</li>
            <li>Product information and availability</li>
            <li>Payment and billing issues</li>
            <li>Returns and refund requests</li>
            <li>Bulk or wholesale inquiries</li>
            <li>General feedback and suggestions</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>Registered Business Details</h2>
          <p><strong>Business Name:</strong> DBangles</p>
          <p><strong>Registered Address:</strong> Door No. 1/2, Main Street, Chennai, Tamil Nadu - 600001, India</p>
          <p><strong>Email:</strong> support@dbangles.in</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
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

export default ContactUs;
