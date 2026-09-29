import React, { useState } from 'react';
import './Checkout.css';

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderPlaced(true);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
          {orderPlaced ? (
            <div className="order-success" style={{ textAlign: 'center', padding: '20px' }}>
              <h3 style={{ color: '#27ae60', marginBottom: '10px' }}>Order placed successfully!</h3>
              <p>Thank you for shopping with Plantora.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name</label>
                <input type="text" id="name" placeholder="John Doe" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="john@example.com" required />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input type="text" id="address" placeholder="123 Main St" required />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" id="city" placeholder="New York" required />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input type="text" id="zip" placeholder="10001" required />
              </div>
              <button type="submit" className="btn-primary">Place Order</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;

