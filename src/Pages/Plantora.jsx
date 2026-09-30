import React, { useState } from "react";
import "./Plantora.css"; 
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import { plantsData, categories } from "../data";

const Plantora = () => {
  const featuredPlants = plantsData.filter(plant => plant.featured);
  const [activeSpace, setActiveSpace] = useState("Living Room");

  const getSpacePlants = () => {
    switch(activeSpace) {
      case "Living Room":
        return plantsData.filter(p => p.category === "Indoor Plants" || p.care.light.toLowerCase().includes("bright")).slice(0, 4);
      case "Bedroom":
        return plantsData.filter(p => p.category === "Air-Purifying Plants" || p.category === "Low-Light Plants").slice(0, 4);
      case "Office":
        return plantsData.filter(p => p.category === "Easy-Care Plants" || p.category === "Low-Light Plants").slice(0, 4);
      case "Bathroom":
        return plantsData.filter(p => p.care.humidity.toLowerCase().includes("high")).slice(0, 4);
      default:
        return plantsData.slice(0, 4);
    }
  };

  const spacePlants = getSpacePlants();

  return (
    <div className="home-container">
      <div className="hero">
        <img src="/background.png" className="hero-image" alt="Indoor plants" />
        <div className="hero-overlay"></div>
        <div className="hero-content fade-in-up">
          <span className="hero-tag">PLANTS • HOME • HAPPIER YOU</span>
          <h1>Bring Nature<br />Into Your Home</h1>
          <p>Discover beautiful indoor plants that make your space feel fresh, calm, and alive.</p>
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
            <div key={idx} className="category-card slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <h3>{category}</h3>
              <Link to={`/plants?category=${category}`}>Explore &rarr;</Link>
            </div>
          ))}
        </div>
      </section>

      {/* Shop Your Space Section */}
      <section className="shop-space-section">
        <div className="section-header">
          <h2>Shop Your Space</h2>
          <p>Find the perfect plant for every room.</p>
        </div>
        <div className="space-tabs">
          {["Living Room", "Bedroom", "Office", "Bathroom"].map(space => (
            <button 
              key={space} 
              className={`space-tab ${activeSpace === space ? "active" : ""}`}
              onClick={() => setActiveSpace(space)}
            >
              {space}
            </button>
          ))}
        </div>
        <div className="space-grid fade-in">
          {spacePlants.map(plant => (
            <ProductCard key={`${activeSpace}-${plant.id}`} plant={plant} />
          ))}
        </div>
      </section>

      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Plants</h2>
          <p>Hand-picked for your home</p>
        </div>
        <div className="featured-grid">
          {featuredPlants.map((plant, idx) => (
            <div key={plant.id} className="slide-up" style={{animationDelay: `${idx * 0.1}s`}}>
              <ProductCard plant={plant} />
            </div>
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