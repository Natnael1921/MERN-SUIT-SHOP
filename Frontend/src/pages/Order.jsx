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
    <div className="orders-page">
      {orders.map((order, orderIndex) => (
        <div key={order._id || orderIndex}>
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="order-box">
              <div>
                <img src={item.image} alt="order item" />
              </div>
              <div>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p>
                  Status:
                  {order.status === "accepted" ? "Delivered" : "Shipping"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
