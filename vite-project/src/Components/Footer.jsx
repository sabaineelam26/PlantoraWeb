import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerCol footerBrand">
          {/* <h2 className="footerLogo">Plantora</h2>
          <p className="footerTagline">Plants • Home • Happier You</p> */}
          <a href="/" className="logo">
            <img src="/logo.png" alt="logo" />
          </a>
          <p className="footerAbout">
            Bringing healthy, hand-picked plants into homes that need a little
            more green.
          </p>
        </div>

        <div className="footerCol">
          <h4>Shop</h4>
          <ul>
            <li>
              <a href="/plants">All Plants</a>
            </li>
            <li>
              <a href="/finder">Plant Finder</a>
            </li>
            <li>
              <a href="/care">Plant Care</a>
            </li>
            <li>
              <a href="/wishlist">Wishlist</a>
            </li>
          </ul>
        </div>

        <div className="footerCol">
          <h4>Support</h4>
          <ul>
            <li>
              <a href="/faq">FAQs</a>
            </li>
            <li>
              <a href="/shipping">Shipping & Returns</a>
            </li>
            <li>
              <a href="/contact">Contact Us</a>
            </li>
            <li>
              <a href="/track-order">Track Order</a>
            </li>
          </ul>
        </div>

        <div className="footerCol footerNewsletter">
          <h4>Stay in the loop</h4>
          <p>Get plant care tips and new arrivals in your inbox.</p>
          <form className="newsletterForm" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email" required />
            <button type="submit">Subscribe</button>
          </form>

          {/* <div className="socialIcons">
            <a href="#" aria-label="Instagram">
              IG
            </a>
            <a href="#" aria-label="Facebook">
              FB
            </a>
            <a href="#" aria-label="Pinterest">
              PIN
            </a>
          </div> */}
        </div>
      </div>

      <div className="footerBottom">
        <p>&copy; {new Date().getFullYear()} Plantora. All rights reserved.</p>
        <div className="footerLegal">
          <a href="/privacy">Privacy Policy</a>
          <span>•</span>
          <a href="/terms">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
