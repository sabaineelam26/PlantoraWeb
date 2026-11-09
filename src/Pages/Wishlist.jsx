import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../Components/ProductCard';
import { ShopContext } from '../context/ShopContext';
import { AuthContext } from '../context/AuthContext';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(ShopContext);
  const { user } = useContext(AuthContext);

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist</h1>
        {user && <p>{wishlistItems.length} items saved for later</p>}
      </div>

      {!user ? (
        <div className="empty-wishlist">
          <p>Please log in to view and manage your wishlist.</p>
          <Link to="/login" className="btn-primary">Log In</Link>
        </div>
      ) : wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <p>Your wishlist is empty.</p>
          <Link to="/plants" className="btn-primary">Browse Plants</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems.map(plant => (
            <div className="wishlist-item" key={plant.id}>
              <ProductCard plant={plant} />
              <button 
                className="btn-remove-wishlist"
                onClick={() => removeFromWishlist(plant.id)}
              >
                ✕ Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;