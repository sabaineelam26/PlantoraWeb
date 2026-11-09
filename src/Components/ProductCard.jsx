import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import './ProductCard.css';

const ProductCard = ({ plant }) => {
  const { addToCart, addToWishlist, wishlistItems } = useContext(ShopContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [justAddedCart, setJustAddedCart] = useState(false);
  const [justAddedWishlist, setJustAddedWishlist] = useState(false);

  const isWishlisted = wishlistItems?.some(item => item.id === plant.id);

  const handleAddToCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToCart(plant);
    setJustAddedCart(true);
    setTimeout(() => setJustAddedCart(false), 1200);
  };

  const handleAddToWishlist = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    addToWishlist(plant);
    setJustAddedWishlist(true);
    setTimeout(() => setJustAddedWishlist(false), 1200);
  };

  return (
    <div className="product-card">
      <Link to={`/plants/${plant.id}`} className="product-card-img-container">
        <img src={plant.image} alt={plant.name} className="product-card-img" />
      </Link>
      <div className="product-card-content">
        <div className="product-card-header">
          <h3 className="product-card-title">{plant.name}</h3>
          <span className="product-card-price">${plant.price}</span>
        </div>
        <p className="product-card-category">{plant.category}</p>
        <div className="product-card-actions">
          <Link to={`/plants/${plant.id}`} className="btn-details">View Details</Link>
          <div className="card-buttons">
            <button 
              className={`btn-wishlist-card ${isWishlisted || justAddedWishlist ? 'active' : ''}`} 
              onClick={handleAddToWishlist} 
              title={isWishlisted ? "Wishlisted" : "Add to Wishlist"}
            >
              {isWishlisted || justAddedWishlist ? '♥' : '♡'}
            </button>
            <button 
              className={`btn-add-cart ${justAddedCart ? 'added' : ''}`} 
              onClick={handleAddToCart} 
              title={justAddedCart ? "Added!" : "Add to Cart"}
            >
              {justAddedCart ? (
                <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>✓</span>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
