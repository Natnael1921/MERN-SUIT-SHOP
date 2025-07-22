import React from "react";
import { NavLink } from "react-router-dom";

export function PageNav({ isLoggedIn,setIsLoggedIn }) {
  return (
    <nav className="nav-bar">
      <NavLink to="/">
        <span>Suit Craft</span>
      </NavLink>

      <ul>
        <li>
          <NavLink to="/cloths">Cloths</NavLink>
        </li>
        <li>
          <NavLink to="/contact">Contact Us</NavLink>
        </li>

        {isLoggedIn ? (
          <>
            <li>
              <NavLink to="/cart">Cart</NavLink>
            </li>
            <li>
              <NavLink to="/order">Order</NavLink>
            </li>
            <li>
         <button className="login-button"  onClick={() => setIsLoggedIn(false)}>Log out</button>
          </li>
          </>
        ) : (
          <li>
            <NavLink className="login-button" to="/auth">Login</NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
}
