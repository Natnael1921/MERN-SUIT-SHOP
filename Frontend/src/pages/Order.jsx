import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export function Order() {
  const [orders, setOrders] = useState([]);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    async function fetchMyOrders() {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/orders/${userId}`
        );
        setOrders(res.data);
      } catch (error) {
        alert("error fetching orders");
        console.error("Error fetching your orders", error);
      }
    }
    fetchMyOrders();
  }, []);

  return (
    <div>
      {orders.map((order, orderIndex) => (
        <div key={order._id || orderIndex}>
          <h3>Order {orderIndex + 1}</h3>
          {order.items.map((item, itemIndex) => (
            <div
              key={itemIndex}
              style={{
                border: "1px solid gray",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <img
                src={item.image}
                alt="order item"
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
              <p>Size: {item.size}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
