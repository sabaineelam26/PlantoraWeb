import React, { useState, useContext } from "react";
import './navbar.css'

import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const linkClass = ({ isActive }) => `liText ${isActive ? "active" : ""}`;

  const handleAuthAction = () => {
    setOpen(false);
    if (user) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navContainer">
      <a href="/" className="logo">
        <img src="/logo.png" alt="Plantora Logo" />
      </a>

      <button
        className="navToggle"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <ul className={`navItemCon ${open ? "navOpen" : ""}`}>
        <li>
          <NavLink to="/" className={linkClass} onClick={() => setOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/plants"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Plants
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/plantFinder"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Plant Finder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/plantCare"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Plant Care
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Cart
          </NavLink>
        </li>
        <li>
          <button 
            className="liText auth-nav-btn" 
            onClick={handleAuthAction}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 'inherit', fontFamily: 'inherit', padding: 0 }}
          >
            {user ? "Logout" : "Login"}
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
