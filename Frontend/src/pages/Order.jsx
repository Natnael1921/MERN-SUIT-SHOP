import axios from "axios";
import React, { useEffect, useState } from "react";
import "../styles/orders.css";
import api from "../api";
import PulseLoader from "react-spinners/PulseLoader";

export function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    async function fetchMyOrders() {
      try {
        const res = await api.get(`/api/orders/${userId}`);
        setOrders(res.data);
      } catch (error) {
        alert("Error fetching orders");
        console.error("Error fetching your orders", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMyOrders();
  }, []);

 return (
  <div className="orders-page" data-aos="fade-up">
    {loading && (
      <div className="spinner-container">
        <PulseLoader size={15} color="gold" />
      </div>
    )}
    {!loading && orders.length === 0 && (
      <p className="no-orders">No orders yet</p>
    )}
    {!loading &&
      orders.length > 0 &&
      orders.map((order, orderIndex) => (
        <div
          key={order._id || orderIndex}
          className="order-box"
          data-aos="fade-up"
        >
          {order.items.map((item, itemIndex) => (
            <div key={itemIndex} className="order-item">
              <img src={item.image} alt="order item" />
              <div>
                <p>{item.description}</p>
                <p>Price: {item.price}</p>
                <p>Size: {item.size}</p>
                <p>Quantity: {item.quantity}</p>
                <p data-aos="fade-up">
                  Status:
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
