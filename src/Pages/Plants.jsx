import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { plantsData, categories } from '../data';
import './Plants.css';

const Plants = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get('category') || 'All';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');

  const filteredPlants = useMemo(() => {
    let result = plantsData;
    
    // Filter by Category
    if (activeCategory !== 'All') {
      result = result.filter(plant => plant.category === activeCategory);
    }
    
    // Search
    if (searchQuery) {
      result = result.filter(plant => 
        plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        plant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort
    if (sortOption === 'price-low') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-high') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }
    
    return result;
  }, [activeCategory, searchQuery, sortOption]);

  const handleCategoryChange = (category) => {
    setSearchParams(category === 'All' ? {} : { category });
  };

  return (
    <div className="plants-page">
      <div className="plants-header">
        <h1>Our Plants</h1>
        <p>Find the perfect green companion for your space.</p>
      </div>
      
      <div className="plants-container">
        <aside className="plants-sidebar">
          <div className="filter-group">
            <h3>Search</h3>
            <input 
              type="text" 
              placeholder="Search plants..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="filter-group">
            <h3>Categories</h3>
            <ul className="category-list">
              {categories.map((category, idx) => (
                <li key={idx}>
                  <button 
                    className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => handleCategoryChange(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="filter-group">
            <h3>Sort By</h3>
            <select 
              value={sortOption} 
              onChange={(e) => setSortOption(e.target.value)}
              className="sort-select"
            >
              <option value="default">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </aside>
        
        <main className="plants-main">
          <div className="results-info">
            Showing {filteredPlants.length} plants
          </div>
          
          {filteredPlants.length > 0 ? (
            <div className="products-grid">
              {filteredPlants.map(plant => (
                <ProductCard key={plant.id} plant={plant} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3>No plants found.</h3>
              <p>Try adjusting your search or filters.</p>
              <button onClick={() => {
                setSearchQuery('');
                handleCategoryChange('All');
                setSortOption('default');
              }} className="btn-secondary">Clear Filters</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Plants;