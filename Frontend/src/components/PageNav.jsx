import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";
export function PageNav({ isLoggedIn, setIsLoggedIn, role, setRole }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
    navigate("/");
    setMenuOpen(false);
  };

  const isUser = isLoggedIn && role === "user";

  return (
    <nav className={`nav-bar ${role === "admin" ? "admin-nav" : ""}`}>
      {/* Logo */}
      {role !== "admin" && (
        <NavLink to="/">
          <span>Suit Craft</span>
        </NavLink>
      )}

      {isUser && (
        <div
          className={`hamburger ${menuOpen ? "active" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div className="line line1"></div>
          <div className="line line2"></div>
          <div className="line line3"></div>
        </div>
      )}

      {/* Nav Links */}
      <ul
        className={`nav-links ${isUser ? "user-nav" : ""} ${menuOpen ? "open" : ""}`}
      >
        {isUser && (
          <>
            <li>
              <NavLink to="/cloths" onClick={() => setMenuOpen(false)}>
                Cloths
              </NavLink>
            </li>
            <li>
              <NavLink to="/cart" onClick={() => setMenuOpen(false)}>
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink to="/order" onClick={() => setMenuOpen(false)}>
                Order
              </NavLink>
            </li>
            <li>
              <button className="login-button" onClick={handleLogout}>
                Log out
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
