import React, { useState } from "react";
import "./Navbar.css"

import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) => `liText ${isActive ? "active" : ""}`;

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
          <NavLink
            to="/profile"
            className={linkClass}
            onClick={() => setOpen(false)}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
