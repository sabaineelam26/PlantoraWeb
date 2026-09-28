import React from "react";
import "./Plantora.css"; 
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { plantsData, categories } from "../data";

const Plantora = () => {
  const featuredPlants = plantsData.filter(plant => plant.featured);

  return (
    <div className="home-container">
      <div className="hero">
        <img src="/background.png" className="hero-image" alt="Indoor plants" />
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-tag">PLANTS • HOME • HAPPIER YOU</span>
          <h1>
            Bring Nature<br />Into Your Home
          </h1>
          <p>
            Discover beautiful indoor plants that make your space feel fresh,
            calm, and alive.
          </p>
          <div className="hero-buttons">
            <Link to="/plants" className="btn-primary">Shop Plants</Link>
            <Link to="/plantFinder" className="btn-secondary">Find My Plant</Link>
          </div>
        </div>
      </div>

      <section className="categories-section">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <Link to="/plants" className="view-all">View All</Link>
        </div>
        <div className="categories-grid">
          {categories.filter(c => c !== "All").map((category, idx) => (
            <div key={idx} className="category-card">
              <h3>{category}</h3>
              <Link to={`/plants?category=${category}`}>Explore &rarr;</Link>
            </div>
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Plants</h2>
          <p>Hand-picked for your home</p>
        </div>
        <div className="featured-grid">
          {featuredPlants.map(plant => (
            <ProductCard key={plant.id} plant={plant} />
          ))}
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefit">
          <h3>🌱 Fresh Air</h3>
          <p>Plants naturally purify the air around you.</p>
        </div>
        <div className="benefit">
          <h3>🚚 Free Shipping</h3>
          <p>On all orders over $50.</p>
        </div>
        <div className="benefit">
          <h3>💚 Guaranteed</h3>
          <p>30-day happiness guarantee.</p>
        </div>
      </section>
    </div>
  );
};

export default Plantora;