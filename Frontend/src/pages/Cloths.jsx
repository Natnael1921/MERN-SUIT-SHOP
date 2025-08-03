import axios from "axios";
import React from "react";
import { useEffect } from "react";
export function Cloths({ cloths, setClothes }) {
  useEffect(() => {
    async function fetchClothes() {
      try {
        const res = await axios.get("http://localhost:5000/api/clothes");
        console.log("Fetched clothes:", res.data);
        setClothes(res.data.data);
      } catch (error) {
        console.error("error fetching clothes", error);
      }
    }
    fetchClothes();
  }, []);

  async function AddToCart(cloth) {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.log("UserId from localStorage:", userId);
       
        return;
      }

      const body = {
        userId,
        clothId: cloth._id,
        quantity: 1,
      };

      const res = await axios.post("http://localhost:5000/api/cart", body);
      console.log("Added to cart:", res.data);
      alert("added to cart successfully")
    } catch (error) {
      console.error("Error adding to cart", error);
    }
  }

  return (
    <div className="cloth-page">
  <div className="cloth-info">
        <p>wedding suit </p>
        <p>Business suit</p>
        <p>old suit</p>
        <p>black</p>
        <p>white</p>
        <p>brown</p>
        <p>blue</p>
      </div>
<div className="cloth-container">
      {cloths.map((cloth) => (
        <div className="cloth-box" key={cloth._id}>
          <img src={cloth.image} />
          <p>Type: {cloth.description}</p>
          <p>size: {cloth.size}</p>
          <p>price: {cloth.price} ETB</p>
          <button onClick={() => AddToCart(cloth)}>Add to cart</button>
        </div>
      ))}
    </div>
    </div>
    
  );
}
