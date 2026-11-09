import React from "react";
import "./shippingReturn.css";

const ShippingReturn = () => {
  return (
    <div className="shipping-page">
      <div className="shipping-container">
        {/* Header */}
        <div className="shipping-header">
          <span>PLANTORA</span>
          <h1>Shipping & Returns</h1>
          <p>
            Everything you need to know about shipping, delivery, returns,
            replacements, and refunds.
          </p>
        </div>

        {/* Shipping */}
        <section className="shipping-section">
          <h2>Shipping & Delivery</h2>

          <p>
            We carefully pack every plant and product to help ensure it reaches
            you safely and in good condition.
          </p>

          <div className="shipping-grid">
            <div className="shipping-card">
              <h3>🚚 Shipping Time</h3>
              <p>
                Orders are generally processed and shipped within the applicable
                processing period. Delivery time may vary depending on your
                location and product availability.
              </p>
            </div>

            <div className="shipping-card">
              <h3>📦 Order Tracking</h3>
              <p>
                Once your order has been shipped, tracking information may be
                provided so you can follow the progress of your delivery.
              </p>
            </div>

            <div className="shipping-card">
              <h3>🌱 Plant Packaging</h3>
              <p>
                Plants are packed carefully to reduce the possibility of damage
                during transportation.
              </p>
            </div>

            <div className="shipping-card">
              <h3>📍 Delivery Address</h3>
              <p>
                Please make sure your delivery address and contact details are
                accurate before completing your order.
              </p>
            </div>
          </div>
        </section>

        {/* Returns */}
        <section className="shipping-section">
          <h2>Returns & Replacements</h2>

          <p>
            Because plants are living products, returns and replacements may
            depend on the condition of the plant and the circumstances of the
            order.
          </p>

          <div className="shipping-info">
            <h3>When can I request a return or replacement?</h3>

            <ul>
              <li>You received the wrong product.</li>
              <li>Your order arrived damaged.</li>
              <li>An item is missing from your order.</li>
              <li>
                The product has an issue covered by our applicable return
                policy.
              </li>
            </ul>
          </div>

          <div className="shipping-info">
            <h3>How do I request a return?</h3>

            <p>
              Contact our support team as soon as possible after receiving your
              order. Please provide your order details and photographs of the
              product when required.
            </p>
          </div>
        </section>

        {/* Refunds */}
        <section className="shipping-section">
          <h2>Refunds</h2>

          <p>
            If your return or cancellation qualifies for a refund, the refund
            will be processed according to the applicable refund policy and
            payment method.
          </p>

          <p>
            The time required for the refund to appear in your account may
            depend on your payment provider or bank.
          </p>
        </section>

        {/* Important Note */}
        <div className="shipping-note">
          <h3>🌿 Important</h3>
          <p>
            Plants are living products, so natural variations in leaves, size,
            shape, and appearance are normal. Product photographs may also
            differ slightly from the actual plant you receive.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingReturn;
