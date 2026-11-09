import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import './Checkout.css';

/* ── Step indicator ─────────────────────────────────────────── */
const StepBar = ({ step }) => (
  <div className="step-bar">
    {['Shipping', 'Payment', 'Confirmation'].map((label, i) => (
      <div key={label} className={`step-item ${step === i + 1 ? 'active' : ''} ${step > i + 1 ? 'done' : ''}`}>
        <div className="step-circle">{step > i + 1 ? '✓' : i + 1}</div>
        <span>{label}</span>
        {i < 2 && <div className="step-line" />}
      </div>
    ))}
  </div>
);

/* ── Step 1: Shipping ───────────────────────────────────────── */
const ShippingStep = ({ onNext }) => {
  const [form, setForm] = useState({ name: '', email: '', address: '', city: '', zip: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(form);
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Shipping Information</h2>
      {[
        { id: 'name',    label: 'Full Name',    type: 'text',  placeholder: 'John Doe' },
        { id: 'email',   label: 'Email',         type: 'email', placeholder: 'john@example.com' },
        { id: 'address', label: 'Address',       type: 'text',  placeholder: '123 Main St' },
        { id: 'city',    label: 'City',          type: 'text',  placeholder: 'New York' },
        { id: 'zip',     label: 'Zip Code',      type: 'text',  placeholder: '10001' },
      ].map(({ id, label, type, placeholder }) => (
        <div className="form-group" key={id}>
          <label htmlFor={id}>{label}</label>
          <input
            id={id} type={type} placeholder={placeholder}
            value={form[id]} onChange={handleChange} required
          />
        </div>
      ))}
      <button type="submit" className="btn-primary">Continue to Payment →</button>
    </form>
  );
};

/* ── Step 2: Payment ────────────────────────────────────────── */
const PaymentStep = ({ total, onBack, onPay }) => {
  const [method, setMethod] = useState('card');
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [upi, setUpi]   = useState('');
  const [errors, setErrors] = useState({});

  const formatCardNumber = (val) =>
    val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

  const formatExpiry = (val) => {
    const digits = val.replace(/\D/g, '').slice(0, 4);
    return digits.length > 2 ? digits.slice(0, 2) + '/' + digits.slice(2) : digits;
  };

  const validate = () => {
    const e = {};
    if (method === 'card') {
      if (card.number.replace(/\s/g, '').length < 16) e.number = 'Enter a valid 16-digit card number';
      if (!card.name.trim()) e.name = 'Cardholder name is required';
      if (card.expiry.length < 5) e.expiry = 'Enter a valid expiry date (MM/YY)';
      if (card.cvv.length < 3)   e.cvv = 'Enter a valid CVV';
    }
    if (method === 'upi' && !/^[\w.\-]+@[\w]+$/.test(upi)) {
      e.upi = 'Enter a valid UPI ID (e.g. name@upi)';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onPay();
  };

  return (
    <form onSubmit={handleSubmit} className="checkout-form">
      <h2>Payment Method</h2>

      {/* Method selector */}
      <div className="payment-methods">
        {[
          { id: 'card', icon: '💳', label: 'Credit / Debit Card' },
          { id: 'upi',  icon: '📱', label: 'UPI' },
          { id: 'cod',  icon: '🏠', label: 'Cash on Delivery' },
        ].map(({ id, icon, label }) => (
          <label key={id} className={`payment-method-card ${method === id ? 'selected' : ''}`}>
            <input type="radio" name="method" value={id} checked={method === id} onChange={() => { setMethod(id); setErrors({}); }} />
            <span className="pm-icon">{icon}</span>
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* Card fields */}
      {method === 'card' && (
        <div className="payment-fields">
          <div className="form-group">
            <label>Card Number</label>
            <input
              type="text" placeholder="1234 5678 9012 3456"
              value={card.number}
              onChange={(e) => setCard({ ...card, number: formatCardNumber(e.target.value) })}
              maxLength={19}
            />
            {errors.number && <span className="field-error">{errors.number}</span>}
          </div>
          <div className="form-group">
            <label>Cardholder Name</label>
            <input
              type="text" placeholder="John Doe"
              value={card.name}
              onChange={(e) => setCard({ ...card, name: e.target.value })}
            />
            {errors.name && <span className="field-error">{errors.name}</span>}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text" placeholder="MM/YY"
                value={card.expiry}
                onChange={(e) => setCard({ ...card, expiry: formatExpiry(e.target.value) })}
                maxLength={5}
              />
              {errors.expiry && <span className="field-error">{errors.expiry}</span>}
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="password" placeholder="•••"
                value={card.cvv}
                onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                maxLength={4}
              />
              {errors.cvv && <span className="field-error">{errors.cvv}</span>}
            </div>
          </div>
          <p className="secure-note">🔒 Your payment details are encrypted and secure.</p>
        </div>
      )}

      {/* UPI field */}
      {method === 'upi' && (
        <div className="payment-fields">
          <div className="form-group">
            <label>UPI ID</label>
            <input
              type="text" placeholder="yourname@upi"
              value={upi}
              onChange={(e) => setUpi(e.target.value)}
            />
            {errors.upi && <span className="field-error">{errors.upi}</span>}
          </div>
          <p className="secure-note">📲 You'll receive a payment request on your UPI app.</p>
        </div>
      )}

      {/* COD */}
      {method === 'cod' && (
        <div className="payment-fields cod-info">
          <p>💵 Pay <strong>${total.toFixed(2)}</strong> in cash when your order is delivered.</p>
          <p className="secure-note">No online payment needed. Easy and convenient!</p>
        </div>
      )}

      {/* Order total summary */}
      <div className="payment-total-row">
        <span>Order Total</span>
        <strong>${total.toFixed(2)}</strong>
      </div>

      <div className="form-actions">
        <button type="button" className="btn-back" onClick={onBack}>← Back</button>
        <button type="submit" className="btn-primary">
          {method === 'cod' ? 'Place Order' : `Pay $${total.toFixed(2)}`}
        </button>
      </div>
    </form>
  );
};

/* ── Step 3: Order Success ──────────────────────────────────── */
const OrderSuccess = ({ total }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);
  const orderNumber = useState(() => 'PLT-' + Math.random().toString(36).substring(2, 8).toUpperCase())[0];

  return (
    <div className={`order-success-overlay ${visible ? 'order-success-visible' : ''}`}>
      <div className="success-icon-wrap">
        <svg className="success-checkmark" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg">
          <circle className="success-checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="success-checkmark__check" fill="none" d="M14 27l8 8 16-16" />
        </svg>
      </div>
      <h2 className="success-title">Order Placed Successfully! 🌿</h2>
      <p className="success-subtitle">Thank you for shopping with <strong>Plantora</strong>.</p>
      <div className="success-order-info">
        {[
          ['Order Number', orderNumber],
          ['Order Total', `$${total.toFixed(2)}`],
          ['Estimated Delivery', '5 – 7 Business Days'],
          ['Confirmation', 'Sent to your email'],
        ].map(([label, value]) => (
          <div className="success-order-row" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <p className="success-note">🌱 Your plants are being carefully packed and will be on their way soon!</p>
      <div className="success-actions">
        <Link to="/plants" className="btn-success-primary">Continue Shopping</Link>
        <Link to="/" className="btn-success-secondary">Back to Home</Link>
      </div>
    </div>
  );
};

/* ── Main Checkout ──────────────────────────────────────────── */
const Checkout = () => {
  const [step, setStep] = useState(1);
  const [orderTotal, setOrderTotal] = useState(0);
  const { cartItems, clearCart } = useContext(ShopContext);

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 15;
  const total = subtotal + shipping;

  const handleShippingNext = () => setStep(2);

  const handlePaymentDone = () => {
    setOrderTotal(total);
    clearCart();
    setStep(3);
  };

  if (step === 3) {
    return (
      <div className="checkout-page checkout-page--success">
        <OrderSuccess total={orderTotal} />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <StepBar step={step} />
      <div className="checkout-container">
        {step === 1 && <ShippingStep onNext={handleShippingNext} />}
        {step === 2 && <PaymentStep total={total} onBack={() => setStep(1)} onPay={handlePaymentDone} />}
      </div>
    </div>
  );
};

export default Checkout;
