import React, { useState } from "react";
import "../styles/Hero.css";

function Hero() {
  const [active, setActive] = useState(null);

  const handleClick = (section) => {
    setActive(section);

    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
            <button
              className={`btn ${
                active === "bangles" ? "btn-active" : "btn-primary"
              }`}
              onClick={() => handleClick("bangles")}
            >
              Shop Bangles
            </button>

            <button
              className={`btn ${
                active === "dresses" ? "btn-active" : "btn-secondary"
              }`}
              onClick={() => handleClick("dresses")}
            >
              Shop Dresses
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
