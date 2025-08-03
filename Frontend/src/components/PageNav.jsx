import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export function PageNav({ isLoggedIn, setIsLoggedIn, role, setRole }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <span>Suit Craft</span>
      </NavLink>

      <ul>
        {isLoggedIn && role === "admin" ? (
          // Admin sidebar
          <li>
            <div className="dashboard-sidebar">
              <div className="sidebar-contents">
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/manage-cloths">Manage cloths</NavLink>
                <NavLink to="/dashboard">Users</NavLink>
                <NavLink to="/dashboard">Shipping</NavLink>
                <NavLink to="/dashboard">Finance</NavLink>
                <NavLink to="/orders-in">Orders in</NavLink>

                <button className="login-button" onClick={handleLogout}>
                  Log out
                </button>
              </div>
            </div>
          </li>
        ) : (
          // Non-admin users
          <>
            <li>
              <NavLink to="/cloths">Cloths</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact Us</NavLink>
            </li>
            {isLoggedIn && role === "user" && (
              <>
                <li>
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <NavLink to="/order">Order</NavLink>
                </li>
              </>
            )}
            <li>
              {isLoggedIn ? (
                <button className="login-button" onClick={handleLogout}>
                  Log out
                </button>
              ) : (
                <NavLink className="login-button" to="/auth">
                  Login
                </NavLink>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
