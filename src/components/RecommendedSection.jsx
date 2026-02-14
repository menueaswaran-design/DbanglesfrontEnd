import React, { useMemo, useRef, useState, useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import '../styles/RecommendedSection.css';

function RecommendedSection({ products }) {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Filter products with 'recommended' label and shuffle them
  const recommendedProducts = useMemo(() => {
    const recommended = products.filter(product =>
      product.label && product.label.toLowerCase() === 'recommended'
    );
    const shuffled = [...recommended];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 10);
  }, [products]);

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, recommendedProducts]);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = el.clientWidth * 0.75;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section className="recommended-section">
      <div className="recommended-header">
        <h2 className="recommended-title">Fresh Recommendations</h2>
        <p className="recommended-subtitle">Handpicked just for you</p>
      </div>

      <div className="recommended-carousel">
        {canScrollLeft && (
          <button
            className="recommended-arrow recommended-arrow-left"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        <div className="recommended-scroll-container" ref={scrollRef}>
          <div className="recommended-products">
            {recommendedProducts.map((product) => (
              <div key={product.id} className="recommended-product-wrapper">
                <ProductCard
                  product={product}
                  onView={(prod) => navigate(`/product/${prod._id || prod.id}`)}
                  showLabel={true}
                />
              </div>
            ))}
          </div>
        </div>

        {canScrollRight && (
          <button
            className="recommended-arrow recommended-arrow-right"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
}

export default RecommendedSection;
