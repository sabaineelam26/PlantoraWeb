import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Checkout.css';

const OrderSuccess = ({ total }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation after mount
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  // Generate a random order number once
  const orderNumber = useState(() =>
    'PLT-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  )[0];

  return (
    <div className={`order-success-overlay ${visible ? 'order-success-visible' : ''}`}>
      {/* Animated checkmark */}
      <div className="success-icon-wrap">
        <svg className="success-checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <circle className="success-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="success-checkmark__check" fill="none" d="M14 27l8 8 16-16" />
        </svg>
      </div>

      <h2 className="success-title">Order Placed Successfully! 🌿</h2>
      <p className="success-subtitle">Thank you for shopping with <strong>Plantora</strong>.</p>

      <div className="success-order-info">
        <div className="success-order-row">
          <span>Order Number</span>
          <strong>{orderNumber}</strong>
        </div>
        <div className="success-order-row">
          <span>Order Total</span>
          <strong>${total.toFixed(2)}</strong>
        </div>
        <div className="success-order-row">
          <span>Estimated Delivery</span>
          <strong>5 – 7 Business Days</strong>
        </div>
        <div className="success-order-row">
          <span>Confirmation</span>
          <strong>Sent to your email</strong>
        </div>
      </div>

      <p className="success-note">
        🌱 Your plants are being carefully packed and will be on their way soon!
      </p>

      <div className="success-actions">
        <Link to="/plants" className="btn-success-primary">Continue Shopping</Link>
        <Link to="/" className="btn-success-secondary">Back to Home</Link>
      </div>
    </div>
  );
};

const Checkout = () => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderTotal, setOrderTotal] = useState(0);
  const { cartItems, clearCart } = useContext(ShopContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrderTotal(total);
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout-page checkout-page--success">
        <OrderSuccess total={orderTotal} />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <div className="checkout-form">
          <h2>Shipping Information</h2>
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;

