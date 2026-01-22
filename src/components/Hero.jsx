import React from 'react';
import '../styles/Hero.css';

function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="art-circle circle-top-right"></div>
        <div className="art-circle circle-bottom-left"></div>
        <div className="art-line line-1"></div>
        <div className="art-line line-2"></div>
      </div>
      
      <div className="hero-container">
        <div className="hero-content">
          <h1 className="hero-title">Handmade Bangles & Dresses</h1>
          <p className="hero-subtitle">
            Discover unique, handcrafted pieces that blend tradition with modern elegance.
          </p>
          <div className="hero-buttons">
            <a href="#bangles" className="btn btn-primary">Shop Bangles</a>
            <a href="#dresses" className="btn btn-secondary">Shop Dresses</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
