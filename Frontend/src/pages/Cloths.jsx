import React, { useEffect, useState } from "react";
import "../styles/cloths.css";
import { toast } from "react-toastify";
import api from "../api";
import { PulseLoader } from "react-spinners";

export function Cloths({ cloths, setClothes }) {
  const types = ["All", "Wedding", "Business", "Vintage"];
  const colors = ["Black", "White", "Brown", "Blue"];
  const [activeType, setActiveType] = useState("All");
  const [activeColor, setActiveColor] = useState("All");
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  async function fetchClothes() {
    try {
      setLoading(true);
      const res = await api.get("/api/clothes");
      setClothes(res.data.data);
    } catch (error) {
      console.error("Error fetching clothes", error);
      toast.error("Failed to fetch clothes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchClothes();
  }, []);

  async function AddToCart(cloth) {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      toast.error("Please login first to add items to cart");
      return;
    }
    try {
      await api.post("/api/cart", {
        userId,
        clothId: cloth._id,
        quantity: 1,
      });
      toast.success("Added to cart successfully");
    } catch (error) {
      console.error("Error adding to cart", error);
      toast.error("Error adding to cart");
    }
  }

  function filterClothes(key, value) {
    setLoading(true);
    api
      .get(`/api/clothes?${key}=${value}`)
      .then((res) => setClothes(res.data.data))
      .catch(() => toast.error("Filtering error"))
      .finally(() => setLoading(false));
  }

  return (
    <div className="cloth-page">
      {/* MOBILE DROPDOWN FILTER */}
      <div className="mobile-filter">
        <button
          className="dropdown-btn"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Filter: {activeType}, {activeColor}
        </button>
        {dropdownOpen && (
          <div className="dropdown-list">
            <p className="dropdown-title">Type</p>
            {types.map((t) => (
              <p
                key={t}
                className={t === activeType ? "active" : ""}
                onClick={() => {
                  setActiveType(t);
                  t === "All"
                    ? fetchClothes()
                    : filterClothes("type", t.toLowerCase());
                }}
              >
                {t}
              </p>
            ))}
            <p className="dropdown-title">Color</p>
            {colors.map((c) => (
              <p
                key={c}
                className={c === activeColor ? "active" : ""}
                onClick={() => {
                  setActiveColor(c);
                  c === "All"
                    ? fetchClothes()
                    : filterClothes("color", c.toLowerCase());
                }}
              >
                {c}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP FILTER */}
      <div className="cloth-info">
        {types.map((t) => (
          <p
            key={t}
            className={`filter-option ${t === activeType ? "active" : ""}`}
            onClick={() => {
              setActiveType(t);
              t === "All"
                ? fetchClothes()
                : filterClothes("type", t.toLowerCase());
            }}
          >
            {t}
          </p>
        ))}
        {colors.map((c) => (
          <p
            key={c}
            className="filter-option"
            onClick={() => filterClothes("color", c.toLowerCase())}
          >
            {c}
          </p>
        ))}
      </div>

      {/* CLOTHES */}
      <div className="cloth-container">
        {loading ? (
          <div className="spinner-container">
            <PulseLoader color="gold" size={12} />
          </div>
        ) : (
          cloths.map((cloth) => (
            <div className="cloth-box" key={cloth._id} data-aos="fade-up">
              <img src={cloth.image} alt={cloth.description} />
              <p>Type: {cloth.description}</p>
              <p>Size: {cloth.size}</p>
              <p>Price: {cloth.price} ETB</p>
              <button onClick={() => AddToCart(cloth)}>Add to cart</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}