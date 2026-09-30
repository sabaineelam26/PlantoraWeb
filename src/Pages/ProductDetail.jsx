import React, { useState, useContext, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { plantsData } from '../data';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const plant = plantsData.find(p => p.id === parseInt(id));
  
  const [quantity, setQuantity] = useState(1);
  const [userLight, setUserLight] = useState("Medium");
  const [userExperience, setUserExperience] = useState("Intermediate");
  const [compatScore, setCompatScore] = useState(0);

  const { addToCart, addToWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (plant) {
      let score = 40; 
      const plantLight = plant.care.light.toLowerCase();
      
      if (userLight === "Bright" && plantLight.includes("bright")) score += 30;
      else if (userLight === "Low" && plantLight.includes("low")) score += 30;
      else if (userLight === "Medium" && (plantLight.includes("indirect") || plantLight.includes("medium"))) score += 30;
      else score += 10;

      if (userExperience === "Beginner" && (plant.category === "Easy-Care Plants" || plant.category === "Low-Light Plants")) score += 30;
      else if (userExperience === "Expert") score += 30;
      else if (userExperience === "Intermediate") score += 20;

      setCompatScore(Math.min(score, 100));
    }
  }, [userLight, userExperience, plant]);

  if (!plant) {
    return (
      <div className="product-not-found">
        <h2>Plant not found</h2>
        <Link to="/plants" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to your cart.");
      navigate("/login");
      return;
    }
    addToCart(plant, quantity);
    alert(`Added ${quantity} to cart`);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      alert("Please login to add items to your wishlist.");
      navigate("/login");
      return;
    }
    addToWishlist(plant);
    alert('Added to wishlist');
  };

  return (
    <div className="product-detail-page fade-in">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/plants">Plants</Link> / <span>{plant.name}</span>
      </div>
      
      <div className="product-detail-container">
        <div className="product-image-section slide-right">
          <img src={plant.image} alt={plant.name} className="main-image" />
        </div>
        
        <div className="product-info-section slide-left">
          <div className="product-title-area">
            <h1>{plant.name}</h1>
            <p className="price">${plant.price}</p>
          </div>
          
          <div className="rating">
            <span className="stars">★★★★★</span>
            <span className="rating-value">{plant.rating} (124 reviews)</span>
          </div>
          
          <p className="description">{plant.description}</p>
          
          <div className="compatibility-section">
            <h3>Plant Compatibility Score</h3>
            <div className="compat-controls">
              <label>
                Your Light:
                <select value={userLight} onChange={(e) => setUserLight(e.target.value)}>
                  <option value="Low">Low Light</option>
                  <option value="Medium">Medium Light</option>
                  <option value="Bright">Bright Light</option>
                </select>
              </label>
              <label>
                Experience:
                <select value={userExperience} onChange={(e) => setUserExperience(e.target.value)}>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </label>
            </div>
            <div className="compat-score-bar">
              <div className="compat-fill" style={{ width: `${compatScore}%`, backgroundColor: compatScore > 70 ? '#27ae60' : compatScore > 40 ? '#f39c12' : '#e74c3c' }}></div>
            </div>
            <p className="compat-text">{compatScore}% Match for your space!</p>
          </div>

          <div className="care-instructions">
            <h3>Care Instructions</h3>
            <ul>
              <li><strong>Light:</strong> {plant.care.light}</li>
              <li><strong>Water:</strong> {plant.care.water}</li>
              <li><strong>Humidity:</strong> {plant.care.humidity}</li>
            </ul>
          </div>
          
          <div className="actions-section">
            <div className="quantity-selector">
              <button onClick={handleDecrease}>-</button>
              <input type="number" value={quantity} readOnly />
              <button onClick={handleIncrease}>+</button>
            </div>
            
            <button className="btn-add-to-cart" onClick={handleAddToCart}>
              Add to Cart - ${(plant.price * quantity).toFixed(2)}
            </button>
            
            <button className="btn-wishlist" onClick={handleAddToWishlist} title="Add to Wishlist">
              ♡
            </button>
          </div>
          
          <div className="shipping-info">
            <p>🚚 Free standard shipping on orders over $50</p>
            <p>🛡️ 30-day happiness guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
