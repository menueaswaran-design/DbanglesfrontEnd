import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import WhatsappFloatingButton from './WhatsappFloatingButton';
import '../styles/PolicyPages.css';

function TermsAndConditions() {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Terms and Conditions - DBangles</title>
        <meta name="description" content="Read the Terms and Conditions for using DBangles website and services." />
      </Helmet>
      <Navbar productsData={{ bangles: [], dresses: [] }} />

      <div className="policy-container">
        <div className="policy-page-header">
          <button className="policy-back-btn" onClick={() => navigate('/')}>← Back to Home</button>
          <h1 className="policy-page-title">Terms and Conditions</h1>
          <p className="policy-page-subtitle">Last updated: February 28, 2026</p>
        </div>

        <div className="policy-card">
          <h2>1. Introduction</h2>
          <p>
            Welcome to DBangles (<a href="https://www.dbangles.in">www.dbangles.in</a>). These Terms and Conditions 
            govern your use of our website and the purchase of products from our online store. By accessing or using 
            our website, you agree to be bound by these terms.
          </p>
          <p>
            Please read these terms carefully before using our website or making a purchase. If you do not agree to 
            these terms, please do not use our website.
          </p>
        </div>

        <div className="policy-card">
          <h2>2. Definitions</h2>
          <ul>
            <li><strong>"Website"</strong> refers to www.dbangles.in and all its pages</li>
            <li><strong>"We/Us/Our"</strong> refers to DBangles, the business operating this website</li>
            <li><strong>"You/User/Customer"</strong> refers to the person or entity using this website</li>
            <li><strong>"Products"</strong> refers to all items listed for sale on the website</li>
            <li><strong>"Services"</strong> refers to all services provided through the website</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>3. Eligibility</h2>
          <p>
            To use this website and make purchases, you must be at least 18 years of age or have the consent of a 
            parent or legal guardian. By using this website, you represent and warrant that you meet these eligibility 
            requirements.
          </p>
        </div>

        <div className="policy-card">
          <h2>4. Products and Pricing</h2>
          <ul>
            <li>All products listed on our website are subject to availability.</li>
            <li>We strive to display accurate product images, descriptions, and prices. However, slight variations in color may occur due to screen settings.</li>
            <li>Prices are listed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.</li>
            <li>We reserve the right to modify prices at any time without prior notice.</li>
            <li>In case of a pricing error, we reserve the right to cancel the order and issue a full refund.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>5. Orders and Payment</h2>
          <ul>
            <li>Placing an order on our website constitutes an offer to purchase the product.</li>
            <li>We reserve the right to accept or reject any order for any reason.</li>
            <li>All payments are processed securely through <strong>Razorpay</strong> payment gateway.</li>
            <li>We accept payments via UPI, Credit Cards, Debit Cards, Net Banking, and Wallets through Razorpay.</li>
            <li>Payment must be completed at the time of placing the order.</li>
            <li>Orders are confirmed only after successful payment verification.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>6. Order Confirmation</h2>
          <p>
            After placing an order, you will receive an order confirmation via email/SMS with your order details. 
            This confirmation does not guarantee acceptance of your order. We may cancel orders due to stock 
            unavailability, pricing errors, or suspected fraudulent activity, in which case a full refund will be issued.
          </p>
        </div>

        <div className="policy-card">
          <h2>7. Shipping and Delivery</h2>
          <p>
            Please refer to our <a href="/shipping-policy">Shipping & Delivery Policy</a> for complete details on 
            shipping timelines, charges, and delivery terms.
          </p>
        </div>

        <div className="policy-card">
          <h2>8. Returns and Refunds</h2>
          <p>
            Please refer to our <a href="/refund-policy">Refund & Cancellation Policy</a> for complete details on 
            returns, exchanges, and refund procedures.
          </p>
        </div>

        <div className="policy-card">
          <h2>9. User Account</h2>
          <ul>
            <li>You may be required to create an account or log in to place an order.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>You are responsible for all activities that occur under your account.</li>
            <li>You must notify us immediately of any unauthorized use of your account.</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>10. Intellectual Property</h2>
          <p>
            All content on this website, including but not limited to text, images, graphics, logos, product designs, 
            and software, is the property of DBangles and is protected by Indian and international copyright laws. 
            You may not reproduce, distribute, or use any content from this website without our prior written consent.
          </p>
        </div>

        <div className="policy-card">
          <h2>11. Prohibited Activities</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Use the website for any unlawful or unauthorized purpose</li>
            <li>Attempt to gain unauthorized access to our systems or networks</li>
            <li>Interfere with the proper functioning of the website</li>
            <li>Use automated tools to scrape or collect data from the website</li>
            <li>Impersonate another person or entity</li>
            <li>Submit false or misleading information</li>
          </ul>
        </div>

        <div className="policy-card">
          <h2>12. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, DBangles shall not be liable for any indirect, incidental, 
            special, or consequential damages arising from your use of the website or purchase of products. Our 
            total liability shall not exceed the amount paid by you for the specific product in question.
          </p>
        </div>

        <div className="policy-card">
          <h2>13. Indemnification</h2>
          <p>
            You agree to indemnify and hold harmless DBangles, its owners, employees, and partners from any claims, 
            damages, losses, or expenses arising from your use of the website or violation of these terms.
          </p>
        </div>

        <div className="policy-card">
          <h2>14. Governing Law</h2>
          <p>
            These Terms and Conditions are governed by and construed in accordance with the laws of India. Any 
            disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in 
            Chennai, Tamil Nadu, India.
          </p>
        </div>

        <div className="policy-card">
          <h2>15. Changes to Terms</h2>
          <p>
            We reserve the right to update or modify these Terms and Conditions at any time without prior notice. 
            Changes will be effective upon posting on this page. Your continued use of the website after changes 
            are posted constitutes your acceptance of the modified terms.
          </p>
        </div>

        <div className="policy-card">
          <h2>16. Contact Us</h2>
          <p>If you have any questions about these Terms and Conditions, please contact us:</p>
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

export default TermsAndConditions;
