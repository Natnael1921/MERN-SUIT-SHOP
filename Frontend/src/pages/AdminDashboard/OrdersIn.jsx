import axios from "axios";
import React, { useEffect, useState } from "react";
import "../../styles/admin.css";
import { toast } from "react-toastify";
export function OrdersIn() {
  const [ordersIn, setOrdersIn] = useState([]);

  useEffect(() => {
    async function getAllOrders() {
      try {
        const res = await axios.get("http://localhost:5000/api/orders");
        setOrdersIn(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err.message);
        toast.error("Error fetching orders");
      }
    }
    getAllOrders();
  }, []);
  async function updateStatus(orderId, status) {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/orders/status/${orderId}`,
        { status }
      );
      setOrdersIn((prev) =>
        prev.map((o) => (o._id === orderId ? res.data : o))
      );

      if (status === "accepted") {
        toast.success("Order accepted!");
      } else {
        toast.info("Order rejected");
      }
    } catch (err) {
      toast.error("Failed to update order status");
      console.error(err);
    }
  }

  return (
    <div className="orders-in">
      <h1>Orders In</h1>
      {ordersIn.map((order) => (
        <div key={order._id} className="order" data-aos="fade-up">
          <h3 data-aos="fade-up">Order ID: {order._id}</h3>
          {order.items.map((item, idx) => (
            <div key={idx} className="order-item" data-aos="fade-up">
              <img src={item.image} alt="cloth" width="100" />
              <p>Description: {item.description}</p>
              <p>Size: {item.size}</p>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <button
                data-aos="fade-up"
                onClick={() => updateStatus(order._id, "accepted")}
                className="accept-btn"
              >
                Accept Order
              </button>

              <button
                data-aos="fade-up"
                onClick={() => updateStatus(order._id, "rejected")}
                className="reject-btn"
              >
                Reject
              </button>
            </div>
          ))}
          <hr />
        </div>
      ))}
    </div>
  );
}
