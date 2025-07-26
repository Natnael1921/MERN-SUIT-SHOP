import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Cloths } from "./pages/Cloths";
import { Contact } from "./pages/Contact";
import { AuthPage } from "./pages/AuthPage";
import { PageNav } from "./components/PageNav";
import { useState } from "react";
import { ManageCloths } from "./pages/AdminDashboard/ManageCloths";
import { Cart } from "./pages/Cart";
import { Order } from "./pages/Order";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "user");
  const [cloths, setClothes] = useState([]);
  const [orders, setOrders] = useState([]);
  return (
    <BrowserRouter>
      <PageNav
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        role={role}
        setRole={setRole}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/cloths"
          element={<Cloths cloths={cloths} setClothes={setClothes} />}
        />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/auth"
          element={
            <AuthPage
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              role={role}
              setRole={setRole}
            />
          }
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order" element={<Order />} />
        <Route
          path="/manage-cloths"
          element={<ManageCloths cloths={cloths} setClothes={setClothes} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
