import React, { useState } from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductSection.css'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function ProductSection({ title, products, id, showCategories, categories }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const Navigate = useNavigate();

  // Extract unique categories from products and combine with static categories
  const productCategories = [...new Set(products.map(product => product.category).filter(Boolean))];
  const staticCategories = categories || [];
  const allCategories = ['All', ...new Set([...staticCategories.filter(c => c !== 'All'), ...productCategories])];

  // Filter products based on selected category
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <section className="product-section" id={id}>
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <div className="section-line"></div>
        <p className="section-subtitle">Handcrafted with love and care</p>
      </div>

      {showCategories && (
        <div className="category-filter">
          {allCategories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      {filteredProducts.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#888', padding: '40px 0', fontSize: '1.1rem', fontWeight: 500 }}>
          {id === 'bangles' ? 'No bangles found.' : id === 'dresses' ? 'No dresses found.' : 'No products found.'}
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onView={(prod) => Navigate(`/product/${prod.id}`)}
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default ProductSection;
