import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js'; // For fuzzy search

import './App.css'; // Import your CSS file

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch JSON data from the public folder
    fetch('/data.json')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      });
  }, []);

  useEffect(() => {
    // Implement fuzzy search using Fuse.js
    const options = {
      keys: ['name'],
    };
    const fuse = new Fuse(products, options);
    const results = fuse.search(searchText);
    setFilteredProducts(results.map((result) => result.item));
  }, [searchText, products]);

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div key={product.objectID} className="product-card">
            <img src={product.thumbnailImage} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.shortDescription}</p>
            <p>Price: ${product.salePrice}</p>
            <p>Manufacturer: {product.manufacturer}</p>
            <a href={product.url} target="_blank" rel="noopener noreferrer">
              View Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
