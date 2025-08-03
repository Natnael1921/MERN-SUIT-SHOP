import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
export function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchCartItems() {
      try {
        const res = await axios.get(`http://localhost:5000/api/cart/${userId}`);
        setCartItems(res.data);
      } catch (error) {
        alert("Error ");
        console.error("Error fetching cartts", error);
      }
    }
    fetchCartItems();
  }, []);
  async function deleteCartItem(id) {
    try {
      const res = await axios.delete(`http://localhost:5000/api/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item._id !== id));

      console.log("deleted successfully");
      alert("deleted successfully");
    } catch (error) {
      console.error("error deleting item", error);
    }
  }

  async function handleOrder(item) {
    try {
      const body = {
        userId,
        items: [
          {
            clothId: item.clothId._id,
            image: item.clothId.image,
            description: item.clothId.description,
            price: item.clothId.price,
            size: item.clothId.size,
            quantity: item.quantity || 1,
          },
        ],
      };
      const res = await axios.post(
        "http://localhost:5000/api/orders/create",
        body
      );
      if (res.status === 201) {
        alert("Order placed successfully");
      } else {
        alert("Failed to place order");
      }
    } catch (error) {
      console.error(
        "Error ordering:",
        error.response ? error.response.data : error.message
      );
      alert("Error placing order. Please try again later.");
    }
  }

  return (
    <div className="cart-page">
      {cartItems.map((item) =>
        item.clothId ? (
          <div className="cart-box" key={item._id}>
            <img src={item.clothId.image} alt="cart-image" />
            <div>
              <p>Type :  {item.clothId.description}</p>
              <p>Size : {item.clothId.size}</p>
              <p>Price : {item.clothId.price}</p>

              <button
                className="order-button"
                onClick={() => handleOrder(item)}
              >
                order
              </button>
              <button
                className="delete-button"
                onClick={() => deleteCartItem(item._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
