import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import "../styles/orders.css";
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
    <div className="orders-page">
      {orders.map((order, orderIndex) => (
        <div key={order._id || orderIndex} className="order-box">
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="order-item">
              <img src={item.image} alt="order item" />
              <div>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Status:{" "}
                  <span
                    className={`order-status ${
                      order.status === "accepted" ? "delivered" : "shipping"
                    }`}
                  >
                    {order.status === "accepted" ? "Delivered" : "Shipping"}
                  </span>
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
