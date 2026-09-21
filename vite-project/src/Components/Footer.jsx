import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom"; 


const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerTop">
        <div className="footerCol footerBrand">
          
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
              <Link to="/plants">All Plants</Link>
            </li>
            <li>
              <Link to="/finder">Plant Finder</Link>
            </li>
            <li>
              <Link to="/care">Plant Care</Link>
            </li>
            <li>
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </div>

        <div className="footerCol">
          <h4>Support</h4>
          <ul>
            <li>
              <Link to="/Faqs">FAQs</Link>
            </li>
            <li>
              <Link to="/shipping">Shipping & Returns</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
            <li>
              <Link to="/track-order">Track Order</Link>
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
          <Link to="/privacy">Privacy Policy</Link>
          <span>•</span>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
