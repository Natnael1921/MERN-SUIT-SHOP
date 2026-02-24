import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/nav.css";

export function PageNav({ isLoggedIn, setIsLoggedIn, role, setRole }) {

  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    setIsLoggedIn(false);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  const isAdmin = role === "admin";

  return (
    <>
      <nav className={`nav-bar ${isAdmin ? "admin-nav" : ""}`}>

        {!isAdmin && (
          <NavLink to="/" onClick={closeMenu}>
            <span>Suit Craft</span>
          </NavLink>
        )}

        <div
          className={`hamburger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

      </nav>

      {/* SIDEBAR (FOR ALL ROLES) */}
      <div className={`dashboard-sidebar ${menuOpen ? "open" : ""}`}>

        <div className="sidebar-contents">

          <span>Suit Craft</span>

          {isAdmin ? (
            <>
              <NavLink to="/dashboard" onClick={closeMenu}>Dashboard</NavLink>
              <NavLink to="/manage-cloths" onClick={closeMenu}>Manage Cloths</NavLink>
              <NavLink to="/orders-in" onClick={closeMenu}>Orders In</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>Users</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>Shipping</NavLink>
              <NavLink to="/dashboard" onClick={closeMenu}>Finance</NavLink>
              <button onClick={handleLogout}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/cloths" onClick={closeMenu}>Cloths</NavLink>
              <NavLink to="/contact" onClick={closeMenu}>Contact</NavLink>

              {isLoggedIn && role === "user" && (
                <>
                  <NavLink to="/cart" onClick={closeMenu}>Cart</NavLink>
                  <NavLink to="/order" onClick={closeMenu}>Orders</NavLink>
                </>
              )}

              {isLoggedIn ? (
                <button onClick={handleLogout}>Logout</button>
              ) : (
                <NavLink to="/auth" onClick={closeMenu}>Login</NavLink>
              )}
            </>
          )}

        </div>

      </div>

      {menuOpen && (
        <div className="menu-overlay" onClick={closeMenu}></div>
      )}
    </>
  );
}
