import React, { useMemo } from 'react';
import ProductCard from './ProductCard';
import { useNavigate } from 'react-router-dom';
import '../styles/RecommendedSection.css';

function RecommendedSection({ products }) {
  const navigate = useNavigate();

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

  if (recommendedProducts.length === 0) {
    return null;
  }

  return (
    <section className="recommended-section">
      <div className="recommended-header">
        <h2 className="recommended-title">Fresh Recommendations</h2>
        <p className="recommended-subtitle">Handpicked just for you</p>
      </div>

      <div className="recommended-scroll-container">
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
    </section>
  );
}

export default RecommendedSection;
