import React from "react";
import "./navbar.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navContainer">
      <a href="/" className="logo">
        <img src="/logo.png" alt="Plantora Logo" />
      </a>

      <ul className="navItemCon">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/about"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Plants
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/members"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Plant Finder
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/schedule"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Plant Care
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/wishlist"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Wishlist
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cart"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Cart
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profile"
            className={({ isActive }) => `liText ${isActive ? "active" : ""}`}
          >
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
