import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Privacy Policy - DBangles</title>
        <meta name="description" content="Read DBangles Privacy Policy to understand how we collect, use, and protect your personal information." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">Privacy Policy</h1>
          <p className="policy-page-subtitle">Last updated: February 28, 2026</p>
        </div>

        <div className="policy-card">
          <h2>1. Introduction</h2>
          <p>
            DBangles ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how 
            we collect, use, disclose, and safeguard your information when you visit our website 
            <a href="https://www.dbangles.in"> www.dbangles.in</a> and make purchases from our online store.
          </p>
          <p>
            By using our website, you consent to the practices described in this Privacy Policy. If you do not agree 
            with this policy, please do not use our website.
          </p>
        </div>

        <div className="policy-card">
          <h2>2. Information We Collect</h2>
          <h3>a) Personal Information</h3>
          <p>When you make a purchase or interact with our website, we may collect:</p>
          <ul>
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Shipping address and billing address</li>
            <li>Payment information (processed securely through Razorpay)</li>
            <li>Order history and preferences</li>
          </ul>
          <h3>b) Automatically Collected Information</h3>
          <p>We may automatically collect certain information when you visit our website:</p>
          <ul>
            <li>IP address</li>
            <li>Browser type and version</li>
            <li>Device type and operating system</li>
            <li>Pages visited, time spent, and navigation patterns</li>
            <li>Referring website or source</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>3. How We Use Your Information</h2>
          <p>We use the collected information for the following purposes:</p>
          <ul>
            <li>To process and fulfill your orders</li>
            <li>To communicate with you about orders, deliveries, and customer support</li>
            <li>To send order confirmations, shipping updates, and invoices</li>
            <li>To improve our website, products, and services</li>
            <li>To send promotional communications (only with your consent)</li>
            <li>To prevent fraud and ensure secure transactions</li>
            <li>To comply with legal obligations</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>4. Payment Security</h2>
          <p>
            All payment transactions are processed through <strong>Razorpay</strong>, a PCI-DSS compliant payment 
            gateway. We do not store your credit card, debit card, or banking details on our servers. All payment 
            data is encrypted and handled directly by Razorpay's secure servers.
          </p>
          <p>
            For more information on Razorpay's security practices, please visit: 
            <a href="https://razorpay.com/privacy/" target="_blank" rel="noopener noreferrer">Razorpay Privacy Policy</a>
          </p>
        </div>

        <div className="policy-card">
          <h2>5. Information Sharing and Disclosure</h2>
          <p>We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:</p>
          <ul>
            <li><strong>Payment Processors:</strong> With Razorpay for processing payments securely</li>
            <li><strong>Shipping Partners:</strong> With delivery/courier services to fulfill your orders</li>
            <li><strong>Legal Requirements:</strong> When required by law, court order, or government regulation</li>
            <li><strong>Business Protection:</strong> To protect our rights, property, and safety or that of our users</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>6. Cookies and Tracking</h2>
          <p>
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
            Cookies help us understand how you interact with our website and allow us to improve our services.
          </p>
          <p>
            You can control cookie preferences through your browser settings. However, disabling cookies may 
            affect some functionality of our website.
          </p>
        </div>

        <div className="policy-card">
          <h2>7. Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information 
            against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission 
            over the Internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </div>

        <div className="policy-card">
          <h2>8. Data Retention</h2>
          <p>
            We retain your personal information only for as long as necessary to fulfill the purposes for which it 
            was collected, including to satisfy legal, accounting, or reporting requirements. Order-related data is 
            retained for a period necessary to process returns, refunds, and for legal compliance.
          </p>
        </div>

        <div className="policy-card">
          <h2>9. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate or incomplete information</li>
            <li>Request deletion of your personal data (subject to legal requirements)</li>
            <li>Opt-out of marketing communications at any time</li>
            <li>Withdraw consent where we rely on your consent to process your data</li>
          </ul>
          <p>
            To exercise any of these rights, please contact us at <a href="mailto:support@dbangles.in">support@dbangles.in</a>.
          </p>
        </div>

        <div className="policy-card">
          <h2>10. Third-Party Links</h2>
          <p>
            Our website may contain links to third-party websites. We are not responsible for the privacy practices 
            of these external sites. We encourage you to read the privacy policies of any third-party sites you visit.
          </p>
        </div>

        <div className="policy-card">
          <h2>11. Changes to This Privacy Policy</h2>
          <p>
            We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page 
            with an updated "Last Updated" date. Your continued use of our website after changes are posted 
            constitutes your acceptance of the modified Privacy Policy.
          </p>
        </div>

        <div className="policy-card">
          <h2>12. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us:</p>
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

export default PrivacyPolicy;
