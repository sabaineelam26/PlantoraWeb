import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="navContainer">
        <div className="navBar">
          <div className="">
            <a href="/" className="lnf" style={{ marginTop: "" }}>
              <img
                src="/logo.png"
                alt="Plantora Logo"
                style={{ width: "5rem", height: "5rem", marginBottom: "1rem" }}
              />
            </a>
          </div>

          <div>
            <ul className="navItemCon">
              <li className="liStyl">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `liText ${isActive ? "active" : ""}`
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className="liStyl">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `liText ${isActive ? "active" : ""}`
                  }
                >
                  Plants
                </NavLink>
              </li>
              <li className="liStyl">
                <NavLink to="/members" className="liText">
                  Plant Finder
                </NavLink>
              </li>

              <li className="liStyl">
                <NavLink
                  to="/schedule"
                  className={({ isActive }) =>
                    `liText ${isActive ? "active" : ""}`
                  }
                >
                  Plant Care
                </NavLink>
              </li>

              <li className="liStyl">
                <NavLink to="/chatbot" className="liText">
                  Wishlist
                </NavLink>
              </li>

              <li className="liStyl">
                <NavLink to="/chatbot" className="liText">
                  Cart
                </NavLink>
              </li>

              <li className="liStyl">
                <NavLink to="/chatbot" className="liText">
                  Profile
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar